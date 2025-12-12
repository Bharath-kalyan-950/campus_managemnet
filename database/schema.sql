-- Smart Campus Management System Database Schema
-- Created for SIMATS Engineering College

CREATE DATABASE IF NOT EXISTS smart_campus_db;
USE smart_campus_db;

-- Users table (for authentication)
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
);

-- Students table
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
);

-- Faculty table
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
);

-- Courses table
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
);

-- Course Enrollment table
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
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL
);

-- Attendance table
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
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL
);

-- Assignments table
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
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL
);

-- Assignment Submissions table
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
);

-- Examinations table
CREATE TABLE examinations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    exam_id VARCHAR(20) UNIQUE NOT NULL,
    course_code VARCHAR(20),
    exam_name VARCHAR(100) NOT NULL,
    exam_type ENUM('internal', 'external', 'quiz', 'practical') NOT NULL,
    exam_date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration INT NOT NULL, -- in minutes
    max_marks INT DEFAULT 100,
    venue VARCHAR(100),
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
);

-- Exam Results table
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
);

-- Fee Structure table
CREATE TABLE fee_structure (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    semester INT NOT NULL,
    fee_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    academic_year VARCHAR(10) NOT NULL
);

-- Fee Payments table
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
);

-- Disciplinary Actions table
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
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL
);

-- Placement Offers table
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
);

-- Student Placement Applications table
CREATE TABLE placement_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id VARCHAR(20),
    offer_id VARCHAR(20),
    application_date DATE DEFAULT (CURRENT_DATE),
    status ENUM('applied', 'shortlisted', 'selected', 'rejected') DEFAULT 'applied',
    interview_feedback TEXT,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (offer_id) REFERENCES placement_offers(offer_id) ON DELETE CASCADE
);

-- Course Feedback table
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
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL
);

-- Infrastructure Issues table
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
);

-- Notifications table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    notification_id VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    sender_id VARCHAR(20),
    sender_type ENUM('admin', 'faculty', 'system') NOT NULL,
    target_audience ENUM('all', 'students', 'faculty', 'department', 'year', 'individual') NOT NULL,
    target_filter VARCHAR(100), -- department, year, or specific user_id
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    has_attachment BOOLEAN DEFAULT FALSE,
    attachment_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME
);

-- User Notification Status table
CREATE TABLE user_notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    notification_id VARCHAR(20),
    user_id VARCHAR(20),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (notification_id) REFERENCES notifications(notification_id) ON DELETE CASCADE
);

-- Academic Calendar table
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
);

-- Insert comprehensive sample data
-- Password for all users: "password" (hashed with bcrypt)

-- Insert sample users
INSERT INTO users (user_id, email, password, role, first_name, last_name, phone) VALUES
('STU2024001', 'john.doe@simats.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxKLc5nGe', 'student', 'John', 'Doe', '9876543210'),
('STU2024002', 'jane.smith@simats.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxKLc5nGe', 'student', 'Jane', 'Smith', '9876543211'),
('STU2024003', 'arjun.kumar@simats.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxKLc5nGe', 'student', 'Arjun', 'Kumar', '9876543212'),
('FAC2024001', 'daniel@simats.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxKLc5nGe', 'faculty', 'Daniel', '', '9876543213'),
('FAC2024002', 'priya.sharma@simats.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxKLc5nGe', 'faculty', 'Priya', 'Sharma', '9876543214'),
('ADM2024001', 'admin@simats.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxKLc5nGe', 'admin', 'Admin', 'User', '9876543215');

-- Insert sample students
INSERT INTO students (student_id, user_id, department, year, semester, batch, cgpa, admission_date, guardian_name, guardian_phone, address, blood_group, date_of_birth) VALUES
('STU2024001', 1, 'Computer Science Engineering', 2, 4, 'CSE-A', 8.5, '2022-07-15', 'Robert Doe', '9876543220', 'Chennai, Tamil Nadu', 'O+', '2003-05-15'),
('STU2024002', 2, 'Computer Science Engineering', 2, 4, 'CSE-A', 8.8, '2022-07-15', 'Michael Smith', '9876543221', 'Coimbatore, Tamil Nadu', 'A+', '2003-03-20'),
('STU2024003', 3, 'Electronics and Communication', 3, 5, 'ECE-B', 9.1, '2021-07-15', 'Rajesh Kumar', '9876543222', 'Madurai, Tamil Nadu', 'B+', '2002-08-10');

-- Insert sample faculty
INSERT INTO faculty (faculty_id, user_id, department, designation, qualification, experience_years, specialization, office_room, joining_date) VALUES
('FAC2024001', 4, 'Computer Science Engineering', 'Assistant Professor', 'Ph.D in Computer Science', 8, 'Machine Learning, Data Science', 'Room 205, CS Block', '2020-07-15'),
('FAC2024002', 5, 'Electronics and Communication', 'Associate Professor', 'Ph.D in Electronics', 12, 'Signal Processing, VLSI Design', 'Room 301, ECE Block', '2018-06-01');

