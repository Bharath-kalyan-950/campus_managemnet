const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testAPI(endpoint, method = 'GET', body = null) {
  try {
    console.log(`🔍 Testing ${method} ${endpoint}`);
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    
    console.log(`📊 Status: ${response.status}`);
    console.log(`📊 Response:`, JSON.stringify(data, null, 2));
    console.log('---\n');
    
    return { status: response.status, data };
  } catch (error) {
    console.error(`❌ Error testing ${endpoint}:`, error.message);
    return { status: 'ERROR', error: error.message };
  }
}

async function testFacultyPortalAPIs() {
  console.log('🧪 TESTING FACULTY PORTAL APIs');
  console.log('===============================\n');

  // Test 1: Faculty Profile API (with faculty_id param)
  await testAPI('/api/faculty/profile?faculty_id=FAC2024001');

  // Test 2: Faculty Courses API
  await testAPI('/api/faculty/courses?faculty_id=FAC2024001');

  // Test 3: Enrollment Requests API (pending)
  await testAPI('/api/enrollment/requests?faculty_id=FAC2024001&status=pending');

  // Test 4: Enrollment Requests API (all)
  await testAPI('/api/enrollment/requests?faculty_id=FAC2024001');

  // Test 5: Classroom Agent Notifications API
  await testAPI('/api/classroom-agent/notifications?recipient_type=faculty');

  // Test 6: Classroom Agent Notifications API (specific faculty)
  await testAPI('/api/classroom-agent/notifications?recipient_id=FAC2024001&recipient_type=faculty');

  console.log('✅ ALL API TESTS COMPLETED');
}

// Run the tests
testFacultyPortalAPIs().catch(console.error);