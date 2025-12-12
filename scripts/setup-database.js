const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
  let connection;
  
  try {
    // Connect to MySQL server (without database)
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root', // Change this to your MySQL username
      password: '', // Change this to your MySQL password
      multipleStatements: true
    });

    console.log('✓ Connected to MySQL server\n');

    // Drop and create database
    console.log('Creating database...');
    await connection.query('DROP DATABASE IF EXISTS smart_campus_db');
    await connection.query('CREATE DATABASE smart_campus_db');
    await connection.query('USE smart_campus_db');
    console.log('✓ Database created and selected\n');

    // Create tables
    console.log('Creating tables...');
    
    // Users table
    await connection.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'faculty', 'admin') NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        phone VARCHAR(15),
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created users table');

    // Students table
    await connection.query(`
      CREATE TABLE students (
        id INT PRIMARY KEY AUTO_INCREMENT,
        student_id VARCHAR(20) UNIQUE NOT NULL,
        user_id INT,
        department VARCHAR(50) NOT NULL,
        year INT NOT NULL,
        semester INT NOT NULL,
        batch VARCHAR(10),
        admission_date DATE,
        graduation_date DATE,
        cgpa DECIMAL(3,2) DEFAULT 0.00,
        total_credits INT DEFAULT 0,
        hostel_resident BOOLEAN DEFAULT FALSE,
        guardian_name VARCHAR(100),
        guardian_phone VARCHAR(15),
        address TEXT,
        blood_group VARCHAR(5),
        date_of_birth DATE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created students table');

    // Faculty table
    await connection.query(`
      CREATE TABLE faculty (
        id INT PRIMARY KEY AUTO_INCREMENT,
        faculty_id VARCHAR(20) UNIQUE NOT NULL,
        user_id INT,
        department VARCHAR(50) NOT NULL,
        designation VARCHAR(50),
        qualification VARCHAR(100),
        experience_years INT DEFAULT 0,
        specialization VARCHAR(100),
        office_room VARCHAR(20),
        joining_date DATE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created faculty table');

    // Courses table
    await connection.query(`
      CREATE TABLE courses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        course_code VARCHAR(20) UNIQUE NOT NULL,
        course_name VARCHAR(100) NOT NULL,
        department VARCHAR(50) NOT NULL,
        credits INT NOT NULL,
        semester INT NOT NULL,
        year INT NOT NULL,
        course_type ENUM('core', 'elective', 'lab', 'project') NOT NULL,
        description TEXT,
        syllabus TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created courses table');

    // Enrollments table
    await connection.query(`
      CREATE TABLE enrollments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        student_id VARCHAR(20),
        course_code VARCHAR(20),
        faculty_id VARCHAR(20),
        enrollment_date DATE DEFAULT (CURRENT_DATE),
        status ENUM('enrolled', 'completed', 'dropped', 'failed') DEFAULT 'enrolled',
        grade VARCHAR(2),
        grade_points DECIMAL(3,2),
        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
        FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created enrollments table');

    // Attendance table
    await connection.query(`
      CREATE TABLE attendance (
        id INT PRIMARY KEY AUTO_INCREMENT,
        student_id VARCHAR(20),
        course_code VARCHAR(20),
        faculty_id VARCHAR(20),
        date DATE NOT NULL,
        status ENUM('present', 'absent', 'late') NOT NULL,
        session_type ENUM('lecture', 'lab', 'tutorial') DEFAULT 'lecture',
        remarks TEXT,
        marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
        FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created attendance table');

    // Assignments table
    await connection.query(`
      CREATE TABLE assignments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        assignment_id VARCHAR(20) UNIQUE NOT NULL,
        course_code VARCHAR(20),
        faculty_id VARCHAR(20),
        title VARCHAR(200) NOT NULL,
        description TEXT,
        due_date DATETIME NOT NULL,
        max_marks INT DEFAULT 100,
        assignment_type ENUM('individual', 'group', 'project') DEFAULT 'individual',
        file_path VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created assignments table');

    // Assignment Submissions table
    await connection.query(`
      CREATE TABLE assignment_submissions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        assignment_id VARCHAR(20),
        student_id VARCHAR(20),
        submission_text TEXT,
        file_path VARCHAR(255),
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        marks_obtained INT,
        feedback TEXT,
        status ENUM('submitted', 'graded', 'late', 'not_submitted') DEFAULT 'submitted',
        FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created assignment_submissions table');

    // Examinations table
    await connection.query(`
      CREATE TABLE examinations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        exam_id VARCHAR(20) UNIQUE NOT NULL,
        course_code VARCHAR(20),
        exam_name VARCHAR(100) NOT NULL,
        exam_type ENUM('internal', 'external', 'quiz', 'practical') NOT NULL,
        exam_date DATE NOT NULL,
        start_time TIME NOT NULL,
        duration INT NOT NULL,
        max_marks INT DEFAULT 100,
        venue VARCHAR(100),
        instructions TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created examinations table');

    // Exam Results table
    await connection.query(`
      CREATE TABLE exam_results (
        id INT PRIMARY KEY AUTO_INCREMENT,
        exam_id VARCHAR(20),
        student_id VARCHAR(20),
        marks_obtained INT,
        grade VARCHAR(2),
        remarks TEXT,
        result_date DATE DEFAULT (CURRENT_DATE),
        FOREIGN KEY (exam_id) REFERENCES examinations(exam_id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created exam_results table');

    // Fee Structure table
    await connection.query(`
      CREATE TABLE fee_structure (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(50) NOT NULL,
        year INT NOT NULL,
        semester INT NOT NULL,
        fee_type VARCHAR(50) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        due_date DATE NOT NULL,
        academic_year VARCHAR(10) NOT NULL
      )
    `);
    console.log('✓ Created fee_structure table');

    // Fee Payments table
    await connection.query(`
      CREATE TABLE fee_payments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        payment_id VARCHAR(20) UNIQUE NOT NULL,
        student_id VARCHAR(20),
        fee_type VARCHAR(50) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_date DATE DEFAULT (CURRENT_DATE),
        payment_method ENUM('cash', 'card', 'online', 'bank_transfer') NOT NULL,
        transaction_id VARCHAR(100),
        status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'completed',
        receipt_number VARCHAR(50),
        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created fee_payments table');

    // Disciplinary Actions table
    await connection.query(`
      CREATE TABLE disciplinary_actions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        action_id VARCHAR(20) UNIQUE NOT NULL,
        student_id VARCHAR(20),
        faculty_id VARCHAR(20),
        violation_type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        action_taken VARCHAR(200) NOT NULL,
        severity ENUM('minor', 'major', 'severe') NOT NULL,
        date_reported DATE DEFAULT (CURRENT_DATE),
        status ENUM('pending', 'resolved', 'appealed') DEFAULT 'pending',
        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created disciplinary_actions table');

    // Placement Offers table
    await connection.query(`
      CREATE TABLE placement_offers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        offer_id VARCHAR(20) UNIQUE NOT NULL,
        company_name VARCHAR(100) NOT NULL,
        job_title VARCHAR(100) NOT NULL,
        package_amount DECIMAL(10,2),
        job_location VARCHAR(100),
        job_type ENUM('full_time', 'part_time', 'internship') DEFAULT 'full_time',
        requirements TEXT,
        application_deadline DATE,
        interview_date DATE,
        status ENUM('open', 'closed', 'cancelled') DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created placement_offers table');

    // Placement Applications table
    await connection.query(`
      CREATE TABLE placement_applications (
        id INT PRIMARY KEY AUTO_INCREMENT,
        student_id VARCHAR(20),
        offer_id VARCHAR(20),
        application_date DATE DEFAULT (CURRENT_DATE),
        status ENUM('applied', 'shortlisted', 'selected', 'rejected') DEFAULT 'applied',
        interview_feedback TEXT,
        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
        FOREIGN KEY (offer_id) REFERENCES placement_offers(offer_id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created placement_applications table');

    // Course Feedback table
    await connection.query(`
      CREATE TABLE course_feedback (
        id INT PRIMARY KEY AUTO_INCREMENT,
        student_id VARCHAR(20),
        course_code VARCHAR(20),
        faculty_id VARCHAR(20),
        rating INT CHECK (rating >= 1 AND rating <= 5),
        teaching_quality INT CHECK (teaching_quality >= 1 AND teaching_quality <= 5),
        course_content INT CHECK (course_content >= 1 AND course_content <= 5),
        assignments_quality INT CHECK (assignments_quality >= 1 AND assignments_quality <= 5),
        comments TEXT,
        feedback_date DATE DEFAULT (CURRENT_DATE),
        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
        FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created course_feedback table');

    // Infrastructure Issues table
    await connection.query(`
      CREATE TABLE infrastructure_issues (
        id INT PRIMARY KEY AUTO_INCREMENT,
        issue_id VARCHAR(20) UNIQUE NOT NULL,
        reported_by VARCHAR(20) NOT NULL,
        reporter_type ENUM('student', 'faculty') NOT NULL,
        issue_type VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
        status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
        reported_date DATE DEFAULT (CURRENT_DATE),
        resolved_date DATE,
        assigned_to VARCHAR(100),
        resolution_notes TEXT
      )
    `);
    console.log('✓ Created infrastructure_issues table');

    // Notifications table
    await connection.query(`
      CREATE TABLE notifications (
        id INT PRIMARY KEY AUTO_INCREMENT,
        notification_id VARCHAR(20) UNIQUE NOT NULL,
        title VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        sender_id VARCHAR(20),
        sender_type ENUM('admin', 'faculty', 'system') NOT NULL,
        target_audience ENUM('all', 'students', 'faculty', 'department', 'year', 'individual') NOT NULL,
        target_filter VARCHAR(100),
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
        has_attachment BOOLEAN DEFAULT FALSE,
        attachment_path VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME
      )
    `);
    console.log('✓ Created notifications table');

    // User Notifications table
    await connection.query(`
      CREATE TABLE user_notifications (
        id INT PRIMARY KEY AUTO_INCREMENT,
        notification_id VARCHAR(20),
        user_id VARCHAR(20),
        is_read BOOLEAN DEFAULT FALSE,
        read_at TIMESTAMP NULL,
        FOREIGN KEY (notification_id) REFERENCES notifications(notification_id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created user_notifications table');

    // Academic Calendar table
    await connection.query(`
      CREATE TABLE academic_calendar (
        id INT PRIMARY KEY AUTO_INCREMENT,
        event_id VARCHAR(20) UNIQUE NOT NULL,
        event_name VARCHAR(200) NOT NULL,
        event_type ENUM('holiday', 'exam', 'registration', 'orientation', 'cultural', 'academic') NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE,
        description TEXT,
        target_audience ENUM('all', 'students', 'faculty', 'department', 'year') DEFAULT 'all',
        target_filter VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created academic_calendar table');

    console.log('\n✓ All tables created successfully!\n');

    // Insert sample data
    console.log('Inserting sample data...');

    // Hash password
    const hashedPassword = await bcrypt.hash('password', 12);

    // Insert users
    await connection.query(`
      INSERT INTO users (user_id, email, password, role, first_name, last_name, phone) VALUES
      ('STU2024001', 'john.doe@simats.edu', ?, 'student', 'John', 'Doe', '9876543210'),
      ('FAC2024001', 'daniel@simats.edu', ?, 'faculty', 'Daniel', 'Faculty', '9876543211'),
      ('ADM2024001', 'admin@simats.edu', ?, 'admin', 'Admin', 'User', '9876543212')
    `, [hashedPassword, hashedPassword, hashedPassword]);
    console.log('✓ Inserted users');

    // Insert students
    await connection.query(`
      INSERT INTO students (student_id, user_id, department, year, semester, batch, cgpa) VALUES
      ('STU2024001', 1, 'Computer Science', 2, 4, 'CSE-A', 8.5)
    `);
    console.log('✓ Inserted students');

    // Insert faculty
    await connection.query(`
      INSERT INTO faculty (faculty_id, user_id, department, designation, qualification) VALUES
      ('FAC2024001', 2, 'Computer Science', 'Assistant Professor', 'M.Tech, Ph.D')
    `);
    console.log('✓ Inserted faculty');

    // Insert courses
    await connection.query(`
      INSERT INTO courses (course_code, course_name, department, credits, semester, year, course_type) VALUES
      ('CS301', 'Data Structures', 'Computer Science', 4, 3, 2, 'core'),
      ('CS302', 'Database Management Systems', 'Computer Science', 4, 4, 2, 'core'),
      ('CS303', 'Computer Networks', 'Computer Science', 3, 4, 2, 'core'),
      ('CS304', 'Operating Systems', 'Computer Science', 4, 4, 2, 'core'),
      ('CS305', 'Software Engineering', 'Computer Science', 3, 4, 2, 'core')
    `);
    console.log('✓ Inserted courses');

    // Insert enrollments
    await connection.query(`
      INSERT INTO enrollments (student_id, course_code, faculty_id, status) VALUES
      ('STU2024001', 'CS301', 'FAC2024001', 'enrolled'),
      ('STU2024001', 'CS302', 'FAC2024001', 'enrolled'),
      ('STU2024001', 'CS303', 'FAC2024001', 'enrolled')
    `);
    console.log('✓ Inserted enrollments');

    // Insert attendance records
    await connection.query(`
      INSERT INTO attendance (student_id, course_code, faculty_id, date, status) VALUES
      ('STU2024001', 'CS301', 'FAC2024001', '2024-12-01', 'present'),
      ('STU2024001', 'CS301', 'FAC2024001', '2024-12-02', 'present'),
      ('STU2024001', 'CS302', 'FAC2024001', '2024-12-01', 'present'),
      ('STU2024001', 'CS302', 'FAC2024001', '2024-12-02', 'absent')
    `);
    console.log('✓ Inserted attendance records');

    // Insert notifications
    await connection.query(`
      INSERT INTO notifications (notification_id, title, message, sender_type, target_audience, priority) VALUES
      ('NOT001', 'Assignment Due Tomorrow', 'Data Structures Assignment submission deadline is tomorrow', 'faculty', 'students', 'high'),
      ('NOT002', 'Exam Schedule Released', 'Mid-term examination schedule has been published', 'admin', 'all', 'medium'),
      ('NOT003', 'Fee Payment Reminder', 'Semester fee payment due date is approaching', 'admin', 'students', 'high')
    `);
    console.log('✓ Inserted notifications');

    // Insert placement offers
    await connection.query(`
      INSERT INTO placement_offers (offer_id, company_name, job_title, package_amount, job_location, application_deadline, status) VALUES
      ('PLM001', 'TCS', 'Software Engineer', 450000, 'Chennai', '2024-12-31', 'open'),
      ('PLM002', 'Infosys', 'System Engineer', 400000, 'Bangalore', '2024-12-25', 'open'),
      ('PLM003', 'Wipro', 'Project Engineer', 420000, 'Hyderabad', '2024-12-28', 'open')
    `);
    console.log('✓ Inserted placement offers');

    // Insert fee structure
    await connection.query(`
      INSERT INTO fee_structure (department, year, semester, fee_type, amount, due_date, academic_year) VALUES
      ('Computer Science', 2, 4, 'Tuition Fee', 50000, '2025-01-15', '2024-25'),
      ('Computer Science', 2, 4, 'Lab Fee', 5000, '2025-01-15', '2024-25'),
      ('Computer Science', 2, 4, 'Library Fee', 2000, '2025-01-15', '2024-25')
    `);
    console.log('✓ Inserted fee structure');

    // Insert fee payments
    await connection.query(`
      INSERT INTO fee_payments (payment_id, student_id, fee_type, amount, payment_method, transaction_id, status) VALUES
      ('PAY001', 'STU2024001', 'Tuition Fee', 50000, 'online', 'TXN123456', 'completed')
    `);
    console.log('✓ Inserted fee payments');

    console.log('\n✅ Database setup completed successfully!\n');
    console.log('='.repeat(50));
    console.log('Database: smart_campus_db');
    console.log('Tables: 20 tables created');
    console.log('Sample data: Inserted');
    console.log('='.repeat(50));
    console.log('\n📝 Default Login Credentials:');
    console.log('Student: john.doe@simats.edu / password');
    console.log('Faculty: daniel@simats.edu / password');
    console.log('Admin: admin@simats.edu / password');
    console.log('\n🚀 Next Steps:');
    console.log('1. Start server: npm run dev');
    console.log('2. Open browser: http://localhost:3000');
    console.log('3. Access phpMyAdmin: http://localhost/phpmyadmin');
    console.log('');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure MySQL is running');
    console.error('2. Check your MySQL credentials in this script');
    console.error('3. Verify MySQL is on port 3306');
    console.error('4. Check if you have permission to create databases\n');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();