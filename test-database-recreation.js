const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function testDatabaseRecreation() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    // Test 1: Check users
    console.log('\n1️⃣ Testing Users Table:');
    const [users] = await connection.execute('SELECT id, user_id, first_name, last_name, email, role FROM users ORDER BY id');
    users.forEach(user => {
      console.log(`   ${user.id}: ${user.first_name} ${user.last_name} (${user.user_id}) - ${user.email} [${user.role}]`);
    });

    // Test 2: Check students
    console.log('\n2️⃣ Testing Students Table:');
    const [students] = await connection.execute(`
      SELECT s.student_id, s.user_id, CONCAT(u.first_name, ' ', u.last_name) as name, s.department 
      FROM students s 
      JOIN users u ON s.user_id = u.id 
      ORDER BY s.student_id
    `);
    students.forEach(student => {
      console.log(`   ${student.student_id}: ${student.name} (user_id: ${student.user_id}) - ${student.department}`);
    });

    // Test 3: Check faculty
    console.log('\n3️⃣ Testing Faculty Table:');
    const [faculty] = await connection.execute(`
      SELECT f.faculty_id, f.user_id, CONCAT(u.first_name, ' ', u.last_name) as name, f.department 
      FROM faculty f 
      JOIN users u ON f.user_id = u.id 
      ORDER BY f.faculty_id
    `);
    faculty.forEach(fac => {
      console.log(`   ${fac.faculty_id}: ${fac.name} (user_id: ${fac.user_id}) - ${fac.department}`);
    });

    // Test 4: Check courses with slots
    console.log('\n4️⃣ Testing Courses with Slots:');
    const [courses] = await connection.execute(`
      SELECT course_code, course_name, slot, max_capacity, current_enrolled, faculty_id 
      FROM courses 
      WHERE slot IS NOT NULL 
      ORDER BY slot, course_code
    `);
    courses.forEach(course => {
      console.log(`   ${course.course_code}: ${course.course_name} (Slot ${course.slot}) - ${course.current_enrolled}/${course.max_capacity} - Faculty: ${course.faculty_id}`);
    });

    // Test 5: Check enrollment requests
    console.log('\n5️⃣ Testing Enrollment Requests:');
    const [requests] = await connection.execute(`
      SELECT er.request_id, er.student_id, er.course_code, er.status, er.request_date
      FROM enrollment_requests er 
      ORDER BY er.request_date DESC
      LIMIT 5
    `);
    if (requests.length > 0) {
      requests.forEach(req => {
        console.log(`   ${req.request_id}: ${req.student_id} → ${req.course_code} [${req.status}] (${req.request_date})`);
      });
    } else {
      console.log('   No enrollment requests found');
    }

    // Test 6: Check classroom allocation tables
    console.log('\n6️⃣ Testing Classroom Allocation System:');
    const [classrooms] = await connection.execute('SELECT COUNT(*) as count FROM classrooms');
    const [allocRequests] = await connection.execute('SELECT COUNT(*) as count FROM allocation_requests');
    const [allocations] = await connection.execute('SELECT COUNT(*) as count FROM classroom_allocations');
    console.log(`   Classrooms: ${classrooms[0].count}`);
    console.log(`   Allocation Requests: ${allocRequests[0].count}`);
    console.log(`   Allocations: ${allocations[0].count}`);

    // Test 7: Test student profile query (the one that was causing issues)
    console.log('\n7️⃣ Testing Student Profile Query (Fixed):');
    const [johnProfile] = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        s.student_id, s.department, s.year, s.semester, s.batch,
        s.cgpa, s.total_credits
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.student_id = ?
    `, ['STU2024001']);
    
    if (johnProfile.length > 0) {
      const profile = johnProfile[0];
      console.log(`   John Doe Profile: ${profile.first_name} ${profile.last_name} (${profile.student_id})`);
      console.log(`   Email: ${profile.email}, Department: ${profile.department}, CGPA: ${profile.cgpa}`);
    }

    const [rajeshProfile] = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        s.student_id, s.department, s.year, s.semester, s.batch,
        s.cgpa, s.total_credits
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.student_id = ?
    `, ['STU2024002']);
    
    if (rajeshProfile.length > 0) {
      const profile = rajeshProfile[0];
      console.log(`   Rajesh Kumar Profile: ${profile.first_name} ${profile.last_name} (${profile.student_id})`);
      console.log(`   Email: ${profile.email}, Department: ${profile.department}, CGPA: ${profile.cgpa}`);
    }

    console.log('\n✅ Database Recreation Test Complete!');
    console.log('\n🔑 LOGIN CREDENTIALS:');
    console.log('='.repeat(50));
    console.log('🎓 John Doe:');
    console.log('   Email: john.doe@simats.edu');
    console.log('   Password: password');
    console.log('');
    console.log('🎓 Rajesh Kumar:');
    console.log('   Email: rajesh.kumar@simats.edu');
    console.log('   Password: password');
    console.log('');
    console.log('👨‍🏫 Faculty (Daniel):');
    console.log('   Email: daniel@simats.edu');
    console.log('   Password: password');
    console.log('='.repeat(50));

    console.log('\n🚀 NEXT STEPS:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Test login with Rajesh Kumar credentials');
    console.log('3. Verify enrollment requests show correct student names');
    console.log('4. Test the complete enrollment workflow');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

testDatabaseRecreation();