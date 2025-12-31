const mysql = require('mysql2/promise');

async function fixEnrollmentsFinal() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });

    console.log('🔧 Fixing enrollments for testing...\n');

    // Update existing rejected enrollment to approved
    await connection.execute(`
      UPDATE enrollment_requests 
      SET status = 'approved' 
      WHERE student_id = 'STU2024002' AND course_code = 'CSA022'
    `);

    // Add more enrollments for testing
    await connection.execute(`
      INSERT IGNORE INTO enrollment_requests (request_id, student_id, course_code, slot, status, request_date) VALUES
      ('ENR_STU001_CSA022_NEW', 'STU2024001', 'CSA022', 'A', 'approved', '2024-12-01'),
      ('ENR_STU001_UBA0123_NEW', 'STU2024001', 'UBA0123', 'C', 'approved', '2024-12-01'),
      ('ENR_STU002_CS301_NEW', 'STU2024002', 'CS301', 'B', 'approved', '2024-12-01'),
      ('ENR_STU001_CS301_NEW', 'STU2024001', 'CS301', 'B', 'approved', '2024-12-01'),
      ('ENR_STU002_CS302_NEW', 'STU2024002', 'CS302', 'D', 'approved', '2024-12-01')
    `);

    console.log('✅ Enrollments updated and added');

    // Update course enrollment counts
    await connection.execute(`
      UPDATE courses c 
      SET current_enrolled = (
        SELECT COUNT(*) 
        FROM enrollment_requests er 
        WHERE er.course_code = c.course_code AND er.status IN ('enrolled', 'approved')
      )
    `);

    console.log('✅ Course enrollment counts updated');

    // Verify the changes
    console.log('\n🔍 Verification:');
    
    const [enrollments] = await connection.execute(`
      SELECT 
        er.course_code, 
        er.student_id, 
        er.status,
        CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE er.status = 'approved'
      ORDER BY er.course_code, u.first_name
    `);
    
    console.log('Approved enrollments:');
    enrollments.forEach(e => {
      console.log(`  ${e.course_code}: ${e.student_name} (${e.student_id})`);
    });

    // Test students for CSA022
    console.log('\nStudents enrolled in CSA022:');
    const [csa022Students] = await connection.execute(`
      SELECT 
        s.student_id,
        CONCAT(u.first_name, ' ', u.last_name) as student_name,
        u.email,
        er.request_date,
        er.slot
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE er.course_code = 'CSA022' AND er.status = 'approved'
      ORDER BY u.first_name, u.last_name
    `);
    
    csa022Students.forEach(s => {
      console.log(`  ${s.student_id}: ${s.student_name} (Slot ${s.slot})`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixEnrollmentsFinal();