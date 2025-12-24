// Test just the notifications API
const http = require('http');

function testAPI(path) {
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
    });
  });

  req.on('error', (error) => {
    console.error(`❌ Error: ${error.message}`);
  });

  req.end();
}

testAPI('/api/classroom-agent/notifications?recipient_type=faculty');