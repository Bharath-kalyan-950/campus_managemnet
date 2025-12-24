const mysql = require('mysql2/promise');

async function checkStudentData() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  try {
    console.log('=== STUDENT STU2024001 DATA ===\n');
    
    // Check enrollments
    console.log('📚 Current Enrollments:');
    const [enrollments] = await connection.execute(`
      SELECT e.*, c.course_name, c.slot 
      FROM enrollments e 
      JOIN courses c ON e.course_code = c.course_code 
      WHERE e.student_id = 'STU2024001'
    `);
    
    if (enrollments.length === 0) {
      console.log('   No enrollments found');
    } else {
      enrollments.forEach(e => {
        console.log(`   ✅ ${e.course_code} - ${e.course_name} [Slot ${e.slot}]`);
      });
    }
    
    // Check pending requests
    console.log('\n⏳ Pending Requests:');
    const [requests] = await connection.execute(`
      SELECT er.*, c.course_name, c.slot 
      FROM enrollment_requests er 
      JOIN courses c ON er.course_code = c.course_code 
      WHERE er.student_id = 'STU2024001' AND er.status = 'pending'
    `);
    
    if (requests.length === 0) {
      console.log('   No pending requests found');
    } else {
      requests.forEach(r => {
        console.log(`   ⏳ ${r.course_code} - ${r.course_name} [Slot ${r.slot}]`);
      });
    }
    
    // Find a course that's available for testing
    console.log('\n📋 Available Courses for Testing:');
    const [availableCourses] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        CASE 
          WHEN e.student_id IS NOT NULL THEN 'enrolled'
          WHEN er.student_id IS NOT NULL THEN 'pending'
          ELSE 'available'
        END as status
      FROM courses c
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.student_id = 'STU2024001'
      LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.student_id = 'STU2024001' AND er.status = 'pending'
      WHERE c.slot IS NOT NULL AND c.faculty_id IS NOT NULL
      ORDER BY c.slot, c.course_code
    `);
    
    availableCourses.forEach(course => {
      const statusIcon = course.status === 'enrolled' ? '✅' : 
                        course.status === 'pending' ? '⏳' : '📚';
      console.log(`   ${statusIcon} ${course.course_code} - ${course.course_name} [Slot ${course.slot}] - ${course.status}`);
    });
    
    // Find the first available course for testing
    const testCourse = availableCourses.find(c => c.status === 'available');
    if (testCourse) {
      console.log(`\n🎯 Best course for testing: ${testCourse.course_code} [Slot ${testCourse.slot}]`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await connection.end();
  }
}

checkStudentData();