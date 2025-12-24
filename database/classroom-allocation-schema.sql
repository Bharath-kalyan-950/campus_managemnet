-- Classroom Allocation Agent Database Schema
-- Extension to Smart Campus Management System

-- Classrooms/Rooms table
CREATE TABLE IF NOT EXISTS classrooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id VARCHAR(20) UNIQUE NOT NULL,
    room_name VARCHAR(100) NOT NULL,
    building VARCHAR(50) NOT NULL,
    floor INT NOT NULL,
    capacity INT NOT NULL,
    room_type ENUM('lecture_hall', 'lab', 'seminar_room', 'auditorium', 'conference_room') NOT NULL,
    equipment JSON, -- Store available equipment as JSON
    status ENUM('available', 'maintenance', 'out_of_order') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Classroom Allocation Requests table
CREATE TABLE IF NOT EXISTS allocation_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id VARCHAR(20) UNIQUE NOT NULL,
    faculty_id VARCHAR(20) NOT NULL,
    course_code VARCHAR(20),
    requested_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    expected_strength INT NOT NULL,
    required_equipment JSON, -- Store required equipment as JSON
    purpose VARCHAR(200) NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP NULL,
    processed_by VARCHAR(20), -- admin user_id
    notes TEXT,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE SET NULL
);

-- Classroom Allocations table (approved allocations)
CREATE TABLE IF NOT EXISTS classroom_allocations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    allocation_id VARCHAR(20) UNIQUE NOT NULL,
    request_id VARCHAR(20),
    room_id VARCHAR(20) NOT NULL,
    faculty_id VARCHAR(20) NOT NULL,
    course_code VARCHAR(20),
    allocated_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    actual_strength INT,
    status ENUM('scheduled', 'ongoing', 'completed', 'cancelled') DEFAULT 'scheduled',
    allocation_type ENUM('regular', 'makeup', 'extra', 'exam') DEFAULT 'regular',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES allocation_requests(request_id) ON DELETE SET NULL,
    FOREIGN KEY (room_id) REFERENCES classrooms(room_id) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE SET NULL
);

-- Agent Decisions Log table
CREATE TABLE IF NOT EXISTS agent_decisions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    decision_id VARCHAR(20) UNIQUE NOT NULL,
    request_id VARCHAR(20) NOT NULL,
    decision_type ENUM('auto_approve', 'suggest_alternative', 'conflict_detected', 'manual_review') NOT NULL,
    suggested_room_id VARCHAR(20),
    suggested_time_start TIME,
    suggested_time_end TIME,
    confidence_score DECIMAL(3,2), -- 0.00 to 1.00
    reasoning TEXT NOT NULL,
    conflicts_detected JSON, -- Store conflict details as JSON
    alternative_options JSON, -- Store alternative suggestions as JSON
    admin_override BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES allocation_requests(request_id) ON DELETE CASCADE,
    FOREIGN KEY (suggested_room_id) REFERENCES classrooms(room_id) ON DELETE SET NULL
);

-- Allocation Conflicts table
CREATE TABLE IF NOT EXISTS allocation_conflicts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conflict_id VARCHAR(20) UNIQUE NOT NULL,
    request_id VARCHAR(20) NOT NULL,
    conflicting_allocation_id VARCHAR(20),
    conflict_type ENUM('room_overlap', 'faculty_clash', 'equipment_unavailable', 'maintenance_scheduled') NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    description TEXT NOT NULL,
    resolution_status ENUM('unresolved', 'resolved', 'ignored') DEFAULT 'unresolved',
    resolved_at TIMESTAMP NULL,
    resolved_by VARCHAR(20), -- admin user_id
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES allocation_requests(request_id) ON DELETE CASCADE,
    FOREIGN KEY (conflicting_allocation_id) REFERENCES classroom_allocations(allocation_id) ON DELETE SET NULL
);

-- Agent Notifications table
CREATE TABLE IF NOT EXISTS agent_notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    notification_id VARCHAR(20) UNIQUE NOT NULL,
    recipient_id VARCHAR(20) NOT NULL, -- user_id
    recipient_type ENUM('admin', 'faculty', 'student') NOT NULL,
    notification_type ENUM('allocation_approved', 'allocation_rejected', 'room_changed', 'conflict_detected', 'maintenance_alert') NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    related_allocation_id VARCHAR(20),
    related_request_id VARCHAR(20),
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (related_allocation_id) REFERENCES classroom_allocations(allocation_id) ON DELETE SET NULL,
    FOREIGN KEY (related_request_id) REFERENCES allocation_requests(request_id) ON DELETE SET NULL
);

