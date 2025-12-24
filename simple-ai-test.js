/**
 * Simple AI Agent Test - Uses existing data
 */

async function testAIEndpoints() {
  try {
    console.log('🧪 Testing Google Gemini AI Classroom Agent...\n');

    const baseUrl = 'http://localhost:3000';

    // Test 1: AI Status
    console.log('1. Testing AI Status...');
    const statusResponse = await fetch(`${baseUrl}/api/classroom-agent/ai-process`);
    const statusData = await statusResponse.json();
    
    console.log('Status:', statusResponse.status);
    console.log('AI Enabled:', statusData.data?.ai_enabled);
    console.log('AI Type:', statusData.data?.ai_type);
    console.log('Capabilities:', statusData.data?.capabilities?.slice(0, 2).join(', '));
    console.log('Result:', statusData.success ? '✅ Working' : '❌ Failed');

    // Test 2: Dashboard Data
    console.log('\n2. Testing Dashboard Data...');
    const dashboardResponse = await fetch(`${baseUrl}/api/classroom-agent/dashboard?date=2025-12-24`);
    const dashboardData = await dashboardResponse.json();
    
    console.log('Status:', dashboardResponse.status);
    console.log('Total Rooms:', dashboardData.data?.stats?.total_rooms);
    console.log('Pending Requests:', dashboardData.data?.stats?.pending_requests);
    console.log('Result:', dashboardData.success ? '✅ Working' : '❌ Failed');

    // Test 3: Conflict Analysis (with current date)
    console.log('\n3. Testing Conflict Analysis...');
    const conflictResponse = await fetch(`${baseUrl}/api/classroom-agent/ai-process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'analyze_conflicts',
        date: '2025-12-24'
      })
    });
    const conflictData = await conflictResponse.json();
    
    console.log('Status:', conflictResponse.status);
    console.log('Conflicts Analyzed:', conflictData.data?.conflicts_analyzed || 0);
    console.log('Result:', conflictData.success ? '✅ Working' : '❌ Failed');
    if (!conflictData.success) {
      console.log('Error:', conflictData.error);
    }

    // Test 4: Allocation Processing
    console.log('\n4. Testing Allocation Processing...');
    const allocationResponse = await fetch(`${baseUrl}/api/classroom-agent/ai-process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'process_allocations',
        date: '2025-12-24'
      })
    });
    const allocationData = await allocationResponse.json();
    
    console.log('Status:', allocationResponse.status);
    console.log('Processed Requests:', allocationData.data?.processed_requests || 0);
    console.log('Approved:', allocationData.data?.approved || 0);
    console.log('Result:', allocationData.success ? '✅ Working' : '❌ Failed');
    if (!allocationData.success) {
      console.log('Error:', allocationData.error);
    }

    // Test 5: Notification Generation
    console.log('\n5. Testing Notification Generation...');
    const notificationResponse = await fetch(`${baseUrl}/api/classroom-agent/ai-process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'generate_notifications',
        date: '2025-12-24'
      })
    });
    const notificationData = await notificationResponse.json();
    
    console.log('Status:', notificationResponse.status);
    console.log('Notifications Generated:', notificationData.data?.notifications_generated || 0);
    console.log('Result:', notificationData.success ? '✅ Working' : '❌ Failed');
    if (!notificationData.success) {
      console.log('Error:', notificationData.error);
    }

    console.log('\n🎉 AI Agent Testing Complete!');
    console.log('\n📊 Test Summary:');
    console.log('- AI Status:', statusData.success ? '✅' : '❌');
    console.log('- Dashboard:', dashboardData.success ? '✅' : '❌');
    console.log('- Conflict Analysis:', conflictData.success ? '✅' : '❌');
    console.log('- Allocation Processing:', allocationData.success ? '✅' : '❌');
    console.log('- Notification Generation:', notificationData.success ? '✅' : '❌');

    console.log('\n🌐 Ready to test in Chrome!');
    console.log('Navigate to: http://localhost:3000/dashboard/admin/classroom-agent');
    console.log('\nThe Google Gemini AI agent is ready to use! 🤖');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAIEndpoints();