const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

const JWT_SECRET = 'your-secret-key-change-in-production';

async function verifyFacultyFix() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    console.log('\n✅ VERIFYING FACULTY PROFILE FIX');
    console.log('=' .repeat(50));

    // Simulate what happens when faculty logs in
    const testEmail = 'daniel@simats.edu';
    
    // Get user data (login simulation)
    const [users] = await connection.execute(`
      SELECT u.*, s.student_id, f.faculty_id 
      FROM users u 
      LEFT JOIN students s ON u.id = s.user_id 
      LEFT JOIN faculty f ON u.id = f.user_id 
      WHERE u.email = ?
    `, [testEmail]);

    const user = users[0];
    console.log('User data from login:', {
      id: user.id,
      email: user.email,
      role: user.role,
      faculty_id: user.faculty_id
    });

    // Create JWT token (what login API does)
    const tokenPayload = {
      id: user.id,
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      student_id: user.student_id,
      faculty_id: user.faculty_id
    };
    
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' });
    const decoded = jwt.verify(token, JWT_SECRET);
    
    console.log('JWT token payload:', {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      faculty_id: decoded.faculty_id
    });

    // Test OLD query (what was causing the error)
    console.log('\n❌ OLD QUERY (using faculty_id):');
    const [oldResult] = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        f.faculty_id, f.department, f.designation, f.qualification
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE f.faculty_id = ?
    `, [decoded.faculty_id]);
    
    console.log(`   Results found: ${oldResult.length}`);
    if (oldResult.length > 0) {
      console.log(`   Name: ${oldResult[0].first_name} ${oldResult[0].last_name}`);
    }

    // Test NEW query (the fix)
    console.log('\n✅ NEW QUERY (using user.id):');
    const [newResult] = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        f.faculty_id, f.department, f.designation, f.qualification
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE u.id = ?
    `, [decoded.id]);
    
    console.log(`   Results found: ${newResult.length}`);
    if (newResult.length > 0) {
      console.log(`   Name: ${newResult[0].first_name} ${newResult[0].last_name}`);
      console.log(`   Faculty ID: ${newResult[0].faculty_id}`);
      console.log(`   Department: ${newResult[0].department}`);
    }

    // Test all faculty users
    console.log('\n👥 TESTING ALL FACULTY USERS:');
    console.log('=' .repeat(50));
    
    const [allFacultyUsers] = await connection.execute(`
      SELECT u.email, u.id, f.faculty_id, u.first_name, u.last_name
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE u.role = 'faculty'
      ORDER BY u.email
    `);

    allFacultyUsers.forEach((fac, index) => {
      console.log(`${index + 1}. ${fac.email}`);
      console.log(`   User ID: ${fac.id} | Faculty ID: ${fac.faculty_id}`);
      console.log(`   Name: ${fac.first_name} ${fac.last_name}`);
      console.log('');
    });

    console.log('✅ Faculty profile fix verification completed!');
    console.log('\n💡 The fix changes the query from:');
    console.log('   WHERE f.faculty_id = ? (using decoded.faculty_id)');
    console.log('   TO:');
    console.log('   WHERE u.id = ? (using decoded.id)');

  } catch (error) {
    console.error('❌ Error verifying faculty fix:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

verifyFacultyFix();