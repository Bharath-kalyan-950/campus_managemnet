-- Attendance Management System Schema

-- Create attendance_sessions table to track class sessions
CREATE TABLE IF NOT EXISTS attendance_sessions (
    session_id VARCHAR(50) PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL,
    faculty_id VARCHAR(20) NOT NULL,
    session_date DATE NOT NULL,
    session_time TIME NOT NULL,
    session_duration INT DEFAULT 60, -- in minutes
    session_topic VARCHAR(255),
    session_type ENUM('lecture', 'lab', 'tutorial', 'exam') DEFAULT 'lecture',
    total_students INT DEFAULT 0,
    present_students INT DEFAULT 0,
    attendance_percentage DECIMAL(5,2) DEFAULT 0.00,
    status ENUM('scheduled', 'ongoing', 'completed', 'cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE CASCADE,
    INDEX idx_course_date (course_code, session_date),
    INDEX idx_faculty_date (faculty_id, session_date)
);
-- Create attendance_records table to track individual student attendance
CREATE TABLE IF NOT EXISTS attendance_records (
    record_id VARCHAR(50) PRIMARY KEY,
    session_id VARCHAR(50) NOT NULL,
    student_id VARCHAR(20) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    attendance_status ENUM('present', 'absent', 'late', 'excused') DEFAULT 'absent',
    marked_at TIMESTAMP NULL,
    marked_by VARCHAR(20), -- faculty_id who marked attendance
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES attendance_sessions(session_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES faculty(faculty_id) ON DELETE SET NULL,
    UNIQUE KEY unique_student_session (session_id, student_id),
    INDEX idx_student_course (student_id, course_code),
    INDEX idx_session_status (session_id, attendance_status)
);

-- Create attendance_summary table for quick access to student attendance statistics
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
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE,
    UNIQUE KEY unique_student_course (student_id, course_code),
    INDEX idx_student_attendance (student_id, attendance_percentage),
    INDEX idx_course_attendance (course_code, attendance_percentage)
);

-- Insert sample attendance sessions for existing courses
INSERT IGNORE INTO attendance_sessions (session_id, course_code, faculty_id, session_date, session_time, session_topic, total_students, present_students, attendance_percentage, status) VALUES
-- CSA022 sessions
('SESS_CSA022_001', 'CSA022', 'FAC2024001', '2024-12-01', '09:00:00', 'Introduction to Computer Science', 25, 23, 92.00, 'completed'),
('SESS_CSA022_002', 'CSA022', 'FAC2024001', '2024-12-03', '09:00:00', 'Programming Fundamentals', 25, 22, 88.00, 'completed'),
('SESS_CSA022_003', 'CSA022', 'FAC2024001', '2024-12-05', '09:00:00', 'Data Structures Basics', 25, 24, 96.00, 'completed'),
('SESS_CSA022_004', 'CSA022', 'FAC2024001', '2024-12-08', '09:00:00', 'Algorithms Introduction', 25, 21, 84.00, 'completed'),
('SESS_CSA022_005', 'CSA022', 'FAC2024001', '2024-12-10', '09:00:00', 'Object-Oriented Programming', 25, 25, 100.00, 'completed'),
('SESS_CSA022_006', 'CSA022', 'FAC2024001', '2024-12-26', '09:00:00', 'Advanced Programming Concepts', 25, 0, 0.00, 'scheduled'),

-- UBA0123 sessions
('SESS_UBA0123_001', 'UBA0123', 'FAC2024001', '2024-12-02', '11:00:00', 'Business Fundamentals', 30, 28, 93.33, 'completed'),
('SESS_UBA0123_002', 'UBA0123', 'FAC2024001', '2024-12-04', '11:00:00', 'Marketing Principles', 30, 27, 90.00, 'completed'),
('SESS_UBA0123_003', 'UBA0123', 'FAC2024001', '2024-12-06', '11:00:00', 'Financial Management', 30, 29, 96.67, 'completed'),
('SESS_UBA0123_004', 'UBA0123', 'FAC2024001', '2024-12-09', '11:00:00', 'Operations Management', 30, 26, 86.67, 'completed'),
('SESS_UBA0123_005', 'UBA0123', 'FAC2024001', '2024-12-26', '11:00:00', 'Strategic Planning', 30, 0, 0.00, 'scheduled'),

-- CS301 sessions
('SESS_CS301_001', 'CS301', 'FAC2024001', '2024-12-01', '14:00:00', 'Database Design Principles', 20, 19, 95.00, 'completed'),
('SESS_CS301_002', 'CS301', 'FAC2024001', '2024-12-03', '14:00:00', 'SQL Fundamentals', 20, 18, 90.00, 'completed'),
('SESS_CS301_003', 'CS301', 'FAC2024001', '2024-12-05', '14:00:00', 'Normalization Techniques', 20, 20, 100.00, 'completed'),
('SESS_CS301_004', 'CS301', 'FAC2024001', '2024-12-26', '14:00:00', 'Advanced Queries', 20, 0, 0.00, 'scheduled');

-- Insert sample attendance records for students
INSERT IGNORE INTO attendance_records (record_id, session_id, student_id, course_code, attendance_status, marked_at, marked_by) VALUES
-- Rajesh Kumar (STU2024002) attendance
('REC_CSA022_001_STU002', 'SESS_CSA022_001', 'STU2024002', 'CSA022', 'present', '2024-12-01 09:05:00', 'FAC2024001'),
('REC_CSA022_002_STU002', 'SESS_CSA022_002', 'STU2024002', 'CSA022', 'present', '2024-12-03 09:03:00', 'FAC2024001'),
('REC_CSA022_003_STU002', 'SESS_CSA022_003', 'STU2024002', 'CSA022', 'late', '2024-12-05 09:15:00', 'FAC2024001'),
('REC_CSA022_004_STU002', 'SESS_CSA022_004', 'STU2024002', 'CSA022', 'absent', NULL, NULL),
('REC_CSA022_005_STU002', 'SESS_CSA022_005', 'STU2024002', 'CSA022', 'present', '2024-12-10 09:02:00', 'FAC2024001'),

('REC_UBA0123_001_STU002', 'SESS_UBA0123_001', 'STU2024002', 'UBA0123', 'present', '2024-12-02 11:05:00', 'FAC2024001'),
('REC_UBA0123_002_STU002', 'SESS_UBA0123_002', 'STU2024002', 'UBA0123', 'present', '2024-12-04 11:02:00', 'FAC2024001'),
('REC_UBA0123_003_STU002', 'SESS_UBA0123_003', 'STU2024002', 'UBA0123', 'present', '2024-12-06 11:01:00', 'FAC2024001'),
('REC_UBA0123_004_STU002', 'SESS_UBA0123_004', 'STU2024002', 'UBA0123', 'present', '2024-12-09 11:03:00', 'FAC2024001'),

-- John Doe (STU2024001) attendance
('REC_CSA022_001_STU001', 'SESS_CSA022_001', 'STU2024001', 'CSA022', 'present', '2024-12-01 09:02:00', 'FAC2024001'),
('REC_CSA022_002_STU001', 'SESS_CSA022_002', 'STU2024001', 'CSA022', 'absent', NULL, NULL),
('REC_CSA022_003_STU001', 'SESS_CSA022_003', 'STU2024001', 'CSA022', 'present', '2024-12-05 09:01:00', 'FAC2024001'),
('REC_CSA022_004_STU001', 'SESS_CSA022_004', 'STU2024001', 'CSA022', 'present', '2024-12-08 09:04:00', 'FAC2024001'),
('REC_CSA022_005_STU001', 'SESS_CSA022_005', 'STU2024001', 'CSA022', 'present', '2024-12-10 09:01:00', 'FAC2024001'),

('REC_CS301_001_STU001', 'SESS_CS301_001', 'STU2024001', 'CS301', 'present', '2024-12-01 14:05:00', 'FAC2024001'),
('REC_CS301_002_STU001', 'SESS_CS301_002', 'STU2024001', 'CS301', 'late', '2024-12-03 14:20:00', 'FAC2024001'),
('REC_CS301_003_STU001', 'SESS_CS301_003', 'STU2024001', 'CS301', 'present', '2024-12-05 14:02:00', 'FAC2024001');

-- Update attendance summary for students
INSERT IGNORE INTO attendance_summary (summary_id, student_id, course_code, total_sessions, attended_sessions, late_sessions, excused_sessions, attendance_percentage) VALUES
('SUM_STU002_CSA022', 'STU2024002', 'CSA022', 5, 4, 1, 0, 80.00),
('SUM_STU002_UBA0123', 'STU2024002', 'UBA0123', 4, 4, 0, 0, 100.00),
('SUM_STU001_CSA022', 'STU2024001', 'CSA022', 5, 4, 0, 0, 80.00),
('SUM_STU001_CS301', 'STU2024001', 'CS301', 3, 3, 1, 0, 100.00);

-- Create views for easy data access
CREATE OR REPLACE VIEW student_attendance_view AS
SELECT 
    s.student_id,
    CONCAT(u.first_name, ' ', u.last_name) as student_name,
    c.course_code,
    c.course_name,
    assum.total_sessions,
    assum.attended_sessions,
    assum.late_sessions,
    assum.excused_sessions,
    assum.attendance_percentage,
    CASE 
        WHEN assum.attendance_percentage >= 90 THEN 'Excellent'
        WHEN assum.attendance_percentage >= 80 THEN 'Good'
        WHEN assum.attendance_percentage >= 70 THEN 'Average'
        WHEN assum.attendance_percentage >= 60 THEN 'Below Average'
        ELSE 'Poor'
    END as attendance_grade
FROM attendance_summary assum
JOIN students s ON assum.student_id = s.student_id
JOIN users u ON s.user_id = u.id
JOIN courses c ON assum.course_code = c.course_code
ORDER BY s.student_id, c.course_code;

CREATE OR REPLACE VIEW faculty_course_attendance AS
SELECT 
    f.faculty_id,
    CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
    c.course_code,
    c.course_name,
    COUNT(DISTINCT asess.session_id) as total_sessions,
    COUNT(DISTINCT CASE WHEN asess.status = 'completed' THEN asess.session_id END) as completed_sessions,
    AVG(asess.attendance_percentage) as avg_attendance_percentage,
    COUNT(DISTINCT er.student_id) as enrolled_students
FROM faculty f
JOIN users u ON f.user_id = u.id
JOIN courses c ON f.faculty_id = c.faculty_id
LEFT JOIN attendance_sessions asess ON c.course_code = asess.course_code
LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.status = 'enrolled'
GROUP BY f.faculty_id, c.course_code
ORDER BY f.faculty_id, c.course_code;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_attendance_records_student_course ON attendance_records(student_id, course_code, attendance_status);
CREATE INDEX IF NOT EXISTS idx_attendance_sessions_faculty_course ON attendance_sessions(faculty_id, course_code, session_date);
CREATE INDEX IF NOT EXISTS idx_attendance_summary_percentage ON attendance_summary(attendance_percentage DESC);