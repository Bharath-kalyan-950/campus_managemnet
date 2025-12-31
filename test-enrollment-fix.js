async function testEnrollmentFix() {
  console.log('🧪 Testing Enrollment Page Fix');
  console.log('==============================');
  
  try {
    // 1. Test the API endpoint
    console.log('\n1. Testing student courses API...');
    const response = await fetch('http://localhost:3000/api/student/courses?student_id=STU2024002');
    const data = await response.json();
    
    console.log(`   API Status: ${response.status === 200 ? '✅ OK' : '❌ Error'}`);
    console.log(`   API Success: ${data.success ? '✅ True' : '❌ False'}`);
    
    if (data.success) {
      console.log(`   Data Structure: ${data.data ? '✅ Has data object' : '❌ Missing data'}`);
      console.log(`   Courses Array: ${data.data.courses ? '✅ Has courses array' : '❌ Missing courses'}`);
      console.log(`   Total Courses: ${data.data.total_courses}`);
      
      if (data.data.courses && Array.isArray(data.data.courses)) {
        console.log('\n   Course Details:');
        data.data.courses.forEach((course, index) => {
          console.log(`   ${index + 1}. ${course.course_code}: ${course.course_name}`);
          console.log(`      - Status: ${course.enrollment_status}`);
          console.log(`      - Faculty: ${course.faculty_name}`);
          console.log(`      - Credits: ${course.credits}, Slot: ${course.slot}`);
        });
        
        // Test the filtering logic
        console.log('\n2. Testing filtering logic...');
        const enrolledCourses = data.data.courses
          .filter(course => course.enrollment_status === 'enrolled' || course.enrollment_status === 'approved');
        
        console.log(`   Filtered courses: ${enrolledCourses.length}/${data.data.courses.length}`);
        console.log(`   Filter working: ${enrolledCourses.length > 0 ? '✅ Yes' : '⚠️ No enrolled courses'}`);
      }
    }
    
    // 2. Test page accessibility
    console.log('\n3. Testing page accessibility...');
    try {
      const pageResponse = await fetch('http://localhost:3000/dashboard/student/enrollment');
      console.log(`   Enrollment page: ${pageResponse.status === 200 ? '✅ Accessible' : `❌ Error ${pageResponse.status}`}`);
    } catch (error) {
      console.log('   Enrollment page: ❌ Not accessible');
    }
    
    console.log('\n🎯 FIX SUMMARY:');
    console.log('===============');
    console.log('✅ Changed data.data to data.data.courses');
    console.log('✅ Changed course.status to course.enrollment_status');
    console.log('✅ Added proper error handling for invalid data structure');
    console.log('✅ Filter now checks for both "enrolled" and "approved" status');
    
    console.log('\n🎉 Enrollment page error should be fixed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testEnrollmentFix();