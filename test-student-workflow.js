const http = require('http');

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testStudentWorkflow() {
  console.log('🧪 Testing Student Classroom Workflow...\n');

  try {
    // Test 1: Check student home page loads with classroom schedule
    console.log('1. Testing Student Home Page...');
    const homeResult = await makeRequest('/dashboard/student');
    
    if (homeResult.status === 200) {
      console.log('   ✅ Student home page loads successfully');
      const hasScheduleSection = homeResult.data.includes('My Classroom Schedule');
      console.log(`   📅 Classroom schedule section: ${hasScheduleSection ? '✅ Present' : '❌ Missing'}`);
    } else {
      console.log(`   ❌ Failed to load student home page: ${homeResult.status}`);
    }

    // Test 2: Check allocations API returns proper data
    console.log('\n2. Testing Classroom Allocations API...');
    const today = new Date().toISOString().split('T')[0];
    const allocationsResult = await makeRequest(`/api/classroom-agent/allocations?date=${today}&status=scheduled`);
    
    if (allocationsResult.status === 200 && allocationsResult.data.success) {
      console.log('   ✅ Allocations API working');
      console.log(`   📊 Allocations found: ${allocationsResult.data.data?.length || 0}`);
      
      if (allocationsResult.data.data?.length > 0) {
        const allocation = allocationsResult.data.data[0];
        console.log('   📋 Sample allocation includes:');
        console.log(`      • Room details: ${allocation.room_name ? '✅' : '❌'}`);
        console.log(`      • Faculty name: ${allocation.faculty_name ? '✅' : '❌'}`);
        console.log(`      • Course info: ${allocation.course_name ? '✅' : '❌'}`);
      }
    } else {
      console.log('   ❌ Allocations API failed');
    }

    // Test 3: Check notifications API for students
    console.log('\n3. Testing Student Notifications...');
    const notificationsResult = await makeRequest('/api/classroom-agent/notifications?recipient_type=student');
    
    if (notificationsResult.status === 200 && notificationsResult.data.success) {
      console.log('   ✅ Notifications API working');
      const notifications = notificationsResult.data.data || [];
      console.log(`   📬 Student notifications: ${notifications.length}`);
      
      const classScheduleNotifs = notifications.filter(n => n.notification_type === 'class_scheduled');
      console.log(`   🏫 Class schedule notifications: ${classScheduleNotifs.length}`);
      
      const conflictNotifs = notifications.filter(n => n.notification_type === 'conflict_detected');
      console.log(`   ⚠️ Conflict notifications (should be 0): ${conflictNotifs.length}`);
    } else {
      console.log('   ❌ Notifications API failed');
    }

    console.log('\n🎉 Student Workflow Test Complete!');
    console.log('\n✨ Expected Student Experience:');
    console.log('   1. 🏠 Home page shows "My Classroom Schedule" with real data');
    console.log('   2. 📅 Only approved schedules appear (no pending/conflict info)');
    console.log('   3. 🔔 Students get notifications only when classes are approved');
    console.log('   4. 🚫 No conflict details or manual review status shown to students');
    console.log('   5. 📍 Full room and faculty details displayed when approved');

    console.log('\n🎯 Test URLs:');
    console.log('   • Student Home: http://localhost:3000/dashboard/student');
    console.log('   • Admin Dashboard: http://localhost:3000/dashboard/admin/classroom-agent');
    console.log('   • Faculty Requests: http://localhost:3000/dashboard/faculty/classroom-request');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testStudentWorkflow();