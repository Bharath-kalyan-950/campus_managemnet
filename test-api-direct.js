const fetch = require('node-fetch');

async function testAPIDirectly() {
  try {
    console.log('🧪 Testing Enrollment API Directly\n');

    // Test the API endpoint for Slot B
    const testSlot = 'B';
    const testStudentId = 'STU2024002'; // Rajesh Kumar
    const apiUrl = `http://localhost:3000/api/enrollment/slots?slot=${testSlot}&student_id=${testStudentId}`;
    
    console.log(`📡 Making API call to: ${apiUrl}`);
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📋 Response Data:`, JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log(`\n✅ API Call Successful!`);
      console.log(`📚 Found ${data.data.length} courses in Slot ${data.slot}:`);
      
      data.data.forEach((course, index) => {
        console.log(`\n${index + 1}. ${course.course_code} - ${course.course_name}`);
        console.log(`   👨‍🏫 Faculty: ${course.faculty_name}`);
        console.log(`   📊 Capacity: ${course.current_enrolled}/${course.max_capacity} (${course.available_slots} available)`);
        console.log(`   📍 Department: ${course.department}`);
        console.log(`   🎓 Credits: ${course.credits}`);
        console.log(`   📝 Status: ${course.enrollment_status}`);
      });
      
      if (data.data.length === 0) {
        console.log('\n❌ NO COURSES RETURNED - This is the problem!');
      }
    } else {
      console.log(`\n❌ API Call Failed: ${data.error}`);
    }

    // Test other slots too
    console.log('\n🔍 Testing other slots:');
    const slotsToTest = ['A', 'C', 'D', 'E'];
    
    for (const slot of slotsToTest) {
      try {
        const slotUrl = `http://localhost:3000/api/enrollment/slots?slot=${slot}&student_id=${testStudentId}`;
        const slotResponse = await fetch(slotUrl);
        const slotData = await slotResponse.json();
        
        if (slotData.success) {
          console.log(`   Slot ${slot}: ${slotData.data.length} courses`);
          slotData.data.forEach(course => {
            console.log(`     - ${course.course_code}: ${course.course_name}`);
          });
        } else {
          console.log(`   Slot ${slot}: ERROR - ${slotData.error}`);
        }
      } catch (error) {
        console.log(`   Slot ${slot}: FETCH ERROR - ${error.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Server not running! Please start the server with:');
      console.log('   node node_modules/next/dist/bin/next dev');
    }
  }
}

testAPIDirectly();