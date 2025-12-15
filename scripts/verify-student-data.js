const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function verifyData() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    // Check students count
    const [students] = await connection.execute('SELECT COUNT(*) as count FROM students');
    console.log(`✅ Students: ${students[0].count}`);

    // Check courses count
    const [courses] = await connection.execute('SELECT COUNT(*) as count FROM courses');
    console.log(`✅ Courses: ${courses[0].count}`);

    // Check enrollments count
    const [enrollments] = await connection.execute('SELECT COUNT(*) as count FROM enrollments');
    console.log(`✅ Enrollments: ${enrollments[0].count}`);

    // Check attendance records count
    const [attendance] = await connection.execute('SELECT COUNT(*) as count FROM attendance');
    console.log(`✅ Attendance Records: ${attendance[0].count}`);

    // Check assignments count
    const [assignments] = await connection.execute('SELECT COUNT(*) as count FROM assignments');
    console.log(`✅ Assignments: ${assignments[0].count}`);

    // Check assignment submissions count
    const [submissions] = await connection.execute('SELECT COUNT(*) as count FROM assignment_submissions');
    console.log(`✅ Assignment Submissions: ${submissions[0].count}`);

    // Check examinations count
    const [examinations] = await connection.execute('SELECT COUNT(*) as count FROM examinations');
    console.log(`✅ Examinations: ${examinations[0].count}`);

    // Check exam results count
    const [examResults] = await connection.execute('SELECT COUNT(*) as count FROM exam_results');
    console.log(`✅ Exam Results: ${examResults[0].count}`);

    // Check fee structure count
    const [feeStructure] = await connection.execute('SELECT COUNT(*) as count FROM fee_structure');
    console.log(`✅ Fee Structure Records: ${feeStructure[0].count}`);

    // Check fee payments count
    const [feePayments] = await connection.execute('SELECT COUNT(*) as count FROM fee_payments');
    console.log(`✅ Fee Payments: ${feePayments[0].count}`);

    // Check placement offers count
    const [placementOffers] = await connection.execute('SELECT COUNT(*) as count FROM placement_offers');
    console.log(`✅ Placement Offers: ${placementOffers[0].count}`);

    // Check placement applications count
    const [placementApps] = await connection.execute('SELECT COUNT(*) as count FROM placement_applications');
    console.log(`✅ Placement Applications: ${placementApps[0].count}`);

    // Check disciplinary actions count
    const [disciplinary] = await connection.execute('SELECT COUNT(*) as count FROM disciplinary_actions');
    console.log(`✅ Disciplinary Records: ${disciplinary[0].count}`);

    // Check course feedback count
    const [feedback] = await connection.execute('SELECT COUNT(*) as count FROM course_feedback');
    console.log(`✅ Course Feedback: ${feedback[0].count}`);

    // Check faculty count
    const [faculty] = await connection.execute('SELECT COUNT(*) as count FROM faculty');
    console.log(`✅ Faculty: ${faculty[0].count}`);

    console.log('\n📊 Sample Student Data:');
    const [sampleStudent] = await connection.execute(`
      SELECT s.student_id, u.first_name, u.last_name, u.email, s.department, s.cgpa 
      FROM students s 
      JOIN users u ON s.user_id = u.id 
      LIMIT 3
    `);
    
    sampleStudent.forEach(student => {
      console.log(`   ${student.student_id}: ${student.first_name} ${student.last_name} (${student.email}) - ${student.department} - CGPA: ${student.cgpa}`);
    });

    console.log('\n📊 Sample Course Data:');
    const [sampleCourses] = await connection.execute('SELECT course_code, course_name, department FROM courses LIMIT 5');
    sampleCourses.forEach(course => {
      console.log(`   ${course.course_code}: ${course.course_name} (${course.department})`);
    });

    console.log('\n📊 Sample Attendance Data:');
    const [sampleAttendance] = await connection.execute(`
      SELECT s.student_id, c.course_code, 
             COUNT(*) as total_classes,
             SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present_classes,
             ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as attendance_percentage
      FROM attendance a
      JOIN students s ON a.student_id = s.student_id
      JOIN courses c ON a.course_code = c.course_code
      GROUP BY s.student_id, c.course_code
      LIMIT 5
    `);
    
    sampleAttendance.forEach(att => {
      console.log(`   ${att.student_id} - ${att.course_code}: ${att.present_classes}/${att.total_classes} (${att.attendance_percentage}%)`);
    });

    console.log('\n✅ Database verification completed successfully!');

  } catch (error) {
    console.error('❌ Error verifying database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

verifyData();