const fetch = require('node-fetch');

async function testFacultyAPIEndpoints() {
  const baseUrl = 'http://localhost:3000';
  const facultyId = 'FAC2024001';
  
  console.log('🧪 Testing Faculty API Endpoints...\n');

  try {
    // Test 1: Pending requests
    console.log('📋 Test 1: Pending Requests');
    console.log('='.repeat(50));
    const pendingResponse = await fetch(`${baseUrl}/api/enrollment/requests?faculty_id=${facultyId}&status=pending`);
    const pendingData = await pendingResponse.json();
    
    if (pendingData.success) {
      console.log(`✅ Found ${pendingData.data.length} pending requests:`);
      pendingData.data.forEach(req => {
        console.log(`   ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.status}`);
      });
    } else {
      console.log('❌ Error:', pendingData.error);
    }

    // Test 2: Approved requests
    console.log('\n📋 Test 2: Approved Requests');
    console.log('='.repeat(50));
    const approvedResponse = await fetch(`${baseUrl}/api/enrollment/requests?faculty_id=${facultyId}&status=approved`);
    const approvedData = await approvedResponse.json();
    
    if (approvedData.success) {
      console.log(`✅ Found ${approvedData.data.length} approved requests:`);
      approvedData.data.forEach(req => {
        console.log(`   ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.status}`);
      });
    } else {
      console.log('❌ Error:', approvedData.error);
    }

    // Test 3: Enrolled students
    console.log('\n👥 Test 3: Enrolled Students');
    console.log('='.repeat(50));
    const enrolledResponse = await fetch(`${baseUrl}/api/enrollment/requests?faculty_id=${facultyId}&status=enrolled`);
    const enrolledData = await enrolledResponse.json();
    
    if (enrolledData.success) {
      console.log(`✅ Found ${enrolledData.data.length} enrolled students:`);
      enrolledData.data.forEach(req => {
        console.log(`   ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.status}`);
      });
    } else {
      console.log('❌ Error:', enrolledData.error);
    }

    // Test 4: Rejected requests
    console.log('\n❌ Test 4: Rejected Requests');
    console.log('='.repeat(50));
    const rejectedResponse = await fetch(`${baseUrl}/api/enrollment/requests?faculty_id=${facultyId}&status=rejected`);
    const rejectedData = await rejectedResponse.json();
    
    if (rejectedData.success) {
      console.log(`✅ Found ${rejectedData.data.length} rejected requests:`);
      rejectedData.data.forEach(req => {
        console.log(`   ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.status}`);
      });
    } else {
      console.log('❌ Error:', rejectedData.error);
    }

  } catch (error) {
    console.error('❌ API Test Error:', error.message);
    console.log('\n💡 Make sure the development server is running with: npm run dev');
  }
}

testFacultyAPIEndpoints();