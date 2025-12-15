const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

const JWT_SECRET = 'your-secret-key-change-in-production';

async function debugFacultyAPI() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    console.log('\n🔍 DEBUGGING FACULTY API ISSUE');
    console.log('=' .repeat(60));

    const testEmail = 'daniel@simats.edu';
    const testPassword = 'password';

    // Step 1: Test login query (what authenticateUser does)
    console.log('\n1️⃣ TESTING LOGIN QUERY');
    console.log('=' .repeat(40));
    
    const [loginUsers] = await connection.execute(`
      SELECT u.*, s.student_id, f.faculty_id 
      FROM users u 
      LEFT JOIN students s ON u.id = s.user_id 
      LEFT JOIN faculty f ON u.id = f.user_id 
      WHERE u.email = ?
    `, [testEmail]);

    if (loginUsers.length === 0) {
      console.log('❌ User not found in login query');
      return;
    }

    const user = loginUsers[0];
    console.log('✅ Login query result:');
    console.log(`   User ID (database): ${user.id}`);
    console.log(`   User ID (custom): ${user.user_id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Faculty ID: ${user.faculty_id}`);
    console.log(`   Student ID: ${user.student_id}`);

    // Step 2: Verify password
    console.log('\n2️⃣ TESTING PASSWORD VERIFICATION');
    console.log('=' .repeat(40));
    
    const isValidPassword = await bcrypt.compare(testPassword, user.password);
    console.log(`✅ Password valid: ${isValidPassword}`);

    // Step 3: Generate JWT token (what login API does)
    console.log('\n3️⃣ TESTING JWT TOKEN GENERATION');
    console.log('=' .repeat(40));
    
    const tokenPayload = {
      id: user.id,
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      student_id: user.student_id,
      faculty_id: user.faculty_id
    };
    
    console.log('Token payload:', tokenPayload);
    
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' });
    console.log(`✅ JWT Token generated: ${token.substring(0, 50)}...`);

    // Step 4: Verify JWT token (what profile API does)
    console.log('\n4️⃣ TESTING JWT TOKEN VERIFICATION');
    console.log('=' .repeat(40));
    
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('✅ Decoded token:', decoded);

    // Step 5: Test profile query (what faculty profile API does)
    console.log('\n5️⃣ TESTING FACULTY PROFILE QUERY');
    console.log('=' .repeat(40));
    
    console.log(`Looking for faculty_id: ${decoded.faculty_id}`);
    
    const [profileResult] = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        f.faculty_id, f.department, f.designation, f.qualification,
        f.experience_years, f.specialization, f.office_room, f.joining_date
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE f.faculty_id = ?
    `, [decoded.faculty_id]);

    if (profileResult.length === 0) {
      console.log('❌ PROFILE NOT FOUND!');
      console.log('   This is the source of the error');
      
      // Let's check what's in the faculty table
      console.log('\n🔍 CHECKING FACULTY TABLE:');
      const [allFaculty] = await connection.execute(`
        SELECT f.faculty_id, f.user_id, u.id as user_table_id, u.email
        FROM faculty f
        JOIN users u ON f.user_id = u.id
        WHERE u.email = ?
      `, [testEmail]);
      
      if (allFaculty.length > 0) {
        console.log('✅ Faculty record exists:');
        console.log(`   Faculty ID: ${allFaculty[0].faculty_id}`);
        console.log(`   User ID (faculty.user_id): ${allFaculty[0].user_id}`);
        console.log(`   User ID (users.id): ${allFaculty[0].user_table_id}`);
        console.log(`   Email: ${allFaculty[0].email}`);
        
        console.log('\n🔧 ISSUE IDENTIFIED:');
        console.log(`   JWT contains faculty_id: ${decoded.faculty_id}`);
        console.log(`   Database has faculty_id: ${allFaculty[0].faculty_id}`);
        
        if (decoded.faculty_id !== allFaculty[0].faculty_id) {
          console.log('❌ MISMATCH! JWT faculty_id does not match database faculty_id');
        }
      } else {
        console.log('❌ No faculty record found for this email');
      }
    } else {
      console.log('✅ Profile query successful:');
      const profile = profileResult[0];
      console.log(`   Name: ${profile.first_name} ${profile.last_name}`);
      console.log(`   Faculty ID: ${profile.faculty_id}`);
      console.log(`   Department: ${profile.department}`);
    }

    // Step 6: Alternative query using user.id instead of faculty_id
    console.log('\n6️⃣ TESTING ALTERNATIVE PROFILE QUERY (using user.id)');
    console.log('=' .repeat(40));
    
    const [altProfileResult] = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        f.faculty_id, f.department, f.designation, f.qualification,
        f.experience_years, f.specialization, f.office_room, f.joining_date
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE u.id = ?
    `, [decoded.id]);

    if (altProfileResult.length > 0) {
      console.log('✅ Alternative query successful:');
      const profile = altProfileResult[0];
      console.log(`   Name: ${profile.first_name} ${profile.last_name}`);
      console.log(`   Faculty ID: ${profile.faculty_id}`);
      console.log(`   Department: ${profile.department}`);
      console.log('\n💡 SOLUTION: Use user.id instead of faculty_id in profile query');
    } else {
      console.log('❌ Alternative query also failed');
    }

    console.log('\n✅ Faculty API debugging completed!');

  } catch (error) {
    console.error('❌ Error debugging faculty API:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

debugFacultyAPI();