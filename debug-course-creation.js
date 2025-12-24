const mysql = require('mysql2/promise');

async function debugCourseCreation() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });

    console.log('🔍 Debugging Course Creation Issue\n');

    // Check current courses in database
    console.log('1️⃣ Current Courses in Database:');
    const [courses] = await connection.execute(`
      SELECT course_code, course_name, slot, max_capacity, current_enrolled, faculty_id, department
      FROM courses 
      ORDER BY slot, course_code
    `);
    
    console.log(`Found ${courses.length} courses:`);
    courses.forEach(course => {
      console.log(`   📚 ${course.course_code} - ${course.course_name}`);
      console.log(`       Slot: ${course.slot || 'NOT SET'}, Capacity: ${course.max_capacity || 'NOT SET'}, Faculty: ${course.faculty_id || 'NOT SET'}`);
      console.log('');
    });

    // Check courses table structure
    console.log('2️⃣ Courses Table Structure:');
    const [columns] = await connection.execute('DESCRIBE courses');
    
    columns.forEach(col => {
      console.log(`   - ${col.Field}: ${col.Type} (${col.Null === 'YES' ? 'NULL' : 'NOT NULL'})`);
    });

    // Test creating a new course manually
    console.log('\n3️⃣ Testing Manual Course Creation:');
    
    const testCourse = {
      course_code: 'TEST001',
      course_name: 'Test Course for Slot D',
      slot: 'D',
      max_capacity: 30,
      faculty_id: 'FAC2024001',
      department: 'Computer Science',
      credits: 3,
      course_type: 'Contact Course'
    };

    try {
      // Check if course already exists
      const [existing] = await connection.execute(
        'SELECT course_code FROM courses WHERE course_code = ?',
        [testCourse.course_code]
      );

      if (existing.length > 0) {
        console.log(`   ⚠️  Course ${testCourse.course_code} already exists, deleting first...`);
        await connection.execute('DELETE FROM courses WHERE course_code = ?', [testCourse.course_code]);
      }

      // Insert new course
      await connection.execute(`
        INSERT INTO courses (
          course_code, course_name, department, credits, course_type, 
          slot, max_capacity, current_enrolled, faculty_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)
      `, [
        testCourse.course_code,
        testCourse.course_name,
        testCourse.department,
        testCourse.credits,
        testCourse.course_type,
        testCourse.slot,
        testCourse.max_capacity,
        testCourse.faculty_id
      ]);

      console.log(`   ✅ Successfully created course: ${testCourse.course_code}`);

      // Verify it was created
      const [newCourse] = await connection.execute(`
        SELECT course_code, course_name, slot, max_capacity, faculty_id
        FROM courses 
        WHERE course_code = ?
      `, [testCourse.course_code]);

      if (newCourse.length > 0) {
        console.log(`   ✅ Verification: Course found in database`);
        console.log(`       ${newCourse[0].course_code} - ${newCourse[0].course_name}`);
        console.log(`       Slot: ${newCourse[0].slot}, Capacity: ${newCourse[0].max_capacity}`);
      }

    } catch (error) {
      console.log(`   ❌ Failed to create test course: ${error.message}`);
    }

    // Check what the enrollment API would return
    console.log('\n4️⃣ Testing Enrollment API Query:');
    
    const testSlot = 'D';
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

    console.log(`   Query for Slot ${testSlot} returned ${slotCourses.length} courses:`);
    slotCourses.forEach(course => {
      console.log(`   📚 ${course.course_code} - ${course.course_name}`);
      console.log(`       Faculty: ${course.faculty_name || 'NOT FOUND'}`);
      console.log(`       Status: ${course.enrollment_status}`);
      console.log('');
    });

    console.log('\n💡 DIAGNOSIS:');
    if (courses.filter(c => c.slot && c.faculty_id).length === 0) {
      console.log('   ❌ No courses have both slot AND faculty_id set');
      console.log('   🔧 SOLUTION: Faculty course creation needs to save to database');
    } else {
      console.log('   ✅ Courses with slots and faculty exist');
      console.log('   🔧 Check if enrollment API is working correctly');
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

debugCourseCreation();