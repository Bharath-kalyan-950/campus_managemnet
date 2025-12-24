const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function debugRajeshStudentPortal() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    console.log('\n🔍 Debugging Rajesh Student Portal Data:');
    console.log('='.repeat(70));

    // Check what the student enrollment API would return for Rajesh
    console.log('\n1️⃣ Testing Student Enrollment Requests API:');
    const studentRequests = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        er.course_code,
        c.course_name,
        er.slot,
        er.status,
        er.request_date,
        CONCAT(uf.first_name, ' ', uf.last_name) as faculty_name
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN faculty f ON er.faculty_id = f.faculty_id
      JOIN users uf ON f.user_id = uf.id
      WHERE er.student_id = 'STU2024002'
      ORDER BY er.request_date DESC
    `);

    console.log(`📋 Enrollment Requests for Rajesh (STU2024002): ${studentRequests[0].length}`);
    studentRequests[0].forEach(req => {
      console.log(`  ${req.course_code} - ${req.course_name} - Status: ${req.status}`);
      console.log(`    Faculty: ${req.faculty_name} | Slot: ${req.slot} | Date: ${req.request_date}`);
    });

    // Check what the enrollment slots API would return for Rajesh
    console.log('\n2️⃣ Testing Enrollment Slots API (Slot B):');
    const slotsQuery = `
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        COALESCE(pending_requests.pending_count, 0) as pending_requests,
        (c.max_capacity - c.current_enrolled - COALESCE(pending_requests.pending_count, 0)) as available_slots,
        c.faculty_id,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
        CASE 
          WHEN e.student_id IS NOT NULL AND e.status = 'enrolled' THEN 'enrolled'
          WHEN er.student_id IS NOT NULL THEN er.status
          ELSE 'available'
        END as enrollment_status
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.student_id = 'STU2024002' AND e.status = 'enrolled'
      LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.student_id = 'STU2024002' AND er.status = 'pending'
      LEFT JOIN (
        SELECT course_code, COUNT(*) as pending_count
        FROM enrollment_requests 
        WHERE status = 'pending'
        GROUP BY course_code
      ) pending_requests ON c.course_code = pending_requests.course_code
      WHERE c.slot = 'B' AND c.faculty_id IS NOT NULL
      ORDER BY c.course_code
    `;

    const slotsResult = await connection.execute(slotsQuery);
    
    console.log(`📚 Courses in Slot B for Rajesh: ${slotsResult[0].length}`);
    slotsResult[0].forEach(course => {
      console.log(`  ${course.course_code} - ${course.course_name}`);
      console.log(`    Faculty: ${course.faculty_name}`);
      console.log(`    Enrollment Status: ${course.enrollment_status}`);
      console.log(`    Available Slots: ${course.available_slots}`);
    });

    // Check what the student courses API would return for Rajesh
    console.log('\n3️⃣ Testing Student Courses API:');
    const studentCourses = await connection.execute(`
      SELECT 
        c.course_code, 
        c.course_name, 
        c.credits, 
        c.slot,
        e.status, 
        e.enrollment_date,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name
      FROM enrollments e
      JOIN courses c ON e.course_code = c.course_code
      LEFT JOIN faculty f ON e.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      WHERE e.student_id = 'STU2024002' AND e.status = 'enrolled'
      ORDER BY c.course_code
    `);

    console.log(`📖 Enrolled Courses for Rajesh: ${studentCourses[0].length}`);
    if (studentCourses[0].length > 0) {
      studentCourses[0].forEach(course => {
        console.log(`  ${course.course_code} - ${course.course_name} - Status: ${course.status}`);
      });
    } else {
      console.log('  No enrolled courses found');
    }

    console.log('\n📊 Summary for Rajesh Student Portal:');
    console.log('='.repeat(70));
    
    const pendingCount = studentRequests[0].filter(req => req.status === 'pending').length;
    const enrolledCount = studentCourses[0].length;
    
    console.log(`✅ Expected Student Portal Display:`);
    console.log(`   - Pending Courses: ${pendingCount} (should show in sidebar)`);
    console.log(`   - Enrolled Courses: ${enrolledCount} (should show in sidebar)`);
    console.log(`   - Course Status: ${slotsResult[0][0]?.enrollment_status || 'unknown'} (should show in course list)`);
    
    if (pendingCount > 0) {
      console.log(`\n🔧 If Rajesh portal shows "Enroll" instead of "Pending":`);
      console.log(`   1. The frontend is not fetching the latest data`);
      console.log(`   2. Browser cache needs to be cleared`);
      console.log(`   3. The student_id in localStorage might be wrong`);
      console.log(`   4. The API calls are not using the correct student_id`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

debugRajeshStudentPortal();