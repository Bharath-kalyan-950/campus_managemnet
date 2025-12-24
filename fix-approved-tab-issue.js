const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function fixApprovedTabIssue() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    console.log('\n🔍 Current State Analysis:');
    console.log('='.repeat(60));

    // Check current enrollment requests
    const requests = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        er.status as request_status,
        er.request_date
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.faculty_id = 'FAC2024001'
      ORDER BY er.request_date DESC
    `);
    
    console.log('📋 Enrollment Requests:');
    requests[0].forEach(req => {
      console.log(`   ${req.student_name} → ${req.course_code} - Status: ${req.request_status}`);
    });

    // Check current enrollments
    const enrollments = await connection.execute(`
      SELECT 
        e.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        e.course_code,
        e.status as enrollment_status
      FROM enrollments e
      JOIN students s ON e.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE e.faculty_id = 'FAC2024001'
      ORDER BY e.enrollment_date DESC
    `);
    
    console.log('\n👥 Enrollments:');
    enrollments[0].forEach(enr => {
      console.log(`   ${enr.student_name} → ${enr.course_code} - Status: ${enr.enrollment_status}`);
    });

    console.log('\n🔧 Fixing Data Issues:');
    console.log('='.repeat(60));

    // Fix 1: Update enrollment requests for students who were dropped
    // If a student has enrollment status 'dropped', their request should be 'rejected'
    const fixQuery = `
      UPDATE enrollment_requests er
      JOIN enrollments e ON er.student_id = e.student_id AND er.course_code = e.course_code
      SET er.status = 'rejected',
          er.faculty_notes = CONCAT(COALESCE(er.faculty_notes, ''), ' [AUTO-REJECTED - Student was dropped from enrollment]'),
          er.processed_at = NOW()
      WHERE er.status = 'approved' 
        AND e.status = 'dropped'
        AND er.faculty_id = 'FAC2024001'
    `;

    const result = await connection.execute(fixQuery);
    console.log(`✅ Updated ${result[0].affectedRows} enrollment requests from 'approved' to 'rejected'`);

    // Fix 2: Remove any test/duplicate requests that shouldn't exist
    // Remove John Doe's extra requests (keeping only Rajesh's legitimate request)
    const cleanupQuery = `
      DELETE FROM enrollment_requests 
      WHERE student_id = 'STU2024001' 
        AND faculty_id = 'FAC2024001'
        AND request_id LIKE '%TEST%'
    `;

    const cleanupResult = await connection.execute(cleanupQuery);
    console.log(`✅ Cleaned up ${cleanupResult[0].affectedRows} test requests`);

    // Fix 3: Remove any pending requests that are duplicates
    const duplicateCleanup = `
      DELETE er1 FROM enrollment_requests er1
      INNER JOIN enrollment_requests er2 
      WHERE er1.student_id = er2.student_id 
        AND er1.course_code = er2.course_code
        AND er1.faculty_id = er2.faculty_id
        AND er1.request_id != er2.request_id
        AND er1.status = 'pending'
        AND er2.status IN ('approved', 'rejected')
        AND er1.faculty_id = 'FAC2024001'
    `;

    const duplicateResult = await connection.execute(duplicateCleanup);
    console.log(`✅ Removed ${duplicateResult[0].affectedRows} duplicate pending requests`);

    console.log('\n📊 Final State Check:');
    console.log('='.repeat(60));

    // Check final state
    const finalRequests = await connection.execute(`
      SELECT 
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        er.course_code,
        er.status,
        er.request_date
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      WHERE er.faculty_id = 'FAC2024001'
      ORDER BY er.request_date DESC
    `);

    const statusCounts = {};
    finalRequests[0].forEach(req => {
      statusCounts[req.status] = (statusCounts[req.status] || 0) + 1;
    });

    console.log('📋 Final Request Status Summary:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   ${status.toUpperCase()}: ${count} requests`);
    });

    console.log('\n✅ Expected Faculty Portal Behavior:');
    console.log('   - Pending Tab: Should show only legitimate pending requests');
    console.log('   - Approved Tab: Should show 0 requests (all were rejected after enrollment)');
    console.log('   - Enrolled Tab: Should show 0 students (all were dropped)');
    console.log('   - Rejected Tab: Should show rejected requests');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

fixApprovedTabIssue();