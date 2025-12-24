const mysql = require('mysql2/promise');

async function checkAllStudents() {
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

    // Check all student accounts
    console.log('\n👨‍🎓 All Available Student Accounts:');
    const [students] = await connection.execute(`
      SELECT u.email, u.first_name, u.last_name, u.role, s.student_id, s.department
      FROM users u
      LEFT JOIN students s ON u.id = s.user_id
      WHERE u.role = 'student'
      ORDER BY u.email
    `);
    
    console.log(`Found ${students.length} student accounts:\n`);
    
    students.forEach((student, index) => {
      console.log(`${index + 1}. Email: ${student.email}`);
      console.log(`   Name: ${student.first_name} ${student.last_name}`);
      console.log(`   Student ID: ${student.student_id || 'NOT SET'}`);
      console.log(`   Department: ${student.department || 'NOT SET'}`);
      console.log(`   Password: password`);
      console.log('');
    });

    // Check if we have the students mentioned in the credentials file
    const expectedStudents = [
      'rajesh.kumar@simats.edu',
      'priya.sharma@simats.edu',
      'arjun.reddy@simats.edu'
    ];

    console.log('🔍 Checking for expected students from credentials file:');
    for (const email of expectedStudents) {
      const [found] = await connection.execute(`
        SELECT email, first_name, last_name FROM users WHERE email = ?
      `, [email]);
      
      if (found.length > 0) {
        console.log(`✅ ${email} - ${found[0].first_name} ${found[0].last_name}`);
      } else {
        console.log(`❌ ${email} - NOT FOUND`);
      }
    }

    // Recommend which account to use
    console.log('\n💡 RECOMMENDED LOGIN CREDENTIALS:');
    if (students.length > 0) {
      const firstStudent = students[0];
      console.log(`📧 Email: ${firstStudent.email}`);
      console.log(`🔑 Password: password`);
      console.log(`👤 Name: ${firstStudent.first_name} ${firstStudent.last_name}`);
      console.log(`🆔 Student ID: ${firstStudent.student_id}`);
    } else {
      console.log('❌ No student accounts found in database');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkAllStudents();