const mysql = require('mysql2/promise');

async function checkPendingRequests() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  try {
    console.log('📋 Checking Pending Enrollment Requests:\n');
    
    const [requests] = await connection.execute(`
      SELECT 
        er.*,
        c.course_name,
        c.slot,
        CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE er.status = 'pending'
      ORDER BY er.request_date DESC
    `);
    
    console.log(`Found ${requests.length} pending requests:`);
    requests.forEach((req, idx) => {
      console.log(`${idx + 1}. ID: ${req.id}, Request ID: ${req.request_id}`);
      console.log(`   Student: ${req.student_name} (${req.student_id})`);
      console.log(`   Course: ${req.course_code} - ${req.course_name} [Slot ${req.slot}]`);
      console.log(`   Date: ${req.request_date}`);
      console.log('');
    });

    // Test deletion with the first request
    if (requests.length > 0) {
      const testRequest = requests[0];
      console.log(`🗑️ Testing deletion of request: ${testRequest.student_id} → ${testRequest.course_code}`);
      
      const [deleteResult] = await connection.execute(`
        DELETE FROM enrollment_requests 
        WHERE student_id = ? AND course_code = ? AND status = 'pending'
      `, [testRequest.student_id, testRequest.course_code]);
      
      console.log(`Affected rows: ${deleteResult.affectedRows}`);
      
      if (deleteResult.affectedRows > 0) {
        console.log('✅ Request deleted successfully');
        
        // Add it back for testing
        await connection.execute(`
          INSERT INTO enrollment_requests (request_id, student_id, course_code, faculty_id, slot, status, request_date)
          VALUES (?, ?, ?, ?, ?, 'pending', NOW())
        `, [testRequest.request_id, testRequest.student_id, testRequest.course_code, testRequest.faculty_id, testRequest.slot]);
        
        console.log('✅ Request restored for future testing');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await connection.end();
  }
}

checkPendingRequests();