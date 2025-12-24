const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function createMissingStudents() {
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

    // Hash password for all accounts
    const passwordHash = await bcrypt.hash('password', 12);
    console.log('✓ Password hash generated');

    // Students to create (from WORKING_LOGIN_CREDENTIALS.md)
    const studentsToCreate = [
      {
        email: 'rajesh.kumar@simats.edu',
        first_name: 'Rajesh',
        last_name: 'Kumar',
        student_id: 'STU2024002',
        registration: 'SIMATS2021001',
        department: 'Computer Science',
        phone: '9876543211'
      },
      {
        email: 'priya.sharma@simats.edu',
        first_name: 'Priya',
        last_name: 'Sharma',
        student_id: 'STU2024003',
        registration: 'SIMATS2021002',
        department: 'Computer Science',
        phone: '9876543212'
      },
      {
        email: 'arjun.reddy@simats.edu',
        first_name: 'Arjun',
        last_name: 'Reddy',
        student_id: 'STU2024004',
        registration: 'SIMATS2021003',
        department: 'Information Technology',
        phone: '9876543213'
      },
      {
        email: 'sneha.patel@simats.edu',
        first_name: 'Sneha',
        last_name: 'Patel',
        student_id: 'STU2024005',
        registration: 'SIMATS2021004',
        department: 'Electronics',
        phone: '9876543214'
      },
      {
        email: 'karthik.nair@simats.edu',
        first_name: 'Karthik',
        last_name: 'Nair',
        student_id: 'STU2024006',
        registration: 'SIMATS2021005',
        department: 'Mechanical',
        phone: '9876543215'
      }
    ];

    console.log(`\n🔧 Creating ${studentsToCreate.length} student accounts...\n`);

    for (const student of studentsToCreate) {
      try {
        // Check if user already exists
        const [existingUser] = await connection.execute(
          'SELECT id FROM users WHERE email = ?',
          [student.email]
        );

        if (existingUser.length > 0) {
          console.log(`⚠️  User ${student.email} already exists, skipping...`);
          continue;
        }

        // Insert user
        const [userResult] = await connection.execute(`
          INSERT INTO users (user_id, email, password, role, first_name, last_name, phone, status)
          VALUES (?, ?, ?, 'student', ?, ?, ?, 'active')
        `, [student.student_id, student.email, passwordHash, student.first_name, student.last_name, student.phone]);

        const userId = userResult.insertId;

        // Insert student record
        await connection.execute(`
          INSERT INTO students (student_id, user_id, department, year, semester, cgpa, batch)
          VALUES (?, ?, ?, 2, 3, 8.5, 'BATCH-2021')
        `, [student.student_id, userId, student.department]);

        console.log(`✅ Created: ${student.email} - ${student.first_name} ${student.last_name}`);
        console.log(`   Student ID: ${student.student_id}`);
        console.log(`   Department: ${student.department}`);
        console.log(`   Password: password\n`);

      } catch (error) {
        console.log(`❌ Failed to create ${student.email}: ${error.message}`);
      }
    }

    // Verify all students were created
    console.log('📋 Final verification - All student accounts:');
    const [allStudents] = await connection.execute(`
      SELECT u.email, u.first_name, u.last_name, s.student_id, s.department
      FROM users u
      JOIN students s ON u.id = s.user_id
      WHERE u.role = 'student'
      ORDER BY u.email
    `);

    allStudents.forEach((student, index) => {
      console.log(`${index + 1}. ${student.email} - ${student.first_name} ${student.last_name} (${student.student_id})`);
    });

    console.log(`\n✅ Total student accounts: ${allStudents.length}`);
    console.log('\n🎯 You can now login with any of these accounts using password: "password"');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createMissingStudents();