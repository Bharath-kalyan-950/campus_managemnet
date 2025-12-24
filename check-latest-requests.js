const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function checkLatestRequests() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    // Check the very latest requests (last 10 minutes)
    const latestRequests = await connection.execute(`
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
        AND er.request_date >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)
      ORDER BY er.request_date DESC
    `);
    
    console.log('\n📋 Latest Requests (Last 10 minutes):');
    if (latestRequests[0].length > 0) {
      latestRequests[0].forEach(req => {
        console.log(`  ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.status}`);
        console.log(`    Created: ${req.minutes_ago} minutes ago`);
      });
    } else {
      console.log('  No requests in the last 10 minutes');
    }

    // Check ALL pending requests
    const allPending = await connection.execute(`
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
      WHERE er.faculty_id = 'FAC2024001' AND er.status = 'pending'
      ORDER BY er.request_date DESC
    `);
    
    console.log('\n📋 ALL Pending Requests:');
    if (allPending[0].length > 0) {
      allPending[0].forEach(req => {
        console.log(`  ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.status}`);
        console.log(`    Date: ${req.request_date}`);
      });
    } else {
      console.log('  No pending requests found');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

checkLatestRequests();