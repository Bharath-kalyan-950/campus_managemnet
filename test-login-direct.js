const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function testLogin() {
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

    // Test the exact query from auth.js
    console.log('\n🧪 Testing login query for john.doe@simats.edu...');
    
    const [users] = await connection.execute(`
      SELECT u.*, s.student_id, f.faculty_id 
      FROM users u 
      LEFT JOIN students s ON u.id = s.user_id 
      LEFT JOIN faculty f ON u.id = f.user_id 
      WHERE u.email = ?
    `, ['john.doe@simats.edu']);

    if (users.length === 0) {
      console.log('❌ No user found with email john.doe@simats.edu');
      return;
    }

    const user = users[0];
    console.log('✅ User found:', {
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      student_id: user.student_id,
      faculty_id: user.faculty_id
    });

    // Test password verification
    console.log('\n🔐 Testing password verification...');
    const testPassword = 'password';
    const isValidPassword = await bcrypt.compare(testPassword, user.password);
    
    if (isValidPassword) {
      console.log('✅ Password verification successful');
    } else {
      console.log('❌ Password verification failed');
      
      // Check what the actual password hash should be
      console.log('🔧 Generating correct hash for "password"...');
      const correctHash = await bcrypt.hash('password', 12);
      console.log('New hash:', correctHash);
      
      // Update the password in database
      await connection.execute(`
        UPDATE users SET password = ? WHERE email = ?
      `, [correctHash, 'john.doe@simats.edu']);
      
      console.log('✅ Password updated in database');
    }

    // Test the complete login flow
    console.log('\n🚀 Testing complete login flow...');
    
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'john.doe@simats.edu',
        password: 'password'
      })
    });

    const loginData = await loginResponse.json();
    
    if (loginData.success) {
      console.log('✅ API login successful:', loginData.user);
    } else {
      console.log('❌ API login failed:', loginData.message);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testLogin();