-- Insert comprehensive courses
INSERT INTO courses (course_code, course_name, department, credits, semester, year, course_type, description) VALUES
-- Computer Science Courses
('CS201', 'Programming in C++', 'Computer Science Engineering', 4, 3, 2, 'core', 'Object-oriented programming concepts using C++'),
('CS202', 'Data Structures and Algorithms', 'Computer Science Engineering', 4, 3, 2, 'core', 'Linear and non-linear data structures, algorithm analysis'),
('CS301', 'Database Management Systems', 'Computer Science Engineering', 4, 5, 3, 'core', 'Relational databases, SQL, normalization, transactions'),
('CS302', 'Computer Networks', 'Computer Science Engineering', 3, 5, 3, 'core', 'Network protocols, OSI model, TCP/IP'),
('CS303', 'Software Engineering', 'Computer Science Engineering', 3, 5, 3, 'core', 'Software development lifecycle, design patterns'),
('CS401', 'Machine Learning', 'Computer Science Engineering', 4, 7, 4, 'elective', 'Supervised and unsupervised learning algorithms'),
('CS402', 'Web Technologies', 'Computer Science Engineering', 3, 7, 4, 'elective', 'HTML, CSS, JavaScript, frameworks'),

-- Electronics Courses
('EC201', 'Electronic Circuits', 'Electronics and Communication', 4, 3, 2, 'core', 'Analog and digital electronic circuits'),
('EC202', 'Signals and Systems', 'Electronics and Communication', 4, 4, 2, 'core', 'Continuous and discrete time signals'),
('EC301', 'Digital Signal Processing', 'Electronics and Communication', 4, 5, 3, 'core', 'Digital filters, FFT, signal analysis'),
('EC302', 'Communication Systems', 'Electronics and Communication', 4, 6, 3, 'core', 'Analog and digital communication'),

-- Common Courses
('MA201', 'Engineering Mathematics III', 'Mathematics', 4, 3, 2, 'core', 'Differential equations, transforms'),
('PH201', 'Engineering Physics', 'Physics', 3, 1, 1, 'core', 'Quantum mechanics, solid state physics'),
('ENG201', 'Technical Communication', 'English', 2, 4, 2, 'core', 'Technical writing and presentation skills');

-- Insert course enrollments
INSERT INTO enrollments (student_id, course_code, faculty_id, status, grade, grade_points) VALUES
-- Student 1 enrollments
('STU2024001', 'CS201', 'FAC2024001', 'completed', 'A', 9.0),
('STU2024001', 'CS202', 'FAC2024001', 'completed', 'A+', 10.0),
('STU2024001', 'CS301', 'FAC2024001', 'enrolled', NULL, NULL),
('STU2024001', 'CS302', 'FAC2024001', 'enrolled', NULL, NULL),
('STU2024001', 'MA201', 'FAC2024001', 'completed', 'B+', 8.0),

-- Student 2 enrollments
('STU2024002', 'CS201', 'FAC2024001', 'completed', 'A+', 10.0),
('STU2024002', 'CS202', 'FAC2024001', 'completed', 'A', 9.0),
('STU2024002', 'CS301', 'FAC2024001', 'enrolled', NULL, NULL),
('STU2024002', 'CS302', 'FAC2024001', 'enrolled', NULL, NULL),

-- Student 3 enrollments (ECE)
('STU2024003', 'EC201', 'FAC2024002', 'completed', 'A+', 10.0),
('STU2024003', 'EC202', 'FAC2024002', 'completed', 'A', 9.0),
('STU2024003', 'EC301', 'FAC2024002', 'enrolled', NULL, NULL);

-- Insert attendance records
INSERT INTO attendance (student_id, course_code, faculty_id, date, status, session_type) VALUES
-- CS301 attendance for multiple students
('STU2024001', 'CS301', 'FAC2024001', '2024-12-01', 'present', 'lecture'),
('STU2024001', 'CS301', 'FAC2024001', '2024-12-02', 'present', 'lecture'),
('STU2024001', 'CS301', 'FAC2024001', '2024-12-03', 'absent', 'lecture'),
('STU2024001', 'CS301', 'FAC2024001', '2024-12-04', 'present', 'lab'),
('STU2024001', 'CS301', 'FAC2024001', '2024-12-05', 'present', 'lecture'),

