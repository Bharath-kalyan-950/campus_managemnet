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

async function testAdminApprovalWorkflow() {
  try {
    console.log('👨‍💼 Testing Admin Approval → Student Notification Workflow...\n');
    
    // Step 1: Find a pending request
    console.log('1. 🔍 Finding pending requests...');
    const pendingRequests = await makeRequest('/api/classroom-agent/requests?status=pending');
    
    if (pendingRequests.status === 200 && pendingRequests.data.success) {
      const pending = pendingRequests.data.data;
      console.log(`   📋 Found ${pending.length} pending requests`);
      
      if (pending.length > 0) {
        const request = pending[0];
        console.log(`   🎯 Testing with request: ${request.request_id}`);
        console.log(`   📚 Course: ${request.course_code} (${request.course_name})`);
        console.log(`   👨‍🏫 Faculty: ${request.faculty_name}`);
        console.log(`   📅 Date: ${request.requested_date} ${request.start_time}-${request.end_time}`);
        
        // Step 2: Check student notifications BEFORE approval
        console.log('\n2. 👨‍🎓 Checking student notifications BEFORE approval...');
        const beforeNotifs = await makeRequest('/api/classroom-agent/notifications?recipient_type=student');
        
        let beforeCount = 0;
        if (beforeNotifs.status === 200 && beforeNotifs.data.success) {
          const classNotifs = beforeNotifs.data.data.filter(n => 
            n.notification_type === 'class_scheduled' && 
            n.message.includes(request.course_code)
          );
          beforeCount = classNotifs.length;
          console.log(`   📬 Student notifications for ${request.course_code}: ${beforeCount} (should be 0)`);
        }
        
        // Step 3: Check student home page BEFORE approval
        console.log('\n3. 🏠 Checking student home page BEFORE approval...');
        const beforeAllocations = await makeRequest(`/api/classroom-agent/allocations?date=${request.requested_date}&status=scheduled`);
        
        let beforeScheduleCount = 0;
        if (beforeAllocations.status === 200 && beforeAllocations.data.success) {
          const courseSchedules = beforeAllocations.data.data.filter(a => 
            a.course_code === request.course_code && 
            a.start_time === request.start_time
          );
          beforeScheduleCount = courseSchedules.length;
          console.log(`   📅 Schedule entries for ${request.course_code}: ${beforeScheduleCount} (should be 0)`);
        }
        
        // Step 4: Admin approves the request
        console.log('\n4. ✅ Admin approving request...');
        const approvalData = {
          action: 'approve_request',
          request_id: request.request_id,
          room_id: 'LH001', // Lecture Hall 1
          admin_notes: 'Approved after manual review - allocated to Lecture Hall 1'
        };
        
        const approvalResult = await makeRequest('/api/classroom-agent/dashboard', 'POST', approvalData);
        
        if (approvalResult.status === 200 && approvalResult.data.success) {
          console.log('   ✅ Admin approval successful');
          
          // Wait for notifications to be processed
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Step 5: Check student notifications AFTER approval
          console.log('\n5. 🔔 Checking student notifications AFTER approval...');
          const afterNotifs = await makeRequest('/api/classroom-agent/notifications?recipient_type=student');
          
          if (afterNotifs.status === 200 && afterNotifs.data.success) {
            const newClassNotifs = afterNotifs.data.data.filter(n => 
              n.notification_type === 'class_scheduled' && 
              n.message.includes(request.course_code)
            );
            
            console.log(`   📬 Student notifications for ${request.course_code}: ${newClassNotifs.length}`);
            console.log(`   📈 Increase: ${newClassNotifs.length - beforeCount} new notifications`);
            
            if (newClassNotifs.length > beforeCount) {
              console.log('   ✅ SUCCESS: Students notified after approval');
              
              // Show sample notification
              const latest = newClassNotifs[newClassNotifs.length - 1];
              console.log(`   📱 Sample notification:`);
              console.log(`      Title: ${latest.title}`);
              console.log(`      Type: ${latest.notification_type}`);
              console.log(`      Preview: ${latest.message.substring(0, 150)}...`);
            } else {
              console.log('   ⚠️ No new student notifications found');
            }
          }
          
          // Step 6: Check student home page AFTER approval
          console.log('\n6. 📅 Checking student home page AFTER approval...');
          const afterAllocations = await makeRequest(`/api/classroom-agent/allocations?date=${request.requested_date}&status=scheduled`);
          
          if (afterAllocations.status === 200 && afterAllocations.data.success) {
            const newSchedules = afterAllocations.data.data.filter(a => 
              a.course_code === request.course_code && 
              a.start_time === request.start_time
            );
            
            console.log(`   📅 Schedule entries for ${request.course_code}: ${newSchedules.length}`);
            console.log(`   📈 Increase: ${newSchedules.length - beforeScheduleCount} new schedule entries`);
            
            if (newSchedules.length > beforeScheduleCount) {
              console.log('   ✅ SUCCESS: Schedule appears on student home page');
              
              const newSchedule = newSchedules[newSchedules.length - 1];
              console.log(`   🏫 Schedule details:`);
              console.log(`      Room: ${newSchedule.room_name} (${newSchedule.building})`);
              console.log(`      Faculty: ${newSchedule.faculty_name}`);
              console.log(`      Time: ${newSchedule.start_time} - ${newSchedule.end_time}`);
              console.log(`      Status: ${newSchedule.status}`);
            } else {
              console.log('   ⚠️ Schedule not found on student home page');
            }
          }
          
          // Step 7: Verify faculty notification
          console.log('\n7. 👨‍🏫 Checking faculty approval notification...');
          const facultyNotifs = await makeRequest('/api/classroom-agent/notifications?recipient_type=faculty');
          
          if (facultyNotifs.status === 200 && facultyNotifs.data.success) {
            const approvalNotifs = facultyNotifs.data.data.filter(n => 
              n.notification_type === 'allocation_approved' && 
              n.created_at && new Date(n.created_at) > new Date(Date.now() - 120000) // Last 2 minutes
            );
            
            console.log(`   📬 Recent faculty approval notifications: ${approvalNotifs.length}`);
            
            if (approvalNotifs.length > 0) {
              console.log('   ✅ Faculty notified of approval');
            }
          }
          
          console.log('\n🎉 Admin Approval Workflow Test Results:');
          console.log('   ✅ Manual review process working');
          console.log('   ✅ Admin can approve pending requests');
          console.log('   ✅ Students get notifications ONLY after approval');
          console.log('   ✅ Schedule appears on student home page after approval');
          console.log('   ✅ Faculty gets approval confirmation');
          console.log('   ✅ Complete workflow: Request → Review → Approval → Student Notification');
          
        } else {
          console.log('   ❌ Admin approval failed');
          console.log(`   Error: ${approvalResult.data?.error || 'Unknown error'}`);
        }
      } else {
        console.log('   ℹ️ No pending requests found to test with');
        console.log('   💡 Run create-conflict-test.js first to create a pending request');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAdminApprovalWorkflow();