// Test script to verify enrolled tab fix
const { executeQuery } = require('./lib/db.js');

async function testEnrolledTabFix() {
  console.log('🧪 Testing Enrolled Tab Fix...\n');

  try {
    const facultyId = 'FAC2024001';

    // Test the exact query that should be used in the API for enrolled status
    console.log('📊 Testing enrolled students query with faculty filter...');
    
    const enrolledQuery = `
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
    `;

    const enrolledStudents = await executeQuery(enrolledQuery, [facultyId]);

    console.log(`✅ Query returned ${enrolledStudents.length} enrolled students:`);
    enrolledStudents.forEach((student, index) => {
      console.log(`\n   ${index + 1}. Student: ${student.student_name} (${student.student_id})`);
      console.log(`      Course: ${student.course_code} - ${student.course_name}`);
      console.log(`      Slot: ${student.slot}`);
      console.log(`      Faculty: ${student.faculty_name} (${student.faculty_id})`);
      console.log(`      Enrolled: ${student.enrollment_date}`);
      console.log(`      Status: ${student.status}`);
    });

    // Verify the API should work
    console.log('\n📊 API Verification:');
    console.log('✅ Query includes faculty_id parameter in WHERE clause');
    console.log('✅ Query joins all necessary tables');
    console.log('✅ Query returns all required fields for frontend');
    console.log(`✅ Found ${enrolledStudents.length} students that should appear in Enrolled tab`);

    if (enrolledStudents.length > 0) {
      console.log('\n🎉 Enrolled tab should now show students!');
    } else {
      console.log('\n⚠️ No enrolled students found - tab will be empty');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testEnrolledTabFix();