-- Classroom Maintenance Schedule table
CREATE TABLE IF NOT EXISTS maintenance_schedule (
    id INT PRIMARY KEY AUTO_INCREMENT,
    maintenance_id VARCHAR(20) UNIQUE NOT NULL,
    room_id VARCHAR(20) NOT NULL,
    maintenance_type ENUM('routine', 'repair', 'upgrade', 'cleaning') NOT NULL,
    scheduled_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    description TEXT NOT NULL,
    assigned_to VARCHAR(100),
    status ENUM('scheduled', 'in_progress', 'completed', 'cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (room_id) REFERENCES classrooms(room_id) ON DELETE CASCADE
);

-- Insert sample classrooms
INSERT INTO classrooms (room_id, room_name, building, floor, capacity, room_type, equipment, status) VALUES
('LH001', 'Lecture Hall 1', 'Academic Block A', 1, 120, 'lecture_hall', '{"projector": true, "audio_system": true, "whiteboard": true, "ac": true, "wifi": true}', 'available'),
('LH002', 'Lecture Hall 2', 'Academic Block A', 1, 100, 'lecture_hall', '{"projector": true, "audio_system": true, "whiteboard": true, "ac": true, "wifi": true}', 'available'),
('LH003', 'Lecture Hall 3', 'Academic Block A', 2, 80, 'lecture_hall', '{"projector": true, "audio_system": false, "whiteboard": true, "ac": true, "wifi": true}', 'available'),
('LAB001', 'Computer Lab 1', 'IT Block', 1, 60, 'lab', '{"computers": 60, "projector": true, "ac": true, "wifi": true, "software": ["VS Code", "MySQL", "Python"]}', 'available'),
('LAB002', 'Computer Lab 2', 'IT Block', 1, 50, 'lab', '{"computers": 50, "projector": true, "ac": true, "wifi": true, "software": ["MATLAB", "AutoCAD", "Java"]}', 'available'),
('LAB003', 'Electronics Lab', 'ECE Block', 2, 40, 'lab', '{"workstations": 20, "oscilloscopes": 10, "function_generators": 10, "projector": true, "ac": true}', 'available'),
('SEM001', 'Seminar Room 1', 'Academic Block B', 1, 30, 'seminar_room', '{"projector": true, "audio_system": true, "whiteboard": true, "ac": true, "wifi": true}', 'available'),
('SEM002', 'Seminar Room 2', 'Academic Block B', 2, 25, 'seminar_room', '{"projector": true, "audio_system": false, "whiteboard": true, "ac": true, "wifi": true}', 'available'),
('AUD001', 'Main Auditorium', 'Central Block', 1, 500, 'auditorium', '{"stage": true, "lighting": true, "audio_system": true, "projector": true, "ac": true, "wifi": true}', 'available'),
('CONF001', 'Conference Room', 'Admin Block', 3, 20, 'conference_room', '{"projector": true, "video_conferencing": true, "whiteboard": true, "ac": true, "wifi": true}', 'available');

-- Insert sample allocation requests
INSERT INTO allocation_requests (request_id, faculty_id, course_code, requested_date, start_time, end_time, expected_strength, required_equipment, purpose, priority, status) VALUES
('REQ001', 'FAC2024001', 'CS301', '2024-12-20', '09:00:00', '10:30:00', 45, '{"projector": true, "wifi": true}', 'Database Management Lecture', 'medium', 'pending'),
('REQ002', 'FAC2024001', 'CS302', '2024-12-20', '11:00:00', '12:30:00', 40, '{"projector": true, "wifi": true}', 'Computer Networks Lecture', 'medium', 'pending'),
('REQ003', 'FAC2024001', 'CS303', '2024-12-20', '14:00:00', '17:00:00', 30, '{"oscilloscopes": 15, "function_generators": 15}', 'Computer Networks Lab', 'high', 'pending');

-- Insert sample maintenance schedule
INSERT INTO maintenance_schedule (maintenance_id, room_id, maintenance_type, scheduled_date, start_time, end_time, description, status) VALUES
('MAIN001', 'LAB001', 'routine', '2024-12-21', '18:00:00', '20:00:00', 'Weekly computer maintenance and software updates', 'scheduled'),
('MAIN002', 'LH001', 'repair', '2024-12-22', '12:00:00', '14:00:00', 'Projector bulb replacement', 'scheduled');

