const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function testFacultyLogin() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    console.log('\n🔐 TESTING FACULTY LOGIN DATA RETRIEVAL');
    console.log('=' .repeat(60));

    // Test Daniel's login
    const testEmail = 'daniel@simats.edu';
    console.log(`Testing login for: ${testEmail}`);

    // Check user authentication data
    const [userAuth] = await connection.execute(`
      SELECT id, user_id, email, first_name, last_name, role, status
      FROM users 
      WHERE email = ? AND role = 'faculty'
    `, [testEmail]);

    if (userAuth.length === 0) {
      console.log('❌ User not found in users table');
      return;
    }

    console.log('\n✅ USER AUTHENTICATION DATA:');
    const user = userAuth[0];
    console.log(`   ID: ${user.id}`);
    console.log(`   User ID: ${user.user_id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.first_name} ${user.last_name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Status: ${user.status}`);

    // Check faculty profile data (what the API should return)
    const [facultyProfile] = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        f.faculty_id, f.department, f.designation, f.qualification,
        f.experience_years, f.specialization, f.office_room, f.joining_date
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE u.email = ? AND u.role = 'faculty'
    `, [testEmail]);

    if (facultyProfile.length === 0) {
      console.log('❌ Faculty profile not found - missing faculty table entry');
      return;
    }

    console.log('\n✅ FACULTY PROFILE DATA (API Response):');
    const faculty = facultyProfile[0];
    console.log(`   Name: ${faculty.first_name} ${faculty.last_name}`);
    console.log(`   Email: ${faculty.email}`);
    console.log(`   Phone: ${faculty.phone}`);
    console.log(`   Faculty ID: ${faculty.faculty_id}`);
    console.log(`   Department: ${faculty.department}`);
    console.log(`   Designation: ${faculty.designation}`);
    console.log(`   Qualification: ${faculty.qualification}`);
    console.log(`   Experience: ${faculty.experience_years} years`);
    console.log(`   Specialization: ${faculty.specialization}`);
    console.log(`   Office: ${faculty.office_room}`);
    console.log(`   Joining Date: ${faculty.joining_date}`);

    // Test what the frontend should display
    console.log('\n📱 FRONTEND DISPLAY TEST:');
    console.log(`   Initials: ${faculty.first_name.charAt(0)}${faculty.last_name.charAt(0)}`);
    console.log(`   Full Name: ${faculty.first_name} ${faculty.last_name}`);
    console.log(`   Welcome Message: "Welcome to Faculty Portal, ${faculty.first_name} ${faculty.last_name}"`);

    // Test all faculty users
    console.log('\n👥 ALL FACULTY USERS TEST:');
    console.log('=' .repeat(60));
    const [allFaculty] = await connection.execute(`
      SELECT 
        u.email, u.first_name, u.last_name,
        f.faculty_id, f.department
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE u.role = 'faculty'
      ORDER BY u.email
    `);

    allFaculty.forEach((fac, index) => {
      console.log(`${index + 1}. ${fac.email}`);
      console.log(`   Name: ${fac.first_name} ${fac.last_name}`);
      console.log(`   Initials: ${fac.first_name.charAt(0)}${fac.last_name.charAt(0)}`);
      console.log(`   Faculty ID: ${fac.faculty_id}`);
      console.log(`   Department: ${fac.department}`);
      console.log('');
    });

    console.log('✅ Faculty login data test completed successfully!');

  } catch (error) {
    console.error('❌ Error testing faculty login:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testFacultyLogin();