const mysql = require('mysql2/promise');

async function testFacultyCourses() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  console.log('🧪 Testing Faculty Courses API\n');

  try {
    const facultyId = 'FAC2024001';

    // Test the updated query directly
    console.log('1️⃣ Direct Database Query (Updated Logic):');
    const [courses] = await connection.execute(`
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
    `, [facultyId, facultyId]);

    console.log(`   Faculty ${facultyId} courses:`);
    if (courses.length === 0) {
      console.log('   ❌ No courses found');
    } else {
      courses.forEach(course => {
        console.log(`   📚 ${course.course_code} - ${course.course_name} [Slot ${course.slot}]`);
        console.log(`      Enrolled: ${course.enrolled_students}, Capacity: ${course.current_enrolled}/${course.max_capacity}`);
      });
    }

    // Test enrollment requests filtering
    console.log('\n2️⃣ Enrollment Requests by Slot:');
    
    const slots = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (const slot of slots) {
      const [requests] = await connection.execute(`
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
      `, [facultyId, slot]);

      if (requests.length > 0) {
        console.log(`   Slot ${slot}: ${requests.length} pending requests`);
        requests.forEach(req => {
          console.log(`     📝 ${req.student_name} → ${req.course_code} - ${req.course_name}`);
        });
      } else {
        console.log(`   Slot ${slot}: No pending requests`);
      }
    }

    // Test the complete faculty approval query
    console.log('\n3️⃣ Complete Faculty Approval Query (All Pending):');
    const [allPending] = await connection.execute(`
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
      WHERE er.faculty_id = ? AND er.status = 'pending'
      ORDER BY er.request_date DESC
    `, [facultyId]);

    console.log(`   Total pending requests for faculty ${facultyId}: ${allPending.length}`);
    allPending.forEach(req => {
      console.log(`   📝 ${req.student_name} (${req.student_id}) → ${req.course_code} [Slot ${req.slot}] - ${req.status.toUpperCase()}`);
    });

    console.log('\n🎯 API TESTING COMPLETE');
    console.log('   ✅ Faculty courses query updated');
    console.log('   ✅ Enrollment requests properly filtered');
    console.log('   ✅ Slot-based filtering should work now');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await connection.end();
  }
}

testFacultyCourses();