const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function debugStudentNameIssue() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    console.log('\n🔍 Current Database State:');
    console.log('='.repeat(70));

    // Check all enrollment requests with detailed student info
    const requests = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        er.course_code,
        er.status,
        er.request_date,
        s.user_id as student_user_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name_from_users,
        us.email as student_email,
        us.first_name,
        us.last_name
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.faculty_id = 'FAC2024001'
      ORDER BY er.request_date DESC
    `);
    
    console.log('📋 All Enrollment Requests with Student Details:');
    requests[0].forEach(req => {
      console.log(`Request ID: ${req.request_id}`);
      console.log(`  Student ID: ${req.student_id}`);
      console.log(`  Student User ID: ${req.student_user_id}`);
      console.log(`  Student Name: ${req.student_name_from_users}`);
      console.log(`  First Name: ${req.first_name}`);
      console.log(`  Last Name: ${req.last_name}`);
      console.log(`  Email: ${req.student_email}`);
      console.log(`  Course: ${req.course_code}`);
      console.log(`  Status: ${req.status}`);
      console.log(`  Date: ${req.request_date}`);
      console.log('  ---');
    });

    // Check student-user mapping specifically
    console.log('\n👤 Student-User Mapping Verification:');
    console.log('='.repeat(70));
    const studentMapping = await connection.execute(`
      SELECT 
        s.student_id,
        s.user_id,
        CONCAT(u.first_name, ' ', u.last_name) as full_name,
        u.first_name,
        u.last_name,
        u.email
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.student_id IN ('STU2024001', 'STU2024002')
      ORDER BY s.student_id
    `);
    
    studentMapping[0].forEach(student => {
      console.log(`${student.student_id}:`);
      console.log(`  User ID: ${student.user_id}`);
      console.log(`  Full Name: ${student.full_name}`);
      console.log(`  First Name: ${student.first_name}`);
      console.log(`  Last Name: ${student.last_name}`);
      console.log(`  Email: ${student.email}`);
      console.log('  ---');
    });

    // Check if there are any recent requests
    console.log('\n🕐 Recent Requests (Last 24 hours):');
    console.log('='.repeat(70));
    const recentRequests = await connection.execute(`
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
      WHERE er.faculty_id = 'FAC2024001'
        AND er.request_date >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
      ORDER BY er.request_date DESC
    `);
    
    if (recentRequests[0].length > 0) {
      console.log('📋 Recent requests found:');
      recentRequests[0].forEach(req => {
        console.log(`  ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.status} at ${req.request_date}`);
      });
    } else {
      console.log('📋 No recent requests found');
    }

    // Test the exact API query that faculty portal uses
    console.log('\n🧪 Testing Faculty Portal API Query:');
    console.log('='.repeat(70));
    const apiQuery = `
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        us.email as student_email,
        s.department as student_department,
        s.year as student_year,
        s.semester as student_semester,
        s.cgpa as student_cgpa,
        er.course_code,
        c.course_name,
        er.slot,
        er.faculty_id,
        CONCAT(uf.first_name, ' ', uf.last_name) as faculty_name,
        er.status,
        er.request_date,
        er.faculty_notes,
        er.processed_at,
        c.max_capacity,
        c.current_enrolled,
        (c.max_capacity - c.current_enrolled) as available_slots
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      JOIN faculty f ON er.faculty_id = f.faculty_id
      JOIN users uf ON f.user_id = uf.id
      WHERE er.faculty_id = 'FAC2024001' AND er.status = 'pending'
      ORDER BY er.request_date DESC
    `;

    const apiResult = await connection.execute(apiQuery);
    
    console.log(`📊 API Query Result (Pending): ${apiResult[0].length} records`);
    apiResult[0].forEach(req => {
      console.log(`  API Result: ${req.student_name} (${req.student_id}) → ${req.course_code}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

debugStudentNameIssue();