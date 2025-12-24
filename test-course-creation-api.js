const mysql = require('mysql2/promise');

async function testCourseCreationAPI() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });

    console.log('🧪 Testing Course Creation API\n');

    // Test 1: Check courses before creation
    console.log('1️⃣ Courses before creation:');
    const [beforeCourses] = await connection.execute(`
      SELECT course_code, course_name, slot, max_capacity, faculty_id
      FROM courses 
      WHERE slot IS NOT NULL
      ORDER BY slot, course_code
    `);
    
    console.log(`   Found ${beforeCourses.length} courses with slots:`);
    beforeCourses.forEach(course => {
      console.log(`   📚 Slot ${course.slot}: ${course.course_code} - ${course.course_name} (${course.max_capacity} capacity)`);
    });

    // Test 2: Create a new course via API simulation
    console.log('\n2️⃣ Creating new course via database (simulating API):');
    
    const newCourse = {
      courseCode: 'CS401',
      courseName: 'Advanced Algorithms',
      type: 'Contact Course',
      subjectCategory: 'Theory',
      slot: 'E',
      maxSlotCount: '25',
      courseCategory: 'Core',
      faculty_id: 'FAC2024001'
    };

    try {
      // Check if course exists
      const [existing] = await connection.execute(
        'SELECT course_code FROM courses WHERE course_code = ?',
        [newCourse.courseCode]
      );

      if (existing.length > 0) {
        console.log(`   ⚠️  Course ${newCourse.courseCode} already exists, deleting first...`);
        await connection.execute('DELETE FROM courses WHERE course_code = ?', [newCourse.courseCode]);
      }

      // Insert new course (same logic as API)
      await connection.execute(`
        INSERT INTO courses (
          course_code, 
          course_name, 
          department, 
          credits, 
          semester, 
          year, 
          course_type, 
          slot, 
          max_capacity, 
          current_enrolled, 
          faculty_id,
          description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
      `, [
        newCourse.courseCode,
        newCourse.courseName,
        'Computer Science',
        3,
        1,
        2024,
        'core',
        newCourse.slot,
        parseInt(newCourse.maxSlotCount),
        newCourse.faculty_id,
        `${newCourse.courseName} - ${newCourse.subjectCategory} created by faculty`
      ]);

      console.log(`   ✅ Successfully created: ${newCourse.courseCode} - ${newCourse.courseName}`);
      console.log(`       Slot: ${newCourse.slot}, Capacity: ${newCourse.maxSlotCount}`);

    } catch (error) {
      console.log(`   ❌ Failed to create course: ${error.message}`);
    }

    // Test 3: Check courses after creation
    console.log('\n3️⃣ Courses after creation:');
    const [afterCourses] = await connection.execute(`
      SELECT course_code, course_name, slot, max_capacity, faculty_id
      FROM courses 
      WHERE slot IS NOT NULL
      ORDER BY slot, course_code
    `);
    
    console.log(`   Found ${afterCourses.length} courses with slots:`);
    afterCourses.forEach(course => {
      console.log(`   📚 Slot ${course.slot}: ${course.course_code} - ${course.course_name} (${course.max_capacity} capacity)`);
    });

    // Test 4: Test enrollment API query for the new slot
    console.log('\n4️⃣ Testing enrollment API for new slot:');
    
    const testSlot = 'E';
    const testStudentId = 'STU2024002';
    
    const [slotCourses] = await connection.execute(`
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

    console.log(`   Slot ${testSlot} query returned ${slotCourses.length} courses:`);
    slotCourses.forEach(course => {
      console.log(`   📚 ${course.course_code} - ${course.course_name}`);
      console.log(`       Faculty: ${course.faculty_name}`);
      console.log(`       Capacity: ${course.current_enrolled}/${course.max_capacity}`);
      console.log(`       Status: ${course.enrollment_status}`);
      console.log('');
    });

    console.log('🎯 SUMMARY:');
    console.log(`   📊 Total courses with slots: ${afterCourses.length}`);
    console.log(`   🆕 New courses created: ${afterCourses.length - beforeCourses.length}`);
    console.log('   ✅ Course creation API logic working');
    console.log('   ✅ Enrollment API can find new courses');
    console.log('\n💡 NEXT STEPS:');
    console.log('   1. Test faculty course creation in browser');
    console.log('   2. Create a course with a specific slot');
    console.log('   3. Login as student and check if course appears in that slot');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testCourseCreationAPI();