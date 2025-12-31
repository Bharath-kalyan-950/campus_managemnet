const { executeQuery } = require('./lib/db.js');

async function comprehensiveAttendanceTest() {
  console.log('🔄 COMPREHENSIVE ATTENDANCE TEST');
  console.log('================================');
  
  try {
    // 1. Check current state
    console.log('\n1. Current attendance state:');
    const currentSummary = await executeQuery(`
      SELECT * FROM attendance_summary 
      WHERE student_id = 'STU2024002' AND course_code = 'CSA022'
    `);
    
    if (currentSummary.length > 0) {
      const current = currentSummary[0];
      console.log(`   CSA022: ${current.attended_sessions}/${current.total_sessions} (${current.attendance_percentage}%)`);
    } else {
      console.log('   No attendance summary found');
    }
    
    // 2. Create a new session
    console.log('\n2. Creating new attendance session...');
    const sessionId = `SESS_CSA022_${Date.now()}`;
    const sessionDate = new Date().toISOString().split('T')[0];
    const sessionTime = '14:00:00';
    
    const createResponse = await fetch('http://localhost:3000/api/faculty/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_session',
        faculty_id: 'FAC2024001',
        course_code: 'CSA022',
        session_date: sessionDate,
        session_time: sessionTime,
        session_topic: 'Comprehensive Test Session',
        session_type: 'lecture',
        session_duration: 60
      })
    });
    
    const createResult = await createResponse.json();
    console.log(`   Session creation: ${createResult.success ? '✅ Success' : '❌ Failed'}`);
    if (!createResult.success) {
      console.log(`   Error: ${createResult.error}`);
      return;
    }
    
    const newSessionId = createResult.data.session_id;
    console.log(`   Session ID: ${newSessionId}`);
    
    // 3. Mark attendance
    console.log('\n3. Marking attendance...');
    const attendanceResponse = await fetch('http://localhost:3000/api/faculty/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'mark_attendance',
        session_id: newSessionId,
        faculty_id: 'FAC2024001',
        attendance_data: [
          {
            student_id: 'STU2024002',
            attendance_status: 'present',
            notes: 'Comprehensive test attendance'
          }
        ]
      })
    });
    
    const attendanceResult = await attendanceResponse.json();
    console.log(`   Attendance marking: ${attendanceResult.success ? '✅ Success' : '❌ Failed'}`);
    if (!attendanceResult.success) {
      console.log(`   Error: ${attendanceResult.error}`);
      return;
    }
    
    console.log(`   Result: ${JSON.stringify(attendanceResult.data)}`);
    
    // 4. Check updated summary immediately
    console.log('\n4. Checking updated attendance summary...');
    const updatedSummary = await executeQuery(`
      SELECT * FROM attendance_summary 
      WHERE student_id = 'STU2024002' AND course_code = 'CSA022'
    `);
    
    if (updatedSummary.length > 0) {
      const updated = updatedSummary[0];
      console.log(`   CSA022: ${updated.attended_sessions}/${updated.total_sessions} (${updated.attendance_percentage}%)`);
      
      // Compare with previous state
      if (currentSummary.length > 0) {
        const current = currentSummary[0];
        const sessionsIncreased = updated.total_sessions > current.total_sessions;
        const attendanceIncreased = updated.attended_sessions > current.attended_sessions;
        
        if (sessionsIncreased && attendanceIncreased) {
          console.log('   🎉 SUCCESS! Both total sessions and attended sessions increased correctly!');
        } else {
          console.log('   ❌ ISSUE! Sessions or attendance did not increase as expected');
          console.log(`   Previous: ${current.attended_sessions}/${current.total_sessions}`);
          console.log(`   Current:  ${updated.attended_sessions}/${updated.total_sessions}`);
        }
      }
    } else {
      console.log('   ❌ No updated summary found');
    }
    
    // 5. Test student portal API
    console.log('\n5. Testing student portal API...');
    const studentResponse = await fetch('http://localhost:3000/api/student/attendance?student_id=STU2024002');
    const studentData = await studentResponse.json();
    
    if (studentData.success) {
      const csaCourse = studentData.data.courses.find(c => c.course_code === 'CSA022');
      if (csaCourse) {
        console.log(`   Student portal shows: ${csaCourse.attended_sessions}/${csaCourse.total_sessions} (${csaCourse.attendance_percentage}%)`);
        console.log(`   Grade: ${csaCourse.attendance_grade}, Eligibility: ${csaCourse.exam_eligibility}`);
      } else {
        console.log('   ❌ CSA022 course not found in student portal');
      }
    } else {
      console.log(`   ❌ Student portal API failed: ${studentData.error}`);
    }
    
    // 6. Verify database consistency
    console.log('\n6. Verifying database consistency...');
    const dbStats = await executeQuery(`
      SELECT 
        COUNT(DISTINCT asess.session_id) as total_sessions,
        COUNT(CASE WHEN ar.attendance_status IN ('present', 'late') THEN 1 END) as attended_sessions
      FROM attendance_sessions asess
      LEFT JOIN attendance_records ar ON asess.session_id = ar.session_id AND ar.student_id = ?
      WHERE asess.course_code = ? AND asess.status = 'completed'
    `, ['STU2024002', 'CSA022']);
    
    const dbTotal = parseInt(dbStats[0]?.total_sessions) || 0;
    const dbAttended = parseInt(dbStats[0]?.attended_sessions) || 0;
    
    console.log(`   Database calculation: ${dbAttended}/${dbTotal}`);
    
    if (updatedSummary.length > 0) {
      const summary = updatedSummary[0];
      const summaryTotal = parseInt(summary.total_sessions);
      const summaryAttended = parseInt(summary.attended_sessions);
      
      if (dbTotal === summaryTotal && dbAttended === summaryAttended) {
        console.log('   ✅ Database and summary are consistent!');
      } else {
        console.log('   ❌ Database and summary mismatch!');
        console.log(`   Summary: ${summaryAttended}/${summaryTotal}`);
        console.log(`   Database: ${dbAttended}/${dbTotal}`);
      }
    }
    
    console.log('\n🏁 Test completed!');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

comprehensiveAttendanceTest();