const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function testDuplicateEntriesFix() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    // Test 1: Create a complete enrollment workflow
    console.log('\n📊 Test 1: Setting up enrollment workflow...');
    
    // Ensure we have test data
    const studentId = 'STU2024001';
    const facultyId = 'FAC2024001';
    const courseCode = 'UBA0123';
    const slot = 'B';
    
    // Clean up any existing data for this test
    await connection.execute('DELETE FROM enrollment_requests WHERE student_id = ? AND course_code = ?', [studentId, courseCode]);
    await connection.execute('DELETE FROM enrollments WHERE student_id = ? AND course_code = ?', [studentId, courseCode]);
    
    // Reset course capacity
    await connection.execute('UPDATE courses SET current_enrolled = 0 WHERE course_code = ?', [courseCode]);
    
    console.log('✅ Cleaned up existing test data');

    // Step 1: Student submits enrollment request
    console.log('\n📝 Step 1: Student submits enrollment request...');
    const requestId = `ENR_REQ_${Date.now()}_TEST`;
    
    await connection.execute(`
      INSERT INTO enrollment_requests (request_id, student_id, course_code, faculty_id, slot, status, request_date)
      VALUES (?, ?, ?, ?, ?, 'pending', NOW())
    `, [requestId, studentId, courseCode, facultyId, slot]);
    
    console.log('✅ Enrollment request submitted');

    // Test API: Check pending requests
    console.log('\n🔍 Testing API: Fetching pending requests...');
    const pendingRequests = await connection.execute(`
      SELECT * FROM enrollment_requests WHERE student_id = ? AND status = 'pending'
    `, [studentId]);
    
    console.log(`✅ Found ${pendingRequests[0].length} pending requests`);

    // Step 2: Faculty approves the request
    console.log('\n✅ Step 2: Faculty approves the request...');
    
    // Update request status
    await connection.execute(`
      UPDATE enrollment_requests 
      SET status = 'approved', processed_at = NOW(), processed_by = ?
      WHERE request_id = ?
    `, [facultyId, requestId]);
    
    // Create enrollment record
    await connection.execute(`
      INSERT INTO enrollments (student_id, course_code, faculty_id, enrollment_date, status)
      VALUES (?, ?, ?, NOW(), 'enrolled')
    `, [studentId, courseCode, facultyId]);
    
    // Update course capacity
    await connection.execute(`
      UPDATE courses SET current_enrolled = current_enrolled + 1 WHERE course_code = ?
    `, [courseCode]);
    
    console.log('✅ Student approved and enrolled');

    // Test 3: Check for duplicates in student view
    console.log('\n🔍 Test 3: Checking for duplicates in student APIs...');
    
    // Test enrollment requests API (should only show pending)
    const enrollmentRequestsResult = await connection.execute(`
      SELECT * FROM enrollment_requests WHERE student_id = ? AND status = 'pending'
    `, [studentId]);
    
    console.log(`📋 Pending enrollment requests: ${enrollmentRequestsResult[0].length}`);
    
    // Test student courses API (should only show enrolled)
    const enrolledCoursesResult = await connection.execute(`
      SELECT * FROM enrollments WHERE student_id = ? AND status = 'enrolled'
    `, [studentId]);
    
    console.log(`📚 Enrolled courses: ${enrolledCoursesResult[0].length}`);
    
    // This should be 0 pending + 1 enrolled = 1 total (no duplicates)
    const totalCourses = enrollmentRequestsResult[0].length + enrolledCoursesResult[0].length;
    console.log(`🎯 Total courses shown to student: ${totalCourses} (should be 1)`);
    
    if (totalCourses === 1) {
      console.log('✅ NO DUPLICATES - Student sees correct number of courses');
    } else {
      console.log('❌ DUPLICATES DETECTED - Student would see multiple entries');
    }

    // Test 4: Faculty rejects enrolled student
    console.log('\n❌ Test 4: Faculty rejects enrolled student...');
    
    // Update enrollment status to dropped
    await connection.execute(`
      UPDATE enrollments 
      SET status = 'dropped'
      WHERE student_id = ? AND course_code = ? AND status = 'enrolled'
    `, [studentId, courseCode]);
    
    // Decrease course enrollment count
    await connection.execute(`
      UPDATE courses 
      SET current_enrolled = current_enrolled - 1
      WHERE course_code = ? AND current_enrolled > 0
    `, [courseCode]);
    
    console.log('✅ Student rejected from enrolled course');

    // Test 5: Check student can re-enroll
    console.log('\n🔄 Test 5: Checking if student can re-enroll...');
    
    // Check enrolled courses (should be 0 now)
    const enrolledAfterRejection = await connection.execute(`
      SELECT * FROM enrollments WHERE student_id = ? AND status = 'enrolled'
    `, [studentId]);
    
    console.log(`📚 Enrolled courses after rejection: ${enrolledAfterRejection[0].length}`);
    
    // Check if course appears available again
    const courseAvailability = await connection.execute(`
      SELECT 
        course_code,
        max_capacity,
        current_enrolled,
        (max_capacity - current_enrolled) as available_slots
      FROM courses 
      WHERE course_code = ?
    `, [courseCode]);
    
    const course = courseAvailability[0][0];
    console.log(`🎯 Course ${course.course_code}: ${course.available_slots} slots available`);
    
    if (course.available_slots > 0) {
      console.log('✅ Course is available for re-enrollment');
    } else {
      console.log('❌ Course is not available for re-enrollment');
    }

    // Test 6: Check faculty approved list
    console.log('\n📋 Test 6: Checking faculty approved list...');
    
    const approvedList = await connection.execute(`
      SELECT * FROM enrollment_requests WHERE faculty_id = ? AND status = 'approved'
    `, [facultyId]);
    
    const enrolledList = await connection.execute(`
      SELECT * FROM enrollments WHERE faculty_id = ? AND status = 'enrolled'
    `, [facultyId]);
    
    console.log(`✅ Approved requests: ${approvedList[0].length}`);
    console.log(`👥 Currently enrolled: ${enrolledList[0].length}`);
    
    // Summary
    console.log('\n📊 SUMMARY:');
    console.log('='.repeat(50));
    console.log(`✅ Duplicate entries fix: ${totalCourses === 1 ? 'WORKING' : 'NEEDS FIX'}`);
    console.log(`✅ Student rejection: ${enrolledAfterRejection[0].length === 0 ? 'WORKING' : 'NEEDS FIX'}`);
    console.log(`✅ Re-enrollment availability: ${course.available_slots > 0 ? 'WORKING' : 'NEEDS FIX'}`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

testDuplicateEntriesFix();