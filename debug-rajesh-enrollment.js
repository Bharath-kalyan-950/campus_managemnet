const mysql = require('mysql2/promise');

async function debugRajeshEnrollment() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  console.log('🔍 Debugging Rajesh Enrollment Issue\n');

  try {
    const rajeshStudentId = 'STU2024002';
    const danielFacultyId = 'FAC2024001';

    // 1. Check Rajesh's recent enrollment requests
    console.log('1️⃣ Rajesh Recent Enrollment Requests:');
    const [rajeshRequests] = await connection.execute(`
      SELECT 
        er.*,
        c.course_name,
        c.slot,
        CONCAT(uf.first_name, ' ', uf.last_name) as faculty_name
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN faculty f ON er.faculty_id = f.faculty_id
      JOIN users uf ON f.user_id = uf.id
      WHERE er.student_id = ?
      ORDER BY er.request_date DESC
      LIMIT 10
    `, [rajeshStudentId]);

    if (rajeshRequests.length === 0) {
      console.log('   ❌ No enrollment requests found for Rajesh');
    } else {
      console.log(`   Found ${rajeshRequests.length} enrollment requests for Rajesh:`);
      rajeshRequests.forEach(req => {
        console.log(`   📝 ${req.course_code} - ${req.course_name} [Slot ${req.slot}]`);
        console.log(`      Status: ${req.status.toUpperCase()}, Faculty: ${req.faculty_name} (${req.faculty_id})`);
        console.log(`      Request Date: ${req.request_date}`);
        console.log(`      Request ID: ${req.request_id}`);
        console.log('');
      });
    }

    // 2. Check what Daniel can see in his faculty portal
    console.log('2️⃣ Daniel Faculty Portal View (All Pending):');
    const [danielRequests] = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        c.course_name,
        er.slot,
        er.status,
        er.request_date
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.faculty_id = ? AND er.status = 'pending'
      ORDER BY er.request_date DESC
    `, [danielFacultyId]);

    if (danielRequests.length === 0) {
      console.log('   ❌ Daniel cannot see any pending requests');
    } else {
      console.log(`   Daniel can see ${danielRequests.length} pending requests:`);
      danielRequests.forEach(req => {
        console.log(`   📝 ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.course_name} [Slot ${req.slot}]`);
        console.log(`      Request Date: ${req.request_date}`);
      });
    }

    // 3. Check specifically for Slot C requests
    console.log('\n3️⃣ Slot C Requests for Daniel:');
    const [slotCRequests] = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        c.course_name,
        er.slot,
        er.status,
        er.request_date
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.faculty_id = ? AND er.slot = 'C'
      ORDER BY er.request_date DESC
    `, [danielFacultyId]);

    if (slotCRequests.length === 0) {
      console.log('   ❌ No Slot C requests found for Daniel');
    } else {
      console.log(`   Found ${slotCRequests.length} Slot C requests for Daniel:`);
      slotCRequests.forEach(req => {
        console.log(`   📝 ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.course_name}`);
        console.log(`      Status: ${req.status.toUpperCase()}, Date: ${req.request_date}`);
      });
    }

    // 4. Check if there's a mismatch in faculty assignment
    console.log('\n4️⃣ Course Faculty Assignment Check:');
    const [courseCheck] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.faculty_id,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      WHERE c.slot = 'C'
      ORDER BY c.course_code
    `, []);

    console.log('   Slot C courses and their faculty assignments:');
    courseCheck.forEach(course => {
      console.log(`   📚 ${course.course_code} - ${course.course_name}`);
      console.log(`      Faculty: ${course.faculty_name || 'Not assigned'} (${course.faculty_id || 'No ID'})`);
    });

    // 5. Check if Rajesh's request was created with correct faculty_id
    console.log('\n5️⃣ Rajesh Latest Request Details:');
    if (rajeshRequests.length > 0) {
      const latestRequest = rajeshRequests[0];
      console.log(`   Latest Request: ${latestRequest.course_code} [Slot ${latestRequest.slot}]`);
      console.log(`   Faculty ID in Request: ${latestRequest.faculty_id}`);
      console.log(`   Expected Faculty ID: ${danielFacultyId}`);
      
      if (latestRequest.faculty_id === danielFacultyId) {
        console.log('   ✅ Faculty ID matches - request should be visible to Daniel');
      } else {
        console.log('   ❌ Faculty ID mismatch - this is the problem!');
        
        // Check who this faculty ID belongs to
        const [facultyCheck] = await connection.execute(`
          SELECT 
            f.faculty_id,
            CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
            u.email
          FROM faculty f
          JOIN users u ON f.user_id = u.id
          WHERE f.faculty_id = ?
        `, [latestRequest.faculty_id]);
        
        if (facultyCheck.length > 0) {
          const faculty = facultyCheck[0];
          console.log(`   Request assigned to: ${faculty.faculty_name} (${faculty.email})`);
        }
      }
    }

    // 6. Create a test request with correct faculty ID if needed
    console.log('\n6️⃣ Creating Test Request for Verification:');
    
    // Find a Slot C course assigned to Daniel
    const [danielSlotCCourse] = await connection.execute(`
      SELECT course_code, course_name FROM courses 
      WHERE slot = 'C' AND faculty_id = ?
      LIMIT 1
    `, [danielFacultyId]);

    if (danielSlotCCourse.length > 0) {
      const testCourse = danielSlotCCourse[0];
      
      // Clean up any existing request
      await connection.execute(`
        DELETE FROM enrollment_requests 
        WHERE student_id = ? AND course_code = ?
      `, [rajeshStudentId, testCourse.course_code]);
      
      // Create new test request
      const testRequestId = `TEST_RAJESH_${Date.now()}`;
      await connection.execute(`
        INSERT INTO enrollment_requests (request_id, student_id, course_code, faculty_id, slot, status)
        VALUES (?, ?, ?, ?, 'C', 'pending')
      `, [testRequestId, rajeshStudentId, testCourse.course_code, danielFacultyId]);
      
      console.log(`   ✅ Created test request: Rajesh → ${testCourse.course_code} [Slot C]`);
      console.log(`   Faculty ID: ${danielFacultyId} (Daniel)`);
      console.log(`   This should now be visible in Daniel's faculty portal`);
    } else {
      console.log('   ❌ No Slot C courses assigned to Daniel');
    }

    console.log('\n🎯 DIAGNOSIS SUMMARY:');
    console.log('   1. Check if Rajesh\'s request has correct faculty_id');
    console.log('   2. Verify course-faculty assignments in Slot C');
    console.log('   3. Ensure enrollment request API uses correct faculty_id');
    console.log('   4. Test with the newly created request');

  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await connection.end();
  }
}

debugRajeshEnrollment();