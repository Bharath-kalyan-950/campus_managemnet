const mysql = require('mysql2/promise');

async function immediateFixAndTest() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });
    
    console.log('🚀 Immediate Fix and Test');
    console.log('========================');
    
    // Step 1: Fix CSA022 attendance summary immediately
    console.log('\n1. Fixing CSA022 attendance summary...');
    
    const student_id = 'STU2024002';
    const courseCode = 'CSA022';
    
    // Calculate correct attendance statistics
    const [stats] = await connection.execute(`
      SELECT 
        COUNT(DISTINCT asess.session_id) as total_sessions,
        COUNT(CASE WHEN ar.attendance_status IN ('present', 'late') THEN 1 END) as attended_sessions,
        COUNT(CASE WHEN ar.attendance_status = 'late' THEN 1 END) as late_sessions,
        COUNT(CASE WHEN ar.attendance_status = 'excused' THEN 1 END) as excused_sessions
      FROM attendance_sessions asess
      LEFT JOIN attendance_records ar ON asess.session_id = ar.session_id AND ar.student_id = ?
      WHERE asess.course_code = ? AND asess.status = 'completed'
    `, [student_id, courseCode]);
    
    const totalSessions = stats[0].total_sessions || 0;
    const attendedSessions = stats[0].attended_sessions || 0;
    const lateSessions = stats[0].late_sessions || 0;
    const excusedSessions = stats[0].excused_sessions || 0;
    const attendancePercentage = totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0;
    
    console.log(`Calculated: ${attendedSessions}/${totalSessions} (${attendancePercentage.toFixed(1)}%)`);
    
    // Delete and recreate summary record
    await connection.execute(`
      DELETE FROM attendance_summary 
      WHERE student_id = ? AND course_code = ?
    `, [student_id, courseCode]);
    
    const summaryId = `SUM_${student_id}_${courseCode}`;
    await connection.execute(`
      INSERT INTO attendance_summary 
      (summary_id, student_id, course_code, total_sessions, attended_sessions, late_sessions, excused_sessions, attendance_percentage, last_updated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [summaryId, student_id, courseCode, totalSessions, attendedSessions, lateSessions, excusedSessions, attendancePercentage]);
    
    console.log('✅ CSA022 summary fixed');
    
    // Step 2: Test the student API
    console.log('\n2. Testing student API...');
    
    try {
      const response = await fetch('http://localhost:3000/api/student/attendance?student_id=STU2024002');
      const data = await response.json();
      
      if (data.success) {
        console.log('✅ API working correctly');
        
        data.data.courses.forEach(course => {
          const status = course.attendance_percentage >= 75 ? '✅' : '❌';
          console.log(`${status} ${course.course_code}: ${course.attended_sessions}/${course.total_sessions} (${course.attendance_percentage}%)`);
        });
        
        // Check specifically for CSA022
        const csa022 = data.data.courses.find(c => c.course_code === 'CSA022');
        if (csa022 && csa022.total_sessions > 0) {
          console.log(`\n🎯 CSA022 (Python) Status: FIXED - ${csa022.attended_sessions}/${csa022.total_sessions} (${csa022.attendance_percentage}%)`);
        } else {
          console.log('\n❌ CSA022 (Python) Status: STILL BROKEN - showing 0/0');
        }
      } else {
        console.log('❌ API failed:', data.error);
      }
    } catch (apiError) {
      console.log('❌ API test failed:', apiError.message);
    }
    
    // Step 3: Test new attendance marking
    console.log('\n3. Testing new attendance marking with improved API...');
    
    try {
      // Create a test session
      const sessionResponse = await fetch('http://localhost:3000/api/faculty/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_session',
          faculty_id: 'FAC2024001',
          course_code: 'CSA022',
          session_date: new Date().toISOString().split('T')[0],
          session_time: '16:00:00',
          session_topic: 'API Test Session',
          session_type: 'lecture',
          session_duration: 60
        })
      });
      
      const sessionData = await sessionResponse.json();
      
      if (sessionData.success) {
        console.log('✅ Test session created');
        
        // Mark attendance
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
              notes: 'API test'
            }]
          })
        });
        
        const attendanceData = await attendanceResponse.json();
        
        if (attendanceData.success) {
          console.log('✅ Test attendance marked successfully');
          
          // Check if summary was updated
          setTimeout(async () => {
            const finalResponse = await fetch('http://localhost:3000/api/student/attendance?student_id=STU2024002');
            const finalData = await finalResponse.json();
            
            if (finalData.success) {
              const finalCSA022 = finalData.data.courses.find(c => c.course_code === 'CSA022');
              if (finalCSA022 && finalCSA022.total_sessions > totalSessions) {
                console.log(`🎉 SUCCESS! CSA022 updated to: ${finalCSA022.attended_sessions}/${finalCSA022.total_sessions} (${finalCSA022.attendance_percentage}%)`);
              } else {
                console.log('❌ FAILED! CSA022 summary not updated after new attendance');
              }
            }
          }, 1000);
        } else {
          console.log('❌ Test attendance marking failed:', attendanceData.error);
        }
      } else {
        console.log('❌ Test session creation failed:', sessionData.error);
      }
    } catch (testError) {
      console.log('❌ Attendance marking test failed:', testError.message);
    }
    
    await connection.end();
  } catch (error) {
    console.error('❌ Fix failed:', error.message);
  }
}

immediateFixAndTest();