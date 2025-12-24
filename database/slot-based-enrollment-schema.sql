-- Slot-Based Course Enrollment System Schema
-- Adds slot functionality to existing course system

USE smart_campus_db;

-- Add slot field to courses table
ALTER TABLE courses ADD COLUMN slot VARCHAR(10) DEFAULT NULL AFTER course_type;
ALTER TABLE courses ADD COLUMN max_capacity INT DEFAULT 30 AFTER slot;
ALTER TABLE courses ADD COLUMN current_enrolled INT DEFAULT 0 AFTER max_capacity;
ALTER TABLE courses ADD COLUMN faculty_id VARCHAR(20) DEFAULT NULL AFTER current_enrolled;
ALTER TABLE courses ADD FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL;

-- Create enrollment_requests table for student enrollment requests
CREATE TABLE enrollment_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id VARCHAR(50) UNIQUE NOT NULL,
    student_id VARCHAR(20) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    faculty_id VARCHAR(20) NOT NULL,
    slot VARCHAR(10) NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    faculty_notes TEXT,
    processed_at TIMESTAMP NULL,
    processed_by VARCHAR(20),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE CASCADE,
    INDEX idx_student_course (student_id, course_code),
    INDEX idx_faculty_status (faculty_id, status),
    INDEX idx_slot (slot)
);

-- Update existing courses with sample slot data
UPDATE courses SET 
    slot = 'A', 
    max_capacity = 40, 
    current_enrolled = 2,
    faculty_id = 'FAC2024001'
WHERE course_code IN ('CS301', 'CS201');

UPDATE courses SET 
    slot = 'B', 
    max_capacity = 35, 
    current_enrolled = 2,
    faculty_id = 'FAC2024001'
WHERE course_code IN ('CS302', 'CS202');

UPDATE courses SET 
    slot = 'C', 
    max_capacity = 30, 
    current_enrolled = 0,
    faculty_id = 'FAC2024001'
WHERE course_code = 'CS303';

UPDATE courses SET 
    slot = 'D', 
    max_capacity = 25, 
    current_enrolled = 0,
    faculty_id = 'FAC2024001'
WHERE course_code = 'CS401';

UPDATE courses SET 
    slot = 'E', 
    max_capacity = 30, 
    current_enrolled = 0,
    faculty_id = 'FAC2024001'
WHERE course_code = 'CS402';

UPDATE courses SET 
    slot = 'A', 
    max_capacity = 35, 
    current_enrolled = 1,
    faculty_id = 'FAC2024002'
WHERE course_code IN ('EC301', 'EC201');

UPDATE courses SET 
    slot = 'B', 
    max_capacity = 30, 
    current_enrolled = 1,
    faculty_id = 'FAC2024002'
WHERE course_code IN ('EC302', 'EC202');

UPDATE courses SET 
    slot = 'C', 
    max_capacity = 50, 
    current_enrolled = 3,
    faculty_id = 'FAC2024001'
WHERE course_code = 'MA201';

UPDATE courses SET 
    slot = 'D', 
    max_capacity = 45, 
    current_enrolled = 3,
    faculty_id = 'FAC2024002'
WHERE course_code = 'PH201';

UPDATE courses SET 
    slot = 'E', 
    max_capacity = 40, 
    current_enrolled = 3,
    faculty_id = 'FAC2024001'
WHERE course_code = 'ENG201';

-- Insert sample enrollment requests
INSERT INTO enrollment_requests (request_id, student_id, course_code, faculty_id, slot, status, request_date) VALUES
('ENR_REQ_001', 'STU2024001', 'CS303', 'FAC2024001', 'C', 'pending', NOW()),
('ENR_REQ_002', 'STU2024002', 'CS303', 'FAC2024001', 'C', 'pending', NOW()),
('ENR_REQ_003', 'STU2024003', 'EC302', 'FAC2024002', 'B', 'approved', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('ENR_REQ_004', 'STU2024001', 'CS401', 'FAC2024001', 'D', 'pending', NOW()),
('ENR_REQ_005', 'STU2024002', 'CS402', 'FAC2024001', 'E', 'rejected', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- Create view for course enrollment summary
CREATE VIEW course_enrollment_summary AS
SELECT 
    c.course_code,
    c.course_name,
    c.slot,
    c.max_capacity,
    c.current_enrolled,
    (c.max_capacity - c.current_enrolled) as available_slots,
    CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
    c.faculty_id,
    c.department,
    c.credits,
    c.course_type
FROM courses c
LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
LEFT JOIN users u ON f.user_id = u.id
WHERE c.slot IS NOT NULL
ORDER BY c.slot, c.course_code;

-- Create view for enrollment requests with details
CREATE VIEW enrollment_requests_detailed AS
SELECT 
    er.request_id,
    er.student_id,
    CONCAT(us.first_name, ' ', us.last_name) as student_name,
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
ORDER BY er.request_date DESC;

-- Add indexes for better performance
CREATE INDEX idx_courses_slot ON courses(slot);
CREATE INDEX idx_courses_faculty ON courses(faculty_id);
CREATE INDEX idx_enrollment_requests_status_date ON enrollment_requests(status, request_date);