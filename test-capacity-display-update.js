// Test the updated capacity display
const http = require('http');

function testAPI(path) {
  return new Promise((resolve) => {
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
          if (jsonData.success && jsonData.data) {
            console.log(`📊 Courses returned: ${jsonData.data.length}`);
            jsonData.data.forEach((course, index) => {
              console.log(`   ${index + 1}. ${course.course_code} - Available: ${course.available_slots} - Status: ${course.enrollment_status}`);
            });
          } else {
            console.log(`📊 Response:`, JSON.stringify(jsonData, null, 2));
          }
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

    req.end();
  });
}

async function testCapacityDisplay() {
  console.log('🧪 TESTING UPDATED CAPACITY DISPLAY');
  console.log('===================================\n');

  // Test 1: Check Slot B with student ID (should show mathematics with 28 available)
  await testAPI('/api/enrollment/slots?slot=B&student_id=STU2024002');

  // Test 2: Check Slot B without student ID (universal view)
  await testAPI('/api/enrollment/slots?slot=B');

  // Test 3: Check a slot with no courses (should return empty)
  await testAPI('/api/enrollment/slots?slot=A');

  console.log('✅ CAPACITY DISPLAY TEST COMPLETE');
  console.log('\nExpected Frontend Display:');
  console.log('- Mathematics course should show "Capacity: 28 available"');
  console.log('- Only courses with available slots should be displayed');
  console.log('- Courses with 0 available slots should be hidden (unless student has pending/enrolled status)');
}

testCapacityDisplay();