// Debug script to check enrolled students API
const { executeQuery } = require('./lib/db.js');

async function debugEnrolledTab() {
  console.log('🔍 Debugging Enrolled Tab...\n');

  try {
    const facultyId = 'FAC2024001';

    // Test the exact query used in the API
    console.log('📊 Testing enrolled students query...');
    const enrolledStudents = await executeQuery(`
      SELECT 
        e.id as request_id,
        e.student_id,
        CONCAT(us.first_name, ' ', us.last_name) as student_name,
        us.email as student_email,
        s.department as student_department,
        s.year as student_year,
        s.semester as student_semester,
        s.cgpa as student_cgpa,
        e.course_code,
        c.course_name,
        c.slot,
        e.faculty_id,
        CONCAT(uf.first_name, ' ', uf.last_name) as faculty_name,
        e.status,
        e.enrollment_date,
        e.enrollment_date as processed_at,
        c.max_capacity,
        c.current_enrolled,
        (c.max_capacity - c.current_enrolled) as available_slots
      FROM enrollments e
      JOIN courses c ON e.course_code = c.course_code
      JOIN students s ON e.student_id = s.student_id
      JOIN users us ON s.user_id = us.id
      JOIN faculty f ON e.faculty_id = f.faculty_id
      JOIN users uf ON f.user_id = uf.id
      WHERE e.status = 'enrolled' AND e.faculty_id = ?
      ORDER BY e.enrollment_date DESC
    `, [facultyId]);

    console.log(`✅ Found ${enrolledStudents.length} enrolled students:`);
    enrolledStudents.forEach(student => {
      console.log(`\n   Student: ${student.student_name} (${student.student_id})`);
      console.log(`   Course: ${student.course_code} - ${student.course_name}`);
      console.log(`   Slot: ${student.slot}`);
      console.log(`   Enrolled: ${student.enrollment_date}`);
      console.log(`   Status: ${student.status}`);
    });

    // Check all enrollments regardless of status
    console.log('\n📊 Checking all enrollments for faculty...');
    const allEnrollments = await executeQuery(`
      SELECT e.*, c.course_name, c.slot
      FROM enrollments e
      JOIN courses c ON e.course_code = c.course_code
      WHERE e.faculty_id = ?
    `, [facultyId]);

    console.log(`\n✅ Total enrollments: ${allEnrollments.length}`);
    allEnrollments.forEach(e => {
      console.log(`   - ${e.student_id} in ${e.course_code} (${e.course_name}) - Status: ${e.status}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugEnrolledTab();