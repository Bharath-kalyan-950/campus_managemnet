const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function addRajeshStudent() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    // Add Rajesh Kumar as a user
    await connection.execute(`
      INSERT IGNORE INTO users (id, user_id, first_name, last_name, email, password, role, created_at) 
      VALUES (4, 'STU002', 'Rajesh', 'Kumar', 'rajesh.kumar@simats.edu', '$2a$12$LQv3c1yqBwEHxE6FxTjCreCMSMhUpUsOeL/owcrsgHQQvUdCRKUU2', 'student', NOW())
    `);

    // Add Rajesh Kumar as a student
    await connection.execute(`
      INSERT IGNORE INTO students (student_id, user_id, department, year, semester, batch, cgpa, total_credits, admission_date) 
      VALUES ('STU2024002', 4, 'Computer Science', 2, 3, '2023-2027', 8.50, 90, '2023-08-01')
    `);

    // Update the course to have the correct faculty_id and slot
    await connection.execute(`
      UPDATE courses 
      SET faculty_id = 'FAC2024001', slot = 'B', max_capacity = 30, current_enrolled = 0
      WHERE course_code = 'UBA0123'
    `);

    // Verify the setup
    const users = await connection.execute('SELECT * FROM users WHERE role = "student"');
    const students = await connection.execute('SELECT * FROM students');
    const courses = await connection.execute('SELECT * FROM courses WHERE course_code = "UBA0123"');

    console.log('\n✅ Setup Complete:');
    console.log(`👥 Student Users: ${users[0].length}`);
    users[0].forEach(user => {
      console.log(`   ${user.first_name} ${user.last_name} (${user.email})`);
    });

    console.log(`🎓 Student Records: ${students[0].length}`);
    students[0].forEach(student => {
      console.log(`   ${student.student_id} - Department: ${student.department}`);
    });

    console.log(`📚 Course UBA0123:`);
    if (courses[0].length > 0) {
      const course = courses[0][0];
      console.log(`   Name: ${course.course_name}`);
      console.log(`   Faculty: ${course.faculty_id}`);
      console.log(`   Slot: ${course.slot}`);
      console.log(`   Capacity: ${course.current_enrolled}/${course.max_capacity}`);
    }

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

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

addRajeshStudent();