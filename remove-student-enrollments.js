const mysql = require('mysql2/promise');

async function removeStudentEnrollments() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  console.log('🗑️ Removing All Enrollments for Student STU2024001\n');

  try {
    const studentId = 'STU2024001';

    // 1. Check current enrollments
    console.log('1️⃣ Current Enrollments:');
    const [currentEnrollments] = await connection.execute(`
      SELECT e.*, c.course_name, c.slot 
      FROM enrollments e 
      JOIN courses c ON e.course_code = c.course_code 
      WHERE e.student_id = ?
    `, [studentId]);

    if (currentEnrollments.length === 0) {
      console.log('   No enrollments found');
    } else {
      console.log(`   Found ${currentEnrollments.length} enrollments:`);
      currentEnrollments.forEach((enrollment, idx) => {
        console.log(`   ${idx + 1}. ${enrollment.course_code} - ${enrollment.course_name} [Slot ${enrollment.slot}]`);
      });
    }

    // 2. Check current enrollment requests
    console.log('\n2️⃣ Current Enrollment Requests:');
    const [currentRequests] = await connection.execute(`
      SELECT er.*, c.course_name, c.slot 
      FROM enrollment_requests er 
      JOIN courses c ON er.course_code = c.course_code 
      WHERE er.student_id = ?
    `, [studentId]);

    if (currentRequests.length === 0) {
      console.log('   No enrollment requests found');
    } else {
      console.log(`   Found ${currentRequests.length} enrollment requests:`);
      currentRequests.forEach((request, idx) => {
        console.log(`   ${idx + 1}. ${request.course_code} - ${request.course_name} [Slot ${request.slot}] - ${request.status.toUpperCase()}`);
      });
    }

    // 3. Start transaction to remove all data
    console.log('\n3️⃣ Starting Cleanup Transaction:');
    await connection.beginTransaction();

    try {
      // Remove all enrollments
      if (currentEnrollments.length > 0) {
        console.log('   🗑️ Removing enrollments...');
        const [deleteEnrollments] = await connection.execute(`
          DELETE FROM enrollments WHERE student_id = ?
        `, [studentId]);
        console.log(`   ✅ Deleted ${deleteEnrollments.affectedRows} enrollments`);

        // Update course enrollment counts
        console.log('   📊 Updating course enrollment counts...');
        for (const enrollment of currentEnrollments) {
          await connection.execute(`
            UPDATE courses 
            SET current_enrolled = GREATEST(0, current_enrolled - 1)
            WHERE course_code = ?
          `, [enrollment.course_code]);
          console.log(`   ✅ Updated ${enrollment.course_code} enrollment count`);
        }
      }

      // Remove all enrollment requests
      if (currentRequests.length > 0) {
        console.log('   🗑️ Removing enrollment requests...');
        const [deleteRequests] = await connection.execute(`
          DELETE FROM enrollment_requests WHERE student_id = ?
        `, [studentId]);
        console.log(`   ✅ Deleted ${deleteRequests.affectedRows} enrollment requests`);
      }

      await connection.commit();
      console.log('   ✅ Transaction completed successfully');

    } catch (error) {
      await connection.rollback();
      console.log('   ❌ Transaction failed, rolling back');
      throw error;
    }

    // 4. Verify cleanup
    console.log('\n4️⃣ Verifying Cleanup:');
    
    // Check enrollments
    const [verifyEnrollments] = await connection.execute(`
      SELECT COUNT(*) as count FROM enrollments WHERE student_id = ?
    `, [studentId]);
    console.log(`   📚 Remaining enrollments: ${verifyEnrollments[0].count}`);

    // Check enrollment requests
    const [verifyRequests] = await connection.execute(`
      SELECT COUNT(*) as count FROM enrollment_requests WHERE student_id = ?
    `, [studentId]);
    console.log(`   📝 Remaining enrollment requests: ${verifyRequests[0].count}`);

    // 5. Show available courses in all slots
    console.log('\n5️⃣ Available Courses After Cleanup:');
    
    const [allCourses] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        (c.max_capacity - c.current_enrolled) as available_slots,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
        CASE 
          WHEN e.student_id IS NOT NULL THEN 'enrolled'
          WHEN er.student_id IS NOT NULL THEN 'pending'
          ELSE 'available'
        END as status
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.student_id = ?
      LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.student_id = ? AND er.status = 'pending'
      WHERE c.slot IS NOT NULL AND c.faculty_id IS NOT NULL
      ORDER BY c.slot, c.course_code
    `, [studentId, studentId]);

    const coursesBySlot = {};
    allCourses.forEach(course => {
      if (!coursesBySlot[course.slot]) {
        coursesBySlot[course.slot] = [];
      }
      coursesBySlot[course.slot].push(course);
    });

    Object.keys(coursesBySlot).sort().forEach(slot => {
      console.log(`   Slot ${slot}:`);
      coursesBySlot[slot].forEach(course => {
        const statusIcon = course.status === 'enrolled' ? '✅' : 
                          course.status === 'pending' ? '⏳' : '📚';
        console.log(`     ${statusIcon} ${course.course_code} - ${course.course_name} (${course.status})`);
        console.log(`        Faculty: ${course.faculty_name}, Capacity: ${course.current_enrolled}/${course.max_capacity}`);
      });
    });

    console.log('\n🎉 CLEANUP COMPLETE!');
    console.log('\n📋 SUMMARY:');
    console.log(`   ✅ Removed ${currentEnrollments.length} enrollments`);
    console.log(`   ✅ Removed ${currentRequests.length} enrollment requests`);
    console.log('   ✅ Updated course enrollment counts');
    console.log('   ✅ All courses are now available for selection');
    console.log(`   ✅ Student ${studentId} has a clean slate for testing`);

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await connection.end();
  }
}

removeStudentEnrollments();