const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function addSampleData() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });

    console.log('✓ Connected to database\n');
    console.log('Adding comprehensive sample data...\n');

    const hashedPassword = await bcrypt.hash('password', 12);

    // Add more students
    console.log('Adding students...');
    await connection.query(`
      INSERT INTO users (user_id, email, password, role, first_name, last_name, phone) VALUES
      ('STU2024002', 'jane.smith@simats.edu', ?, 'student', 'Jane', 'Smith', '9876543213'),
      ('STU2024003', 'mike.johnson@simats.edu', ?, 'student', 'Mike', 'Johnson', '9876543214'),
      ('STU2024004', 'sarah.williams@simats.edu', ?, 'student', 'Sarah', 'Williams', '9876543215'),
      ('STU2024005', 'david.brown@simats.edu', ?, 'student', 'David', 'Brown', '9876543216')
    `, [hashedPassword, hashedPassword, hashedPassword, hashedPassword]);

    await connection.query(`
      INSERT INTO students (student_id, user_id, department, year, semester, batch, cgpa, date_of_birth, blood_group, guardian_name, guardian_phone, address) VALUES
      ('STU2024002', 4, 'Computer Science', 2, 4, 'CSE-A', 8.2, '2003-05-15', 'A+', 'Robert Smith', '9876543220', '123 Main St, Chennai'),
      ('STU2024003', 5, 'Computer Science', 2, 4, 'CSE-B', 7.8, '2003-08-22', 'B+', 'James Johnson', '9876543221', '456 Park Ave, Chennai'),
      ('STU2024004', 6, 'Computer Science', 2, 4, 'CSE-A', 9.1, '2003-03-10', 'O+', 'Thomas Williams', '9876543222', '789 Lake Rd, Chennai'),
      ('STU2024005', 7, 'Computer Science', 2, 4, 'CSE-B', 7.5, '2003-11-30', 'AB+', 'Richard Brown', '9876543223', '321 Hill St, Chennai')
    `);
    console.log('✓ Added 4 more students');

    // Add more faculty
    console.log('Adding faculty...');
    await connection.query(`
      INSERT INTO users (user_id, email, password, role, first_name, last_name, phone) VALUES
      ('FAC2024002', 'rajesh.kumar@simats.edu', ?, 'faculty', 'Rajesh', 'Kumar', '9876543217'),
      ('FAC2024003', 'priya.sharma@simats.edu', ?, 'faculty', 'Priya', 'Sharma', '9876543218')
    `, [hashedPassword, hashedPassword]);

    await connection.query(`
      INSERT INTO faculty (faculty_id, user_id, department, designation, qualification, experience_years, specialization, office_room) VALUES
      ('FAC2024002', 8, 'Computer Science', 'Associate Professor', 'M.Tech, Ph.D', 8, 'Machine Learning', 'B-204'),
      ('FAC2024003', 9, 'Computer Science', 'Assistant Professor', 'M.Tech', 5, 'Web Development', 'B-205')
    `);
    console.log('✓ Added 2 more faculty');

    // Add more courses
    console.log('Adding more courses...');
    await connection.query(`
      INSERT INTO courses (course_code, course_name, department, credits, semester, year, course_type, description) VALUES
      ('CS306', 'Web Technologies', 'Computer Science', 3, 4, 2, 'core', 'HTML, CSS, JavaScript, React'),
      ('CS307', 'Machine Learning', 'Computer Science', 4, 4, 2, 'elective', 'Introduction to ML algorithms'),
      ('CS308', 'Mobile App Development', 'Computer Science', 3, 4, 2, 'elective', 'Android and iOS development'),
      ('CS309', 'Cloud Computing', 'Computer Science', 3, 4, 2, 'elective', 'AWS, Azure, Google Cloud'),
      ('CS310', 'Cyber Security', 'Computer Science', 4, 4, 2, 'elective', 'Network security and cryptography')
    `);
    console.log('✓ Added 5 more courses');

    // Enroll all students in courses
    console.log('Creating enrollments...');
    const students = ['STU2024001', 'STU2024002', 'STU2024003', 'STU2024004', 'STU2024005'];
    const courses = ['CS301', 'CS302', 'CS303', 'CS304', 'CS305', 'CS306'];
    
    for (const student of students) {
      for (const course of courses) {
        await connection.query(`
          INSERT INTO enrollments (student_id, course_code, faculty_id, status) 
          VALUES (?, ?, 'FAC2024001', 'enrolled')
        `, [student, course]);
      }
    }
    console.log('✓ Created enrollments for all students');

    // Add attendance records
    console.log('Adding attendance records...');
    const dates = ['2024-12-01', '2024-12-02', '2024-12-03', '2024-12-04', '2024-12-05'];
    for (const student of students) {
      for (const course of courses.slice(0, 4)) {
        for (const date of dates) {
          const status = Math.random() > 0.2 ? 'present' : 'absent';
          await connection.query(`
            INSERT INTO attendance (student_id, course_code, faculty_id, date, status, session_type)
            VALUES (?, ?, 'FAC2024001', ?, ?, 'lecture')
          `, [student, course, date, status]);
        }
      }
    }
    console.log('✓ Added attendance records');

    // Add assignments
    console.log('Adding assignments...');
    await connection.query(`
      INSERT INTO assignments (assignment_id, course_code, faculty_id, title, description, due_date, max_marks, assignment_type) VALUES
      ('ASG001', 'CS301', 'FAC2024001', 'Data Structures Implementation', 'Implement Stack, Queue, and Linked List', '2024-12-20 23:59:59', 100, 'individual'),
      ('ASG002', 'CS302', 'FAC2024001', 'Database Design Project', 'Design a database for library management', '2024-12-22 23:59:59', 100, 'group'),
      ('ASG003', 'CS303', 'FAC2024001', 'Network Protocol Analysis', 'Analyze TCP/IP protocol', '2024-12-25 23:59:59', 100, 'individual'),
      ('ASG004', 'CS304', 'FAC2024001', 'OS Scheduling Algorithms', 'Implement CPU scheduling algorithms', '2024-12-28 23:59:59', 100, 'individual'),
      ('ASG005', 'CS305', 'FAC2024001', 'Software Testing Report', 'Write test cases for a web application', '2024-12-30 23:59:59', 100, 'individual')
    `);
    console.log('✓ Added 5 assignments');

    // Add assignment submissions
    console.log('Adding assignment submissions...');
    for (const student of students.slice(0, 3)) {
      await connection.query(`
        INSERT INTO assignment_submissions (assignment_id, student_id, submission_text, marks_obtained, status) VALUES
        ('ASG001', ?, 'Completed all implementations with proper documentation', 85, 'graded'),
        ('ASG002', ?, 'Database schema designed with ER diagram', 90, 'graded')
      `, [student, student]);
    }
    console.log('✓ Added assignment submissions');

    // Add examinations
    console.log('Adding examinations...');
    await connection.query(`
      INSERT INTO examinations (exam_id, course_code, exam_name, exam_type, exam_date, start_time, duration, max_marks, venue) VALUES
      ('EX001', 'CS301', 'Data Structures Mid-Term', 'internal', '2024-12-15', '10:00:00', 120, 50, 'Hall A'),
      ('EX002', 'CS302', 'DBMS Mid-Term', 'internal', '2024-12-16', '10:00:00', 120, 50, 'Hall B'),
      ('EX003', 'CS303', 'Networks Mid-Term', 'internal', '2024-12-17', '10:00:00', 120, 50, 'Hall A'),
      ('EX004', 'CS301', 'Data Structures Final', 'external', '2025-01-10', '09:00:00', 180, 100, 'Main Hall'),
      ('EX005', 'CS302', 'DBMS Final', 'external', '2025-01-12', '09:00:00', 180, 100, 'Main Hall')
    `);
    console.log('✓ Added 5 examinations');

    // Add exam results
    console.log('Adding exam results...');
    for (const student of students) {
      await connection.query(`
        INSERT INTO exam_results (exam_id, student_id, marks_obtained, grade) VALUES
        ('EX001', ?, ?, 'A'),
        ('EX002', ?, ?, 'A'),
        ('EX003', ?, ?, 'B')
      `, [student, Math.floor(Math.random() * 10) + 40, student, Math.floor(Math.random() * 10) + 40, student, Math.floor(Math.random() * 10) + 35]);
    }
    console.log('✓ Added exam results');

    // Add more placement offers
    console.log('Adding placement offers...');
    await connection.query(`
      INSERT INTO placement_offers (offer_id, company_name, job_title, package_amount, job_location, job_type, requirements, application_deadline, status) VALUES
      ('PLM004', 'Cognizant', 'Software Developer', 380000, 'Chennai', 'full_time', 'B.Tech CSE, Good coding skills', '2024-12-30', 'open'),
      ('PLM005', 'Accenture', 'Associate Software Engineer', 420000, 'Bangalore', 'full_time', 'B.Tech, Good communication', '2024-12-28', 'open'),
      ('PLM006', 'HCL Technologies', 'Graduate Engineer Trainee', 350000, 'Chennai', 'full_time', 'B.Tech CSE/IT', '2025-01-05', 'open'),
      ('PLM007', 'Tech Mahindra', 'Software Engineer', 400000, 'Pune', 'full_time', 'B.Tech, Problem solving skills', '2025-01-10', 'open'),
      ('PLM008', 'Amazon', 'SDE Intern', 50000, 'Hyderabad', 'internship', 'Strong DSA knowledge', '2024-12-25', 'open')
    `);
    console.log('✓ Added 5 more placement offers');

    // Add placement applications
    console.log('Adding placement applications...');
    for (const student of students) {
      await connection.query(`
        INSERT INTO placement_applications (student_id, offer_id, status) VALUES
        (?, 'PLM001', 'applied'),
        (?, 'PLM002', 'shortlisted')
      `, [student, student]);
    }
    console.log('✓ Added placement applications');

    // Add more notifications
    console.log('Adding notifications...');
    await connection.query(`
      INSERT INTO notifications (notification_id, title, message, sender_type, target_audience, priority, created_at) VALUES
      ('NOT004', 'Holiday Announcement', 'College will remain closed on 25th December for Christmas', 'admin', 'all', 'medium', NOW()),
      ('NOT005', 'Library Books Due', 'Please return library books by end of semester', 'admin', 'students', 'low', NOW()),
      ('NOT006', 'Placement Drive', 'TCS placement drive scheduled for next week', 'admin', 'students', 'high', NOW()),
      ('NOT007', 'Faculty Meeting', 'Department meeting on Friday at 3 PM', 'admin', 'faculty', 'medium', NOW()),
      ('NOT008', 'Exam Schedule Update', 'Final exam schedule has been updated', 'admin', 'all', 'high', NOW())
    `);
    console.log('✓ Added 5 more notifications');

    // Add infrastructure issues
    console.log('Adding infrastructure issues...');
    await connection.query(`
      INSERT INTO infrastructure_issues (issue_id, reported_by, reporter_type, issue_type, location, description, priority, status) VALUES
      ('ISS001', 'STU2024001', 'student', 'AC Not Working', 'Lab B-301', 'Air conditioning not working properly', 'high', 'open'),
      ('ISS002', 'FAC2024001', 'faculty', 'Projector Issue', 'Classroom A-201', 'Projector display is blurry', 'medium', 'in_progress'),
      ('ISS003', 'STU2024002', 'student', 'WiFi Problem', 'Library', 'WiFi connection keeps dropping', 'high', 'open'),
      ('ISS004', 'STU2024003', 'student', 'Broken Chair', 'Classroom B-105', 'Multiple chairs need repair', 'low', 'resolved')
    `);
    console.log('✓ Added infrastructure issues');

    // Add academic calendar events
    console.log('Adding calendar events...');
    await connection.query(`
      INSERT INTO academic_calendar (event_id, event_name, event_type, start_date, end_date, description, target_audience) VALUES
      ('CAL001', 'Christmas Holiday', 'holiday', '2024-12-25', '2024-12-25', 'Christmas celebration', 'all'),
      ('CAL002', 'New Year Holiday', 'holiday', '2025-01-01', '2025-01-01', 'New Year celebration', 'all'),
      ('CAL003', 'Mid-Term Exams', 'exam', '2024-12-15', '2024-12-20', 'Mid-semester examinations', 'students'),
      ('CAL004', 'Final Exams', 'exam', '2025-01-10', '2025-01-20', 'End semester examinations', 'students'),
      ('CAL005', 'Tech Fest', 'cultural', '2025-01-25', '2025-01-27', 'Annual technical festival', 'all'),
      ('CAL006', 'Sports Day', 'cultural', '2025-02-05', '2025-02-05', 'Annual sports event', 'all')
    `);
    console.log('✓ Added calendar events');

    // Add course feedback
    console.log('Adding course feedback...');
    for (const student of students.slice(0, 3)) {
      await connection.query(`
        INSERT INTO course_feedback (student_id, course_code, faculty_id, rating, teaching_quality, course_content, assignments_quality, comments) VALUES
        (?, 'CS301', 'FAC2024001', 5, 5, 4, 5, 'Excellent teaching and course content'),
        (?, 'CS302', 'FAC2024001', 4, 4, 4, 4, 'Good course, well structured')
      `, [student, student]);
    }
    console.log('✓ Added course feedback');

    // Add more fee structure
    console.log('Adding fee structure...');
    await connection.query(`
      INSERT INTO fee_structure (department, year, semester, fee_type, amount, due_date, academic_year) VALUES
      ('Computer Science', 2, 4, 'Exam Fee', 3000, '2025-01-05', '2024-25'),
      ('Computer Science', 2, 4, 'Sports Fee', 1000, '2025-01-15', '2024-25'),
      ('Computer Science', 2, 4, 'Development Fee', 5000, '2025-01-15', '2024-25')
    `);
    console.log('✓ Added fee structure');

    // Add more fee payments
    console.log('Adding fee payments...');
    for (const student of students) {
      await connection.query(`
        INSERT INTO fee_payments (payment_id, student_id, fee_type, amount, payment_method, transaction_id, status, receipt_number) VALUES
        (?, ?, 'Tuition Fee', 50000, 'online', ?, 'completed', ?)
      `, [`PAY${student.slice(-3)}1`, student, `TXN${Date.now()}${student.slice(-3)}`, `RCP${student.slice(-3)}1`]);
    }
    console.log('✓ Added fee payments');

    console.log('\n✅ Sample data added successfully!\n');
    console.log('='.repeat(50));
    console.log('Summary:');
    console.log('- Students: 5 total');
    console.log('- Faculty: 3 total');
    console.log('- Courses: 10 total');
    console.log('- Enrollments: 30 total');
    console.log('- Attendance: 100+ records');
    console.log('- Assignments: 5 total');
    console.log('- Examinations: 5 total');
    console.log('- Placement Offers: 8 total');
    console.log('- Notifications: 8 total');
    console.log('- Infrastructure Issues: 4 total');
    console.log('- Calendar Events: 6 total');
    console.log('='.repeat(50));
    console.log('\n🎉 Database is now fully populated!');
    console.log('Visit http://localhost:3000 to see the data\n');

  } catch (error) {
    console.error('\n❌ Error adding data:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addSampleData();