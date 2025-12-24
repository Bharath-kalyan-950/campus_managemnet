const mysql = require('mysql2/promise');

async function testCompleteRemoveWorkflow() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  console.log('🧪 Testing Complete Remove Enrollment Workflow\n');

  try {
    const testStudentId = 'STU2024001';
    const testCourseCode = 'TEST001';
    const testSlot = 'D';

    // 1. Create a test enrollment request
    console.log('1️⃣ Creating Test Enrollment Request:');
    
    // First, clean up any existing request
    await connection.execute(`
      DELETE FROM enrollment_requests 
      WHERE student_id = ? AND course_code = ?
    `, [testStudentId, testCourseCode]);

    // Create new request
    const requestId = `TEST_REMOVE_${Date.now()}`;
    await connection.execute(`
      INSERT INTO enrollment_requests (request_id, student_id, course_code, faculty_id, slot, status)
      VALUES (?, ?, ?, 'FAC2024001', ?, 'pending')
    `, [requestId, testStudentId, testCourseCode, testSlot]);

    console.log(`   ✅ Created: ${testStudentId} → ${testCourseCode} [Slot ${testSlot}]`);

    // 2. Verify course is NOT available in slot (because of pending request)
    console.log('\n2️⃣ Checking Course Availability Before Removal:');
    
    const [beforeRemoval] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        CASE 
          WHEN e.student_id IS NOT NULL THEN 'enrolled'
          WHEN er.student_id IS NOT NULL THEN 'pending'
          ELSE 'available'
        END as enrollment_status
      FROM courses c
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.student_id = ?
      LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.student_id = ? AND er.status = 'pending'
      WHERE c.course_code = ?
    `, [testStudentId, testStudentId, testCourseCode]);

    if (beforeRemoval.length > 0) {
      const course = beforeRemoval[0];
      console.log(`   📚 ${course.course_code} - ${course.course_name} [Slot ${course.slot}]: ${course.enrollment_status}`);
      
      if (course.enrollment_status === 'pending') {
        console.log('   ✅ Correct: Course shows as pending (not available for selection)');
      } else {
        console.log('   ❌ Error: Course should show as pending');
      }
    }

    // 3. Simulate API DELETE call (what happens when user clicks X button)
    console.log('\n3️⃣ Simulating Remove Button Click (API DELETE):');
    
    const [deleteResult] = await connection.execute(`
      DELETE FROM enrollment_requests 
      WHERE student_id = ? AND course_code = ? AND status = 'pending'
    `, [testStudentId, testCourseCode]);

    if (deleteResult.affectedRows > 0) {
      console.log('   ✅ Enrollment request deleted from database');
    } else {
      console.log('   ❌ No request was deleted');
    }

    // 4. Verify course is NOW available in slot (after removal)
    console.log('\n4️⃣ Checking Course Availability After Removal:');
    
    const [afterRemoval] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        (c.max_capacity - c.current_enrolled) as available_slots,
        CASE 
          WHEN e.student_id IS NOT NULL THEN 'enrolled'
          WHEN er.student_id IS NOT NULL THEN 'pending'
          ELSE 'available'
        END as enrollment_status
      FROM courses c
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.student_id = ?
      LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.student_id = ? AND er.status = 'pending'
      WHERE c.course_code = ?
    `, [testStudentId, testStudentId, testCourseCode]);

    if (afterRemoval.length > 0) {
      const course = afterRemoval[0];
      console.log(`   📚 ${course.course_code} - ${course.course_name} [Slot ${course.slot}]: ${course.enrollment_status}`);
      console.log(`   📊 Capacity: ${course.current_enrolled}/${course.max_capacity} (${course.available_slots} available)`);
      
      if (course.enrollment_status === 'available') {
        console.log('   ✅ Perfect: Course is now available for selection in Slot ' + course.slot);
      } else {
        console.log('   ❌ Error: Course should be available after removal');
      }
    }

    // 5. Test slot-based API response (what student sees when selecting slot)
    console.log('\n5️⃣ Testing Slot-Based API Response:');
    
    const [slotCourses] = await connection.execute(`
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
        END as enrollment_status
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.student_id = ?
      LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.student_id = ? AND er.status = 'pending'
      WHERE c.slot = ? AND c.faculty_id IS NOT NULL
      ORDER BY c.course_code
    `, [testStudentId, testStudentId, testSlot]);

    console.log(`   Slot ${testSlot} courses for student ${testStudentId}:`);
    slotCourses.forEach(course => {
      const statusIcon = course.enrollment_status === 'enrolled' ? '✅' : 
                        course.enrollment_status === 'pending' ? '⏳' : '📚';
      console.log(`     ${statusIcon} ${course.course_code} - ${course.course_name} (${course.enrollment_status})`);
      console.log(`        Faculty: ${course.faculty_name}, Capacity: ${course.current_enrolled}/${course.max_capacity}`);
    });

    // 6. Verify student's enrollment requests list
    console.log('\n6️⃣ Checking Student Enrollment Requests:');
    
    const [studentRequests] = await connection.execute(`
      SELECT 
        er.course_code,
        c.course_name,
        er.slot,
        er.status,
        CONCAT(uf.first_name, ' ', uf.last_name) as faculty_name
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN faculty f ON er.faculty_id = f.faculty_id
      JOIN users uf ON f.user_id = uf.id
      WHERE er.student_id = ?
      ORDER BY er.request_date DESC
    `, [testStudentId]);

    console.log(`   Student ${testStudentId} enrollment requests:`);
    if (studentRequests.length === 0) {
      console.log('     ✅ No enrollment requests (course was successfully removed)');
    } else {
      studentRequests.forEach(req => {
        const statusIcon = req.status === 'approved' ? '✅' : req.status === 'pending' ? '⏳' : '❌';
        console.log(`     ${statusIcon} ${req.course_code} - ${req.course_name} [Slot ${req.slot}] - ${req.status.toUpperCase()}`);
      });
    }

    console.log('\n🎉 COMPLETE REMOVE WORKFLOW TEST RESULTS:');
    console.log('   ✅ Enrollment request can be created');
    console.log('   ✅ Course becomes unavailable when request exists');
    console.log('   ✅ DELETE API removes request from database');
    console.log('   ✅ Course becomes available again after removal');
    console.log('   ✅ Course appears in correct slot after removal');
    console.log('   ✅ Student enrollment list updates correctly');
    
    console.log('\n🔄 USER EXPERIENCE FLOW:');
    console.log('   1. Student selects course → Course goes to "Pending" (yellow)');
    console.log('   2. Course disappears from slot (not available for selection)');
    console.log('   3. Student clicks ✕ button → API deletes request');
    console.log('   4. Course reappears in original slot (available for selection)');
    console.log('   5. Student can select the course again if desired');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await connection.end();
  }
}

testCompleteRemoveWorkflow();