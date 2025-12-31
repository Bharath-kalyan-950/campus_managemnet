const mysql = require('mysql2/promise');

async function fixEnrollments() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });

    console.log('🔧 Adding sample enrollments...\n');

    // Add sample enrollments for testing
    await connection.execute(`
      INSERT IGNORE INTO enrollment_requests (request_id, student_id, course_code, slot, status, request_date) VALUES
      ('ENR_STU001_CSA022', 'STU2024001', 'CSA022', 'A', 'enrolled', '2024-12-01'),
      ('ENR_STU002_CSA022', 'STU2024002', 'CSA022', 'A', 'enrolled', '2024-12-01'),
      ('ENR_STU001_CS301', 'STU2024001', 'CS301', 'B', 'enrolled', '2024-12-01'),
      ('ENR_STU002_UBA0123', 'STU2024002', 'UBA0123', 'C', 'enrolled', '2024-12-01'),
      ('ENR_STU001_CS302', 'STU2024001', 'CS302', 'D', 'enrolled', '2024-12-01'),
      ('ENR_STU002_CS302', 'STU2024002', 'CS302', 'D', 'enrolled', '2024-12-01')
    `);

    console.log('✅ Sample enrollments added');

    // Verify enrollments
    const [enrollments] = await connection.execute(`
      SELECT er.course_code, er.student_id, CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE er.status = 'enrolled'
      ORDER BY er.course_code, u.first_name
    `);
    
    console.log('\nCurrent enrollments:');
    enrollments.forEach(e => {
      console.log(`  ${e.course_code}: ${e.student_name} (${e.student_id})`);
    });

    // Update course enrollment counts
    await connection.execute(`
      UPDATE courses c 
      SET current_enrolled = (
        SELECT COUNT(*) 
        FROM enrollment_requests er 
        WHERE er.course_code = c.course_code AND er.status = 'enrolled'
      )
    `);

    console.log('\n✅ Course enrollment counts updated');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixEnrollments();