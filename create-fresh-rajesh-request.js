const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function createFreshRajeshRequest() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    console.log('\n🧹 Cleaning up any existing requests...');
    
    // Clean up any existing requests for both students
    await connection.execute(`
      DELETE FROM enrollment_requests 
      WHERE faculty_id = 'FAC2024001' 
        AND course_code = 'UBA0123'
    `);
    
    console.log('✅ Cleaned up existing requests');

    console.log('\n📝 Creating fresh enrollment request for Rajesh...');
    
    // Create a fresh request for Rajesh
    const requestId = `ENR_REQ_${Date.now()}_RAJESH_FRESH`;
    const studentId = 'STU2024002'; // Rajesh's ID
    const courseCode = 'UBA0123';
    const facultyId = 'FAC2024001';
    const slot = 'B';

    await connection.execute(`
      INSERT INTO enrollment_requests (request_id, student_id, course_code, faculty_id, slot, status, request_date)
      VALUES (?, ?, ?, ?, ?, 'pending', NOW())
    `, [requestId, studentId, courseCode, facultyId, slot]);

    console.log(`✅ Created fresh request: ${requestId}`);

    // Verify the request
    const verification = await connection.execute(`
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
    `, [requestId]);

    if (verification[0].length > 0) {
      const req = verification[0][0];
      console.log('\n✅ Verification - Request Created Successfully:');
      console.log(`  Student: ${req.student_name} (${req.student_id})`);
      console.log(`  Course: ${req.course_code}`);
      console.log(`  Status: ${req.status}`);
      console.log(`  Date: ${req.request_date}`);
    }

    console.log('\n🔄 Now refresh your faculty portal to see the correct request from Rajesh Kumar');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

createFreshRajeshRequest();