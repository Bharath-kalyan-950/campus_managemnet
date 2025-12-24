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

async function testCapacityReservation() {
  console.log('🧪 TESTING CAPACITY RESERVATION SYSTEM');
  console.log('=====================================\n');

  try {
    // 1. Check current course capacity
    console.log('1. CURRENT MATHEMATICS COURSE STATUS:');
    const courseStatus = await executeQuery(`
      SELECT 
        c.course_code,
        c.course_name,
        c.max_capacity,
        c.current_enrolled,
        COALESCE(pending_requests.pending_count, 0) as pending_requests,
        (c.max_capacity - c.current_enrolled - COALESCE(pending_requests.pending_count, 0)) as available_slots
      FROM courses c
      LEFT JOIN (
        SELECT course_code, COUNT(*) as pending_count
        FROM enrollment_requests 
        WHERE status = 'pending'
        GROUP BY course_code
      ) pending_requests ON c.course_code = pending_requests.course_code
      WHERE c.course_code = 'UBA0123'
    `);
    
    if (courseStatus.length > 0) {
      const course = courseStatus[0];
      console.log(`📊 Course: ${course.course_code} - ${course.course_name}`);
      console.log(`📊 Max Capacity: ${course.max_capacity}`);
      console.log(`📊 Current Enrolled: ${course.current_enrolled}`);
      console.log(`📊 Pending Requests: ${course.pending_requests}`);
      console.log(`📊 Available Slots: ${course.available_slots}`);
    }

    // 2. Test API response for Slot B
    console.log('\n2. TESTING API RESPONSE FOR SLOT B:');
    
    // Simulate the API query
    const apiResponse = await executeQuery(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        COALESCE(pending_requests.pending_count, 0) as pending_requests,
        (c.max_capacity - c.current_enrolled - COALESCE(pending_requests.pending_count, 0)) as available_slots,
        c.faculty_id,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      LEFT JOIN (
        SELECT course_code, COUNT(*) as pending_count
        FROM enrollment_requests 
        WHERE status = 'pending'
        GROUP BY course_code
      ) pending_requests ON c.course_code = pending_requests.course_code
      WHERE c.slot = 'B' AND c.faculty_id IS NOT NULL
      ORDER BY c.course_code
    `);
    
    console.log(`📊 API would return ${apiResponse.length} courses:`);
    apiResponse.forEach((course, index) => {
      console.log(`   ${index + 1}. ${course.course_code} - Available: ${course.available_slots}/${course.max_capacity} (Enrolled: ${course.current_enrolled}, Pending: ${course.pending_requests})`);
    });

    // 3. Test enrollment capacity check
    console.log('\n3. TESTING ENROLLMENT CAPACITY CHECK:');
    
    const enrollmentCheck = await executeQuery(`
      SELECT 
        c.course_code, 
        c.faculty_id, 
        c.max_capacity, 
        c.current_enrolled, 
        c.slot,
        COALESCE(pending_requests.pending_count, 0) as pending_requests,
        (c.max_capacity - c.current_enrolled - COALESCE(pending_requests.pending_count, 0)) as available_slots
      FROM courses c
      LEFT JOIN (
        SELECT course_code, COUNT(*) as pending_count
        FROM enrollment_requests 
        WHERE status = 'pending'
        GROUP BY course_code
      ) pending_requests ON c.course_code = pending_requests.course_code
      WHERE c.course_code = 'UBA0123' AND c.slot = 'B'
    `);
    
    if (enrollmentCheck.length > 0) {
      const course = enrollmentCheck[0];
      console.log(`📊 Enrollment Check for ${course.course_code}:`);
      console.log(`   - Available Slots: ${course.available_slots}`);
      console.log(`   - Can Accept New Request: ${course.available_slots > 0 ? 'YES' : 'NO'}`);
      
      if (course.available_slots <= 0) {
        console.log(`   - Error Message: Course is full. Capacity: ${course.max_capacity}, Enrolled: ${course.current_enrolled}, Pending: ${course.pending_requests}`);
      }
    }

    // 4. Show all current enrollment requests
    console.log('\n4. CURRENT ENROLLMENT REQUESTS:');
    const requests = await executeQuery(`
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
      ORDER BY er.request_date DESC
    `);
    
    console.log(`📊 Found ${requests.length} enrollment requests:`);
    requests.forEach((req, index) => {
      console.log(`   ${index + 1}. ${req.student_name} (${req.student_id}) - ${req.course_code} - Status: ${req.status}`);
    });

    console.log('\n✅ CAPACITY RESERVATION TEST COMPLETE');
    console.log('\nExpected Behavior:');
    console.log('- Mathematics course should show 29/30 available (1 pending request reserves 1 slot)');
    console.log('- New enrollment requests should be blocked when available_slots = 0');
    console.log('- Frontend should display updated capacity immediately');

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testCapacityReservation();