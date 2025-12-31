const mysql = require('mysql2/promise');

async function testAPI() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });

    console.log('🧪 Testing API queries...\n');

    // Test my-courses API query
    console.log('1. Testing my-courses API query:');
    const [courses] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.description,
        c.credits,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        c.created_at,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      WHERE c.faculty_id = ?
      ORDER BY c.created_at DESC
    `, ['FAC2024001']);
    
    console.log('Courses found:', courses.length);
    courses.forEach(c => console.log(`  ${c.course_code}: ${c.course_name}`));

    // Test students API query for CSA022
    console.log('\n2. Testing students API query for CSA022:');
    const [students] = await connection.execute(`
      SELECT 
        s.student_id,
        CONCAT(u.first_name, ' ', u.last_name) as student_name,
        u.email,
        er.request_date,
        er.slot,
        COALESCE(assum.attendance_percentage, 0) as attendance_percentage,
        COALESCE(assum.total_sessions, 0) as total_sessions,
        COALESCE(assum.attended_sessions, 0) as attended_sessions
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      LEFT JOIN attendance_summary assum ON s.student_id = assum.student_id AND assum.course_code = er.course_code
      WHERE er.course_code = ? AND er.status IN ('enrolled', 'approved')
      ORDER BY u.first_name, u.last_name
    `, ['CSA022']);
    
    console.log('Students found:', students.length);
    students.forEach(s => console.log(`  ${s.student_id}: ${s.student_name} (${s.attendance_percentage}%)`));

    // Check enrollment statuses
    console.log('\n3. Current enrollment statuses:');
    const [enrollments] = await connection.execute(`
      SELECT course_code, student_id, status 
      FROM enrollment_requests 
      ORDER BY course_code, student_id
    `);
    
    enrollments.forEach(e => console.log(`  ${e.student_id} -> ${e.course_code}: ${e.status}`));

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testAPI();