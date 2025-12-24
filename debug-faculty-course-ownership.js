const mysql = require('mysql2/promise');

async function debugFacultyCourseOwnership() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  console.log('🔍 Debugging Faculty Course Ownership Issue\n');

  try {
    const danielFacultyId = 'FAC2024001';

    // 1. Check which courses Daniel actually created/owns
    console.log('1️⃣ Courses Owned by Daniel (FAC2024001):');
    const [danielCourses] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.faculty_id,
        c.max_capacity,
        c.current_enrolled,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      WHERE c.faculty_id = ?
      ORDER BY c.slot, c.course_code
    `, [danielFacultyId]);

    if (danielCourses.length === 0) {
      console.log('   ❌ No courses assigned to Daniel');
    } else {
      console.log(`   ✅ Daniel owns ${danielCourses.length} courses:`);
      danielCourses.forEach(course => {
        console.log(`   📚 ${course.course_code} - ${course.course_name} [Slot ${course.slot}]`);
        console.log(`      Faculty: ${course.faculty_name} (${course.faculty_id})`);
        console.log(`      Capacity: ${course.current_enrolled}/${course.max_capacity}`);
      });
    }

    // 2. Check enrollment requests for Daniel's courses
    console.log('\n2️⃣ Enrollment Requests for Daniel\'s Courses:');
    const [enrollmentRequests] = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        c.course_name,
        er.slot,
        er.faculty_id,
        er.status,
        er.request_date,
        -- Check if course faculty matches request faculty
        CASE 
          WHEN c.faculty_id = er.faculty_id THEN 'MATCH'
          ELSE 'MISMATCH'
        END as faculty_match
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE c.faculty_id = ? OR er.faculty_id = ?
      ORDER BY er.request_date DESC
    `, [danielFacultyId, danielFacultyId]);

    if (enrollmentRequests.length === 0) {
      console.log('   ❌ No enrollment requests found for Daniel\'s courses');
    } else {
      console.log(`   Found ${enrollmentRequests.length} enrollment requests:`);
      enrollmentRequests.forEach(req => {
        const statusIcon = req.status === 'pending' ? '⏳' : req.status === 'approved' ? '✅' : '❌';
        const matchIcon = req.faculty_match === 'MATCH' ? '✅' : '❌';
        console.log(`   ${statusIcon} ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.course_name} [Slot ${req.slot}]`);
        console.log(`      Request Faculty: ${req.faculty_id}, Faculty Match: ${matchIcon} ${req.faculty_match}`);
        console.log(`      Status: ${req.status.toUpperCase()}, Date: ${new Date(req.request_date).toLocaleString()}`);
        console.log('');
      });
    }

    // 3. Check if there are courses with wrong faculty assignments
    console.log('3️⃣ All Courses and Their Faculty Assignments:');
    const [allCourses] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.faculty_id,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
        u.email as faculty_email
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      WHERE c.slot IS NOT NULL
      ORDER BY c.slot, c.course_code
    `);

    const coursesBySlot = {};
    allCourses.forEach(course => {
      if (!coursesBySlot[course.slot]) {
        coursesBySlot[course.slot] = [];
      }
      coursesBySlot[course.slot].push(course);
    });

    Object.keys(coursesBySlot).sort().forEach(slot => {
      console.log(`\n   📍 Slot ${slot}:`);
      coursesBySlot[slot].forEach(course => {
        const isDaniel = course.faculty_id === danielFacultyId ? '✅' : '❌';
        console.log(`     ${isDaniel} ${course.course_code} - ${course.course_name}`);
        console.log(`        Faculty: ${course.faculty_name || 'Not assigned'} (${course.faculty_id || 'No ID'})`);
        console.log(`        Email: ${course.faculty_email || 'No email'}`);
      });
    });

    // 4. Check what the enrollment API should return for students
    console.log('\n4️⃣ Student Enrollment View (What Students Should See):');
    const testStudentId = 'STU2024002'; // Rajesh
    
    for (const slot of ['A', 'B', 'C']) {
      const [studentView] = await connection.execute(`
        SELECT 
          c.course_code,
          c.course_name,
          c.slot,
          c.faculty_id,
          CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
          c.max_capacity,
          c.current_enrolled,
          (c.max_capacity - c.current_enrolled) as available_slots,
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
        WHERE c.slot = ? AND c.faculty_id IS NOT NULL
        ORDER BY c.course_code
      `, [testStudentId, testStudentId, slot]);

      console.log(`\n   📍 Slot ${slot} (Student ${testStudentId} view):`);
      if (studentView.length === 0) {
        console.log('     ❌ No courses available');
      } else {
        studentView.forEach(course => {
          const statusIcon = course.enrollment_status === 'enrolled' ? '✅' : 
                            course.enrollment_status === 'pending' ? '⏳' : '📚';
          const isDaniel = course.faculty_id === danielFacultyId ? '✅' : '❌';
          console.log(`     ${statusIcon} ${course.course_code} - ${course.course_name} (${course.enrollment_status})`);
          console.log(`        Faculty: ${course.faculty_name} (${course.faculty_id}) ${isDaniel}`);
          console.log(`        Available: ${course.available_slots}/${course.max_capacity}`);
        });
      }
    }

    // 5. Test the faculty approval API query
    console.log('\n5️⃣ Faculty Approval API Query Test:');
    const [apiTest] = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        c.course_name,
        er.slot,
        er.faculty_id,
        er.status
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.faculty_id = ? AND er.status = 'pending'
      ORDER BY er.request_date DESC
    `, [danielFacultyId]);

    console.log(`   API should return ${apiTest.length} pending requests for Daniel:`);
    if (apiTest.length === 0) {
      console.log('     ❌ No pending requests (this explains why faculty portal is empty)');
    } else {
      apiTest.forEach(req => {
        console.log(`     📝 ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.course_name} [Slot ${req.slot}]`);
      });
    }

    console.log('\n🎯 DIAGNOSIS:');
    console.log('   1. Check if courses have correct faculty_id assignments');
    console.log('   2. Check if enrollment requests use correct faculty_id');
    console.log('   3. Verify course creation process assigns correct faculty_id');
    console.log('   4. Ensure enrollment request creation uses course.faculty_id');

  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await connection.end();
  }
}

debugFacultyCourseOwnership();