const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function testRajeshEnrollment() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    console.log('\n🧪 Testing Rajesh Enrollment Request:');
    console.log('='.repeat(60));

    // Clean up any existing pending requests for testing
    await connection.execute(`
      DELETE FROM enrollment_requests 
      WHERE student_id = 'STU2024002' AND status = 'pending'
    `);
    console.log('✅ Cleaned up existing pending requests for Rajesh');

    // Simulate Rajesh sending an enrollment request
    const requestId = `ENR_REQ_${Date.now()}_RAJESH_TEST`;
    const studentId = 'STU2024002'; // Rajesh's ID
    const courseCode = 'UBA0123';
    const facultyId = 'FAC2024001';
    const slot = 'B';

    await connection.execute(`
      INSERT INTO enrollment_requests (request_id, student_id, course_code, faculty_id, slot, status, request_date)
      VALUES (?, ?, ?, ?, ?, 'pending', NOW())
    `, [requestId, studentId, courseCode, facultyId, slot]);

    console.log(`✅ Created enrollment request for Rajesh: ${requestId}`);

    // Verify the request was created correctly
    const verifyQuery = `
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        er.status,
        er.request_date
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.request_id = ?
    `;

    const [verifyResult] = await connection.execute(verifyQuery, [requestId]);
    
    if (verifyResult.length > 0) {
      const req = verifyResult[0];
      console.log('\n📋 Verification - Request Created:');
      console.log(`  Request ID: ${req.request_id}`);
      console.log(`  Student ID: ${req.student_id}`);
      console.log(`  Student Name: ${req.student_name}`);
      console.log(`  Course: ${req.course_code}`);
      console.log(`  Status: ${req.status}`);
      console.log(`  Date: ${req.request_date}`);
    }

    // Test what the faculty portal API would return
    console.log('\n🔍 Faculty Portal API Test:');
    console.log('='.repeat(60));
    
    const facultyApiQuery = `
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        us.email as student_email,
        er.course_code,
        c.course_name,
        er.slot,
        er.status,
        er.request_date
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.faculty_id = 'FAC2024001' AND er.status = 'pending'
      ORDER BY er.request_date DESC
    `;

    const facultyResult = await connection.execute(facultyApiQuery);
    
    console.log(`📊 Faculty Portal would show ${facultyResult[0].length} pending requests:`);
    facultyResult[0].forEach(req => {
      console.log(`  ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.status}`);
      console.log(`    Email: ${req.student_email}`);
      console.log(`    Date: ${req.request_date}`);
    });

    console.log('\n💡 Analysis:');
    console.log('='.repeat(60));
    console.log('If you see "John Doe" in the faculty portal but you sent from Rajesh:');
    console.log('1. Check which student account you are logged in as');
    console.log('2. The student portal might be using John Doe\'s session');
    console.log('3. Clear browser localStorage and login as Rajesh again');
    console.log('4. Check the browser\'s Application tab → Local Storage → user data');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

testRajeshEnrollment();