('STU2024002', 'CS301', 'FAC2024001', '2024-12-01', 'present', 'lecture'),
('STU2024002', 'CS301', 'FAC2024001', '2024-12-02', 'present', 'lecture'),
('STU2024002', 'CS301', 'FAC2024001', '2024-12-03', 'present', 'lecture'),
('STU2024002', 'CS301', 'FAC2024001', '2024-12-04', 'present', 'lab'),
('STU2024002', 'CS301', 'FAC2024001', '2024-12-05', 'absent', 'lecture'),

-- CS302 attendance
('STU2024001', 'CS302', 'FAC2024001', '2024-12-01', 'present', 'lecture'),
('STU2024001', 'CS302', 'FAC2024001', '2024-12-02', 'present', 'lecture'),
('STU2024001', 'CS302', 'FAC2024001', '2024-12-03', 'present', 'lecture'),
('STU2024001', 'CS302', 'FAC2024001', '2024-12-04', 'late', 'lecture'),
('STU2024001', 'CS302', 'FAC2024001', '2024-12-05', 'present', 'lecture');

-- Insert assignments
INSERT INTO assignments (assignment_id, course_code, faculty_id, title, description, due_date, max_marks, assignment_type) VALUES
('ASG001', 'CS301', 'FAC2024001', 'Database Design Project', 'Design and implement a complete database system for library management', '2024-12-20 23:59:59', 100, 'project'),
('ASG002', 'CS302', 'FAC2024001', 'Network Protocol Analysis', 'Analyze TCP/IP packet flow using Wireshark', '2024-12-15 23:59:59', 50, 'individual'),
('ASG003', 'CS301', 'FAC2024001', 'SQL Query Optimization', 'Write optimized SQL queries for given scenarios', '2024-12-18 23:59:59', 75, 'individual');

-- Insert assignment submissions
INSERT INTO assignment_submissions (assignment_id, student_id, submission_text, submitted_at, marks_obtained, status) VALUES
('ASG002', 'STU2024001', 'Completed network analysis using Wireshark. Found TCP handshake patterns...', '2024-12-14 18:30:00', 45, 'graded'),
('ASG002', 'STU2024002', 'Network protocol analysis report with packet captures...', '2024-12-15 10:15:00', 48, 'graded'),
('ASG003', 'STU2024001', 'SQL optimization queries with execution plans...', '2024-12-17 20:45:00', NULL, 'submitted');

-- Insert examinations
INSERT INTO examinations (exam_id, course_code, exam_name, exam_type, exam_date, start_time, duration, max_marks, venue) VALUES
('EX001', 'CS301', 'Database Mid-Term Exam', 'internal', '2024-12-25', '10:00:00', 120, 100, 'Main Hall A'),
('EX002', 'CS302', 'Networks Internal Assessment', 'internal', '2024-12-28', '14:00:00', 90, 75, 'Lab Block 2'),
('EX003', 'CS301', 'Database End Semester', 'external', '2025-01-15', '09:00:00', 180, 100, 'Exam Hall 1'),
('EX004', 'CS302', 'Networks End Semester', 'external', '2025-01-18', '09:00:00', 180, 100, 'Exam Hall 2');

-- Insert exam results
INSERT INTO exam_results (exam_id, student_id, marks_obtained, grade, result_date) VALUES
('EX001', 'STU2024001', 85, 'A', '2024-12-27'),
('EX001', 'STU2024002', 92, 'A+', '2024-12-27'),
('EX002', 'STU2024001', 68, 'B+', '2024-12-30'),
('EX002', 'STU2024002', 71, 'A-', '2024-12-30');

-- Insert fee structure
INSERT INTO fee_structure (department, year, semester, fee_type, amount, due_date, academic_year) VALUES
('Computer Science Engineering', 2, 4, 'Tuition Fee', 75000.00, '2024-12-31', '2024-25'),
('Computer Science Engineering', 2, 4, 'Lab Fee', 5000.00, '2024-12-31', '2024-25'),
('Computer Science Engineering', 2, 4, 'Library Fee', 2000.00, '2024-12-31', '2024-25'),
('Electronics and Communication', 3, 5, 'Tuition Fee', 80000.00, '2024-12-31', '2024-25'),
('Electronics and Communication', 3, 5, 'Lab Fee', 7000.00, '2024-12-31', '2024-25');

-- Insert fee payments
INSERT INTO fee_payments (payment_id, student_id, fee_type, amount, payment_date, payment_method, transaction_id, status, receipt_number) VALUES
('PAY001', 'STU2024001', 'Tuition Fee', 75000.00, '2024-07-15', 'online', 'TXN123456789', 'completed', 'RCP001'),
('PAY002', 'STU2024001', 'Lab Fee', 5000.00, '2024-07-15', 'online', 'TXN123456790', 'completed', 'RCP002'),
('PAY003', 'STU2024002', 'Tuition Fee', 75000.00, '2024-07-20', 'bank_transfer', 'TXN123456791', 'completed', 'RCP003');

