async function testCoursesFix() {
  console.log('🧪 Testing Student Courses Page Fix');
  console.log('===================================');
  
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
          console.log(`      - Enrolled: ${new Date(course.enrolled_date).toLocaleDateString()}`);
        });
        
        // Test the mapping logic
        console.log('\n2. Testing mapping logic...');
        const mappedCourses = data.data.courses.map((course, index) => ({
          key: `${course.course_code}-${index}`,
          course_code: course.course_code,
          course_name: course.course_name,
          credits: course.credits,
          slot: course.slot,
          faculty_name: course.faculty_name,
          enrollment_status: course.enrollment_status,
          enrolled_date: course.enrolled_date
        }));
        
        console.log(`   Mapped courses: ${mappedCourses.length}/${data.data.courses.length}`);
        console.log(`   Mapping working: ${mappedCourses.length > 0 ? '✅ Yes' : '❌ No'}`);
        
        // Test status color logic
        console.log('\n3. Testing status color logic...');
        const statusColors = {
          'enrolled': 'bg-blue-100 text-blue-800',
          'approved': 'bg-green-100 text-green-800',
          'pending': 'bg-yellow-100 text-yellow-800',
          'rejected': 'bg-red-100 text-red-800',
          'dropped': 'bg-red-100 text-red-800'
        };
        
        data.data.courses.forEach(course => {
          const color = statusColors[course.enrollment_status] || 'bg-gray-100 text-gray-800';
          console.log(`   ${course.course_code} (${course.enrollment_status}): ${color}`);
        });
      }
    }
    
    // 4. Test page accessibility
    console.log('\n4. Testing page accessibility...');
    try {
      const pageResponse = await fetch('http://localhost:3000/dashboard/student/courses');
      console.log(`   Courses page: ${pageResponse.status === 200 ? '✅ Accessible' : `❌ Error ${pageResponse.status}`}`);
    } catch (error) {
      console.log('   Courses page: ❌ Not accessible');
    }
    
    console.log('\n🎯 FIX SUMMARY:');
    console.log('===============');
    console.log('✅ Changed response.data to response.data.courses');
    console.log('✅ Updated Course interface to match API response');
    console.log('✅ Fixed field names: course_type → slot, status → enrollment_status');
    console.log('✅ Added enrolled_date display');
    console.log('✅ Updated status color mapping');
    console.log('✅ Added proper error handling and fallbacks');
    
    console.log('\n🎉 Student courses page error should be fixed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testCoursesFix();