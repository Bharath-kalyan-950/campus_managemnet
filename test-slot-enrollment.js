const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testSlotEnrollment() {
  console.log('🧪 Testing Slot-Based Enrollment System\n');

  try {
    // Test 1: Get courses by slot
    console.log('1. Testing GET courses by slot...');
    const slotsResponse = await fetch(`${BASE_URL}/api/enrollment/slots?slot=A&student_id=STU2024001`);
    const slotsData = await slotsResponse.json();
    
    if (slotsData.success) {
      console.log('✅ Successfully fetched courses for Slot A');
      console.log(`   Found ${slotsData.data.length} courses`);
      slotsData.data.forEach(course => {
        console.log(`   - ${course.course_code}: ${course.course_name} (${course.current_enrolled}/${course.max_capacity})`);
      });
    } else {
      console.log('❌ Failed to fetch courses:', slotsData.error);
    }

    console.log('\n2. Testing enrollment request submission...');
    // Test 2: Submit enrollment request
    const enrollResponse = await fetch(`${BASE_URL}/api/enrollment/slots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: 'STU2024001',
        course_code: 'CS301',
        slot: 'A'
      })
    });
    
    const enrollData = await enrollResponse.json();
    
    if (enrollData.success) {
      console.log('✅ Successfully submitted enrollment request');
      console.log(`   Request ID: ${enrollData.request_id}`);
    } else {
      console.log('❌ Failed to submit enrollment request:', enrollData.error);
    }

    console.log('\n3. Testing faculty enrollment requests view...');
    // Test 3: Get enrollment requests for faculty
    const requestsResponse = await fetch(`${BASE_URL}/api/enrollment/requests?faculty_id=FAC2024001&status=pending`);
    const requestsData = await requestsResponse.json();
    
    if (requestsData.success) {
      console.log('✅ Successfully fetched enrollment requests');
      console.log(`   Found ${requestsData.data.length} pending requests`);
      requestsData.data.forEach(request => {
        console.log(`   - ${request.student_name} → ${request.course_code} (Slot ${request.slot})`);
      });
    } else {
      console.log('❌ Failed to fetch enrollment requests:', requestsData.error);
    }

    console.log('\n🎉 Slot-based enrollment system test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testSlotEnrollment();