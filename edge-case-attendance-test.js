const { executeQuery } = require('./lib/db.js');

async function edgeCaseAttendanceTest() {
  console.log('🧪 EDGE CASE ATTENDANCE TEST');
  console.log('============================');
  
  try {
    // Test 1: Mark student as absent
    console.log('\n1. Testing absent attendance marking...');
    const sessionId1 = `SESS_CSA022_${Date.now()}`;
    const sessionDate = new Date().toISOString().split('T')[0];
    
    // Create session
    const createResponse1 = await fetch('http://localhost:3000/api/faculty/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_session',
        faculty_id: 'FAC2024001',
        course_code: 'CSA022',
        session_date: sessionDate,
        session_time: '15:00:00',
        session_topic: 'Absent Test Session',
        session_type: 'lecture',
        session_duration: 60
      })
    });
    
    const createResult1 = await createResponse1.json();
    console.log(`   Session creation: ${createResult1.success ? '✅ Success' : '❌ Failed'}`);
    
    if (createResult1.success) {
      const newSessionId1 = createResult1.data.session_id;
      
      // Mark as absent
      const attendanceResponse1 = await fetch('http://localhost:3000/api/faculty/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'mark_attendance',
          session_id: newSessionId1,
          faculty_id: 'FAC2024001',
          attendance_data: [
            {
              student_id: 'STU2024002',
              attendance_status: 'absent',
              notes: 'Student was absent'
            }
          ]
        })
      });
      
      const attendanceResult1 = await attendanceResponse1.json();
      console.log(`   Absent marking: ${attendanceResult1.success ? '✅ Success' : '❌ Failed'}`);
      
      if (attendanceResult1.success) {
        console.log(`   Present students: ${attendanceResult1.data.present_students} (should be 0)`);
        console.log(`   Attendance %: ${attendanceResult1.data.attendance_percentage}% (should be 0.00)`);
      }
    }
    
    // Test 2: Mark student as late
    console.log('\n2. Testing late attendance marking...');
    const sessionId2 = `SESS_CSA022_${Date.now() + 1000}`;
    
    // Create session
    const createResponse2 = await fetch('http://localhost:3000/api/faculty/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_session',
        faculty_id: 'FAC2024001',
        course_code: 'CSA022',
        session_date: sessionDate,
        session_time: '16:00:00',
        session_topic: 'Late Test Session',
        session_type: 'lecture',
        session_duration: 60
      })
    });
    
    const createResult2 = await createResponse2.json();
    console.log(`   Session creation: ${createResult2.success ? '✅ Success' : '❌ Failed'}`);
    
    if (createResult2.success) {
      const newSessionId2 = createResult2.data.session_id;
      
      // Mark as late
      const attendanceResponse2 = await fetch('http://localhost:3000/api/faculty/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'mark_attendance',
          session_id: newSessionId2,
          faculty_id: 'FAC2024001',
          attendance_data: [
            {
              student_id: 'STU2024002',
              attendance_status: 'late',
              notes: 'Student arrived 15 minutes late'
            }
          ]
        })
      });
      
      const attendanceResult2 = await attendanceResponse2.json();
      console.log(`   Late marking: ${attendanceResult2.success ? '✅ Success' : '❌ Failed'}`);
      
      if (attendanceResult2.success) {
        console.log(`   Present students: ${attendanceResult2.data.present_students} (should be 1 - late counts as present)`);
        console.log(`   Attendance %: ${attendanceResult2.data.attendance_percentage}% (should be 100.00)`);
      }
    }
    
    // Test 3: Check final attendance summary
    console.log('\n3. Checking final attendance summary...');
    const finalSummary = await executeQuery(`
      SELECT * FROM attendance_summary 
      WHERE student_id = 'STU2024002' AND course_code = 'CSA022'
    `);
    
    if (finalSummary.length > 0) {
      const summary = finalSummary[0];
      console.log(`   Total sessions: ${summary.total_sessions}`);
      console.log(`   Attended sessions: ${summary.attended_sessions}`);
      console.log(`   Late sessions: ${summary.late_sessions}`);
      console.log(`   Attendance %: ${summary.attendance_percentage}%`);
      
      // Verify late sessions are counted correctly
      if (parseInt(summary.late_sessions) > 0) {
        console.log('   ✅ Late sessions are being tracked correctly!');
      } else {
        console.log('   ⚠️  Late sessions might not be tracked properly');
      }
    }
    
    // Test 4: Verify student portal reflects all changes
    console.log('\n4. Final student portal verification...');
    const studentResponse = await fetch('http://localhost:3000/api/student/attendance?student_id=STU2024002');
    const studentData = await studentResponse.json();
    
    if (studentData.success) {
      const csaCourse = studentData.data.courses.find(c => c.course_code === 'CSA022');
      if (csaCourse) {
        console.log(`   Portal shows: ${csaCourse.attended_sessions}/${csaCourse.total_sessions} (${csaCourse.attendance_percentage}%)`);
        console.log(`   Late sessions: ${csaCourse.late_sessions}`);
        console.log(`   Grade: ${csaCourse.attendance_grade}`);
        console.log(`   Eligibility: ${csaCourse.exam_eligibility}`);
        
        // Check if attendance is still above 75% (eligible)
        const percentage = parseFloat(csaCourse.attendance_percentage);
        if (percentage >= 75) {
          console.log('   ✅ Student is still eligible for exams');
        } else {
          console.log('   ⚠️  Student attendance dropped below eligibility threshold');
        }
      }
    }
    
    // Test 5: Database consistency check
    console.log('\n5. Final database consistency check...');
    const dbStats = await executeQuery(`
      SELECT 
        COUNT(DISTINCT asess.session_id) as total_sessions,
        COUNT(CASE WHEN ar.attendance_status IN ('present', 'late') THEN 1 END) as attended_sessions,
        COUNT(CASE WHEN ar.attendance_status = 'late' THEN 1 END) as late_sessions,
        COUNT(CASE WHEN ar.attendance_status = 'absent' THEN 1 END) as absent_sessions
      FROM attendance_sessions asess
      LEFT JOIN attendance_records ar ON asess.session_id = ar.session_id AND ar.student_id = ?
      WHERE asess.course_code = ? AND asess.status = 'completed'
    `, ['STU2024002', 'CSA022']);
    
    const dbTotal = parseInt(dbStats[0]?.total_sessions) || 0;
    const dbAttended = parseInt(dbStats[0]?.attended_sessions) || 0;
    const dbLate = parseInt(dbStats[0]?.late_sessions) || 0;
    const dbAbsent = parseInt(dbStats[0]?.absent_sessions) || 0;
    
    console.log(`   Database totals: ${dbAttended}/${dbTotal} (Late: ${dbLate}, Absent: ${dbAbsent})`);
    
    if (finalSummary.length > 0) {
      const summary = finalSummary[0];
      const summaryTotal = parseInt(summary.total_sessions);
      const summaryAttended = parseInt(summary.attended_sessions);
      const summaryLate = parseInt(summary.late_sessions);
      
      const totalMatch = dbTotal === summaryTotal;
      const attendedMatch = dbAttended === summaryAttended;
      const lateMatch = dbLate === summaryLate;
      
      if (totalMatch && attendedMatch && lateMatch) {
        console.log('   ✅ All database calculations match summary perfectly!');
      } else {
        console.log('   ❌ Database and summary mismatch detected:');
        console.log(`   Summary: ${summaryAttended}/${summaryTotal} (Late: ${summaryLate})`);
        console.log(`   Database: ${dbAttended}/${dbTotal} (Late: ${dbLate})`);
      }
    }
    
    console.log('\n🎯 Edge case testing completed!');
    
  } catch (error) {
    console.error('❌ Edge case test failed:', error);
  }
}

edgeCaseAttendanceTest();