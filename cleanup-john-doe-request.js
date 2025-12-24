const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function cleanupJohnDoeRequest() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    console.log('\n🧹 Cleaning up John Doe\'s accidental request...');
    
    // Remove John Doe's pending request (the one sent by mistake)
    const result = await connection.execute(`
      DELETE FROM enrollment_requests 
      WHERE student_id = 'STU2024001' 
        AND status = 'pending' 
        AND faculty_id = 'FAC2024001'
        AND request_date >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
    `);

    console.log(`✅ Removed ${result[0].affectedRows} accidental John Doe requests`);

    // Verify current pending requests
    const remaining = await connection.execute(`
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

    console.log('\n📋 Remaining pending requests:');
    if (remaining[0].length > 0) {
      remaining[0].forEach(req => {
        console.log(`  ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.status}`);
      });
    } else {
      console.log('  No pending requests remaining');
    }

    console.log('\n✅ Now the faculty portal should show only legitimate requests from Rajesh');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

cleanupJohnDoeRequest();