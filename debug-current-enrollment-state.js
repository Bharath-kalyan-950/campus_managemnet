const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
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

async function debugCurrentState() {
  console.log('🔍 DEBUGGING CURRENT ENROLLMENT STATE');
  console.log('====================================\n');

  try {
    // 1. Check current courses
    console.log('1. CURRENT COURSES:');
    const courses = await executeQuery(`
      SELECT course_code, course_name, slot, faculty_id, max_capacity, current_enrolled
      FROM courses 
      ORDER BY course_code
    `);
    
    console.log(`📊 Found ${courses.length} courses:`);
    courses.forEach((course, index) => {
      console.log(`   ${index + 1}. ${course.course_code} - ${course.course_name} - Slot ${course.slot} - Capacity: ${course.current_enrolled}/${course.max_capacity} - Faculty: ${course.faculty_id}`);
    });

    // 2. Check current enrollment requests
    console.log('\n2. CURRENT ENROLLMENT REQUESTS:');
    const requests = await executeQuery(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        c.course_name,
        er.slot,
        er.status,
        er.request_date,
        er.faculty_id
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      ORDER BY er.request_date DESC
    `);
    
    console.log(`📊 Found ${requests.length} enrollment requests:`);
    requests.forEach((req, index) => {
      console.log(`   ${index + 1}. ${req.student_name} (${req.student_id}) - ${req.course_code} (${req.course_name}) - Slot ${req.slot} - Status: ${req.status} - Faculty: ${req.faculty_id}`);
    });

    // 3. Check current enrollments
    console.log('\n3. CURRENT ENROLLMENTS:');
    const enrollments = await executeQuery(`
      SELECT 
        e.id,
        e.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        e.course_code,
        c.course_name,
        e.status,
        e.enrollment_date,
        e.faculty_id
      FROM enrollments e
      JOIN courses c ON e.course_code = c.course_code
      JOIN students s ON e.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      ORDER BY e.enrollment_date DESC
    `);
    
    console.log(`📊 Found ${enrollments.length} enrollments:`);
    enrollments.forEach((enr, index) => {
      console.log(`   ${index + 1}. ${enr.student_name} (${enr.student_id}) - ${enr.course_code} (${enr.course_name}) - Status: ${enr.status} - Faculty: ${enr.faculty_id}`);
    });

    // 4. Check students
    console.log('\n4. STUDENT ACCOUNTS:');
    const students = await executeQuery(`
      SELECT 
        s.student_id,
        CONCAT(u.first_name, ' ', u.last_name) as name,
        u.email
      FROM students s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.student_id
    `);
    
    console.log(`📊 Found ${students.length} students:`);
    students.forEach((student, index) => {
      console.log(`   ${index + 1}. ${student.student_id} - ${student.name} - ${student.email}`);
    });

  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

debugCurrentState();