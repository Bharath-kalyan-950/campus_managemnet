// Test the improved attendance API with logging
async function testImprovedAPI() {
  try {
    console.log('🧪 Testing Improved Attendance API');
    console.log('==================================');
    
    // Step 1: Check current state
    console.log('\n1. Current attendance state:');
    const currentResponse = await fetch('http://localhost:3000/api/student/attendance?student_id=STU2024002');
    const currentData = await currentResponse.json();
    
    if (currentData.success) {
      const csa022Before = currentData.data.courses.find(c => c.course_code === 'CSA022');
      console.log(`CSA022 before: ${csa022Before.attended_sessions}/${csa022Before.total_sessions} (${csa022Before.attendance_percentage}%)`);
    }
    
    // Step 2: Create new session
    console.log('\n2. Creating new attendance session...');
    const sessionResponse = await fetch('http://localhost:3000/api/faculty/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_session',
        faculty_id: 'FAC2024001',
        course_code: 'CSA022',
        session_date: new Date().toISOString().split('T')[0],
        session_time: '17:00:00',
        session_topic: 'Final API Test',
        session_type: 'lecture',
        session_duration: 60
      })
    });
    
    const sessionData = await sessionResponse.json();
    console.log('Session creation:', sessionData.success ? '✅ Success' : '❌ Failed');
    
    if (!sessionData.success) {
      console.log('Session error:', sessionData.error);
      return;
    }
    
    // Step 3: Mark attendance with improved API
    console.log('\n3. Marking attendance with improved API...');
    const attendanceResponse = await fetch('http://localhost:3000/api/faculty/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'mark_attendance',
        session_id: sessionData.data.session_id,
        faculty_id: 'FAC2024001',
        attendance_data: [{
          student_id: 'STU2024002',
          attendance_status: 'present',
          notes: 'Final test'
        }]
      })
    });
    
    const attendanceData = await attendanceResponse.json();
    console.log('Attendance marking:', attendanceData.success ? '✅ Success' : '❌ Failed');
    
    if (attendanceData.success) {
      console.log('Attendance result:', attendanceData.data);
    } else {
      console.log('Attendance error:', attendanceData.error);
    }
    
    // Step 4: Check updated state
    console.log('\n4. Checking updated attendance state...');
    
    // Wait a moment for the update to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedResponse = await fetch('http://localhost:3000/api/student/attendance?student_id=STU2024002');
    const updatedData = await updatedResponse.json();
    
    if (updatedData.success) {
      const csa022After = updatedData.data.courses.find(c => c.course_code === 'CSA022');
      console.log(`CSA022 after: ${csa022After.attended_sessions}/${csa022After.total_sessions} (${csa022After.attendance_percentage}%)`);
      
      // Check if it was updated
      if (csa022After.total_sessions > (currentData.data.courses.find(c => c.course_code === 'CSA022').total_sessions)) {
        console.log('🎉 SUCCESS! Attendance summary was updated correctly!');
      } else {
        console.log('❌ FAILED! Attendance summary was not updated.');
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testImprovedAPI();