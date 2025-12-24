const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function debugFacultyPortalData() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    // Check current enrollment requests
    console.log('\n📋 Current Enrollment Requests:');
    console.log('='.repeat(80));
    const requests = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        c.course_name,
        er.slot,
        er.faculty_id,
        CONCAT(uf.first_name, ' ', uf.last_name) as faculty_name,
        er.status,
        er.request_date,
        er.processed_at
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      JOIN faculty f ON er.faculty_id = f.faculty_id
      JOIN users uf ON f.user_id = uf.id
      ORDER BY er.request_date DESC
    `);
    
    requests[0].forEach(req => {
      console.log(`${req.request_id}: ${req.student_name} (${req.student_id}) → ${req.course_code} - Status: ${req.status}`);
      console.log(`   Faculty: ${req.faculty_name} (${req.faculty_id}) | Slot: ${req.slot} | Date: ${req.request_date}`);
    });

    // Check current enrollments
    console.log('\n👥 Current Enrollments:');
    console.log('='.repeat(80));
    const enrollments = await connection.execute(`
      SELECT 
        e.id,
        e.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        e.course_code,
        c.course_name,
        c.slot,
        e.faculty_id,
        CONCAT(uf.first_name, ' ', uf.last_name) as faculty_name,
        e.status,
        e.enrollment_date
      FROM enrollments e
      JOIN courses c ON e.course_code = c.course_code
      JOIN students s ON e.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      JOIN faculty f ON e.faculty_id = f.faculty_id
      JOIN users uf ON f.user_id = uf.id
      ORDER BY e.enrollment_date DESC
    `);
    
    enrollments[0].forEach(enr => {
      console.log(`${enr.id}: ${enr.student_name} (${enr.student_id}) → ${enr.course_code} - Status: ${enr.status}`);
      console.log(`   Faculty: ${enr.faculty_name} (${enr.faculty_id}) | Slot: ${enr.slot} | Date: ${enr.enrollment_date}`);
    });

    // Check student-user mapping
    console.log('\n👤 Student-User Mapping:');
    console.log('='.repeat(80));
    const studentMapping = await connection.execute(`
      SELECT 
        s.student_id,
        s.user_id,
        CONCAT(u.first_name, ' ', u.last_name) as full_name,
        u.email
      FROM students s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.student_id
    `);
    
    studentMapping[0].forEach(student => {
      console.log(`${student.student_id} → User ID: ${student.user_id} | Name: ${student.full_name} | Email: ${student.email}`);
    });

    // Check for specific Rajesh data
    console.log('\n🔍 Rajesh Specific Data:');
    console.log('='.repeat(80));
    const rajeshData = await connection.execute(`
      SELECT 
        s.student_id,
        s.user_id,
        CONCAT(u.first_name, ' ', u.last_name) as full_name,
        u.email
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE u.first_name LIKE '%Rajesh%' OR u.last_name LIKE '%Kumar%' OR s.student_id LIKE '%002%'
    `);
    
    if (rajeshData[0].length > 0) {
      rajeshData[0].forEach(student => {
        console.log(`Found: ${student.student_id} → ${student.full_name} | Email: ${student.email}`);
      });
    } else {
      console.log('❌ No Rajesh data found');
    }

    // Check faculty portal API data for Daniel
    console.log('\n👨‍🏫 Faculty Portal Data for Daniel (FAC2024001):');
    console.log('='.repeat(80));
    
    const facultyRequests = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        c.course_name,
        er.slot,
        er.status,
        er.request_date
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.faculty_id = 'FAC2024001'
      ORDER BY er.request_date DESC
    `);
    
    console.log(`📊 Total requests for Daniel: ${facultyRequests[0].length}`);
    
    const statusCounts = {};
    facultyRequests[0].forEach(req => {
      statusCounts[req.status] = (statusCounts[req.status] || 0) + 1;
      console.log(`${req.status.toUpperCase()}: ${req.student_name} (${req.student_id}) → ${req.course_code}`);
    });
    
    console.log('\n📊 Status Summary:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`${status}: ${count} requests`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

debugFacultyPortalData();