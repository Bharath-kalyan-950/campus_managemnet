const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function checkUserStudentMapping() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    console.log('\n🔍 CHECKING USER-STUDENT MAPPING');
    console.log('=' .repeat(60));

    // Check users with student role
    const [studentUsers] = await connection.execute(`
      SELECT id, user_id, email, first_name, last_name, role 
      FROM users 
      WHERE role = 'student'
      ORDER BY user_id
    `);

    console.log(`📊 Found ${studentUsers.length} users with 'student' role:`);
    studentUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.first_name} ${user.last_name} (${user.email}) - User ID: ${user.user_id}`);
    });

    // Check students table
    const [studentsTable] = await connection.execute(`
      SELECT student_id, user_id, department, year, semester, cgpa
      FROM students
      ORDER BY student_id
    `);

    console.log(`\n📚 Found ${studentsTable.length} entries in students table:`);
    studentsTable.forEach((student, index) => {
      console.log(`${index + 1}. Student ID: ${student.student_id} - User ID: ${student.user_id} - ${student.department}`);
    });

    // Check for missing mappings
    console.log('\n🔗 CHECKING MAPPING CONSISTENCY');
    console.log('=' .repeat(60));

    // Find student users without student table entries
    const [unmappedUsers] = await connection.execute(`
      SELECT u.id, u.user_id, u.email, u.first_name, u.last_name
      FROM users u
      LEFT JOIN students s ON u.id = s.user_id
      WHERE u.role = 'student' AND s.user_id IS NULL
    `);

    if (unmappedUsers.length > 0) {
      console.log(`❌ Found ${unmappedUsers.length} student users WITHOUT entries in students table:`);
      unmappedUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.first_name} ${user.last_name} (${user.email}) - Missing student record!`);
      });
    } else {
      console.log('✅ All student users have corresponding entries in students table');
    }

    // Find student table entries without user records
    const [orphanedStudents] = await connection.execute(`
      SELECT s.student_id, s.user_id, s.department
      FROM students s
      LEFT JOIN users u ON s.user_id = u.id
      WHERE u.id IS NULL
    `);

    if (orphanedStudents.length > 0) {
      console.log(`❌ Found ${orphanedStudents.length} student records WITHOUT user accounts:`);
      orphanedStudents.forEach((student, index) => {
        console.log(`${index + 1}. Student ID: ${student.student_id} - Missing user account!`);
      });
    } else {
      console.log('✅ All student records have corresponding user accounts');
    }

    // Show complete mapping
    console.log('\n📋 COMPLETE USER-STUDENT MAPPING');
    console.log('=' .repeat(60));
    const [completeMapping] = await connection.execute(`
      SELECT u.user_id, u.email, u.first_name, u.last_name, u.role,
             s.student_id, s.department, s.year, s.semester, s.cgpa
      FROM users u
      LEFT JOIN students s ON u.id = s.user_id
      WHERE u.role = 'student'
      ORDER BY u.user_id
    `);

    completeMapping.forEach((mapping, index) => {
      const status = mapping.student_id ? '✅' : '❌';
      console.log(`${index + 1}. ${status} ${mapping.first_name} ${mapping.last_name}`);
      console.log(`   📧 Email: ${mapping.email}`);
      console.log(`   🆔 User ID: ${mapping.user_id}`);
      if (mapping.student_id) {
        console.log(`   🎓 Student ID: ${mapping.student_id}`);
        console.log(`   🏫 Department: ${mapping.department}`);
        console.log(`   📊 CGPA: ${mapping.cgpa}`);
      } else {
        console.log(`   ❌ NO STUDENT RECORD FOUND!`);
      }
      console.log('');
    });

    // Check if we can login and retrieve data
    console.log('\n🔐 LOGIN DATA RETRIEVAL TEST');
    console.log('=' .repeat(60));
    
    const testEmail = 'rajesh.kumar@simats.edu';
    const [loginTest] = await connection.execute(`
      SELECT u.first_name, u.last_name, u.email, u.phone,
             s.student_id, s.department, s.year, s.semester, s.batch,
             s.cgpa, s.total_credits, s.guardian_name, s.guardian_phone, s.address
      FROM users u
      JOIN students s ON u.id = s.user_id
      WHERE u.email = ? AND u.role = 'student'
    `, [testEmail]);

    if (loginTest.length > 0) {
      const student = loginTest[0];
      console.log(`✅ Login test successful for ${testEmail}:`);
      console.log(`   Name: ${student.first_name} ${student.last_name}`);
      console.log(`   Student ID: ${student.student_id}`);
      console.log(`   Department: ${student.department}`);
      console.log(`   CGPA: ${student.cgpa}`);
      console.log(`   Guardian: ${student.guardian_name}`);
    } else {
      console.log(`❌ Login test failed for ${testEmail} - No data found!`);
    }

    console.log('\n✅ User-Student mapping verification completed!');

  } catch (error) {
    console.error('❌ Error checking user-student mapping:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkUserStudentMapping();