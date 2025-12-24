const mysql = require('mysql2/promise');

async function debugFrontendAPICalls() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  console.log('🔍 Debugging Frontend API Calls Issue\n');

  try {
    // 1. Check Daniel's user and faculty records
    console.log('1️⃣ Daniel Faculty Account Verification:');
    
    const [danielUser] = await connection.execute(`
      SELECT 
        u.id as user_id,
        u.email,
        u.first_name,
        u.last_name,
        u.role,
        f.faculty_id,
        f.department,
        f.designation
      FROM users u
      LEFT JOIN faculty f ON u.id = f.user_id
      WHERE u.email = 'daniel@simats.edu'
    `);

    if (danielUser.length === 0) {
      console.log('   ❌ Daniel user not found');
    } else {
      const daniel = danielUser[0];
      console.log(`   ✅ User found: ${daniel.first_name} ${daniel.last_name}`);
      console.log(`   📧 Email: ${daniel.email}`);
      console.log(`   👤 Role: ${daniel.role}`);
      console.log(`   🆔 User ID: ${daniel.user_id}`);
      console.log(`   🏫 Faculty ID: ${daniel.faculty_id || 'NOT SET'}`);
      console.log(`   🏢 Department: ${daniel.department || 'NOT SET'}`);
      console.log(`   💼 Designation: ${daniel.designation || 'NOT SET'}`);
    }

    // 2. Check what the login API would return for Daniel
    console.log('\n2️⃣ Login API Response Simulation:');
    
    const [loginData] = await connection.execute(`
      SELECT 
        u.id,
        u.email,
        u.first_name,
        u.last_name,
        u.role,
        f.faculty_id,
        f.department,
        f.designation
      FROM users u
      LEFT JOIN faculty f ON u.id = f.user_id
      WHERE u.email = ? AND u.role = 'faculty'
    `, ['daniel@simats.edu']);

    if (loginData.length > 0) {
      const loginResponse = loginData[0];
      console.log('   ✅ Login would return:');
      console.log(`   {`);
      console.log(`     "id": ${loginResponse.id},`);
      console.log(`     "email": "${loginResponse.email}",`);
      console.log(`     "first_name": "${loginResponse.first_name}",`);
      console.log(`     "last_name": "${loginResponse.last_name}",`);
      console.log(`     "role": "${loginResponse.role}",`);
      console.log(`     "faculty_id": "${loginResponse.faculty_id || 'null'}",`);
      console.log(`     "department": "${loginResponse.department || 'null'}",`);
      console.log(`     "designation": "${loginResponse.designation || 'null'}"`);
      console.log(`   }`);
    }

    // 3. Test the exact API calls the frontend makes
    console.log('\n3️⃣ Testing Frontend API Calls:');
    
    const facultyId = 'FAC2024001';
    
    // Test enrollment requests API
    console.log(`\n   📡 GET /api/enrollment/requests?faculty_id=${facultyId}&status=pending`);
    const [apiRequests] = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        us.email as student_email,
        s.department as student_department,
        s.year as student_year,
        s.semester as student_semester,
        s.cgpa as student_cgpa,
        er.course_code,
        c.course_name,
        er.slot,
        er.faculty_id,
        CONCAT(uf.first_name, ' ', uf.last_name) as faculty_name,
        er.status,
        er.request_date,
        er.faculty_notes,
        er.processed_at,
        c.max_capacity,
        c.current_enrolled,
        (c.max_capacity - c.current_enrolled) as available_slots
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      JOIN faculty f ON er.faculty_id = f.faculty_id
      JOIN users uf ON f.user_id = uf.id
      WHERE er.faculty_id = ? AND er.status = ?
      ORDER BY er.request_date DESC
    `, [facultyId, 'pending']);

    console.log(`   📊 Expected Response: { success: true, data: [...] }`);
    console.log(`   📊 Data Length: ${apiRequests.length} records`);
    
    if (apiRequests.length === 0) {
      console.log('   ❌ API would return empty array - explains "No data available"');
    } else {
      console.log('   ✅ API should return data:');
      apiRequests.forEach((req, index) => {
        console.log(`     ${index + 1}. ${req.student_name} → ${req.course_code} [Slot ${req.slot}]`);
      });
    }

    // Test faculty courses API
    console.log(`\n   📡 GET /api/faculty/courses?faculty_id=${facultyId}`);
    const [apiCourses] = await connection.execute(`
      SELECT 
        c.course_code, 
        c.course_name, 
        c.credits, 
        c.semester, 
        c.year, 
        c.course_type,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        COUNT(e.student_id) as enrolled_students
      FROM courses c
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.faculty_id = ?
      WHERE c.faculty_id = ?
      GROUP BY c.course_code, c.course_name, c.credits, c.semester, c.year, c.course_type, c.slot, c.max_capacity, c.current_enrolled
      ORDER BY c.slot, c.course_code
    `, [facultyId, facultyId]);

    console.log(`   📊 Expected Response: { success: true, data: [...] }`);
    console.log(`   📊 Data Length: ${apiCourses.length} records`);
    
    if (apiCourses.length === 0) {
      console.log('   ❌ API would return empty array - explains empty dropdown');
    } else {
      console.log('   ✅ API should return courses:');
      apiCourses.forEach(course => {
        console.log(`     📚 ${course.course_code} - ${course.course_name} [Slot ${course.slot}]`);
      });
    }

    // 4. Check if there are any authentication issues
    console.log('\n4️⃣ Potential Issues:');
    
    console.log('   🔍 Possible causes for "No data available":');
    console.log('   1. ❓ Faculty ID not being passed correctly from frontend');
    console.log('   2. ❓ Authentication token issues');
    console.log('   3. ❓ API endpoint not being called');
    console.log('   4. ❓ CORS or network issues');
    console.log('   5. ❓ JavaScript errors preventing API calls');

    console.log('\n   🔧 Debug steps for browser:');
    console.log('   1. Open Developer Tools (F12)');
    console.log('   2. Go to Network tab');
    console.log('   3. Refresh the Course Approve page');
    console.log('   4. Look for API calls to /api/enrollment/requests');
    console.log('   5. Check if calls are being made and what responses are');
    console.log('   6. Check Console tab for JavaScript errors');
    console.log('   7. Check Application tab → Local Storage for user data');

    // 5. Create a simple test to verify server is responding
    console.log('\n5️⃣ Server Response Test:');
    console.log('   💡 Try these URLs directly in browser:');
    console.log('   🌐 http://localhost:3000/api/enrollment/requests?faculty_id=FAC2024001&status=pending');
    console.log('   🌐 http://localhost:3000/api/faculty/courses?faculty_id=FAC2024001');
    console.log('   📝 These should return JSON data if server is working');

  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await connection.end();
  }
}

debugFrontendAPICalls();