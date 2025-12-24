const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db',
};

async function executeQuery(query, params = []) {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [results] = await connection.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

async function testEnrollmentApproval() {
  console.log('🧪 TESTING ENROLLMENT APPROVAL PROCESS');
  console.log('======================================\n');

  try {
    // 1. Check pending enrollment requests
    console.log('1. PENDING ENROLLMENT REQUESTS:');
    const pendingRequests = await executeQuery(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        c.course_name,
        er.faculty_id,
        er.status
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.status = 'pending'
    `);
    
    console.log(`📊 Found ${pendingRequests.length} pending requests:`);
    pendingRequests.forEach((req, index) => {
      console.log(`   ${index + 1}. ${req.student_name} (${req.student_id}) - ${req.course_code} - Request ID: ${req.request_id}`);
    });

    // 2. Check current enrollments
    console.log('\n2. CURRENT ENROLLMENTS:');
    const enrollments = await executeQuery(`
      SELECT 
        e.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        e.course_code,
        c.course_name,
        e.status,
        e.enrollment_date
      FROM enrollments e
      JOIN courses c ON e.course_code = c.course_code
      JOIN students s ON e.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
    `);
    
    console.log(`📊 Found ${enrollments.length} enrollments:`);
    enrollments.forEach((enr, index) => {
      console.log(`   ${index + 1}. ${enr.student_name} (${enr.student_id}) - ${enr.course_code} - Status: ${enr.status}`);
    });

    // 3. Check if enrollments table exists and has correct structure
    console.log('\n3. CHECKING ENROLLMENTS TABLE STRUCTURE:');
    const tableStructure = await executeQuery(`
      DESCRIBE enrollments
    `);
    
    console.log('📊 Enrollments table columns:');
    tableStructure.forEach((col) => {
      console.log(`   - ${col.Field} (${col.Type}) ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });

    // 4. Check attendance table for enrolled students
    console.log('\n4. CHECKING ATTENDANCE RECORDS:');
    const attendanceRecords = await executeQuery(`
      SELECT 
        a.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        a.course_code,
        COUNT(*) as attendance_count
      FROM attendance a
      JOIN students s ON a.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      GROUP BY a.student_id, a.course_code, us.first_name, us.last_name
    `);
    
    console.log(`📊 Found ${attendanceRecords.length} students with attendance records:`);
    attendanceRecords.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec.student_name} (${rec.student_id}) - ${rec.course_code} - ${rec.attendance_count} records`);
    });

    console.log('\n✅ ENROLLMENT APPROVAL TEST COMPLETE');

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testEnrollmentApproval();