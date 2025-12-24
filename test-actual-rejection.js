// Test actual rejection process
const { executeQuery } = require('./lib/db.js');

async function testActualRejection() {
  console.log('🧪 Testing Actual Rejection Process...\n');

  try {
    const studentId = 'STU2024001';
    const courseCode = 'UBA0123';
    const facultyId = 'FAC2024001';

    // Step 1: Check current status
    console.log('📊 Step 1: Current enrollment status...');
    const [currentEnrollment] = await executeQuery(`
      SELECT * FROM enrollments 
      WHERE student_id = ? AND course_code = ?
    `, [studentId, courseCode]);

    if (currentEnrollment) {
      console.log(`✅ Current status: ${currentEnrollment.status}`);
      console.log(`   Enrolled on: ${currentEnrollment.enrollment_date}`);
    } else {
      console.log('❌ No enrollment found');
      return;
    }

    // Step 2: Check current course capacity
    console.log('\n📊 Step 2: Current course capacity...');
    const [courseInfo] = await executeQuery(`
      SELECT course_code, course_name, max_capacity, current_enrolled
      FROM courses 
      WHERE course_code = ?
    `, [courseCode]);

    console.log(`✅ Course: ${courseInfo.course_name}`);
    console.log(`   Capacity: ${courseInfo.current_enrolled}/${courseInfo.max_capacity}`);

    // Step 3: Simulate rejection (what the API does)
    console.log('\n📊 Step 3: Simulating rejection...');
    
    if (currentEnrollment.status === 'enrolled') {
      // Update enrollment status to dropped
      await executeQuery(`
        UPDATE enrollments 
        SET status = 'dropped'
        WHERE student_id = ? AND course_code = ? AND faculty_id = ? AND status = 'enrolled'
      `, [studentId, courseCode, facultyId]);

      // Decrease course enrollment count
      await executeQuery(`
        UPDATE courses 
        SET current_enrolled = current_enrolled - 1
        WHERE course_code = ? AND current_enrolled > 0
      `, [courseCode]);

      console.log('✅ Rejection completed!');
    } else {
      console.log('⚠️ Student is not currently enrolled');
    }

    // Step 4: Check status after rejection
    console.log('\n📊 Step 4: Status after rejection...');
    const [afterRejection] = await executeQuery(`
      SELECT * FROM enrollments 
      WHERE student_id = ? AND course_code = ?
    `, [studentId, courseCode]);

    console.log(`✅ New status: ${afterRejection.status}`);

    // Step 5: Check updated course capacity
    const [updatedCourse] = await executeQuery(`
      SELECT course_code, course_name, max_capacity, current_enrolled
      FROM courses 
      WHERE course_code = ?
    `, [courseCode]);

    console.log(`✅ Updated capacity: ${updatedCourse.current_enrolled}/${updatedCourse.max_capacity}`);

    // Step 6: Test student courses API
    console.log('\n📊 Step 6: Testing student courses API...');
    const studentCourses = await executeQuery(`
      SELECT 
        c.course_code, 
        c.course_name, 
        e.status
      FROM enrollments e
      JOIN courses c ON e.course_code = c.course_code
      WHERE e.student_id = ? AND e.status = 'enrolled'
    `, [studentId]);

    console.log(`✅ Student courses API would return: ${studentCourses.length} courses`);
    studentCourses.forEach(course => {
      console.log(`   - ${course.course_code}: ${course.course_name} (${course.status})`);
    });

    // Step 7: Test enrollment slots API
    console.log('\n📊 Step 7: Testing enrollment slots API...');
    const slotStatus = await executeQuery(`
      SELECT 
        c.course_code,
        c.course_name,
        CASE 
          WHEN e.student_id IS NOT NULL AND e.status = 'enrolled' THEN 'enrolled'
          ELSE 'available'
        END as enrollment_status
      FROM courses c
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.student_id = ? AND e.status = 'enrolled'
      WHERE c.course_code = ?
    `, [studentId, courseCode]);

    console.log(`✅ Enrollment slots API would show: ${slotStatus[0].enrollment_status}`);

    console.log('\n🎉 Rejection test completed!');
    console.log('📋 Summary:');
    console.log(`   - Enrollment status: enrolled → ${afterRejection.status}`);
    console.log(`   - Course capacity: ${courseInfo.current_enrolled} → ${updatedCourse.current_enrolled}`);
    console.log(`   - Student courses API: ${studentCourses.length} courses (dropped excluded)`);
    console.log(`   - Enrollment slots API: ${slotStatus[0].enrollment_status} (can re-enroll)`);

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testActualRejection();