-- Insert disciplinary actions
INSERT INTO disciplinary_actions (action_id, student_id, faculty_id, violation_type, description, action_taken, severity, date_reported, status) VALUES
('DIS001', 'STU2024001', 'FAC2024001', 'Late Submission', 'Assignment submitted 2 days after deadline', 'Warning issued, marks deducted', 'minor', '2024-11-15', 'resolved'),
('DIS002', 'STU2024002', 'FAC2024001', 'Outstanding Performance', 'Excellent project presentation and innovation', 'Certificate of appreciation', 'minor', '2024-11-20', 'resolved');

-- Insert placement offers
INSERT INTO placement_offers (offer_id, company_name, job_title, package_amount, job_location, job_type, requirements, application_deadline, status) VALUES
('PLO001', 'TCS', 'Software Developer', 650000.00, 'Chennai', 'full_time', 'B.Tech in CSE/IT, Good programming skills', '2024-12-30', 'open'),
('PLO002', 'Infosys', 'System Engineer', 700000.00, 'Bangalore', 'full_time', 'B.Tech in CSE/ECE, Problem solving skills', '2024-12-28', 'open'),
('PLO003', 'Wipro', 'Junior Developer', 600000.00, 'Hyderabad', 'full_time', 'B.Tech in CSE, Java/Python knowledge', '2025-01-05', 'open');

-- Insert placement applications
INSERT INTO placement_applications (student_id, offer_id, application_date, status) VALUES
('STU2024001', 'PLO001', '2024-12-10', 'selected'),
('STU2024002', 'PLO002', '2024-12-12', 'shortlisted'),
('STU2024003', 'PLO001', '2024-12-11', 'applied');

-- Insert course feedback
INSERT INTO course_feedback (student_id, course_code, faculty_id, rating, teaching_quality, course_content, assignments_quality, comments, feedback_date) VALUES
('STU2024001', 'CS201', 'FAC2024001', 5, 5, 4, 5, 'Excellent teaching methodology and clear explanations', '2024-11-30'),
('STU2024002', 'CS201', 'FAC2024001', 4, 4, 5, 4, 'Good course content, assignments could be more challenging', '2024-11-30'),
('STU2024001', 'CS202', 'FAC2024001', 5, 5, 5, 5, 'Outstanding course delivery and practical examples', '2024-11-30');

-- Insert infrastructure issues
INSERT INTO infrastructure_issues (issue_id, reported_by, reporter_type, issue_type, location, description, priority, status, reported_date) VALUES
('ISS001', 'STU2024001', 'student', 'Equipment Malfunction', 'Computer Lab 1', 'System 15 not booting up, blue screen error', 'high', 'in_progress', '2024-12-10'),
('ISS002', 'FAC2024001', 'faculty', 'Facility Issue', 'Classroom 205', 'Projector not working, bulb needs replacement', 'medium', 'open', '2024-12-11'),
('ISS003', 'STU2024002', 'student', 'Network Issue', 'Library', 'WiFi connection very slow in reading area', 'low', 'resolved', '2024-12-08');

-- Insert notifications
INSERT INTO notifications (notification_id, title, message, sender_type, target_audience, priority, created_at) VALUES
('NOT001', 'Assignment Due Tomorrow', 'Database Management assignment submission deadline is tomorrow at 11:59 PM', 'faculty', 'students', 'high', '2024-12-11 09:00:00'),
('NOT002', 'Exam Schedule Released', 'End semester examination schedule has been published on the portal', 'admin', 'all', 'medium', '2024-12-10 14:30:00'),
('NOT003', 'Placement Drive', 'TCS campus placement drive scheduled for December 20th. Eligible students register now', 'admin', 'students', 'high', '2024-12-09 10:00:00'),
('NOT004', 'Library Closure', 'Library will be closed on December 15th for maintenance work', 'admin', 'all', 'low', '2024-12-08 16:00:00');

-- Insert academic calendar events
INSERT INTO academic_calendar (event_id, event_name, event_type, start_date, end_date, description, target_audience) VALUES
('CAL001', 'End Semester Examinations', 'exam', '2025-01-15', '2025-01-30', 'Final examinations for all courses', 'all'),
('CAL002', 'Winter Break', 'holiday', '2024-12-23', '2025-01-02', 'Winter vacation for students and faculty', 'all'),
('CAL003', 'Project Presentation', 'academic', '2025-01-10', '2025-01-12', 'Final year project presentations', 'students'),
('CAL004', 'Cultural Fest', 'cultural', '2025-02-15', '2025-02-17', 'Annual cultural festival - Techfest 2025', 'all'),
('CAL005', 'Registration for Next Semester', 'registration', '2025-02-01', '2025-02-10', 'Course registration for upcoming semester', 'students');
