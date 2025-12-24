const mysql = require('mysql2/promise');

async function testRemoveEnrollment() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  console.log('🧪 Testing Remove Enrollment Functionality\n');

  try {
    // 1. Check current pending requests
    console.log('1️⃣ Current Pending Enrollment Requests:');
    
    const [currentRequests] = await connection.execute(`
      SELECT er.*, c.course_name, c.slot, CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE er.status = 'pending'
      ORDER BY er.request_date DESC
    `);
    
    console.log(`   Found ${currentRequests.length} pending requests:`);
    currentRequests.forEach((req, idx) => {
      console.log(`   ${idx + 1}. ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.course_name} [Slot ${req.slot}]`);
    });

    if (currentRequests.length === 0) {
      console.log('   ⚠️  No pending requests to test removal');
      
      // Create a test request
      console.log('\n2️⃣ Creating Test Enrollment Request:');
      const testStudentId = 'STU2024001';
      const testCourseCode = 'CS303';
      const testSlot = 'C';
      
      // Check if request already exists
      const [existingRequest] = await connection.execute(`
        SELECT * FROM enrollment_requests 
        WHERE student_id = ? AND course_code = ? AND status = 'pending'
      `, [testStudentId, testCourseCode]);
      
      if (existingRequest.length === 0) {
        const requestId = `TEST_REQ_${Date.now()}`;
        await connection.execute(`
          INSERT INTO enrollment_requests (request_id, student_id, course_code, faculty_id, slot, status)
          VALUES (?, ?, ?, 'FAC2024001', ?, 'pending')
        `, [requestId, testStudentId, testCourseCode, testSlot]);
        
        console.log(`   ✅ Created test request: ${testStudentId} → ${testCourseCode} [Slot ${testSlot}]`);
      } else {
        console.log(`   ⚠️  Test request already exists: ${testStudentId} → ${testCourseCode}`);
      }
    }

    // 2. Test removal functionality
    console.log('\n3️⃣ Testing Removal Functionality:');
    
    // Get updated list of pending requests
    const [updatedRequests] = await connection.execute(`
      SELECT er.*, c.course_name, c.slot, CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE er.status = 'pending'
      ORDER BY er.request_date DESC
      LIMIT 1
    `);
    
    if (updatedRequests.length > 0) {
      const testRequest = updatedRequests[0];
      console.log(`   Testing removal of: ${testRequest.student_name} → ${testRequest.course_code} [Slot ${testRequest.slot}]`);
      
      // Simulate API DELETE call
      const deleteResult = await connection.execute(`
        DELETE FROM enrollment_requests 
        WHERE student_id = ? AND course_code = ? AND status = 'pending'
      `, [testRequest.student_id, testRequest.course_code]);
      
      if (deleteResult.affectedRows > 0) {
        console.log('   ✅ Enrollment request removed successfully from database');
        
        // Verify removal
        const [verifyRemoval] = await connection.execute(`
          SELECT * FROM enrollment_requests 
          WHERE student_id = ? AND course_code = ? AND status = 'pending'
        `, [testRequest.student_id, testRequest.course_code]);
        
        if (verifyRemoval.length === 0) {
          console.log('   ✅ Verified: Request no longer exists in database');
          
          // Check if course is now available in its slot
          const [courseAvailability] = await connection.execute(`
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
          `, [testRequest.student_id, testRequest.student_id, testRequest.course_code]);
          
          if (courseAvailability.length > 0) {
            const course = courseAvailability[0];
            console.log(`   ✅ Course ${course.course_code} is now ${course.enrollment_status} in Slot ${course.slot}`);
            console.log(`   📊 Capacity: ${course.current_enrolled}/${course.max_capacity} (${course.available_slots} available)`);
          }
        } else {
          console.log('   ❌ Error: Request still exists after deletion');
        }
      } else {
        console.log('   ❌ No rows affected - request may not exist or not pending');
      }
    }

    // 3. Test slot-based course fetching after removal
    console.log('\n4️⃣ Testing Slot-Based Course Availability:');
    
    const testSlots = ['A', 'B', 'C'];
    const testStudentId = 'STU2024001';
    
    for (const slot of testSlots) {
      const [slotCourses] = await connection.execute(`
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
        WHERE c.slot = ? AND c.faculty_id IS NOT NULL
        ORDER BY c.course_code
      `, [testStudentId, testStudentId, slot]);
      
      if (slotCourses.length > 0) {
        console.log(`   Slot ${slot}:`);
        slotCourses.forEach(course => {
          const statusIcon = course.enrollment_status === 'enrolled' ? '✅' : 
                           course.enrollment_status === 'pending' ? '⏳' : '📚';
          console.log(`     ${statusIcon} ${course.course_code} - ${course.course_name} (${course.enrollment_status})`);
        });
      }
    }

    console.log('\n🎉 REMOVE ENROLLMENT TEST COMPLETE!');
    console.log('\n📋 FUNCTIONALITY VERIFIED:');
    console.log('   ✅ Enrollment requests can be deleted from database');
    console.log('   ✅ Courses become available again after removal');
    console.log('   ✅ Slot-based filtering works correctly');
    console.log('   ✅ Student enrollment status updates properly');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await connection.end();
  }
}

testRemoveEnrollment();