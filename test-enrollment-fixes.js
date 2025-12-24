// Test the enrollment system fixes
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
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Error: ${error.message}`);
      resolve();
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    
    req.end();
  });
}

async function testEnrollmentFixes() {
  console.log('🧪 TESTING ENROLLMENT FIXES');
  console.log('============================\n');

  // Test 1: Check enrollment requests for Daniel (should show Rajesh now)
  await testAPI('/api/enrollment/requests?faculty_id=FAC2024001&status=pending');

  // Test 2: Check courses in Slot B (mathematics slot)
  await testAPI('/api/enrollment/slots?slot=B&student_id=STU2024002');

  // Test 3: Check courses in Slot B without student_id (universal view)
  await testAPI('/api/enrollment/slots?slot=B');

  // Test 4: Check Rajesh's enrollment requests
  await testAPI('/api/enrollment/requests?student_id=STU2024002');

  console.log('✅ ALL TESTS COMPLETED');
}

testEnrollmentFixes();