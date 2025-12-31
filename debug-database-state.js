const mysql = require('mysql2/promise');

async function debugDatabaseState() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });
    
    console.log('🔍 Database State Debug');
    console.log('======================');
    
    // Check attendance sessions for CSA022
    console.log('\n1. Attendance sessions for CSA022:');
    const [sessions] = await connection.execute(`
      SELECT session_id, session_date, session_time, status, present_students, attendance_percentage
      FROM attendance_sessions 
      WHERE course_code = 'CSA022'
      ORDER BY session_date DESC, session_time DESC
      LIMIT 10
    `);
    
    console.log(`Found ${sessions.length} sessions:`);
    sessions.forEach(session => {
      console.log(`- ${session.session_id}: ${session.session_date} ${session.session_time} (${session.status}) - ${session.present_students} present`);
    });
    
    // Check attendance records for STU2024002 in CSA022
    console.log('\n2. Attendance records for STU2024002 in CSA022:');
    const [records] = await connection.execute(`
      SELECT ar.session_id, ar.attendance_status, ar.marked_at, asess.session_date, asess.status as session_status
      FROM attendance_records ar
      JOIN attendance_sessions asess ON ar.session_id = asess.session_id
      WHERE ar.student_id = 'STU2024002' AND asess.course_code = 'CSA022'
      ORDER BY asess.session_date DESC
      LIMIT 10
    `);
    
    console.log(`Found ${records.length} records:`);
    records.forEach(record => {
      console.log(`- ${record.session_id}: ${record.attendance_status} on ${record.session_date} (session: ${record.session_status})`);
    });
    
    // Test the exact query used in the API
    console.log('\n3. Testing the exact API query:');
    const [apiQuery] = await connection.execute(`
      SELECT 
        COUNT(DISTINCT asess.session_id) as total_sessions,
        COUNT(CASE WHEN ar.attendance_status IN ('present', 'late') THEN 1 END) as attended_sessions,
        COUNT(CASE WHEN ar.attendance_status = 'late' THEN 1 END) as late_sessions,
        COUNT(CASE WHEN ar.attendance_status = 'excused' THEN 1 END) as excused_sessions
      FROM attendance_sessions asess
      LEFT JOIN attendance_records ar ON asess.session_id = ar.session_id AND ar.student_id = ?
      WHERE asess.course_code = ? AND asess.status = 'completed'
    `, ['STU2024002', 'CSA022']);
    
    console.log('API Query Result:', apiQuery[0]);
    
    // Check what happens if we remove the status filter
    console.log('\n4. Testing query without status filter:');
    const [noStatusQuery] = await connection.execute(`
      SELECT 
        COUNT(DISTINCT asess.session_id) as total_sessions,
        COUNT(CASE WHEN ar.attendance_status IN ('present', 'late') THEN 1 END) as attended_sessions,
        asess.status
      FROM attendance_sessions asess
      LEFT JOIN attendance_records ar ON asess.session_id = ar.session_id AND ar.student_id = ?
      WHERE asess.course_code = ?
      GROUP BY asess.status
    `, ['STU2024002', 'CSA022']);
    
    console.log('Query without status filter:');
    noStatusQuery.forEach(result => {
      console.log(`- Status '${result.status}': ${result.attended_sessions}/${result.total_sessions}`);
    });
    
    // Check session statuses
    console.log('\n5. Session status distribution for CSA022:');
    const [statusDist] = await connection.execute(`
      SELECT status, COUNT(*) as count
      FROM attendance_sessions 
      WHERE course_code = 'CSA022'
      GROUP BY status
    `);
    
    statusDist.forEach(stat => {
      console.log(`- ${stat.status}: ${stat.count} sessions`);
    });
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugDatabaseState();