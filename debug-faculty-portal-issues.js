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

async function debugFacultyPortalIssues() {
  console.log('🔍 DEBUGGING FACULTY PORTAL ISSUES');
  console.log('=====================================\n');

  try {
    // 1. Check if Daniel faculty exists and has correct data
    console.log('1. CHECKING DANIEL FACULTY DATA:');
    const danielFaculty = await executeQuery(`
      SELECT f.*, u.first_name, u.last_name, u.email
      FROM faculty f
      JOIN users u ON f.user_id = u.id
      WHERE f.faculty_id = 'FAC2024001'
    `);
    
    if (danielFaculty.length > 0) {
      console.log('✅ Daniel faculty found:', danielFaculty[0]);
    } else {
      console.log('❌ Daniel faculty NOT found');
    }

    // 2. Check enrollment requests for Daniel
    console.log('\n2. CHECKING ENROLLMENT REQUESTS FOR DANIEL:');
    const enrollmentRequests = await executeQuery(`
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
    
    console.log(`📊 Found ${enrollmentRequests.length} enrollment requests for Daniel:`);
    enrollmentRequests.forEach((req, index) => {
      console.log(`   ${index + 1}. ${req.student_name} (${req.student_id}) - ${req.course_code} (${req.course_name}) - Slot ${req.slot} - Status: ${req.status}`);
    });

    // 3. Check courses created by Daniel
    console.log('\n3. CHECKING COURSES CREATED BY DANIEL:');
    const danielCourses = await executeQuery(`
      SELECT course_code, course_name, slot, max_capacity, current_enrolled
      FROM courses
      WHERE faculty_id = 'FAC2024001'
      ORDER BY slot, course_code
    `);
    
    console.log(`📊 Found ${danielCourses.length} courses created by Daniel:`);
    danielCourses.forEach((course, index) => {
      console.log(`   ${index + 1}. ${course.course_code} - ${course.course_name} - Slot ${course.slot} - Capacity: ${course.current_enrolled}/${course.max_capacity}`);
    });

    // 4. Check if Rajesh student exists
    console.log('\n4. CHECKING RAJESH STUDENT DATA:');
    const rajeshStudent = await executeQuery(`
      SELECT s.*, u.first_name, u.last_name, u.email
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.student_id = 'STU2024002'
    `);
    
    if (rajeshStudent.length > 0) {
      console.log('✅ Rajesh student found:', rajeshStudent[0]);
    } else {
      console.log('❌ Rajesh student NOT found');
    }

    // 5. Check specific enrollment requests from Rajesh to Daniel
    console.log('\n5. CHECKING RAJESH ENROLLMENT REQUESTS TO DANIEL:');
    const rajeshRequests = await executeQuery(`
      SELECT 
        er.*,
        c.course_name
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      WHERE er.student_id = 'STU2024002' AND er.faculty_id = 'FAC2024001'
      ORDER BY er.request_date DESC
    `);
    
    console.log(`📊 Found ${rajeshRequests.length} requests from Rajesh to Daniel:`);
    rajeshRequests.forEach((req, index) => {
      console.log(`   ${index + 1}. Request ID: ${req.request_id}, Course: ${req.course_code} (${req.course_name}), Slot: ${req.slot}, Status: ${req.status}, Date: ${req.request_date}`);
    });

    // 6. Test the exact API query that faculty portal uses
    console.log('\n6. TESTING FACULTY PORTAL API QUERY:');
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
      WHERE er.faculty_id = ? AND er.status = ?
      ORDER BY er.request_date DESC
    `;
    
    const apiResults = await executeQuery(apiQuery, ['FAC2024001', 'pending']);
    console.log(`📊 API Query Results: ${apiResults.length} records`);
    apiResults.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.student_name} - ${result.course_code} - Slot ${result.slot} - Available: ${result.available_slots}`);
    });

    // 7. Check classroom agent notifications table
    console.log('\n7. CHECKING CLASSROOM AGENT NOTIFICATIONS TABLE:');
    try {
      const notificationsCheck = await executeQuery(`
        SELECT COUNT(*) as count FROM agent_notifications
        WHERE recipient_type = 'faculty'
      `);
      console.log(`📊 Found ${notificationsCheck[0].count} faculty notifications in agent_notifications table`);
    } catch (error) {
      console.log('❌ Error checking agent_notifications table:', error.message);
    }

    // 8. Check if all required tables exist
    console.log('\n8. CHECKING REQUIRED TABLES:');
    const tables = ['enrollment_requests', 'courses', 'students', 'faculty', 'users', 'agent_notifications'];
    for (const table of tables) {
      try {
        const result = await executeQuery(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`✅ Table ${table}: ${result[0].count} records`);
      } catch (error) {
        console.log(`❌ Table ${table}: ERROR - ${error.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Debug script error:', error);
  }
}

debugFacultyPortalIssues();