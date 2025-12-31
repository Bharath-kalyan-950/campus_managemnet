async function testODRequestsAPI() {
  console.log('🧪 Testing OD Requests API...');
  
  try {
    // Test GET - Fetch existing OD requests
    console.log('\n1. Testing GET /api/faculty/od-requests...');
    const getResponse = await fetch('http://localhost:3000/api/faculty/od-requests?faculty_id=FAC2024001');
    const getData = await getResponse.json();
    
    console.log(`   Status: ${getResponse.status}`);
    console.log(`   Success: ${getData.success}`);
    
    if (getData.success) {
      console.log(`   Total requests: ${getData.data.total_requests}`);
      console.log('   Sample requests:');
      getData.data.requests.slice(0, 3).forEach(req => {
        console.log(`     - ${req.request_id}: ${req.course_code} (${req.status})`);
      });
    } else {
      console.log(`   Error: ${getData.error}`);
    }
    
    // Test POST - Create new OD request
    console.log('\n2. Testing POST /api/faculty/od-requests...');
    const formData = new FormData();
    formData.append('course_code', 'CSA022');
    formData.append('od_date', '2025-01-15');
    formData.append('od_reason', 'Test OD request for API validation - attending workshop on advanced Python programming');
    formData.append('od_type', 'training');
    
    const postResponse = await fetch('http://localhost:3000/api/faculty/od-requests', {
      method: 'POST',
      body: formData
    });
    
    const postData = await postResponse.json();
    
    console.log(`   Status: ${postResponse.status}`);
    console.log(`   Success: ${postData.success}`);
    
    if (postData.success) {
      console.log(`   Created request ID: ${postData.data.request_id}`);
      console.log(`   Message: ${postData.data.message}`);
    } else {
      console.log(`   Error: ${postData.error}`);
    }
    
    // Test PUT - Update OD request status
    if (postData.success) {
      console.log('\n3. Testing PUT /api/faculty/od-requests...');
      const putResponse = await fetch('http://localhost:3000/api/faculty/od-requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request_id: postData.data.request_id,
          status: 'approved',
          faculty_remarks: 'Approved for professional development'
        })
      });
      
      const putData = await putResponse.json();
      
      console.log(`   Status: ${putResponse.status}`);
      console.log(`   Success: ${putData.success}`);
      
      if (putData.success) {
        console.log(`   Message: ${putData.data.message}`);
      } else {
        console.log(`   Error: ${putData.error}`);
      }
    }
    
    // Final verification - Get updated requests
    console.log('\n4. Final verification...');
    const finalResponse = await fetch('http://localhost:3000/api/faculty/od-requests?faculty_id=FAC2024001');
    const finalData = await finalResponse.json();
    
    if (finalData.success) {
      console.log(`   Total requests after test: ${finalData.data.total_requests}`);
      const latestRequest = finalData.data.requests[0];
      console.log(`   Latest request: ${latestRequest.request_id} (${latestRequest.status})`);
    }
    
    console.log('\n🎉 OD Requests API testing completed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

testODRequestsAPI();