// Test the dedicated attendance summary update API
async function testDedicatedAPI() {
  try {
    console.log('🧪 Testing Dedicated Attendance Summary API');
    console.log('===========================================');
    
    // Step 1: Check current state
    console.log('\n1. Current CSA022 attendance state:');
    const currentResponse = await fetch('http://localhost:3000/api/student/attendance?student_id=STU2024002');
    const currentData = await currentResponse.json();
    
    if (currentData.success) {
      const csa022Before = currentData.data.courses.find(c => c.course_code === 'CSA022');
      console.log(`Before: ${csa022Before.attended_sessions}/${csa022Before.total_sessions} (${csa022Before.attendance_percentage}%)`);
    }
    
    // Step 2: Call dedicated summary update API
    console.log('\n2. Calling dedicated summary update API...');
    const updateResponse = await fetch('http://localhost:3000/api/attendance-summary/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: 'STU2024002',
        course_code: 'CSA022'
      })
    });
    
    const updateData = await updateResponse.json();
    console.log('Update result:', updateData);
    
    if (updateData.success) {
      console.log(`✅ Summary updated: ${updateData.data.attended_sessions}/${updateData.data.total_sessions} (${updateData.data.attendance_percentage}%)`);
    } else {
      console.log('❌ Update failed:', updateData.error);
      return;
    }
    
    // Step 3: Check updated state
    console.log('\n3. Checking updated attendance state...');
    const updatedResponse = await fetch('http://localhost:3000/api/student/attendance?student_id=STU2024002');
    const updatedData = await updatedResponse.json();
    
    if (updatedData.success) {
      const csa022After = updatedData.data.courses.find(c => c.course_code === 'CSA022');
      console.log(`After: ${csa022After.attended_sessions}/${csa022After.total_sessions} (${csa022After.attendance_percentage}%)`);
      
      if (csa022After.total_sessions > 0) {
        console.log('🎉 SUCCESS! CSA022 attendance is now showing correctly!');
      } else {
        console.log('❌ FAILED! CSA022 still showing 0/0');
      }
    }
    
    // Step 4: Also update UBA0123 to ensure both are correct
    console.log('\n4. Updating UBA0123 for completeness...');
    const uba0123Response = await fetch('http://localhost:3000/api/attendance-summary/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: 'STU2024002',
        course_code: 'UBA0123'
      })
    });
    
    const uba0123Data = await uba0123Response.json();
    if (uba0123Data.success) {
      console.log(`✅ UBA0123 updated: ${uba0123Data.data.attended_sessions}/${uba0123Data.data.total_sessions} (${uba0123Data.data.attendance_percentage}%)`);
    }
    
    // Step 5: Final verification
    console.log('\n5. Final verification of both courses:');
    const finalResponse = await fetch('http://localhost:3000/api/student/attendance?student_id=STU2024002');
    const finalData = await finalResponse.json();
    
    if (finalData.success) {
      console.log('Final attendance status:');
      finalData.data.courses.forEach(course => {
        const status = course.attendance_percentage >= 75 ? '✅' : '❌';
        console.log(`${status} ${course.course_code}: ${course.attended_sessions}/${course.total_sessions} (${course.attendance_percentage}%) - ${course.exam_eligibility}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testDedicatedAPI();