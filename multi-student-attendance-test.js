const { executeQuery } = require('./lib/db.js');

async function multiStudentAttendanceTest() {
  console.log('👥 MULTI-STUDENT ATTENDANCE TEST');
  console.log('=================================');
  
  try {
    // Get all enrolled students for CSA022
    console.log('\n1. Getting enrolled students for CSA022...');
    const enrolledStudents = await executeQuery(`
      SELECT DISTINCT s.student_id, CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE er.course_code = 'CSA022' AND er.status IN ('enrolled', 'approved')
      ORDER BY s.student_id
    `);
    
    console.log(`   Found ${enrolledStudents.length} enrolled students:`);
    enrolledStudents.forEach(student => {
      console.log(`   - ${student.student_id}: ${student.student_name}`);
    });
    
    if (enrolledStudents.length === 0) {
      console.log('   ❌ No enrolled students found. Cannot proceed with multi-student test.');
      return;
    }
    
    // 2. Create a new session
    console.log('\n2. Creating multi-student attendance session...');
    const sessionId = `SESS_CSA022_${Date.now()}`;
    const sessionDate = new Date().toISOString().split('T')[0];
    
    const createResponse = await fetch('http://localhost:3000/api/faculty/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_session',
        faculty_id: 'FAC2024001',
        course_code: 'CSA022',
        session_date: sessionDate,
        session_time: '17:00:00',
        session_topic: 'Multi-Student Test Session',
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
    
    // 3. Mark attendance for all students with mixed statuses
    console.log('\n3. Marking attendance for all students...');
    const attendanceData = enrolledStudents.map((student, index) => {
      // Create a mix of attendance statuses
      let status;
      const remainder = index % 4;
      switch (remainder) {
        case 0: status = 'present'; break;
        case 1: status = 'late'; break;
        case 2: status = 'absent'; break;
        case 3: status = 'present'; break;
        default: status = 'present';
      }
      
      return {
        student_id: student.student_id,
        attendance_status: status,
        notes: `Multi-student test - ${status}`
      };
    });
    
    console.log('   Attendance distribution:');
    const statusCounts = attendanceData.reduce((acc, item) => {
      acc[item.attendance_status] = (acc[item.attendance_status] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   - ${status}: ${count} students`);
    });
    
    const attendanceResponse = await fetch('http://localhost:3000/api/faculty/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'mark_attendance',
        session_id: newSessionId,
        faculty_id: 'FAC2024001',
        attendance_data: attendanceData
      })
    });
    
    const attendanceResult = await attendanceResponse.json();
    console.log(`   Attendance marking: ${attendanceResult.success ? '✅ Success' : '❌ Failed'}`);
    
    if (attendanceResult.success) {
      console.log(`   Marked students: ${attendanceResult.data.marked_students}`);
      console.log(`   Present students: ${attendanceResult.data.present_students}`);
      console.log(`   Session attendance %: ${attendanceResult.data.attendance_percentage}%`);
    } else {
      console.log(`   Error: ${attendanceResult.error}`);
      return;
    }
    
    // 4. Verify each student's attendance summary was updated
    console.log('\n4. Verifying individual student summaries...');
    let successCount = 0;
    let failCount = 0;
    
    for (const student of enrolledStudents) {
      try {
        const summary = await executeQuery(`
          SELECT * FROM attendance_summary 
          WHERE student_id = ? AND course_code = 'CSA022'
        `, [student.student_id]);
        
        if (summary.length > 0) {
          const s = summary[0];
          console.log(`   ${student.student_id}: ${s.attended_sessions}/${s.total_sessions} (${s.attendance_percentage}%)`);
          successCount++;
        } else {
          console.log(`   ${student.student_id}: ❌ No summary found`);
          failCount++;
        }
      } catch (error) {
        console.log(`   ${student.student_id}: ❌ Error checking summary`);
        failCount++;
      }
    }
    
    console.log(`   Summary update results: ${successCount} success, ${failCount} failed`);
    
    // 5. Test student portal for multiple students
    console.log('\n5. Testing student portal for multiple students...');
    const portalTests = Math.min(3, enrolledStudents.length); // Test first 3 students
    
    for (let i = 0; i < portalTests; i++) {
      const student = enrolledStudents[i];
      try {
        const studentResponse = await fetch(`http://localhost:3000/api/student/attendance?student_id=${student.student_id}`);
        const studentData = await studentResponse.json();
        
        if (studentData.success) {
          const csaCourse = studentData.data.courses.find(c => c.course_code === 'CSA022');
          if (csaCourse) {
            console.log(`   ${student.student_id}: ${csaCourse.attended_sessions}/${csaCourse.total_sessions} (${csaCourse.attendance_percentage}%) - ${csaCourse.exam_eligibility}`);
          } else {
            console.log(`   ${student.student_id}: ❌ CSA022 not found in portal`);
          }
        } else {
          console.log(`   ${student.student_id}: ❌ Portal API failed`);
        }
      } catch (error) {
        console.log(`   ${student.student_id}: ❌ Portal test error`);
      }
    }
    
    // 6. Performance check - verify all updates completed quickly
    console.log('\n6. Performance verification...');
    const endTime = Date.now();
    const sessionCreationTime = parseInt(newSessionId.split('_')[2]);
    const totalTime = endTime - sessionCreationTime;
    
    console.log(`   Total processing time: ${totalTime}ms`);
    if (totalTime < 5000) { // Less than 5 seconds
      console.log('   ✅ Performance is acceptable');
    } else {
      console.log('   ⚠️  Performance might need optimization');
    }
    
    console.log('\n🎉 Multi-student test completed successfully!');
    
  } catch (error) {
    console.error('❌ Multi-student test failed:', error);
  }
}

multiStudentAttendanceTest();