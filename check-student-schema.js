const mysql = require('mysql2/promise');

async function checkStudentSchema() {
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

    // Check students table structure
    console.log('\n📋 Students Table Structure:');
    const [columns] = await connection.execute(`
      DESCRIBE students
    `);
    
    columns.forEach(col => {
      console.log(`- ${col.Field}: ${col.Type} (${col.Null === 'YES' ? 'NULL' : 'NOT NULL'})`);
    });

    // Check if john.doe has a student record
    console.log('\n🔍 Checking john.doe student record:');
    const [johnUser] = await connection.execute(`
      SELECT * FROM users WHERE email = 'john.doe@simats.edu'
    `);
    
    if (johnUser.length > 0) {
      console.log('✅ User found:', johnUser[0]);
      
      const [johnStudent] = await connection.execute(`
        SELECT * FROM students WHERE user_id = ?
      `, [johnUser[0].id]);
      
      if (johnStudent.length > 0) {
        console.log('✅ Student record found:', johnStudent[0]);
      } else {
        console.log('❌ No student record found for john.doe');
        console.log('🔧 Creating student record...');
        
        // Create student record for john.doe
        await connection.execute(`
          INSERT INTO students (user_id, student_id, department, year, semester, cgpa)
          VALUES (?, 'STU2024001', 'Computer Science', 2, 3, 8.5)
        `, [johnUser[0].id]);
        
        console.log('✅ Student record created for john.doe');
      }
    } else {
      console.log('❌ john.doe user not found');
    }

    // Check all student records
    console.log('\n👨‍🎓 All Student Records:');
    const [allStudents] = await connection.execute(`
      SELECT u.email, u.first_name, u.last_name, s.student_id, s.department, s.year, s.semester
      FROM users u
      JOIN students s ON u.id = s.user_id
      WHERE u.role = 'student'
      ORDER BY u.email
    `);
    
    allStudents.forEach(student => {
      console.log(`- ${student.email} | ${student.first_name} ${student.last_name} | ${student.student_id} | ${student.department}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkStudentSchema();