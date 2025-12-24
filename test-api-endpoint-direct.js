// Test API endpoint directly with curl-like approach
const http = require('http');

function testAPIEndpoint() {
  console.log('🧪 Testing API endpoint directly...\n');

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/enrollment/requests?faculty_id=FAC2024001&status=enrolled',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`📊 Status Code: ${res.statusCode}`);
    console.log(`📊 Headers:`, res.headers);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        console.log('\n📡 Response Data:');
        console.log(JSON.stringify(jsonData, null, 2));
        
        if (jsonData.success && jsonData.data) {
          console.log(`\n✅ API returned ${jsonData.data.length} enrolled students`);
          jsonData.data.forEach((student, index) => {
            console.log(`   ${index + 1}. ${student.student_name} (${student.student_id}) - ${student.course_code}`);
          });
        } else {
          console.log('\n❌ API call failed or returned no data');
        }
      } catch (error) {
        console.error('❌ Error parsing JSON:', error);
        console.log('Raw response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request error:', error.message);
    console.log('💡 Make sure the Next.js development server is running on port 3000');
  });

  req.end();
}

testAPIEndpoint();