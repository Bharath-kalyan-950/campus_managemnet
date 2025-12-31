-- OD Requests Table
CREATE TABLE IF NOT EXISTS od_requests (
    request_id VARCHAR(50) PRIMARY KEY,
    faculty_id VARCHAR(20) NOT NULL,
    student_id VARCHAR(20) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    od_date DATE NOT NULL,
    od_reason TEXT NOT NULL,
    od_type ENUM('official', 'conference', 'training', 'meeting', 'other') DEFAULT 'official',
    supporting_document VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    faculty_remarks TEXT,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_faculty_id (faculty_id),
    INDEX idx_student_id (student_id),
    INDEX idx_course_code (course_code),
    INDEX idx_status (status),
    INDEX idx_od_date (od_date),
    
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
);

-- Insert sample OD requests for testing
INSERT INTO od_requests (
    request_id, faculty_id, student_id, course_code, od_date, od_reason, od_type, status, requested_at
) VALUES 
(
    'OD_1767151000001_ABC123',
    'FAC2024001',
    'STU2024002',
    'CSA022',
    '2025-01-05',
    'Attending IEEE Conference on Computer Science and Applications at Chennai. This conference will help me understand the latest trends in Python programming and machine learning applications.',
    'conference',
    'pending',
    '2025-12-30 14:30:00'
),
(
    'OD_1767151000002_DEF456',
    'FAC2024001',
    'STU2024002',
    'UBA0123',
    '2025-01-08',
    'Official meeting with industry partners for internship program coordination. This meeting is essential for finalizing internship placements for final year students.',
    'meeting',
    'approved',
    '2025-12-29 10:15:00'
),
(
    'OD_1767151000003_GHI789',
    'FAC2024001',
    'STU2024002',
    'CSA022',
    '2025-01-12',
    'Training program on Advanced Python Development and Data Science at IIT Madras. This 3-day intensive training will enhance my technical skills.',
    'training',
    'rejected',
    '2025-12-28 16:45:00'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_od_requests_faculty_status ON od_requests(faculty_id, status);
CREATE INDEX IF NOT EXISTS idx_od_requests_date_range ON od_requests(od_date, requested_at);