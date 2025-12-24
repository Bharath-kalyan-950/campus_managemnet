// Test script for View Course and Enrolled Tab functionality
const { executeQuery } = require('./lib/db.js');

async function testViewCourseAndEnrolledTab() {
  console.log('🧪 Testing View Course and Enrolled Tab functionality...\n');

  try {
    // Test 1: Get faculty courses (for view course page)
    console.log('📊 Test 1: Fetching faculty courses for FAC2024001...');
    const facultyCourses = await executeQuery(`
      SELECT 
        c.course_code, 
        c.course_name, 
        c.credits, 
        c.semester, 
        c.year, 
        c.course_type,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        COALESCE(pending_requests.pending_count, 0) as pending_requests,
        (c.max_capacity - c.current_enrolled - COALESCE(pending_requests.pending_count, 0)) as available_slots,
        COUNT(e.student_id) as enrolled_students
      FROM courses c
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.faculty_id = ?
      LEFT JOIN (
        SELECT course_code, COUNT(*) as pending_count
        FROM enrollment_requests 
        WHERE status = 'pending'
        GROUP BY course_code
      ) pending_requests ON c.course_code = pending_requests.course_code
      WHERE c.faculty_id = ?
      GROUP BY c.course_code, c.course_name, c.credits, c.semester, c.year, c.course_type, c.slot, c.max_capacity, c.current_enrolled, pending_requests.pending_count
      ORDER BY c.slot, c.course_code
    `, ['FAC2024001', 'FAC2024001']);

    console.log(`✅ Found ${facultyCourses.length} courses for faculty FAC2024001:`);
    facultyCourses.forEach(course => {
      console.log(`   - ${course.course_code}: ${course.course_name} (Slot ${course.slot})`);
      console.log(`     Capacity: ${course.current_enrolled}/${course.max_capacity}, Enrolled Students: ${course.enrolled_students}, Running: ${course.enrolled_students > 0 ? 'Yes' : 'No'}`);
    });

    // Test 2: Get enrolled students (for enrolled tab)
    console.log('\n📊 Test 2: Fetching enrolled students for FAC2024001...');
    const enrolledStudents = await executeQuery(`
      SELECT 
        e.id as request_id,
        e.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        us.email as student_email,
        s.department as student_department,
        s.year as student_year,
        s.semester as student_semester,
        s.cgpa as student_cgpa,
        e.course_code,
        c.course_name,
        c.slot,
        e.faculty_id,
        CONCAT(uf.first_name, ' ', uf.last_name) as faculty_name,
        e.status,
        e.enrollment_date,
        e.enrollment_date as processed_at,
        c.max_capacity,
        c.current_enrolled,
        (c.max_capacity - c.current_enrolled) as available_slots
      FROM enrollments e
      JOIN courses c ON e.course_code = c.course_code
      JOIN students s ON e.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      JOIN faculty f ON e.faculty_id = f.faculty_id
      JOIN users uf ON f.user_id = uf.id
      WHERE e.status = 'enrolled' AND e.faculty_id = ?
      ORDER BY e.enrollment_date DESC
    `, ['FAC2024001']);

    console.log(`✅ Found ${enrolledStudents.length} enrolled students for faculty FAC2024001:`);
    enrolledStudents.forEach(student => {
      console.log(`   - ${student.student_name} (${student.student_id}) enrolled in ${student.course_code}: ${student.course_name}`);
      console.log(`     Enrolled on: ${student.enrollment_date}, Slot: ${student.slot}`);
    });

    // Test 3: Check running vs non-running courses
    console.log('\n📊 Test 3: Categorizing courses by running status...');
    const runningCourses = facultyCourses.filter(course => course.enrolled_students > 0);
    const nonRunningCourses = facultyCourses.filter(course => course.enrolled_students === 0);

    console.log(`✅ Running courses (${runningCourses.length}):`);
    runningCourses.forEach(course => {
      console.log(`   - ${course.course_code}: ${course.course_name} (${course.enrolled_students} students)`);
    });

    console.log(`✅ Non-running courses (${nonRunningCourses.length}):`);
    nonRunningCourses.forEach(course => {
      console.log(`   - ${course.course_code}: ${course.course_name} (0 students)`);
    });

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testViewCourseAndEnrolledTab();