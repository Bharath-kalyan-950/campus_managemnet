const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function setupAttendanceSystem() {
  let connection;
  
  try {
    console.log('🎯 Setting up Attendance Management System...\n');

    // Create database connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db',
      multipleStatements: true
    });

    console.log('✅ Connected to database');

    // Read and execute attendance schema
    const schemaPath = path.join(__dirname, '..', 'database', 'attendance-schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf8');
    
    console.log('📋 Executing attendance schema...');
    await connection.execute(schema);
    console.log('✅ Attendance tables created successfully');

    // Verify the setup
    console.log('\n🔍 Verifying attendance system setup...');
    
    // Check attendance sessions
    const [sessions] = await connection.execute('SELECT COUNT(*) as count FROM attendance_sessions');
    console.log(`✅ Attendance sessions: ${sessions[0].count} records`);
    
    // Check attendance records
    const [records] = await connection.execute('SELECT COUNT(*) as count FROM attendance_records');
    console.log(`✅ Attendance records: ${records[0].count} records`);
    
    // Check attendance summary
    const [summary] = await connection.execute('SELECT COUNT(*) as count FROM attendance_summary');
    console.log(`✅ Attendance summary: ${summary[0].count} records`);

    // Test student attendance view
    const [studentView] = await connection.execute(`
      SELECT student_name, course_code, attendance_percentage, attendance_grade 
      FROM student_attendance_view 
      LIMIT 5
    `);
    
    console.log('\n📊 Sample Student Attendance Data:');
    studentView.forEach(row => {
      console.log(`   ${row.student_name} - ${row.course_code}: ${row.attendance_percentage}% (${row.attendance_grade})`);
    });

    // Test faculty course attendance view
    const [facultyView] = await connection.execute(`
      SELECT faculty_name, course_code, total_sessions, avg_attendance_percentage, enrolled_students
      FROM faculty_course_attendance 
      WHERE faculty_name IS NOT NULL
      LIMIT 5
    `);
    
    console.log('\n👨‍🏫 Sample Faculty Course Data:');
    facultyView.forEach(row => {
      console.log(`   ${row.faculty_name} - ${row.course_code}: ${row.total_sessions} sessions, ${row.avg_attendance_percentage?.toFixed(1)}% avg attendance, ${row.enrolled_students} students`);
    });

    console.log('\n🎉 Attendance Management System setup completed successfully!');
    console.log('\n📋 System Features:');
    console.log('   ✅ Course-wise attendance tracking');
    console.log('   ✅ Student attendance percentage calculation');
    console.log('   ✅ Faculty attendance marking interface');
    console.log('   ✅ Session-based attendance records');
    console.log('   ✅ Attendance summary and analytics');
    console.log('   ✅ Multiple attendance status types (present, absent, late, excused)');
    console.log('   ✅ Real-time attendance percentage updates');

  } catch (error) {
    console.error('❌ Error setting up attendance system:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup
setupAttendanceSystem();