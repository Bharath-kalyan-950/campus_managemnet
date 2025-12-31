// Test the attendance APIs
async function testAttendanceAPIs() {
  const baseUrl = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing Attendance APIs...\n');

    // Test 1: Get Daniel's courses
    console.log('1. Testing /api/faculty/courses/my-courses');
    const coursesResponse = await fetch(`${baseUrl}/api/faculty/courses/my-courses?faculty_id=FAC2024001`);
    const coursesData = await coursesResponse.json();
    console.log('Courses API Response:', coursesData.success ? `✅ ${coursesData.data.courses.length} courses found` : `❌ ${coursesData.error}`);
    
    if (coursesData.success) {
      coursesData.data.courses.forEach(c => console.log(`  - ${c.course_code}: ${c.course_name}`));
    }

    // Test 2: Get students for CSA022
    console.log('\n2. Testing /api/faculty/students for CSA022');
    const studentsResponse = await fetch(`${baseUrl}/api/faculty/students?course_code=CSA022&faculty_id=FAC2024001`);
    const studentsData = await studentsResponse.json();
    console.log('Students API Response:', studentsData.success ? `✅ ${studentsData.total_students} students found` : `❌ ${studentsData.error}`);
    
    if (studentsData.success) {
      studentsData.data.forEach(s => console.log(`  - ${s.student_id}: ${s.student_name} (${s.attendance_percentage}%)`));
    }

    // Test 3: Get student attendance for Rajesh
    console.log('\n3. Testing /api/student/attendance for Rajesh');
    const attendanceResponse = await fetch(`${baseUrl}/api/student/attendance?student_id=STU2024002`);
    const attendanceData = await attendanceResponse.json();
    console.log('Student Attendance API Response:', attendanceData.success ? `✅ ${attendanceData.data.courses.length} courses found` : `❌ ${attendanceData.error}`);
    
    if (attendanceData.success) {
      attendanceData.data.courses.forEach(c => console.log(`  - ${c.course_code}: ${c.attendance_percentage}% (${c.exam_eligibility})`));
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAttendanceAPIs();