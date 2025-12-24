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

async function checkRequestStatus() {
  try {
    console.log('🔍 Checking recent requests...\n');
    
    // Check all requests
    const allRequests = await makeRequest('/api/classroom-agent/requests');
    if (allRequests.status === 200 && allRequests.data.success) {
      console.log(`📋 Total requests found: ${allRequests.data.data.length}`);
      
      // Show recent requests
      const recent = allRequests.data.data.slice(0, 3);
      recent.forEach((req, idx) => {
        console.log(`\n${idx + 1}. Request ${req.request_id}:`);
        console.log(`   Status: ${req.status}`);
        console.log(`   Course: ${req.course_code}`);
        console.log(`   Faculty: ${req.faculty_name}`);
        console.log(`   Decision: ${req.decision_type || 'none'}`);
        console.log(`   Reasoning: ${req.reasoning || 'none'}`);
      });
    }
    
    // Check allocations
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    console.log(`\n🏫 Checking allocations for ${tomorrowStr}...`);
    const allocations = await makeRequest(`/api/classroom-agent/allocations?date=${tomorrowStr}`);
    if (allocations.status === 200 && allocations.data.success) {
      console.log(`📅 Allocations found: ${allocations.data.data.length}`);
      
      allocations.data.data.forEach((alloc, idx) => {
        console.log(`\n${idx + 1}. Allocation ${alloc.allocation_id}:`);
        console.log(`   Room: ${alloc.room_name}`);
        console.log(`   Course: ${alloc.course_code}`);
        console.log(`   Time: ${alloc.start_time} - ${alloc.end_time}`);
        console.log(`   Status: ${alloc.status}`);
      });
    }
    
    // Check notifications
    console.log('\n📬 Checking recent notifications...');
    const notifications = await makeRequest('/api/classroom-agent/notifications');
    if (notifications.status === 200 && notifications.data.success) {
      console.log(`🔔 Total notifications: ${notifications.data.data.length}`);
      
      const recent = notifications.data.data.slice(0, 5);
      recent.forEach((notif, idx) => {
        console.log(`\n${idx + 1}. ${notif.title}:`);
        console.log(`   Type: ${notif.notification_type}`);
        console.log(`   Recipient: ${notif.recipient_type}`);
        console.log(`   Message: ${notif.message.substring(0, 100)}...`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkRequestStatus();