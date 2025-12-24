const mysql = require('mysql2/promise');

async function finalCleanup() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  try {
    console.log('🧹 Final Cleanup for STU2024001');
    
    // Remove any remaining enrollment requests
    const [result] = await connection.execute(`
      DELETE FROM enrollment_requests WHERE student_id = 'STU2024001'
    `);
    
    console.log(`✅ Deleted ${result.affectedRows} remaining enrollment requests`);
    
    // Verify complete cleanup
    const [enrollments] = await connection.execute(`
      SELECT COUNT(*) as count FROM enrollments WHERE student_id = 'STU2024001'
    `);
    
    const [requests] = await connection.execute(`
      SELECT COUNT(*) as count FROM enrollment_requests WHERE student_id = 'STU2024001'
    `);
    
    console.log(`📊 Final Status:`);
    console.log(`   Enrollments: ${enrollments[0].count}`);
    console.log(`   Requests: ${requests[0].count}`);
    
    if (enrollments[0].count === 0 && requests[0].count === 0) {
      console.log('🎉 Student STU2024001 is completely clean!');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await connection.end();
  }
}

finalCleanup();