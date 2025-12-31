// Test student attendance API
async function testStudentAttendance() {
  const baseUrl = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing Student Attendance API for Rajesh...\n');

    // Test student attendance
    console.log('Testing /api/student/attendance for STU2024002 (Rajesh)');
    const response = await fetch(`${baseUrl}/api/student/attendance?student_id=STU2024002`);
    const data = await response.json();
    
    console.log('API Response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ Success! Found data:');
      console.log('Total courses:', data.data.overall_stats.total_courses);
      console.log('Overall percentage:', data.data.overall_stats.overall_percentage);
      console.log('Courses:');
      data.data.courses.forEach(c => {
        console.log(`  - ${c.course_code}: ${c.attendance_percentage}% (${c.exam_eligibility})`);
      });
    } else {
      console.log('❌ Failed:', data.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testStudentAttendance();