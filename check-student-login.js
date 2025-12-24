const mysql = require('mysql2/promise');

async function checkStudentLogin() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });

    console.log('✓ Connected to MySQL database');

    // Check all users
    console.log('\n📋 All Users in Database:');
    const [users] = await connection.execute(`
      SELECT id, email, first_name, last_name, role, created_at 
      FROM users 
      ORDER BY role, email
    `);
    
    users.forEach(user => {
      console.log(`${user.role.toUpperCase()}: ${user.email} - ${user.first_name} ${user.last_name}`);
    });

    // Check students specifically
    console.log('\n👨‍🎓 Student Users with Student Records:');
    const [students] = await connection.execute(`
      SELECT u.email, u.first_name, u.last_name, s.student_id, s.registration_number, s.department
      FROM users u
      JOIN students s ON u.id = s.user_id
      ORDER BY u.email
    `);
    
    students.forEach(student => {
      console.log(`- ${student.email} | ${student.first_name} ${student.last_name} | ${student.student_id} | ${student.registration_number} | ${student.department}`);
    });

    // Check if john.doe exists
    console.log('\n🔍 Checking for john.doe@simats.edu:');
    const [johnDoe] = await connection.execute(`
      SELECT * FROM users WHERE email = 'john.doe@simats.edu'
    `);
    
    if (johnDoe.length > 0) {
      console.log('✅ john.doe@simats.edu exists:', johnDoe[0]);
    } else {
      console.log('❌ john.doe@simats.edu NOT FOUND');
      console.log('💡 Use one of these student emails instead:');
      students.slice(0, 3).forEach(student => {
        console.log(`   - ${student.email}`);
      });
    }

    // Test login for first student
    if (students.length > 0) {
      const testStudent = students[0];
      console.log(`\n🧪 Testing login for: ${testStudent.email}`);
      
      const [loginTest] = await connection.execute(`
        SELECT u.*, s.student_id, s.registration_number 
        FROM users u
        LEFT JOIN students s ON u.id = s.user_id
        WHERE u.email = ? AND u.role = 'student'
      `, [testStudent.email]);
      
      if (loginTest.length > 0) {
        console.log('✅ Login test successful for:', testStudent.email);
        console.log('   Student ID:', loginTest[0].student_id);
        console.log('   Registration:', loginTest[0].registration_number);
      } else {
        console.log('❌ Login test failed for:', testStudent.email);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkStudentLogin();