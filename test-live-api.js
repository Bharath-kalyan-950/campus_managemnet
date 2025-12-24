// Test the live API endpoint
const http = require('http');

async function testLiveAPI() {
  console.log('🧪 Testing Live API Endpoint...\n');

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/enrollment/requests?faculty_id=FAC2024001&status=enrolled',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log('📡 Making request to:', `http://localhost:3000${options.path}`);

    const req = http.request(options, (res) => {
      console.log(`📊 Status Code: ${res.statusCode}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('\n📡 API Response:');
          console.log('Success:', jsonData.success);
          console.log('Data length:', jsonData.data ? jsonData.data.length : 0);
          
          if (jsonData.debug) {
            console.log('\n🔍 Debug Info:');
            console.log('Status:', jsonData.debug.status);
            console.log('Faculty ID:', jsonData.debug.facultyId);
            console.log('Record Count:', jsonData.debug.recordCount);
          }
          
          if (jsonData.success && jsonData.data && jsonData.data.length > 0) {
            console.log('\n✅ Enrolled Students Found:');
            jsonData.data.forEach((student, index) => {
              console.log(`   ${index + 1}. ${student.student_name} (${student.student_id})`);
              console.log(`      Course: ${student.course_code} - ${student.course_name}`);
              console.log(`      Slot: ${student.slot}`);
            });
            console.log('\n🎉 API is working correctly!');
          } else {
            console.log('\n❌ No enrolled students returned by API');
          }
          
          resolve(jsonData);
        } catch (error) {
          console.error('❌ Error parsing JSON:', error);
          console.log('Raw response:', data);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      console.log('\n💡 Make sure to:');
      console.log('   1. Start the Next.js development server: npm run dev');
      console.log('   2. Ensure the server is running on port 3000');
      console.log('   3. Check that the API route exists');
      reject(error);
    });

    req.setTimeout(5000, () => {
      console.log('❌ Request timeout - server might not be running');
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

// Run the test
testLiveAPI().catch(error => {
  console.error('Test failed:', error.message);
});