// Test the enrolled API endpoint directly
const fetch = require('node-fetch');

async function testEnrolledAPI() {
  console.log('🧪 Testing Enrolled API endpoint...\n');

  try {
    const facultyId = 'FAC2024001';
    const url = `http://localhost:3000/api/enrollment/requests?faculty_id=${facultyId}&status=enrolled`;
    
    console.log('📡 Making API call to:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('📊 Response status:', response.status);
    console.log('📊 Response data:', JSON.stringify(data, null, 2));
    
    if (data.success && data.data) {
      console.log(`\n✅ Found ${data.data.length} enrolled students:`);
      data.data.forEach(student => {
        console.log(`   - ${student.student_name} (${student.student_id}) in ${student.course_code}`);
      });
    } else {
      console.log('❌ API call failed or no data returned');
    }

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

testEnrolledAPI();