const mysql = require('mysql2/promise');

async function debugEnrollmentAPI() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });

    console.log('🔍 Debugging Enrollment API Issue\n');

    // Test 1: Check all courses in database
    console.log('1️⃣ All Courses in Database:');
    const [allCourses] = await connection.execute(`
      SELECT course_code, course_name, slot, max_capacity, current_enrolled, faculty_id, department
      FROM courses 
      ORDER BY slot, course_code
    `);
    
    console.log(`Found ${allCourses.length} total courses:`);
    allCourses.forEach(course => {
      console.log(`   📚 ${course.course_code} - ${course.course_name}`);
      console.log(`       Slot: ${course.slot || 'NULL'}, Faculty: ${course.faculty_id || 'NULL'}, Dept: ${course.department}`);
      console.log('');
    });

    // Test 2: Check courses with slots specifically
    console.log('2️⃣ Courses with Slots:');
    const [slotCourses] = await connection.execute(`
      SELECT course_code, course_name, slot, max_capacity, current_enrolled, faculty_id
      FROM courses 
      WHERE slot IS NOT NULL
      ORDER BY slot, course_code
    `);
    
    console.log(`Found ${slotCourses.length} courses with slots:`);
    slotCourses.forEach(course => {
      console.log(`   📚 Slot ${course.slot}: ${course.course_code} - ${course.course_name}`);
      console.log(`       Faculty: ${course.faculty_id}, Capacity: ${course.current_enrolled}/${course.max_capacity}`);
    });

    // Test 3: Test the exact enrollment API query for Slot B
    console.log('\n3️⃣ Testing Enrollment API Query for Slot B:');
    
    const testSlot = 'B';
    const testStudentId = 'STU2024002'; // Rajesh Kumar
    
    const [apiResult] = await connection.execute(`
      SELECT 
        c.course_code,
        c.course_name,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        (c.max_capacity - c.current_enrolled) as available_slots,
        c.faculty_id,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
        c.department,
        c.credits,
        c.course_type,
        -- Check if student is already enrolled
        CASE 
          WHEN e.student_id IS NOT NULL THEN 'enrolled'
          WHEN er.student_id IS NOT NULL THEN er.status
          ELSE 'available'
        END as enrollment_status
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.student_id = ?
      LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.student_id = ? AND er.status = 'pending'
      WHERE c.slot = ? AND c.faculty_id IS NOT NULL
      ORDER BY c.course_code
    `, [testStudentId, testStudentId, testSlot]);

    console.log(`   API Query Result for Slot ${testSlot}:`);
    if (apiResult.length === 0) {
      console.log('   ❌ NO COURSES RETURNED');
      
      // Debug why no courses returned
      console.log('\n   🔍 Debugging why no courses returned:');
      
      // Check courses in slot B
      const [slotBCourses] = await connection.execute(`
        SELECT course_code, course_name, slot, faculty_id
        FROM courses 
        WHERE slot = ?
      `, [testSlot]);
      
      console.log(`   📊 Courses in Slot ${testSlot}: ${slotBCourses.length}`);
      slotBCourses.forEach(course => {
        console.log(`       - ${course.course_code}: faculty_id = ${course.faculty_id || 'NULL'}`);
      });
      
      // Check faculty table
      console.log('\n   👨‍🏫 Faculty Records:');
      const [faculty] = await connection.execute(`
        SELECT f.faculty_id, f.user_id, u.first_name, u.last_name
        FROM faculty f
        JOIN users u ON f.user_id = u.id
      `);
      
      faculty.forEach(fac => {
        console.log(`       - ${fac.faculty_id}: ${fac.first_name} ${fac.last_name} (user_id: ${fac.user_id})`);
      });
      
    } else {
      console.log(`   ✅ Found ${apiResult.length} courses:`);
      apiResult.forEach(course => {
        console.log(`       📚 ${course.course_code} - ${course.course_name}`);
        console.log(`           Faculty: ${course.faculty_name || 'NOT FOUND'}`);
        console.log(`           Status: ${course.enrollment_status}`);
        console.log(`           Capacity: ${course.current_enrolled}/${course.max_capacity}`);
      });
    }

    // Test 4: Check if any courses were created through the UI
    console.log('\n4️⃣ Recently Created Courses:');
    const [recentCourses] = await connection.execute(`
      SELECT course_code, course_name, slot, faculty_id, created_at
      FROM courses 
      WHERE created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)
      ORDER BY created_at DESC
    `);
    
    if (recentCourses.length > 0) {
      console.log(`   Found ${recentCourses.length} courses created in the last hour:`);
      recentCourses.forEach(course => {
        console.log(`   📚 ${course.course_code} - ${course.course_name}`);
        console.log(`       Slot: ${course.slot}, Faculty: ${course.faculty_id}, Created: ${course.created_at}`);
      });
    } else {
      console.log('   ℹ️  No courses created in the last hour');
    }

    // Test 5: Test API endpoint directly (simulate)
    console.log('\n5️⃣ Simulating API Call:');
    console.log(`   URL: /api/enrollment/slots?slot=${testSlot}&student_id=${testStudentId}`);
    console.log(`   Expected: Should return courses for Slot ${testSlot}`);
    
    console.log('\n💡 DIAGNOSIS:');
    if (apiResult.length === 0) {
      console.log('   ❌ ISSUE FOUND: No courses returned by enrollment API');
      console.log('   🔧 POSSIBLE CAUSES:');
      console.log('       1. Courses in Slot B have faculty_id = NULL');
      console.log('       2. Faculty records not properly linked');
      console.log('       3. API query has incorrect JOIN conditions');
      console.log('       4. Course creation not working properly');
    } else {
      console.log('   ✅ API query working correctly');
      console.log('   🔧 Check frontend API call or data handling');
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

debugEnrollmentAPI();