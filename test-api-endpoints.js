const http = require('http');

async function testAPIEndpoints() {
  console.log('🧪 Testing API Endpoints\n');

  // Test faculty courses API
  console.log('1️⃣ Testing Faculty Courses API:');
  try {
    const facultyCoursesUrl = 'http://localhost:3000/api/faculty/courses?faculty_id=FAC2024001';
    console.log(`   GET ${facultyCoursesUrl}`);
    
    // Note: This would require the server to be running and proper authentication
    console.log('   ⚠️  Manual test required - server must be running');
    console.log('   Expected: List of courses for faculty FAC2024001');
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Test enrollment requests API
  console.log('\n2️⃣ Testing Enrollment Requests API:');
  try {
    const enrollmentRequestsUrl = 'http://localhost:3000/api/enrollment/requests?faculty_id=FAC2024001&status=pending';
    console.log(`   GET ${enrollmentRequestsUrl}`);
    
    console.log('   ⚠️  Manual test required - server must be running');
    console.log('   Expected: List of pending enrollment requests');
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  console.log('\n🔧 TROUBLESHOOTING STEPS:');
  console.log('   1. Make sure the development server is running (npm run dev)');
  console.log('   2. Login as faculty: daniel@simats.edu / password');
  console.log('   3. Go to Course → Approve');
  console.log('   4. Try filtering by "All Courses" first, then "Slot B"');
  console.log('   5. Check browser console for any JavaScript errors');
  console.log('   6. Check network tab for API call responses');

  console.log('\n📊 EXPECTED DATA:');
  console.log('   Slot B should show:');
  console.log('   - John Doe → CS302 - Database Management Systems');
  console.log('   - John Doe → UBA0123 - Engineering Mathematics II');
  console.log('   - Priya Sharma → CS302 - Database Management Systems');

  console.log('\n🎯 QUICK FIX STEPS:');
  console.log('   1. Refresh the browser page');
  console.log('   2. Clear browser cache');
  console.log('   3. Try logging out and logging back in');
  console.log('   4. Check if the faculty ID in localStorage matches FAC2024001');
}

testAPIEndpoints();