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

async function fixEnrollmentIssues() {
  console.log('🔧 FIXING ENROLLMENT ISSUES');
  console.log('===========================\n');

  try {
    // 1. Remove the incorrect enrollment request (John Doe instead of Rajesh)
    console.log('1. REMOVING INCORRECT ENROLLMENT REQUEST:');
    const incorrectRequests = await executeQuery(`
      SELECT request_id, student_id, course_code, status
      FROM enrollment_requests
      WHERE student_id = 'STU2024001' AND course_code = 'UBA0123'
    `);
    
    if (incorrectRequests.length > 0) {
      console.log(`📊 Found ${incorrectRequests.length} incorrect requests to remove:`);
      incorrectRequests.forEach((req, index) => {
        console.log(`   ${index + 1}. ${req.request_id} - Student: ${req.student_id} - Course: ${req.course_code} - Status: ${req.status}`);
      });

      const deleteResult = await executeQuery(`
        DELETE FROM enrollment_requests 
        WHERE student_id = 'STU2024001' AND course_code = 'UBA0123'
      `);
      
      console.log(`✅ Deleted ${deleteResult.affectedRows} incorrect enrollment requests`);
    } else {
      console.log('📊 No incorrect requests found');
    }

    // 2. Create a proper enrollment request for Rajesh (STU2024002)
    console.log('\n2. CREATING PROPER ENROLLMENT REQUEST FOR RAJESH:');
    
    // Check if Rajesh already has a request
    const existingRajeshRequest = await executeQuery(`
      SELECT request_id, student_id, course_code, status
      FROM enrollment_requests
      WHERE student_id = 'STU2024002' AND course_code = 'UBA0123'
    `);
    
    if (existingRajeshRequest.length > 0) {
      console.log('📊 Rajesh already has a request for mathematics:');
      existingRajeshRequest.forEach((req, index) => {
        console.log(`   ${index + 1}. ${req.request_id} - Status: ${req.status}`);
      });
    } else {
      // Create new request for Rajesh
      const requestId = `ENR_REQ_${Date.now()}_rajesh_math`;
      
      await executeQuery(`
        INSERT INTO enrollment_requests 
        (request_id, student_id, course_code, faculty_id, slot, status, request_date)
        VALUES (?, ?, ?, ?, ?, 'pending', NOW())
      `, [requestId, 'STU2024002', 'UBA0123', 'FAC2024001', 'B']);
      
      console.log(`✅ Created enrollment request for Rajesh: ${requestId}`);
    }

    // 3. Verify final state
    console.log('\n3. VERIFICATION - FINAL STATE:');
    
    const finalRequests = await executeQuery(`
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
      ORDER BY er.request_date DESC
    `);
    
    console.log(`📊 Final enrollment requests (${finalRequests.length} total):`);
    finalRequests.forEach((req, index) => {
      console.log(`   ${index + 1}. ${req.student_name} (${req.student_id}) - ${req.course_code} (${req.course_name}) - Slot ${req.slot} - Status: ${req.status}`);
    });

    console.log('\n✅ ENROLLMENT ISSUES FIXED');
    console.log('Now Rajesh (STU2024002) should see the correct enrollment request in faculty portal');

  } catch (error) {
    console.error('❌ Fix error:', error);
  }
}

fixEnrollmentIssues();