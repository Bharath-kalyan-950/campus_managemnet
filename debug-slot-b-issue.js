const mysql = require('mysql2/promise');

async function debugSlotBIssue() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  console.log('🔍 Debugging Slot B Enrollment Issue\n');

  try {
    // 1. Check all courses in Slot B
    console.log('1️⃣ All Courses in Slot B:');
    const [slotBCourses] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        c.faculty_id,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      WHERE c.slot = 'B'
      ORDER BY c.course_code
    `);

    if (slotBCourses.length === 0) {
      console.log('   ❌ No courses found in Slot B');
    } else {
      console.log(`   Found ${slotBCourses.length} courses in Slot B:`);
      slotBCourses.forEach(course => {
        console.log(`   📚 ${course.course_code} - ${course.course_name}`);
        console.log(`      Faculty: ${course.faculty_name || 'Not assigned'} (${course.faculty_id})`);
        console.log(`      Capacity: ${course.current_enrolled}/${course.max_capacity}`);
      });
    }

    // 2. Check enrollment requests for Slot B
    console.log('\n2️⃣ Enrollment Requests for Slot B:');
    const [slotBRequests] = await connection.execute(`
      SELECT 
        er.*,
        c.course_name,
        CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE er.slot = 'B'
      ORDER BY er.request_date DESC
    `);

    if (slotBRequests.length === 0) {
      console.log('   ❌ No enrollment requests found for Slot B');
    } else {
      console.log(`   Found ${slotBRequests.length} enrollment requests for Slot B:`);
      slotBRequests.forEach(req => {
        console.log(`   📝 ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.status.toUpperCase()}`);
        console.log(`      Request Date: ${req.request_date}`);
        console.log(`      Faculty ID: ${req.faculty_id}`);
      });
    }

    // 3. Check what students can see when selecting Slot B
    console.log('\n3️⃣ Student View - Slot B Courses:');
    const testStudentId = 'STU2024001';
    
    const [studentSlotBView] = await connection.execute(`
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
          WHEN er.student_id IS NOT NULL THEN er.status
          ELSE 'available'
        END as enrollment_status
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.student_id = ?
      LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.student_id = ? AND er.status = 'pending'
      WHERE c.slot = 'B' AND c.faculty_id IS NOT NULL
      ORDER BY c.course_code
    `, [testStudentId, testStudentId]);

    if (studentSlotBView.length === 0) {
      console.log('   ❌ No courses available for students in Slot B');
    } else {
      console.log(`   Student ${testStudentId} can see ${studentSlotBView.length} courses in Slot B:`);
      studentSlotBView.forEach(course => {
        const statusIcon = course.enrollment_status === 'enrolled' ? '✅' : 
                          course.enrollment_status === 'pending' ? '⏳' : '📚';
        console.log(`   ${statusIcon} ${course.course_code} - ${course.course_name} (${course.enrollment_status})`);
        console.log(`      Faculty: ${course.faculty_name}, Available: ${course.available_slots}/${course.max_capacity}`);
      });
    }

    // 4. Create test enrollment requests for Slot B
    console.log('\n4️⃣ Creating Test Enrollment Requests for Slot B:');
    
    if (slotBCourses.length > 0) {
      const testCourse = slotBCourses[0];
      console.log(`   Creating test request: ${testStudentId} → ${testCourse.course_code} [Slot B]`);
      
      // Clean up existing request first
      await connection.execute(`
        DELETE FROM enrollment_requests 
        WHERE student_id = ? AND course_code = ?
      `, [testStudentId, testCourse.course_code]);
      
      // Create new request
      const requestId = `TEST_SLOT_B_${Date.now()}`;
      await connection.execute(`
        INSERT INTO enrollment_requests (request_id, student_id, course_code, faculty_id, slot, status)
        VALUES (?, ?, ?, ?, 'B', 'pending')
      `, [requestId, testStudentId, testCourse.course_code, testCourse.faculty_id]);
      
      console.log('   ✅ Test enrollment request created');
      
      // Verify faculty can see it
      const [facultyView] = await connection.execute(`
        SELECT 
          er.request_id,
          er.student_id,
          CONCAT(us.first_name, ' ', us.last_name) as student_name,
          er.course_code,
          c.course_name,
          er.slot,
          er.status
        FROM enrollment_requests er
        JOIN courses c ON er.course_code = c.course_code
        JOIN students s ON er.student_id = s.student_id
        JOIN users us ON s.user_id = us.id
        WHERE er.faculty_id = ? AND er.slot = 'B' AND er.status = 'pending'
      `, [testCourse.faculty_id]);
      
      if (facultyView.length > 0) {
        console.log('   ✅ Faculty can now see Slot B requests:');
        facultyView.forEach(req => {
          console.log(`      📝 ${req.student_name} → ${req.course_code} - ${req.course_name} [Slot ${req.slot}]`);
        });
      } else {
        console.log('   ❌ Faculty still cannot see Slot B requests');
      }
    }

    // 5. Check faculty courses API
    console.log('\n5️⃣ Faculty Courses API Response:');
    const facultyId = 'FAC2024001';
    
    const [facultyCourses] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.credits,
        c.course_type,
        c.max_capacity,
        c.current_enrolled
      FROM courses c
      WHERE c.faculty_id = ?
      ORDER BY c.slot, c.course_code
    `, [facultyId]);

    console.log(`   Faculty ${facultyId} teaches ${facultyCourses.length} courses:`);
    facultyCourses.forEach(course => {
      console.log(`   📚 ${course.course_code} - ${course.course_name} [Slot ${course.slot}]`);
    });

    console.log('\n🎯 DIAGNOSIS:');
    console.log('   1. Check if courses exist in Slot B');
    console.log('   2. Check if students have submitted requests for Slot B courses');
    console.log('   3. Check if faculty ID matches between courses and requests');
    console.log('   4. Verify API endpoints are working correctly');

  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await connection.end();
  }
}

debugSlotBIssue();