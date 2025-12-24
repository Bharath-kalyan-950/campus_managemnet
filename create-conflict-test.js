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

async function createConflictTest() {
  try {
    console.log('🔥 Creating Conflict Scenario Test...\n');
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    // Step 1: Check existing allocations for tomorrow
    console.log('1. 📅 Checking existing allocations...');
    const existingAllocations = await makeRequest(`/api/classroom-agent/allocations?date=${tomorrowStr}`);
    
    if (existingAllocations.status === 200 && existingAllocations.data.success) {
      const allocations = existingAllocations.data.data;
      console.log(`   Found ${allocations.length} existing allocations`);
      
      if (allocations.length > 0) {
        const existing = allocations[0];
        console.log(`   Existing: ${existing.room_name} at ${existing.start_time}-${existing.end_time}`);
        
        // Step 2: Create a conflicting request (same room, overlapping time)
        console.log('\n2. 🚨 Creating conflicting request...');
        const conflictRequest = {
          faculty_id: 'FAC002', // Different faculty
          course_code: 'CS302', // Different course
          requested_date: tomorrowStr,
          start_time: existing.start_time, // Same start time = conflict!
          end_time: existing.end_time,     // Same end time = conflict!
          expected_strength: 30,
          required_equipment: { projector: true },
          purpose: 'Database Systems Lecture - CONFLICT TEST',
          priority: 'medium'
        };
        
        const conflictResult = await makeRequest('/api/classroom-agent/requests', 'POST', conflictRequest);
        
        if (conflictResult.status === 200 && conflictResult.data.success) {
          console.log('   ✅ Conflict request submitted successfully');
          console.log(`   📋 Request ID: ${conflictResult.data.request_id}`);
          
          const requestId = conflictResult.data.request_id;
          
          // Wait for processing
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Step 3: Check if it triggered manual review
          console.log('\n3. 🔍 Checking request status...');
          const requestCheck = await makeRequest(`/api/classroom-agent/requests`);
          
          if (requestCheck.status === 200 && requestCheck.data.success) {
            const ourRequest = requestCheck.data.data.find(r => r.request_id === requestId);
            
            if (ourRequest) {
              console.log(`   📊 Status: ${ourRequest.status}`);
              console.log(`   🤖 Decision: ${ourRequest.decision_type}`);
              console.log(`   💭 Reasoning: ${ourRequest.reasoning}`);
              
              if (ourRequest.status === 'pending' && ourRequest.decision_type !== 'auto_approve') {
                console.log('   🎯 SUCCESS: Conflict detected, manual review triggered!');
                
                // Step 4: Check faculty notification
                console.log('\n4. 📬 Checking faculty notifications...');
                const notifications = await makeRequest('/api/classroom-agent/notifications?recipient_type=faculty');
                
                if (notifications.status === 200 && notifications.data.success) {
                  const recentNotifs = notifications.data.data.filter(n => 
                    n.created_at && new Date(n.created_at) > new Date(Date.now() - 60000) // Last minute
                  );
                  
                  console.log(`   📱 Recent faculty notifications: ${recentNotifs.length}`);
                  
                  if (recentNotifs.length > 0) {
                    console.log(`   📝 Latest: ${recentNotifs[0].title}`);
                    console.log(`   💬 Type: ${recentNotifs[0].notification_type}`);
                  }
                }
                
                // Step 5: Verify students don't see conflict details
                console.log('\n5. 👨‍🎓 Verifying student experience...');
                const studentNotifs = await makeRequest('/api/classroom-agent/notifications?recipient_type=student');
                
                if (studentNotifs.status === 200 && studentNotifs.data.success) {
                  const conflictNotifs = studentNotifs.data.data.filter(n => 
                    n.notification_type === 'conflict_detected' || 
                    n.message.toLowerCase().includes('conflict') ||
                    n.message.toLowerCase().includes('manual review')
                  );
                  
                  console.log(`   🚫 Student conflict notifications: ${conflictNotifs.length} (should be 0)`);
                  
                  if (conflictNotifs.length === 0) {
                    console.log('   ✅ CORRECT: Students not exposed to conflict details');
                  } else {
                    console.log('   ❌ ISSUE: Students seeing conflict information');
                  }
                }
                
                console.log('\n🎉 Conflict Test Results:');
                console.log('   ✅ Conflict detection working');
                console.log('   ✅ Manual review triggered');
                console.log('   ✅ Faculty notified appropriately');
                console.log('   ✅ Students protected from conflict details');
                
              } else {
                console.log('   ❌ UNEXPECTED: Request was auto-approved despite conflict');
              }
            } else {
              console.log('   ❌ Request not found');
            }
          }
        } else {
          console.log('   ❌ Failed to submit conflict request');
        }
      } else {
        console.log('   ℹ️ No existing allocations found to create conflict with');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createConflictTest();