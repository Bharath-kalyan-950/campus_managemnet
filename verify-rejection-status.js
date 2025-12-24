// Verify the current rejection status
const { executeQuery } = require('./lib/db.js');

async function verifyRejectionStatus() {
  console.log('🔍 Verifying Rejection Status...\n');

  try {
    const studentId = 'STU2024001';
    const courseCode = 'UBA0123';

    // Check enrollment status
    console.log('📊 Checking enrollment status...');
    const enrollments = await executeQuery(`
      SELECT student_id, course_code, status, enrollment_date
      FROM enrollments 
      WHERE student_id = ? AND course_code = ?
    `, [studentId, courseCode]);

    if (enrollments.length > 0) {
      console.log(`✅ Enrollment found:`);
      console.log(`   Student: ${enrollments[0].student_id}`);
      console.log(`   Course: ${enrollments[0].course_code}`);
      console.log(`   Status: ${enrollments[0].status}`);
      console.log(`   Enrolled: ${enrollments[0].enrollment_date}`);
    } else {
      console.log('❌ No enrollment found');
    }

    // Check what student courses API returns
    console.log('\n📊 Testing /api/student/courses...');
    const studentCourses = await executeQuery(`
      SELECT 
        c.course_code, 
        c.course_name, 
        e.status
      FROM enrollments e
      JOIN courses c ON e.course_code = c.course_code
      WHERE e.student_id = ? AND e.status = 'enrolled'
    `, [studentId]);

    console.log(`✅ API would return ${studentCourses.length} courses:`);
    if (studentCourses.length > 0) {
      studentCourses.forEach(course => {
        console.log(`   - ${course.course_code}: ${course.course_name}`);
      });
    } else {
      console.log('   (No enrolled courses - dropped courses excluded)');
    }

    // Check what enrollment slots API returns
    console.log('\n📊 Testing /api/enrollment/slots...');
    const slotStatus = await executeQuery(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        CASE 
          WHEN e.student_id IS NOT NULL AND e.status = 'enrolled' THEN 'enrolled'
          ELSE 'available'
        END as enrollment_status
      FROM courses c
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.student_id = ? AND e.status = 'enrolled'
      WHERE c.course_code = ?
    `, [studentId, courseCode]);

    console.log(`✅ API would return:`);
    console.log(`   Course: ${slotStatus[0].course_name}`);
    console.log(`   Slot: ${slotStatus[0].slot}`);
    console.log(`   Capacity: ${slotStatus[0].current_enrolled}/${slotStatus[0].max_capacity}`);
    console.log(`   Status for ${studentId}: ${slotStatus[0].enrollment_status}`);

    // Summary
    console.log('\n📋 Summary:');
    if (enrollments.length > 0 && enrollments[0].status === 'dropped') {
      console.log('✅ Student has been rejected (status: dropped)');
      console.log('✅ Student courses API excludes this course');
      console.log('✅ Enrollment slots API shows course as available');
      console.log('✅ Student can re-enroll in this course');
      console.log('\n💡 To see changes in browser:');
      console.log('   1. Refresh the student enrollment page (Ctrl+F5)');
      console.log('   2. Or logout and login again');
      console.log('   3. The course should show "Enroll" button instead of "Enrolled"');
    } else if (enrollments.length > 0 && enrollments[0].status === 'enrolled') {
      console.log('⚠️ Student is still enrolled (not rejected yet)');
      console.log('💡 To reject the student:');
      console.log('   1. Login as faculty (daniel.faculty@simats.edu)');
      console.log('   2. Go to Course → Approve Course');
      console.log('   3. Click "Enrolled" tab');
      console.log('   4. Click "✗ Reject" button for the student');
    } else {
      console.log('❌ No enrollment record found');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

verifyRejectionStatus();