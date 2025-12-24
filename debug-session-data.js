const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function debugSessionData() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    console.log('\n🔍 Debugging Session Data Issue:');
    console.log('='.repeat(70));

    // Check what the latest enrollment request shows
    console.log('\n1️⃣ Latest Enrollment Request:');
    const latestRequest = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        er.status,
        er.request_date,
        TIMESTAMPDIFF(MINUTE, er.request_date, NOW()) as minutes_ago
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.faculty_id = 'FAC2024001'
      ORDER BY er.request_date DESC
      LIMIT 1
    `);

    if (latestRequest[0].length > 0) {
      const req = latestRequest[0][0];
      console.log(`📋 Latest request: ${req.student_name} (${req.student_id})`);
      console.log(`   Course: ${req.course_code} | Status: ${req.status}`);
      console.log(`   Created: ${req.minutes_ago} minutes ago`);
      
      if (req.student_id === 'STU2024001') {
        console.log('❌ PROBLEM: Request is from John Doe (STU2024001)');
        console.log('   This means the enrollment page is using John Doe\'s session data');
      } else if (req.student_id === 'STU2024002') {
        console.log('✅ GOOD: Request is from Rajesh Kumar (STU2024002)');
      }
    } else {
      console.log('📋 No recent requests found');
    }

    console.log('\n2️⃣ User Authentication Data:');
    
    // Check what user data would be returned for different login scenarios
    const johnLogin = await connection.execute(`
      SELECT u.*, s.student_id, f.faculty_id 
      FROM users u 
      LEFT JOIN students s ON u.id = s.user_id 
      LEFT JOIN faculty f ON u.id = f.user_id 
      WHERE u.email = 'john.doe@simats.edu'
    `);

    const rajeshLogin = await connection.execute(`
      SELECT u.*, s.student_id, f.faculty_id 
      FROM users u 
      LEFT JOIN students s ON u.id = s.user_id 
      LEFT JOIN faculty f ON u.id = f.user_id 
      WHERE u.email = 'rajesh.kumar@simats.edu'
    `);

    if (johnLogin[0].length > 0) {
      const user = johnLogin[0][0];
      console.log(`👤 John Doe login data:`);
      console.log(`   User ID: ${user.id} | Student ID: ${user.student_id}`);
      console.log(`   Email: ${user.email} | Role: ${user.role}`);
      console.log(`   Name: ${user.first_name} ${user.last_name}`);
    }

    if (rajeshLogin[0].length > 0) {
      const user = rajeshLogin[0][0];
      console.log(`👤 Rajesh Kumar login data:`);
      console.log(`   User ID: ${user.id} | Student ID: ${user.student_id}`);
      console.log(`   Email: ${user.email} | Role: ${user.role}`);
      console.log(`   Name: ${user.first_name} ${user.last_name}`);
    }

    console.log('\n3️⃣ Profile API Test:');
    
    // Test what the profile API would return for each student
    const johnProfile = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email,
        s.student_id, s.department
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.student_id = 'STU2024001'
    `);

    const rajeshProfile = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email,
        s.student_id, s.department
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.student_id = 'STU2024002'
    `);

    if (johnProfile[0].length > 0) {
      const profile = johnProfile[0][0];
      console.log(`📊 Profile API for STU2024001: ${profile.first_name} ${profile.last_name}`);
    }

    if (rajeshProfile[0].length > 0) {
      const profile = rajeshProfile[0][0];
      console.log(`📊 Profile API for STU2024002: ${profile.first_name} ${profile.last_name}`);
    }

    console.log('\n🔧 SOLUTION STEPS:');
    console.log('='.repeat(70));
    console.log('The issue is that you are still logged in with John Doe\'s session.');
    console.log('Even though the header shows "Rajesh Kumar" (due to profile API fix),');
    console.log('the localStorage still contains John Doe\'s student_id.');
    console.log('');
    console.log('To fix this completely:');
    console.log('1. Open browser Developer Tools (F12)');
    console.log('2. Go to Application tab → Local Storage');
    console.log('3. Find the "user" key and DELETE it');
    console.log('4. Go to Application tab → Cookies');
    console.log('5. Delete the "token" cookie');
    console.log('6. Refresh the page (you should be logged out)');
    console.log('7. Log in again with Rajesh Kumar\'s credentials');
    console.log('8. Now enrollment requests will be sent from Rajesh\'s account');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

debugSessionData();