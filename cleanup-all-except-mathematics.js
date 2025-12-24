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

async function cleanupAllExceptMathematics() {
  console.log('🧹 CLEANING UP ALL COURSES EXCEPT MATHEMATICS');
  console.log('==============================================\n');

  try {
    // 1. First, let's see what mathematics courses exist
    console.log('1. CHECKING MATHEMATICS COURSES:');
    const mathCourses = await executeQuery(`
      SELECT course_code, course_name, slot, faculty_id
      FROM courses 
      WHERE course_name LIKE '%MATH%' OR course_name LIKE '%mathematics%' OR course_code LIKE '%UBA%'
      ORDER BY course_code
    `);
    
    console.log(`📊 Found ${mathCourses.length} mathematics courses:`);
    mathCourses.forEach((course, index) => {
      console.log(`   ${index + 1}. ${course.course_code} - ${course.course_name} - Slot ${course.slot} - Faculty: ${course.faculty_id}`);
    });

    if (mathCourses.length === 0) {
      console.log('❌ No mathematics courses found! Aborting cleanup to prevent data loss.');
      return;
    }

    // Get the course codes to keep
    const mathCourseCodes = mathCourses.map(course => course.course_code);
    const placeholders = mathCourseCodes.map(() => '?').join(',');

    // 2. Show what will be deleted
    console.log('\n2. COURSES TO BE DELETED:');
    const coursesToDelete = await executeQuery(`
      SELECT course_code, course_name, slot, faculty_id
      FROM courses 
      WHERE course_code NOT IN (${placeholders})
      ORDER BY course_code
    `, mathCourseCodes);
    
    console.log(`📊 Found ${coursesToDelete.length} courses to delete:`);
    coursesToDelete.forEach((course, index) => {
      console.log(`   ${index + 1}. ${course.course_code} - ${course.course_name} - Slot ${course.slot} - Faculty: ${course.faculty_id}`);
    });

    // 3. Show enrollment requests to be deleted
    console.log('\n3. ENROLLMENT REQUESTS TO BE DELETED:');
    const requestsToDelete = await executeQuery(`
      SELECT er.request_id, er.student_id, er.course_code, er.status
      FROM enrollment_requests er
      WHERE er.course_code NOT IN (${placeholders})
      ORDER BY er.course_code
    `, mathCourseCodes);
    
    console.log(`📊 Found ${requestsToDelete.length} enrollment requests to delete:`);
    requestsToDelete.forEach((req, index) => {
      console.log(`   ${index + 1}. ${req.request_id} - Student: ${req.student_id} - Course: ${req.course_code} - Status: ${req.status}`);
    });

    // 4. Show enrollments to be deleted
    console.log('\n4. ENROLLMENTS TO BE DELETED:');
    const enrollmentsToDelete = await executeQuery(`
      SELECT e.id, e.student_id, e.course_code, e.status
      FROM enrollments e
      WHERE e.course_code NOT IN (${placeholders})
      ORDER BY e.course_code
    `, mathCourseCodes);
    
    console.log(`📊 Found ${enrollmentsToDelete.length} enrollments to delete:`);
    enrollmentsToDelete.forEach((enr, index) => {
      console.log(`   ${index + 1}. ID: ${enr.id} - Student: ${enr.student_id} - Course: ${enr.course_code} - Status: ${enr.status}`);
    });

    // 5. Perform the cleanup
    console.log('\n5. PERFORMING CLEANUP:');
    
    // Start transaction
    const connection = await mysql.createConnection(dbConfig);
    await connection.beginTransaction();

    try {
      // Delete enrollment requests for non-math courses
      if (requestsToDelete.length > 0) {
        const deleteRequestsResult = await connection.execute(`
          DELETE FROM enrollment_requests 
          WHERE course_code NOT IN (${placeholders})
        `, mathCourseCodes);
        console.log(`✅ Deleted ${deleteRequestsResult[0].affectedRows} enrollment requests`);
      }

      // Delete enrollments for non-math courses
      if (enrollmentsToDelete.length > 0) {
        const deleteEnrollmentsResult = await connection.execute(`
          DELETE FROM enrollments 
          WHERE course_code NOT IN (${placeholders})
        `, mathCourseCodes);
        console.log(`✅ Deleted ${deleteEnrollmentsResult[0].affectedRows} enrollments`);
      }

      // Delete non-math courses
      if (coursesToDelete.length > 0) {
        const deleteCoursesResult = await connection.execute(`
          DELETE FROM courses 
          WHERE course_code NOT IN (${placeholders})
        `, mathCourseCodes);
        console.log(`✅ Deleted ${deleteCoursesResult[0].affectedRows} courses`);
      }

      await connection.commit();
      console.log('✅ Transaction committed successfully');

    } catch (error) {
      await connection.rollback();
      console.error('❌ Transaction rolled back due to error:', error);
      throw error;
    } finally {
      await connection.end();
    }

    // 6. Verify cleanup
    console.log('\n6. VERIFICATION AFTER CLEANUP:');
    
    const remainingCourses = await executeQuery('SELECT COUNT(*) as count FROM courses');
    const remainingRequests = await executeQuery('SELECT COUNT(*) as count FROM enrollment_requests');
    const remainingEnrollments = await executeQuery('SELECT COUNT(*) as count FROM enrollments');
    
    console.log(`📊 Remaining courses: ${remainingCourses[0].count}`);
    console.log(`📊 Remaining enrollment requests: ${remainingRequests[0].count}`);
    console.log(`📊 Remaining enrollments: ${remainingEnrollments[0].count}`);

    // Show remaining courses
    const finalCourses = await executeQuery(`
      SELECT course_code, course_name, slot, faculty_id, current_enrolled, max_capacity
      FROM courses 
      ORDER BY course_code
    `);
    
    console.log('\n📋 REMAINING COURSES:');
    finalCourses.forEach((course, index) => {
      console.log(`   ${index + 1}. ${course.course_code} - ${course.course_name} - Slot ${course.slot} - Enrolled: ${course.current_enrolled}/${course.max_capacity}`);
    });

    console.log('\n✅ CLEANUP COMPLETE - Only mathematics courses remain!');

  } catch (error) {
    console.error('❌ Cleanup error:', error);
  }
}

cleanupAllExceptMathematics();