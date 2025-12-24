// Test the API fix for enrolled students
const { executeQuery } = require('./lib/db.js');

async function testAPIEnrolledFix() {
  console.log('🧪 Testing API Enrolled Fix...\n');

  try {
    const facultyId = 'FAC2024001';

    // Test 1: Simulate the exact API logic for enrolled status
    console.log('📊 Test 1: Simulating API logic for enrolled status...');
    
    let sql = `
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
      WHERE e.status = 'enrolled'
    `;
    
    let params = [];
    
    if (facultyId) {
      sql += ' AND e.faculty_id = ?';
      params.push(facultyId);
    }
    
    sql += ' ORDER BY e.enrollment_date DESC';

    console.log('📊 Final SQL:', sql);
    console.log('📊 Parameters:', params);

    const results = await executeQuery(sql, params);
    
    console.log(`✅ API simulation returned ${results.length} enrolled students:`);
    results.forEach((student, index) => {
      console.log(`\n   ${index + 1}. ${student.student_name} (${student.student_id})`);
      console.log(`      Course: ${student.course_code} - ${student.course_name}`);
      console.log(`      Slot: ${student.slot}`);
      console.log(`      Faculty: ${student.faculty_name}`);
      console.log(`      Enrolled: ${student.enrollment_date}`);
    });

    // Test 2: Test other status (pending) to make sure it still works
    console.log('\n📊 Test 2: Testing pending status (should use enrollment_requests table)...');
    
    let pendingSql = `
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
      WHERE 1=1
    `;

    let pendingParams = [];
    
    if (facultyId) {
      pendingSql += ' AND er.faculty_id = ?';
      pendingParams.push(facultyId);
    }

    pendingSql += ' AND er.status = ?';
    pendingParams.push('pending');

    pendingSql += ' ORDER BY er.request_date DESC';

    const pendingResults = await executeQuery(pendingSql, pendingParams);
    console.log(`✅ Found ${pendingResults.length} pending requests`);

    console.log('\n🎉 API fix verification complete!');
    console.log(`   - Enrolled students: ${results.length}`);
    console.log(`   - Pending requests: ${pendingResults.length}`);

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAPIEnrolledFix();