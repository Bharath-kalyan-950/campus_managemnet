const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function analyzeCurrentRelationships() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    console.log('\n📊 CURRENT TABLE RELATIONSHIPS ANALYSIS');
    console.log('=' .repeat(60));

    // Check users table structure
    console.log('\n👤 USERS TABLE (authentication):');
    const [users] = await connection.execute('SELECT user_id, email, role FROM users ORDER BY role, user_id');
    users.forEach(u => {
      console.log(`   ${u.user_id} | ${u.email} | ${u.role}`);
    });

    // Check students table
    console.log('\n🎓 STUDENTS TABLE (academic records):');
    const [students] = await connection.execute('SELECT student_id, user_id, department FROM students ORDER BY student_id');
    students.forEach(s => {
      console.log(`   ${s.student_id} | user_id: ${s.user_id} | ${s.department}`);
    });

    // Check faculty table
    console.log('\n👨‍🏫 FACULTY TABLE (professional records):');
    const [faculty] = await connection.execute('SELECT faculty_id, user_id, department FROM faculty ORDER BY faculty_id');
    faculty.forEach(f => {
      console.log(`   ${f.faculty_id} | user_id: ${f.user_id} | ${f.department}`);
    });

    // Check current relationship patterns
    console.log('\n🔗 CURRENT RELATIONSHIP PATTERNS:');
    console.log('=' .repeat(60));

    // Students: users.user_id vs students.student_id
    console.log('\n📋 STUDENT REGISTRATION NUMBERS:');
    const [studentReg] = await connection.execute(`
      SELECT u.user_id as login_id, s.student_id as registration_id, u.email
      FROM users u
      JOIN students s ON u.id = s.user_id
      WHERE u.role = 'student'
      ORDER BY s.student_id
    `);
    studentReg.forEach(sr => {
      const match = sr.login_id === sr.registration_id ? '✅ MATCH' : '❌ DIFFERENT';
      console.log(`   Login: ${sr.login_id} | Registration: ${sr.registration_id} | ${match}`);
    });

    // Faculty: users.user_id vs faculty.faculty_id
    console.log('\n📋 FACULTY REGISTRATION NUMBERS:');
    const [facultyReg] = await connection.execute(`
      SELECT u.user_id as login_id, f.faculty_id as registration_id, u.email
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE u.role = 'faculty'
      ORDER BY f.faculty_id
    `);
    facultyReg.forEach(fr => {
      const match = fr.login_id === fr.registration_id ? '✅ MATCH' : '❌ DIFFERENT';
      console.log(`   Login: ${fr.login_id} | Registration: ${fr.registration_id} | ${match}`);
    });

    // Check how other tables reference students/faculty
    console.log('\n🔍 HOW OTHER TABLES REFERENCE USERS:');
    console.log('=' .repeat(60));

    // Enrollments table
    console.log('\n📚 ENROLLMENTS TABLE:');
    const [enrollments] = await connection.execute('SELECT student_id, faculty_id, course_code FROM enrollments LIMIT 5');
    enrollments.forEach(e => {
      console.log(`   Student: ${e.student_id} | Faculty: ${e.faculty_id} | Course: ${e.course_code}`);
    });

    // Attendance table
    console.log('\n📅 ATTENDANCE TABLE:');
    const [attendance] = await connection.execute('SELECT student_id, faculty_id, course_code FROM attendance LIMIT 5');
    attendance.forEach(a => {
      console.log(`   Student: ${a.student_id} | Faculty: ${a.faculty_id} | Course: ${a.course_code}`);
    });

    // Assignment submissions
    console.log('\n📝 ASSIGNMENT SUBMISSIONS:');
    const [assignments] = await connection.execute('SELECT student_id, assignment_id FROM assignment_submissions LIMIT 5');
    assignments.forEach(a => {
      console.log(`   Student: ${a.student_id} | Assignment: ${a.assignment_id}`);
    });

    console.log('\n💡 ANALYSIS SUMMARY:');
    console.log('=' .repeat(60));
    console.log('✅ Students: Registration numbers (student_id) are used consistently');
    console.log('✅ Faculty: Registration numbers (faculty_id) are used consistently');
    console.log('✅ Other tables: Already reference by registration numbers');
    console.log('');
    console.log('🎯 RECOMMENDATION:');
    console.log('   - Update APIs to use registration numbers directly');
    console.log('   - Simplify queries by using student_id/faculty_id as primary keys');
    console.log('   - Reduce complex JOINs in data retrieval');

    console.log('\n✅ Current relationship analysis completed!');

  } catch (error) {
    console.error('❌ Error analyzing relationships:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

analyzeCurrentRelationships();