// Test the enrollment approval process
const http = require('http');

function testAPI(path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    console.log(`🔍 Testing ${method} ${path}`);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`📊 Status: ${res.statusCode}`);
        try {
          const jsonData = JSON.parse(data);
          console.log(`📊 Response:`, JSON.stringify(jsonData, null, 2));
        } catch (e) {
          console.log(`📊 Raw Response:`, data);
        }
        console.log('---\n');
        resolve({ status: res.statusCode, data: JSON.parse(data) });
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Error: ${error.message}`);
      resolve({ status: 'ERROR', error: error.message });
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    
    req.end();
  });
}

async function testApprovalProcess() {
  console.log('🧪 TESTING ENROLLMENT APPROVAL PROCESS');
  console.log('======================================\n');

  // Test 1: Get pending requests
  const pendingResponse = await testAPI('/api/enrollment/requests?faculty_id=FAC2024001&status=pending');
  
  if (pendingResponse.data && pendingResponse.data.success && pendingResponse.data.data.length > 0) {
    const firstRequest = pendingResponse.data.data[0];
    console.log(`🎯 Found pending request: ${firstRequest.request_id} for ${firstRequest.student_name}`);
    
    // Test 2: Approve the first request
    const approvalResponse = await testAPI('/api/enrollment/requests', 'POST', {
      request_id: firstRequest.request_id,
      action: 'approve',
      faculty_id: 'FAC2024001',
      faculty_notes: 'Approved for enrollment'
    });
    
    if (approvalResponse.data && approvalResponse.data.success) {
      console.log('✅ Approval successful!');
      
      // Test 3: Check if student appears in enrolled students
      await testAPI(`/api/faculty/students?course_code=${firstRequest.course_code}&faculty_id=FAC2024001`);
      
      // Test 4: Check updated enrollment requests
      await testAPI('/api/enrollment/requests?faculty_id=FAC2024001&status=approved');
      
    } else {
      console.log('❌ Approval failed');
    }
  } else {
    console.log('❌ No pending requests found');
  }

  console.log('✅ APPROVAL PROCESS TEST COMPLETE');
}

testApprovalProcess();