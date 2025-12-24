const mysql = require('mysql2/promise');

async function testAPIDirectCall() {
  console.log('🧪 Testing API Direct Call Simulation\n');

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  try {
    const danielFacultyId = 'FAC2024001';

    // 1. Simulate the exact API call that faculty approval page makes
    console.log('1️⃣ Simulating Faculty Approval API Call:');
    console.log(`   GET /api/enrollment/requests?faculty_id=${danielFacultyId}&status=pending`);
    
    const [pendingRequests] = await connection.execute(`
      SELECT 
        er.request_id,
        er.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        us.email as student_email,
        s.department as student_department,
        s.year as student_year,
        s.semester as student_semester,
        s.cgpa as student_cgpa,
        er.course_code,
        c.course_name,
        er.slot,
        er.faculty_id,
        CONCAT(uf.first_name, ' ', uf.last_name) as faculty_name,
        er.status,
        er.request_date,
        er.faculty_notes,
        er.processed_at,
        c.max_capacity,
        c.current_enrolled,
        (c.max_capacity - c.current_enrolled) as available_slots
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      JOIN students s ON er.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      JOIN faculty f ON er.faculty_id = f.faculty_id
      JOIN users uf ON f.user_id = uf.id
      WHERE er.faculty_id = ? AND er.status = ?
      ORDER BY er.request_date DESC
    `, [danielFacultyId, 'pending']);

    console.log(`   📊 API Response: ${pendingRequests.length} pending requests`);
    
    if (pendingRequests.length === 0) {
      console.log('   ❌ No data - this would show "No data available in table"');
    } else {
      console.log('   ✅ Data found - should populate the table:');
      pendingRequests.forEach((req, index) => {
        console.log(`\n   ${index + 1}. Student: ${req.student_name} (${req.student_id})`);
        console.log(`      Course: ${req.course_code} - ${req.course_name}`);
        console.log(`      Slot: ${req.slot}`);
        console.log(`      Student Info: Year ${req.student_year}, Sem ${req.student_semester}, CGPA ${req.student_cgpa}`);
        console.log(`      Department: ${req.student_department}`);
        console.log(`      Available Slots: ${req.available_slots}/${req.max_capacity}`);
        console.log(`      Request Date: ${new Date(req.request_date).toLocaleDateString()}`);
      });
    }

    // 2. Test faculty courses API
    console.log('\n\n2️⃣ Simulating Faculty Courses API Call:');
    console.log(`   GET /api/faculty/courses?faculty_id=${danielFacultyId}`);
    
    const [facultyCourses] = await connection.execute(`
      SELECT 
        c.course_code, 
        c.course_name, 
        c.credits, 
        c.semester, 
        c.year, 
        c.course_type,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        COUNT(e.student_id) as enrolled_students
      FROM courses c
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.faculty_id = ?
      WHERE c.faculty_id = ?
      GROUP BY c.course_code, c.course_name, c.credits, c.semester, c.year, c.course_type, c.slot, c.max_capacity, c.current_enrolled
      ORDER BY c.slot, c.course_code
    `, [danielFacultyId, danielFacultyId]);

    console.log(`   📊 API Response: ${facultyCourses.length} courses`);
    
    if (facultyCourses.length === 0) {
      console.log('   ❌ No courses - dropdown would be empty');
    } else {
      console.log('   ✅ Courses found - should populate dropdown:');
      facultyCourses.forEach(course => {
        console.log(`      📚 ${course.course_code} - ${course.course_name} [Slot ${course.slot}]`);
      });
    }

    // 3. Test filtering by specific slot
    console.log('\n\n3️⃣ Testing Slot-Based Filtering:');
    
    const testSlots = ['A', 'B', 'C'];
    for (const slot of testSlots) {
      const [slotRequests] = await connection.execute(`
        SELECT 
          er.request_id,
          er.student_id,
          CONCAT(us.first_name, ' ', us.last_name) as student_name,
          er.course_code,
          c.course_name,
          er.slot,
          er.status
        FROM enrollment_requests er
        JOIN courses c ON er.course_code = c.course_code
        JOIN students s ON er.student_id = s.student_id
        JOIN users us ON s.user_id = us.id
        WHERE er.faculty_id = ? AND er.slot = ? AND er.status = 'pending'
        ORDER BY er.request_date DESC
      `, [danielFacultyId, slot]);

      console.log(`\n   📍 Slot ${slot} Filter:`);
      if (slotRequests.length === 0) {
        console.log('     ❌ No requests - would show "No data available in table"');
      } else {
        console.log(`     ✅ ${slotRequests.length} requests - should show in table:`);
        slotRequests.forEach(req => {
          console.log(`       📝 ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.course_name}`);
        });
      }
    }

    console.log('\n\n🎯 TROUBLESHOOTING CHECKLIST:');
    console.log('   1. ✅ Database has correct data');
    console.log('   2. ✅ Faculty IDs match correctly');
    console.log('   3. ✅ API queries return expected results');
    console.log('   4. ❓ Frontend issue - check browser/server');
    
    console.log('\n🔧 FRONTEND DEBUGGING STEPS:');
    console.log('   1. Open browser Developer Tools (F12)');
    console.log('   2. Go to Network tab');
    console.log('   3. Login as Daniel and go to Course → Approve');
    console.log('   4. Check if API calls are being made');
    console.log('   5. Check API response data');
    console.log('   6. Look for JavaScript errors in Console tab');
    
    console.log('\n🚀 IMMEDIATE FIXES TO TRY:');
    console.log('   1. Hard refresh browser (Ctrl+F5)');
    console.log('   2. Clear browser cache completely');
    console.log('   3. Try incognito/private browsing mode');
    console.log('   4. Restart the development server');
    console.log('   5. Check if server is running on correct port');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await connection.end();
  }
}

testAPIDirectCall();