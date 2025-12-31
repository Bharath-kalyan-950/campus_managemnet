const mysql = require('mysql2/promise');

async function setupAttendanceSystem() {
  let connection;
  
  try {
    console.log('🎯 Setting up Attendance Management System...\n');

    // Create database connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });

    console.log('✅ Connected to database');

    // Create attendance_sessions table
    console.log('📋 Creating attendance_sessions table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS attendance_sessions (
          session_id VARCHAR(50) PRIMARY KEY,
          course_code VARCHAR(20) NOT NULL,
          faculty_id VARCHAR(20) NOT NULL,
          session_date DATE NOT NULL,
          session_time TIME NOT NULL,
          session_duration INT DEFAULT 60,
          session_topic VARCHAR(255),
          session_type ENUM('lecture', 'lab', 'tutorial', 'exam') DEFAULT 'lecture',
          total_students INT DEFAULT 0,
          present_students INT DEFAULT 0,
          attendance_percentage DECIMAL(5,2) DEFAULT 0.00,
          status ENUM('scheduled', 'ongoing', 'completed', 'cancelled') DEFAULT 'scheduled',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_course_date (course_code, session_date),
          INDEX idx_faculty_date (faculty_id, session_date)
      )
    `);

    // Create attendance_records table
    console.log('📋 Creating attendance_records table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS attendance_records (
          record_id VARCHAR(50) PRIMARY KEY,
          session_id VARCHAR(50) NOT NULL,
          student_id VARCHAR(20) NOT NULL,
          course_code VARCHAR(20) NOT NULL,
          attendance_status ENUM('present', 'absent', 'late', 'excused') DEFAULT 'absent',
          marked_at TIMESTAMP NULL,
          marked_by VARCHAR(20),
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY unique_student_session (session_id, student_id),
          INDEX idx_student_course (student_id, course_code),
          INDEX idx_session_status (session_id, attendance_status)
      )
    `);

    // Create attendance_summary table
    console.log('📋 Creating attendance_summary table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS attendance_summary (
          summary_id VARCHAR(50) PRIMARY KEY,
          student_id VARCHAR(20) NOT NULL,
          course_code VARCHAR(20) NOT NULL,
          total_sessions INT DEFAULT 0,
          attended_sessions INT DEFAULT 0,
          late_sessions INT DEFAULT 0,
          excused_sessions INT DEFAULT 0,
          attendance_percentage DECIMAL(5,2) DEFAULT 0.00,
          last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY unique_student_course (student_id, course_code),
          INDEX idx_student_attendance (student_id, attendance_percentage),
          INDEX idx_course_attendance (course_code, attendance_percentage)
      )
    `);

    // Insert sample data
    console.log('📋 Inserting sample attendance data...');
    
    // Sample sessions
    await connection.execute(`
      INSERT IGNORE INTO attendance_sessions (session_id, course_code, faculty_id, session_date, session_time, session_topic, total_students, present_students, attendance_percentage, status) VALUES
      ('SESS_CSA022_001', 'CSA022', 'FAC2024001', '2024-12-01', '09:00:00', 'Introduction to Computer Science', 2, 2, 100.00, 'completed'),
      ('SESS_CSA022_002', 'CSA022', 'FAC2024001', '2024-12-03', '09:00:00', 'Programming Fundamentals', 2, 1, 50.00, 'completed'),
      ('SESS_UBA0123_001', 'UBA0123', 'FAC2024001', '2024-12-02', '11:00:00', 'Business Fundamentals', 1, 1, 100.00, 'completed'),
      ('SESS_CS301_001', 'CS301', 'FAC2024001', '2024-12-01', '14:00:00', 'Database Design', 1, 1, 100.00, 'completed')
    `);

    // Sample attendance records
    await connection.execute(`
      INSERT IGNORE INTO attendance_records (record_id, session_id, student_id, course_code, attendance_status, marked_at, marked_by) VALUES
      ('REC_CSA022_001_STU001', 'SESS_CSA022_001', 'STU2024001', 'CSA022', 'present', '2024-12-01 09:05:00', 'FAC2024001'),
      ('REC_CSA022_001_STU002', 'SESS_CSA022_001', 'STU2024002', 'CSA022', 'present', '2024-12-01 09:03:00', 'FAC2024001'),
      ('REC_CSA022_002_STU001', 'SESS_CSA022_002', 'STU2024001', 'CSA022', 'absent', NULL, NULL),
      ('REC_CSA022_002_STU002', 'SESS_CSA022_002', 'STU2024002', 'CSA022', 'present', '2024-12-03 09:02:00', 'FAC2024001'),
      ('REC_UBA0123_001_STU002', 'SESS_UBA0123_001', 'STU2024002', 'UBA0123', 'present', '2024-12-02 11:05:00', 'FAC2024001'),
      ('REC_CS301_001_STU001', 'SESS_CS301_001', 'STU2024001', 'CS301', 'present', '2024-12-01 14:05:00', 'FAC2024001')
    `);

    // Sample attendance summary
    await connection.execute(`
      INSERT IGNORE INTO attendance_summary (summary_id, student_id, course_code, total_sessions, attended_sessions, late_sessions, excused_sessions, attendance_percentage) VALUES
      ('SUM_STU001_CSA022', 'STU2024001', 'CSA022', 2, 1, 0, 0, 50.00),
      ('SUM_STU002_CSA022', 'STU2024002', 'CSA022', 2, 2, 0, 0, 100.00),
      ('SUM_STU002_UBA0123', 'STU2024002', 'UBA0123', 1, 1, 0, 0, 100.00),
      ('SUM_STU001_CS301', 'STU2024001', 'CS301', 1, 1, 0, 0, 100.00)
    `);

    console.log('✅ Attendance tables created successfully');

    // Verify the setup
    console.log('\n🔍 Verifying attendance system setup...');
    
    const [sessions] = await connection.execute('SELECT COUNT(*) as count FROM attendance_sessions');
    console.log(`✅ Attendance sessions: ${sessions[0].count} records`);
    
    const [records] = await connection.execute('SELECT COUNT(*) as count FROM attendance_records');
    console.log(`✅ Attendance records: ${records[0].count} records`);
    
    const [summary] = await connection.execute('SELECT COUNT(*) as count FROM attendance_summary');
    console.log(`✅ Attendance summary: ${summary[0].count} records`);

    console.log('\n🎉 Attendance Management System setup completed successfully!');

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