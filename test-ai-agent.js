/**
 * Test script for Google Gemini AI Classroom Agent
 */

const mysql = require('mysql2/promise');

async function testAIAgent() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  try {
    console.log('🧪 Testing Google Gemini AI Classroom Agent...\n');

    // 1. Create test allocation requests
    console.log('📝 Creating test allocation requests...');
    
    const testRequests = [
      {
        request_id: `REQ_TEST_${Date.now()}_1`,
        faculty_id: 'FAC2024001',
        course_code: 'CS101',
        purpose: 'Data Structures Lecture',
        requested_date: '2025-01-15',
        start_time: '09:00:00',
        end_time: '10:30:00',
        expected_strength: 45,
        priority: 'high',
        required_equipment: JSON.stringify({
          projector: true,
          whiteboard: true,
          computer: true,
          speakers: false
        })
      },
      {
        request_id: `REQ_TEST_${Date.now()}_2`,
        faculty_id: 'FAC2024002',
        course_code: 'CS201',
        purpose: 'Database Systems Lab',
        requested_date: '2025-01-15',
        start_time: '09:30:00',
        end_time: '11:00:00',
        expected_strength: 30,
        priority: 'medium',
        required_equipment: JSON.stringify({
          projector: true,
          whiteboard: false,
          computer: true,
          speakers: false
        })
      },
      {
        request_id: `REQ_TEST_${Date.now()}_3`,
        faculty_id: 'FAC2024001',
        course_code: 'CS301',
        purpose: 'Machine Learning Workshop',
        requested_date: '2025-01-15',
        start_time: '10:00:00',
        end_time: '12:00:00',
        expected_strength: 60,
        priority: 'urgent',
        required_equipment: JSON.stringify({
          projector: true,
          whiteboard: true,
          computer: true,
          speakers: true
        })
      }
    ];

    for (const request of testRequests) {
      await connection.execute(`
        INSERT INTO allocation_requests (
          request_id, faculty_id, course_code, purpose, requested_date,
          start_time, end_time, expected_strength, priority, required_equipment,
          status, requested_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
      `, [
        request.request_id, request.faculty_id, request.course_code,
        request.purpose, request.requested_date, request.start_time,
        request.end_time, request.expected_strength, request.priority,
        request.required_equipment
      ]);
    }

    console.log('✅ Created 3 test allocation requests');

    // 2. Create test conflicts
    console.log('⚠️ Creating test conflicts...');
    
    const testConflicts = [
      {
        conflict_id: `CONF_TEST_${Date.now()}_1`,
        request_id: testRequests[0].request_id,
        conflict_type: 'time_overlap',
        description: 'Multiple requests for same time slot in IT Building',
        severity: 'high',
        priority: 'high'
      },
      {
        conflict_id: `CONF_TEST_${Date.now()}_2`,
        request_id: testRequests[2].request_id,
        conflict_type: 'room_capacity',
        description: 'Required capacity (60) exceeds available room capacity',
        severity: 'medium',
        priority: 'medium'
      }
    ];

    for (const conflict of testConflicts) {
      await connection.execute(`
        INSERT INTO allocation_conflicts (
          conflict_id, request_id, conflict_type, description,
          severity, priority, resolution_status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'unresolved', NOW())
      `, [
        conflict.conflict_id, conflict.request_id, conflict.conflict_type,
        conflict.description, conflict.severity, conflict.priority
      ]);
    }

    console.log('✅ Created 2 test conflicts');

    // 3. Test AI endpoints
    console.log('\n🤖 Testing AI endpoints...\n');

    // Test AI Status
    console.log('1. Testing AI Status...');
    const statusResponse = await fetch('http://localhost:3000/api/classroom-agent/ai-process');
    const statusData = await statusResponse.json();
    console.log('AI Status:', statusData.success ? '✅ Working' : '❌ Failed');
    console.log('AI Type:', statusData.data?.ai_type);
    console.log('AI Enabled:', statusData.data?.ai_enabled);
    console.log('Capabilities:', statusData.data?.capabilities?.slice(0, 3).join(', '));

    // Test Conflict Analysis
    console.log('\n2. Testing Conflict Analysis...');
    const conflictResponse = await fetch('http://localhost:3000/api/classroom-agent/ai-process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'analyze_conflicts',
        date: '2025-01-15'
      })
    });
    const conflictData = await conflictResponse.json();
    console.log('Conflict Analysis:', conflictData.success ? '✅ Working' : '❌ Failed');
    if (conflictData.success) {
      console.log('Conflicts Analyzed:', conflictData.data?.conflicts_analyzed);
      console.log('AI Analysis Available:', !!conflictData.data?.ai_analysis);
    }

    // Test Allocation Processing
    console.log('\n3. Testing Allocation Processing...');
    const allocationResponse = await fetch('http://localhost:3000/api/classroom-agent/ai-process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'process_allocations',
        date: '2025-01-15'
      })
    });
    const allocationData = await allocationResponse.json();
    console.log('Allocation Processing:', allocationData.success ? '✅ Working' : '❌ Failed');
    if (allocationData.success) {
      console.log('Processed Requests:', allocationData.data?.processed_requests);
      console.log('Approved:', allocationData.data?.approved);
      console.log('AI Insights Available:', !!allocationData.data?.ai_insights);
    }

    // Test Notification Generation
    console.log('\n4. Testing Notification Generation...');
    const notificationResponse = await fetch('http://localhost:3000/api/classroom-agent/ai-process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'generate_notifications',
        date: '2025-01-15'
      })
    });
    const notificationData = await notificationResponse.json();
    console.log('Notification Generation:', notificationData.success ? '✅ Working' : '❌ Failed');
    if (notificationData.success) {
      console.log('Notifications Generated:', notificationData.data?.notifications_generated);
    }

    console.log('\n🎉 AI Agent Testing Complete!');
    console.log('\n📊 Test Summary:');
    console.log('- AI Status:', statusData.success ? '✅' : '❌');
    console.log('- Conflict Analysis:', conflictData.success ? '✅' : '❌');
    console.log('- Allocation Processing:', allocationData.success ? '✅' : '❌');
    console.log('- Notification Generation:', notificationData.success ? '✅' : '❌');

    console.log('\n🌐 Open Chrome and navigate to:');
    console.log('http://localhost:3000/dashboard/admin/classroom-agent');
    console.log('\nThen test the AI buttons:');
    console.log('1. Click "Analyze Conflicts"');
    console.log('2. Click "Process Allocations"');
    console.log('3. Click "Generate Notifications"');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await connection.end();
  }
}

// Run the test
testAIAgent().catch(console.error);