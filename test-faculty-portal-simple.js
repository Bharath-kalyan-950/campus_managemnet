// Simple test using Node.js built-in modules
const http = require('http');

function testAPI(path, callback) {
  console.log(`🔍 Testing: ${path}`);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: path,
    method: 'GET',
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
      callback();
    });
  });

  req.on('error', (error) => {
    console.error(`❌ Error: ${error.message}`);
    callback();
  });

  req.end();
}

async function runTests() {
  console.log('🧪 TESTING FACULTY PORTAL APIs');
  console.log('===============================\n');

  const tests = [
    '/api/faculty/profile?faculty_id=FAC2024001',
    '/api/faculty/courses?faculty_id=FAC2024001',
    '/api/enrollment/requests?faculty_id=FAC2024001&status=pending',
    '/api/classroom-agent/notifications?recipient_type=faculty'
  ];

  for (let i = 0; i < tests.length; i++) {
    await new Promise((resolve) => {
      testAPI(tests[i], resolve);
    });
  }

  console.log('✅ ALL API TESTS COMPLETED');
}

runTests();