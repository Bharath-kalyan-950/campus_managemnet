-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2025 at 04:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_campus_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_calendar`
--

CREATE TABLE `academic_calendar` (
  `id` int(11) NOT NULL,
  `event_id` varchar(20) NOT NULL,
  `event_name` varchar(200) NOT NULL,
  `event_type` enum('holiday','exam','registration','orientation','cultural','academic') NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `target_audience` enum('all','students','faculty','department','year') DEFAULT 'all',
  `target_filter` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `agent_decisions`
--

CREATE TABLE `agent_decisions` (
  `id` int(11) NOT NULL,
  `decision_id` varchar(20) NOT NULL,
  `request_id` varchar(20) NOT NULL,
  `decision_type` enum('auto_approve','suggest_alternative','conflict_detected','manual_review') NOT NULL,
  `suggested_room_id` varchar(20) DEFAULT NULL,
  `suggested_time_start` time DEFAULT NULL,
  `suggested_time_end` time DEFAULT NULL,
  `confidence_score` decimal(3,2) DEFAULT NULL,
  `reasoning` text NOT NULL,
  `conflicts_detected` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`conflicts_detected`)),
  `alternative_options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`alternative_options`)),
  `admin_override` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `agent_notifications`
--

CREATE TABLE `agent_notifications` (
  `id` int(11) NOT NULL,
  `notification_id` varchar(20) NOT NULL,
  `recipient_id` varchar(20) NOT NULL,
  `recipient_type` enum('admin','faculty','student') NOT NULL,
  `notification_type` enum('allocation_approved','allocation_rejected','room_changed','conflict_detected','maintenance_alert') NOT NULL,
  `title` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `related_allocation_id` varchar(20) DEFAULT NULL,
  `related_request_id` varchar(20) DEFAULT NULL,
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `read_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agent_notifications`
--

INSERT INTO `agent_notifications` (`id`, `notification_id`, `recipient_id`, `recipient_type`, `notification_type`, `title`, `message`, `related_allocation_id`, `related_request_id`, `priority`, `is_read`, `created_at`, `read_at`) VALUES
(1, 'NOT001', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 Database Management has been approved and allocated to LH001', 'ALLOC001', NULL, 'medium', 0, '2025-12-23 07:12:42', NULL),
(2, 'NOT002', 'FAC2024001', 'faculty', 'allocation_approved', 'Lab Allocated', 'Your request for CS302 Computer Networks has been approved and allocated to LAB001', 'ALLOC002', NULL, 'medium', 0, '2025-12-23 07:12:42', NULL),
(3, 'NOT003', 'STU2024001', 'student', 'room_changed', 'Room Update', 'Your CS301 class location has been confirmed: LH001 (Academic Block A)', 'ALLOC001', NULL, 'low', 0, '2025-12-23 07:12:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `allocation_conflicts`
--

CREATE TABLE `allocation_conflicts` (
  `id` int(11) NOT NULL,
  `conflict_id` varchar(20) NOT NULL,
  `request_id` varchar(20) NOT NULL,
  `conflicting_allocation_id` varchar(20) DEFAULT NULL,
  `conflict_type` enum('room_overlap','faculty_clash','equipment_unavailable','maintenance_scheduled') NOT NULL,
  `severity` enum('low','medium','high','critical') NOT NULL,
  `description` text NOT NULL,
  `resolution_status` enum('unresolved','resolved','ignored') DEFAULT 'unresolved',
  `resolved_at` timestamp NULL DEFAULT NULL,
  `resolved_by` varchar(20) DEFAULT NULL,
  `resolution_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `allocation_requests`
--

CREATE TABLE `allocation_requests` (
  `id` int(11) NOT NULL,
  `request_id` varchar(20) NOT NULL,
  `faculty_id` varchar(20) NOT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `requested_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `expected_strength` int(11) NOT NULL,
  `required_equipment` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`required_equipment`)),
  `purpose` varchar(200) NOT NULL,
  `priority` enum('low','medium','high','urgent') DEFAULT 'medium',
  `status` enum('pending','approved','rejected','cancelled') DEFAULT 'pending',
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `processed_at` timestamp NULL DEFAULT NULL,
  `processed_by` varchar(20) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `allocation_requests`
--

INSERT INTO `allocation_requests` (`id`, `request_id`, `faculty_id`, `course_code`, `requested_date`, `start_time`, `end_time`, `expected_strength`, `required_equipment`, `purpose`, `priority`, `status`, `requested_at`, `processed_at`, `processed_by`, `notes`) VALUES
(7, 'REQ001', 'FAC2024001', 'CS301', '2024-12-20', '09:00:00', '10:30:00', 45, '{\"projector\": true, \"wifi\": true}', 'Database Management Lecture', 'medium', 'pending', '2025-12-23 07:12:42', NULL, NULL, NULL),
(8, 'REQ002', 'FAC2024001', 'CS302', '2024-12-20', '11:00:00', '12:30:00', 40, '{\"projector\": true, \"wifi\": true}', 'Computer Networks Lecture', 'medium', 'pending', '2025-12-23 07:12:42', NULL, NULL, NULL),
(9, 'REQ003', 'FAC2024001', 'CS303', '2024-12-20', '14:00:00', '17:00:00', 30, '{\"oscilloscopes\": 15, \"function_generators\": 15}', 'Computer Networks Lab', 'high', 'pending', '2025-12-23 07:12:42', NULL, NULL, NULL),
(10, 'REQ004', 'FAC2024001', 'CS303', '2024-12-21', '09:00:00', '12:00:00', 25, '{\"projector\": true, \"computers\": 25}', 'Software Engineering Lab Session', 'high', 'pending', '2025-12-23 07:12:42', NULL, NULL, NULL),
(11, 'REQ005', 'FAC2024001', 'CS305', '2024-12-22', '14:00:00', '16:00:00', 60, '{\"projector\": true, \"audio_system\": true, \"computers\": 60}', 'Machine Learning Workshop', 'medium', 'pending', '2025-12-23 07:12:42', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` int(11) NOT NULL,
  `assignment_id` varchar(20) NOT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `faculty_id` varchar(20) DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `due_date` datetime NOT NULL,
  `max_marks` int(11) DEFAULT 100,
  `assignment_type` enum('individual','group','project') DEFAULT 'individual',
  `file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assignment_submissions`
--

CREATE TABLE `assignment_submissions` (
  `id` int(11) NOT NULL,
  `assignment_id` varchar(20) DEFAULT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `submission_text` text DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `marks_obtained` int(11) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `status` enum('submitted','graded','late','not_submitted') DEFAULT 'submitted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `faculty_id` varchar(20) DEFAULT NULL,
  `date` date NOT NULL,
  `status` enum('present','absent','late') NOT NULL,
  `session_type` enum('lecture','lab','tutorial') DEFAULT 'lecture',
  `remarks` text DEFAULT NULL,
  `marked_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `student_id`, `course_code`, `faculty_id`, `date`, `status`, `session_type`, `remarks`, `marked_at`) VALUES
(1, 'STU2024001', 'CS301', 'FAC2024001', '2024-12-01', 'present', 'lecture', NULL, '2025-12-23 07:07:54'),
(2, 'STU2024001', 'CS301', 'FAC2024001', '2024-12-02', 'present', 'lecture', NULL, '2025-12-23 07:07:54'),
(3, 'STU2024001', 'CS302', 'FAC2024001', '2024-12-01', 'present', 'lecture', NULL, '2025-12-23 07:07:54'),
(4, 'STU2024001', 'CS302', 'FAC2024001', '2024-12-02', 'absent', 'lecture', NULL, '2025-12-23 07:07:54');

-- --------------------------------------------------------

--
-- Table structure for table `classrooms`
--

CREATE TABLE `classrooms` (
  `id` int(11) NOT NULL,
  `room_id` varchar(20) NOT NULL,
  `room_name` varchar(100) NOT NULL,
  `building` varchar(50) NOT NULL,
  `floor` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `room_type` enum('lecture_hall','lab','seminar_room','auditorium','conference_room') NOT NULL,
  `equipment` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`equipment`)),
  `status` enum('available','maintenance','out_of_order') DEFAULT 'available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classrooms`
--

INSERT INTO `classrooms` (`id`, `room_id`, `room_name`, `building`, `floor`, `capacity`, `room_type`, `equipment`, `status`, `created_at`, `updated_at`) VALUES
(1, 'LH001', 'Lecture Hall 1', 'Academic Block A', 1, 120, 'lecture_hall', '{\"projector\": true, \"audio_system\": true, \"whiteboard\": true, \"ac\": true, \"wifi\": true}', 'available', '2025-12-23 07:09:50', '2025-12-23 07:09:50'),
(2, 'LH002', 'Lecture Hall 2', 'Academic Block A', 1, 100, 'lecture_hall', '{\"projector\": true, \"audio_system\": true, \"whiteboard\": true, \"ac\": true, \"wifi\": true}', 'available', '2025-12-23 07:09:50', '2025-12-23 07:09:50'),
(3, 'LH003', 'Lecture Hall 3', 'Academic Block A', 2, 80, 'lecture_hall', '{\"projector\": true, \"audio_system\": false, \"whiteboard\": true, \"ac\": true, \"wifi\": true}', 'available', '2025-12-23 07:09:50', '2025-12-23 07:09:50'),
(4, 'LAB001', 'Computer Lab 1', 'IT Block', 1, 60, 'lab', '{\"computers\": 60, \"projector\": true, \"ac\": true, \"wifi\": true, \"software\": [\"VS Code\", \"MySQL\", \"Python\"]}', 'available', '2025-12-23 07:09:50', '2025-12-23 07:09:50'),
(5, 'LAB002', 'Computer Lab 2', 'IT Block', 1, 50, 'lab', '{\"computers\": 50, \"projector\": true, \"ac\": true, \"wifi\": true, \"software\": [\"MATLAB\", \"AutoCAD\", \"Java\"]}', 'available', '2025-12-23 07:09:50', '2025-12-23 07:09:50'),
(6, 'LAB003', 'Electronics Lab', 'ECE Block', 2, 40, 'lab', '{\"workstations\": 20, \"oscilloscopes\": 10, \"function_generators\": 10, \"projector\": true, \"ac\": true}', 'available', '2025-12-23 07:09:50', '2025-12-23 07:09:50'),
(7, 'SEM001', 'Seminar Room 1', 'Academic Block B', 1, 30, 'seminar_room', '{\"projector\": true, \"audio_system\": true, \"whiteboard\": true, \"ac\": true, \"wifi\": true}', 'available', '2025-12-23 07:09:50', '2025-12-23 07:09:50'),
(8, 'SEM002', 'Seminar Room 2', 'Academic Block B', 2, 25, 'seminar_room', '{\"projector\": true, \"audio_system\": false, \"whiteboard\": true, \"ac\": true, \"wifi\": true}', 'available', '2025-12-23 07:09:50', '2025-12-23 07:09:50'),
(9, 'AUD001', 'Main Auditorium', 'Central Block', 1, 500, 'auditorium', '{\"stage\": true, \"lighting\": true, \"audio_system\": true, \"projector\": true, \"ac\": true, \"wifi\": true}', 'available', '2025-12-23 07:09:50', '2025-12-23 07:09:50'),
(10, 'CONF001', 'Conference Room', 'Admin Block', 3, 20, 'conference_room', '{\"projector\": true, \"video_conferencing\": true, \"whiteboard\": true, \"ac\": true, \"wifi\": true}', 'available', '2025-12-23 07:09:50', '2025-12-23 07:09:50');

-- --------------------------------------------------------

--
-- Table structure for table `classroom_allocations`
--

CREATE TABLE `classroom_allocations` (
  `id` int(11) NOT NULL,
  `allocation_id` varchar(20) NOT NULL,
  `request_id` varchar(20) DEFAULT NULL,
  `room_id` varchar(20) NOT NULL,
  `faculty_id` varchar(20) NOT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `allocated_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `actual_strength` int(11) DEFAULT NULL,
  `status` enum('scheduled','ongoing','completed','cancelled') DEFAULT 'scheduled',
  `allocation_type` enum('regular','makeup','extra','exam') DEFAULT 'regular',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classroom_allocations`
--

INSERT INTO `classroom_allocations` (`id`, `allocation_id`, `request_id`, `room_id`, `faculty_id`, `course_code`, `allocated_date`, `start_time`, `end_time`, `actual_strength`, `status`, `allocation_type`, `created_at`, `updated_at`) VALUES
(1, 'ALLOC001', NULL, 'LH001', 'FAC2024001', 'CS301', '2024-12-18', '09:00:00', '10:30:00', NULL, 'scheduled', 'regular', '2025-12-23 07:12:42', '2025-12-23 07:12:42'),
(2, 'ALLOC002', NULL, 'LAB001', 'FAC2024001', 'CS302', '2024-12-18', '11:00:00', '12:30:00', NULL, 'scheduled', 'regular', '2025-12-23 07:12:42', '2025-12-23 07:12:42'),
(3, 'ALLOC003', NULL, 'LAB003', 'FAC2024001', 'CS303', '2024-12-18', '14:00:00', '17:00:00', NULL, 'scheduled', 'regular', '2025-12-23 07:12:42', '2025-12-23 07:12:42');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `department` varchar(50) NOT NULL,
  `credits` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `course_type` enum('core','elective','lab','project') NOT NULL,
  `slot` varchar(10) DEFAULT NULL,
  `max_capacity` int(11) DEFAULT 30,
  `current_enrolled` int(11) DEFAULT 0,
  `faculty_id` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `syllabus` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_code`, `course_name`, `department`, `credits`, `semester`, `year`, `course_type`, `slot`, `max_capacity`, `current_enrolled`, `faculty_id`, `description`, `syllabus`, `created_at`) VALUES
(1, 'CS301', 'Data Structures', 'Computer Science', 4, 3, 2, 'core', 'A', 40, 2, 'FAC2024001', NULL, NULL, '2025-12-23 07:07:54'),
(2, 'CS302', 'Database Management Systems', 'Computer Science', 4, 4, 2, 'core', 'B', 35, 2, 'FAC2024001', NULL, NULL, '2025-12-23 07:07:54'),
(3, 'CS303', 'Computer Networks', 'Computer Science', 3, 4, 2, 'core', 'C', 30, 0, 'FAC2024001', NULL, NULL, '2025-12-23 07:07:54'),
(4, 'CS304', 'Operating Systems', 'Computer Science', 4, 4, 2, 'core', NULL, 30, 0, NULL, NULL, NULL, '2025-12-23 07:07:54'),
(5, 'CS305', 'Software Engineering', 'Computer Science', 3, 4, 2, 'core', NULL, 30, 0, NULL, NULL, NULL, '2025-12-23 07:07:54'),
(6, 'UBA0123', 'ENGINEERING MATHEMATICS 1', 'Computer Science', 3, 1, 2024, 'core', 'A', 30, 1, 'FAC2024001', 'ENGINEERING MATHEMATICS 1 - Theory created by faculty', NULL, '2025-12-23 07:46:06'),
(7, 'CSA022', 'PYTHON PROGRAMMING', 'Computer Science', 3, 1, 2024, 'core', 'B', 30, 1, 'FAC2024001', 'PYTHON PROGRAMMING - Practical created by faculty', NULL, '2025-12-23 07:49:21');

-- --------------------------------------------------------

--
-- Stand-in structure for view `course_enrollment_summary`
-- (See below for the actual view)
--
CREATE TABLE `course_enrollment_summary` (
`course_code` varchar(20)
,`course_name` varchar(100)
,`slot` varchar(10)
,`max_capacity` int(11)
,`current_enrolled` int(11)
,`available_slots` bigint(12)
,`faculty_name` varchar(101)
,`faculty_id` varchar(20)
,`department` varchar(50)
,`credits` int(11)
,`course_type` enum('core','elective','lab','project')
);

-- --------------------------------------------------------

--
-- Table structure for table `course_feedback`
--

CREATE TABLE `course_feedback` (
  `id` int(11) NOT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `faculty_id` varchar(20) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `teaching_quality` int(11) DEFAULT NULL CHECK (`teaching_quality` >= 1 and `teaching_quality` <= 5),
  `course_content` int(11) DEFAULT NULL CHECK (`course_content` >= 1 and `course_content` <= 5),
  `assignments_quality` int(11) DEFAULT NULL CHECK (`assignments_quality` >= 1 and `assignments_quality` <= 5),
  `comments` text DEFAULT NULL,
  `feedback_date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `disciplinary_actions`
--

CREATE TABLE `disciplinary_actions` (
  `id` int(11) NOT NULL,
  `action_id` varchar(20) NOT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `faculty_id` varchar(20) DEFAULT NULL,
  `violation_type` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `action_taken` varchar(200) NOT NULL,
  `severity` enum('minor','major','severe') NOT NULL,
  `date_reported` date DEFAULT curdate(),
  `status` enum('pending','resolved','appealed') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `faculty_id` varchar(20) DEFAULT NULL,
  `enrollment_date` date DEFAULT curdate(),
  `status` enum('enrolled','completed','dropped','failed') DEFAULT 'enrolled',
  `grade` varchar(2) DEFAULT NULL,
  `grade_points` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `student_id`, `course_code`, `faculty_id`, `enrollment_date`, `status`, `grade`, `grade_points`) VALUES
(1, 'STU2024001', 'CS301', 'FAC2024001', '2025-12-23', 'enrolled', NULL, NULL),
(2, 'STU2024001', 'CS302', 'FAC2024001', '2025-12-23', 'enrolled', NULL, NULL),
(3, 'STU2024001', 'CS303', 'FAC2024001', '2025-12-23', 'enrolled', NULL, NULL),
(4, 'STU2024002', 'UBA0123', 'FAC2024001', '2025-12-23', 'enrolled', NULL, NULL),
(5, 'STU2024002', 'CSA022', 'FAC2024001', '2025-12-23', 'enrolled', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `enrollment_requests`
--

CREATE TABLE `enrollment_requests` (
  `id` int(11) NOT NULL,
  `request_id` varchar(50) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `faculty_id` varchar(20) NOT NULL,
  `slot` varchar(10) NOT NULL,
  `request_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `faculty_notes` text DEFAULT NULL,
  `processed_at` timestamp NULL DEFAULT NULL,
  `processed_by` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollment_requests`
--

INSERT INTO `enrollment_requests` (`id`, `request_id`, `student_id`, `course_code`, `faculty_id`, `slot`, `request_date`, `status`, `faculty_notes`, `processed_at`, `processed_by`) VALUES
(7, 'ENR_REQ_1766476053592_4qrhm', 'STU2024002', 'UBA0123', 'FAC2024001', 'A', '2025-12-23 07:47:33', 'approved', 'Approved by faculty for Slot A', '2025-12-23 07:47:57', 'FAC2024001'),
(8, 'ENR_REQ_1766476197970_9vswl', 'STU2024002', 'CSA022', 'FAC2024001', 'B', '2025-12-23 07:49:57', 'approved', 'Approved by faculty for Slot B', '2025-12-23 07:50:35', 'FAC2024001');

-- --------------------------------------------------------

--
-- Stand-in structure for view `enrollment_requests_detailed`
-- (See below for the actual view)
--
CREATE TABLE `enrollment_requests_detailed` (
`request_id` varchar(50)
,`student_id` varchar(20)
,`student_name` varchar(101)
,`course_code` varchar(20)
,`course_name` varchar(100)
,`slot` varchar(10)
,`faculty_id` varchar(20)
,`faculty_name` varchar(101)
,`status` enum('pending','approved','rejected')
,`request_date` timestamp
,`faculty_notes` text
,`processed_at` timestamp
,`max_capacity` int(11)
,`current_enrolled` int(11)
,`available_slots` bigint(12)
);

-- --------------------------------------------------------

--
-- Table structure for table `examinations`
--

CREATE TABLE `examinations` (
  `id` int(11) NOT NULL,
  `exam_id` varchar(20) NOT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `exam_name` varchar(100) NOT NULL,
  `exam_type` enum('internal','external','quiz','practical') NOT NULL,
  `exam_date` date NOT NULL,
  `start_time` time NOT NULL,
  `duration` int(11) NOT NULL,
  `max_marks` int(11) DEFAULT 100,
  `venue` varchar(100) DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exam_results`
--

CREATE TABLE `exam_results` (
  `id` int(11) NOT NULL,
  `exam_id` varchar(20) DEFAULT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `marks_obtained` int(11) DEFAULT NULL,
  `grade` varchar(2) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `result_date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(11) NOT NULL,
  `faculty_id` varchar(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `department` varchar(50) NOT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `experience_years` int(11) DEFAULT 0,
  `specialization` varchar(100) DEFAULT NULL,
  `office_room` varchar(20) DEFAULT NULL,
  `joining_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `faculty_id`, `user_id`, `department`, `designation`, `qualification`, `experience_years`, `specialization`, `office_room`, `joining_date`) VALUES
(1, 'FAC2024001', 2, 'Computer Science', 'Assistant Professor', 'M.Tech, Ph.D', 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `fee_payments`
--

CREATE TABLE `fee_payments` (
  `id` int(11) NOT NULL,
  `payment_id` varchar(20) NOT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `fee_type` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` date DEFAULT curdate(),
  `payment_method` enum('cash','card','online','bank_transfer') NOT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `status` enum('pending','completed','failed','refunded') DEFAULT 'completed',
  `receipt_number` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fee_payments`
--

INSERT INTO `fee_payments` (`id`, `payment_id`, `student_id`, `fee_type`, `amount`, `payment_date`, `payment_method`, `transaction_id`, `status`, `receipt_number`) VALUES
(1, 'PAY001', 'STU2024001', 'Tuition Fee', 50000.00, '2025-12-23', 'online', 'TXN123456', 'completed', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `fee_structure`
--

CREATE TABLE `fee_structure` (
  `id` int(11) NOT NULL,
  `department` varchar(50) NOT NULL,
  `year` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `fee_type` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `due_date` date NOT NULL,
  `academic_year` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fee_structure`
--

INSERT INTO `fee_structure` (`id`, `department`, `year`, `semester`, `fee_type`, `amount`, `due_date`, `academic_year`) VALUES
(1, 'Computer Science', 2, 4, 'Tuition Fee', 50000.00, '2025-01-15', '2024-25'),
(2, 'Computer Science', 2, 4, 'Lab Fee', 5000.00, '2025-01-15', '2024-25'),
(3, 'Computer Science', 2, 4, 'Library Fee', 2000.00, '2025-01-15', '2024-25');

-- --------------------------------------------------------

--
-- Table structure for table `infrastructure_issues`
--

CREATE TABLE `infrastructure_issues` (
  `id` int(11) NOT NULL,
  `issue_id` varchar(20) NOT NULL,
  `reported_by` varchar(20) NOT NULL,
  `reporter_type` enum('student','faculty') NOT NULL,
  `issue_type` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `priority` enum('low','medium','high','critical') DEFAULT 'medium',
  `status` enum('open','in_progress','resolved','closed') DEFAULT 'open',
  `reported_date` date DEFAULT curdate(),
  `resolved_date` date DEFAULT NULL,
  `assigned_to` varchar(100) DEFAULT NULL,
  `resolution_notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_schedule`
--

CREATE TABLE `maintenance_schedule` (
  `id` int(11) NOT NULL,
  `maintenance_id` varchar(20) NOT NULL,
  `room_id` varchar(20) NOT NULL,
  `maintenance_type` enum('routine','repair','upgrade','cleaning') NOT NULL,
  `scheduled_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `description` text NOT NULL,
  `assigned_to` varchar(100) DEFAULT NULL,
  `status` enum('scheduled','in_progress','completed','cancelled') DEFAULT 'scheduled',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintenance_schedule`
--

INSERT INTO `maintenance_schedule` (`id`, `maintenance_id`, `room_id`, `maintenance_type`, `scheduled_date`, `start_time`, `end_time`, `description`, `assigned_to`, `status`, `created_at`, `completed_at`) VALUES
(1, 'MAIN001', 'LAB001', 'routine', '2024-12-21', '18:00:00', '20:00:00', 'Weekly computer maintenance and software updates', NULL, 'scheduled', '2025-12-23 07:12:42', NULL),
(2, 'MAIN002', 'LH001', 'repair', '2024-12-22', '12:00:00', '14:00:00', 'Projector bulb replacement', NULL, 'scheduled', '2025-12-23 07:12:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `notification_id` varchar(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `sender_id` varchar(20) DEFAULT NULL,
  `sender_type` enum('admin','faculty','system') NOT NULL,
  `target_audience` enum('all','students','faculty','department','year','individual') NOT NULL,
  `target_filter` varchar(100) DEFAULT NULL,
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `has_attachment` tinyint(1) DEFAULT 0,
  `attachment_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `notification_id`, `title`, `message`, `sender_id`, `sender_type`, `target_audience`, `target_filter`, `priority`, `has_attachment`, `attachment_path`, `created_at`, `expires_at`) VALUES
(1, 'NOT001', 'Assignment Due Tomorrow', 'Data Structures Assignment submission deadline is tomorrow', NULL, 'faculty', 'students', NULL, 'high', 0, NULL, '2025-12-23 07:07:54', NULL),
(2, 'NOT002', 'Exam Schedule Released', 'Mid-term examination schedule has been published', NULL, 'admin', 'all', NULL, 'medium', 0, NULL, '2025-12-23 07:07:54', NULL),
(3, 'NOT003', 'Fee Payment Reminder', 'Semester fee payment due date is approaching', NULL, 'admin', 'students', NULL, 'high', 0, NULL, '2025-12-23 07:07:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `placement_applications`
--

CREATE TABLE `placement_applications` (
  `id` int(11) NOT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `offer_id` varchar(20) DEFAULT NULL,
  `application_date` date DEFAULT curdate(),
  `status` enum('applied','shortlisted','selected','rejected') DEFAULT 'applied',
  `interview_feedback` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_offers`
--

CREATE TABLE `placement_offers` (
  `id` int(11) NOT NULL,
  `offer_id` varchar(20) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `job_title` varchar(100) NOT NULL,
  `package_amount` decimal(10,2) DEFAULT NULL,
  `job_location` varchar(100) DEFAULT NULL,
  `job_type` enum('full_time','part_time','internship') DEFAULT 'full_time',
  `requirements` text DEFAULT NULL,
  `application_deadline` date DEFAULT NULL,
  `interview_date` date DEFAULT NULL,
  `status` enum('open','closed','cancelled') DEFAULT 'open',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `placement_offers`
--

INSERT INTO `placement_offers` (`id`, `offer_id`, `company_name`, `job_title`, `package_amount`, `job_location`, `job_type`, `requirements`, `application_deadline`, `interview_date`, `status`, `created_at`) VALUES
(1, 'PLM001', 'TCS', 'Software Engineer', 450000.00, 'Chennai', 'full_time', NULL, '2024-12-31', NULL, 'open', '2025-12-23 07:07:54'),
(2, 'PLM002', 'Infosys', 'System Engineer', 400000.00, 'Bangalore', 'full_time', NULL, '2024-12-25', NULL, 'open', '2025-12-23 07:07:54'),
(3, 'PLM003', 'Wipro', 'Project Engineer', 420000.00, 'Hyderabad', 'full_time', NULL, '2024-12-28', NULL, 'open', '2025-12-23 07:07:54');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `department` varchar(50) NOT NULL,
  `year` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `batch` varchar(10) DEFAULT NULL,
  `admission_date` date DEFAULT NULL,
  `graduation_date` date DEFAULT NULL,
  `cgpa` decimal(3,2) DEFAULT 0.00,
  `total_credits` int(11) DEFAULT 0,
  `hostel_resident` tinyint(1) DEFAULT 0,
  `guardian_name` varchar(100) DEFAULT NULL,
  `guardian_phone` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `blood_group` varchar(5) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `student_id`, `user_id`, `department`, `year`, `semester`, `batch`, `admission_date`, `graduation_date`, `cgpa`, `total_credits`, `hostel_resident`, `guardian_name`, `guardian_phone`, `address`, `blood_group`, `date_of_birth`) VALUES
(1, 'STU2024001', 1, 'Computer Science', 2, 4, 'CSE-A', NULL, NULL, 8.50, 0, 0, NULL, NULL, NULL, NULL, NULL),
(2, 'STU2024002', 4, 'Computer Science', 2, 3, '2023-2027', '2023-08-01', NULL, 8.50, 90, 0, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','faculty','admin') NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `status` enum('active','inactive','suspended') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `email`, `password`, `role`, `first_name`, `last_name`, `phone`, `status`, `created_at`, `updated_at`) VALUES
(1, 'STU2024001', 'john.doe@simats.edu', '$2a$12$dFwwK6AqgalFWuaXZJGcAe6ea9S7SLZeHcwJ8gx0AXfA4rL5B4WUe', 'student', 'John', 'Doe', '9876543210', 'active', '2025-12-23 07:07:54', '2025-12-23 07:07:54'),
(2, 'FAC2024001', 'daniel@simats.edu', '$2a$12$dFwwK6AqgalFWuaXZJGcAe6ea9S7SLZeHcwJ8gx0AXfA4rL5B4WUe', 'faculty', 'Daniel', '', '9876543211', 'active', '2025-12-23 07:07:54', '2025-12-23 07:44:42'),
(3, 'ADM2024001', 'admin@simats.edu', '$2a$12$dFwwK6AqgalFWuaXZJGcAe6ea9S7SLZeHcwJ8gx0AXfA4rL5B4WUe', 'admin', 'Admin', 'User', '9876543212', 'active', '2025-12-23 07:07:54', '2025-12-23 07:07:54'),
(4, 'STU2024002', 'rajesh.kumar@simats.edu', '$2a$12$Oe70boi/dTclyQvWZWLpzO8g/aZOp8OPLE4RPjah09ZGU8aRBA8SG', 'student', 'Rajesh', 'Kumar', NULL, 'active', '2025-12-23 07:09:22', '2025-12-23 07:44:03');

-- --------------------------------------------------------

--
-- Table structure for table `user_notifications`
--

CREATE TABLE `user_notifications` (
  `id` int(11) NOT NULL,
  `notification_id` varchar(20) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `read_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure for view `course_enrollment_summary`
--
DROP TABLE IF EXISTS `course_enrollment_summary`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `course_enrollment_summary`  AS SELECT `c`.`course_code` AS `course_code`, `c`.`course_name` AS `course_name`, `c`.`slot` AS `slot`, `c`.`max_capacity` AS `max_capacity`, `c`.`current_enrolled` AS `current_enrolled`, `c`.`max_capacity`- `c`.`current_enrolled` AS `available_slots`, concat(`u`.`first_name`,' ',`u`.`last_name`) AS `faculty_name`, `c`.`faculty_id` AS `faculty_id`, `c`.`department` AS `department`, `c`.`credits` AS `credits`, `c`.`course_type` AS `course_type` FROM ((`courses` `c` left join `faculty` `f` on(`c`.`faculty_id` = `f`.`faculty_id`)) left join `users` `u` on(`f`.`user_id` = `u`.`id`)) WHERE `c`.`slot` is not null ORDER BY `c`.`slot` ASC, `c`.`course_code` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `enrollment_requests_detailed`
--
DROP TABLE IF EXISTS `enrollment_requests_detailed`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `enrollment_requests_detailed`  AS SELECT `er`.`request_id` AS `request_id`, `er`.`student_id` AS `student_id`, concat(`us`.`first_name`,' ',`us`.`last_name`) AS `student_name`, `er`.`course_code` AS `course_code`, `c`.`course_name` AS `course_name`, `er`.`slot` AS `slot`, `er`.`faculty_id` AS `faculty_id`, concat(`uf`.`first_name`,' ',`uf`.`last_name`) AS `faculty_name`, `er`.`status` AS `status`, `er`.`request_date` AS `request_date`, `er`.`faculty_notes` AS `faculty_notes`, `er`.`processed_at` AS `processed_at`, `c`.`max_capacity` AS `max_capacity`, `c`.`current_enrolled` AS `current_enrolled`, `c`.`max_capacity`- `c`.`current_enrolled` AS `available_slots` FROM (((((`enrollment_requests` `er` join `courses` `c` on(`er`.`course_code` = `c`.`course_code`)) join `students` `s` on(`er`.`student_id` = `s`.`student_id`)) join `users` `us` on(`s`.`user_id` = `us`.`id`)) join `faculty` `f` on(`er`.`faculty_id` = `f`.`faculty_id`)) join `users` `uf` on(`f`.`user_id` = `uf`.`id`)) ORDER BY `er`.`request_date` DESC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_calendar`
--
ALTER TABLE `academic_calendar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `event_id` (`event_id`);

--
-- Indexes for table `agent_decisions`
--
ALTER TABLE `agent_decisions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `decision_id` (`decision_id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `suggested_room_id` (`suggested_room_id`);

--
-- Indexes for table `agent_notifications`
--
ALTER TABLE `agent_notifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `notification_id` (`notification_id`),
  ADD KEY `related_allocation_id` (`related_allocation_id`),
  ADD KEY `related_request_id` (`related_request_id`);

--
-- Indexes for table `allocation_conflicts`
--
ALTER TABLE `allocation_conflicts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `conflict_id` (`conflict_id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `conflicting_allocation_id` (`conflicting_allocation_id`);

--
-- Indexes for table `allocation_requests`
--
ALTER TABLE `allocation_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_id` (`request_id`),
  ADD KEY `faculty_id` (`faculty_id`),
  ADD KEY `course_code` (`course_code`),
  ADD KEY `idx_requests_date_time` (`requested_date`,`start_time`,`end_time`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assignment_id` (`assignment_id`),
  ADD KEY `course_code` (`course_code`);

--
-- Indexes for table `assignment_submissions`
--
ALTER TABLE `assignment_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignment_id` (`assignment_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `course_code` (`course_code`);

--
-- Indexes for table `classrooms`
--
ALTER TABLE `classrooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `room_id` (`room_id`),
  ADD KEY `idx_classrooms_capacity` (`capacity`),
  ADD KEY `idx_classrooms_type` (`room_type`);

--
-- Indexes for table `classroom_allocations`
--
ALTER TABLE `classroom_allocations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `allocation_id` (`allocation_id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `faculty_id` (`faculty_id`),
  ADD KEY `course_code` (`course_code`),
  ADD KEY `idx_allocations_date_time` (`allocated_date`,`start_time`,`end_time`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course_code` (`course_code`),
  ADD KEY `idx_courses_slot` (`slot`),
  ADD KEY `idx_courses_faculty` (`faculty_id`);

--
-- Indexes for table `course_feedback`
--
ALTER TABLE `course_feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `course_code` (`course_code`);

--
-- Indexes for table `disciplinary_actions`
--
ALTER TABLE `disciplinary_actions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `action_id` (`action_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `course_code` (`course_code`);

--
-- Indexes for table `enrollment_requests`
--
ALTER TABLE `enrollment_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_id` (`request_id`),
  ADD KEY `course_code` (`course_code`),
  ADD KEY `idx_student_course` (`student_id`,`course_code`),
  ADD KEY `idx_faculty_status` (`faculty_id`,`status`),
  ADD KEY `idx_slot` (`slot`),
  ADD KEY `idx_enrollment_requests_status_date` (`status`,`request_date`);

--
-- Indexes for table `examinations`
--
ALTER TABLE `examinations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `exam_id` (`exam_id`),
  ADD KEY `course_code` (`course_code`);

--
-- Indexes for table `exam_results`
--
ALTER TABLE `exam_results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_id` (`exam_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `faculty_id` (`faculty_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `fee_payments`
--
ALTER TABLE `fee_payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payment_id` (`payment_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `fee_structure`
--
ALTER TABLE `fee_structure`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `infrastructure_issues`
--
ALTER TABLE `infrastructure_issues`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `issue_id` (`issue_id`);

--
-- Indexes for table `maintenance_schedule`
--
ALTER TABLE `maintenance_schedule`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `maintenance_id` (`maintenance_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `idx_maintenance_date` (`scheduled_date`,`start_time`,`end_time`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `notification_id` (`notification_id`);

--
-- Indexes for table `placement_applications`
--
ALTER TABLE `placement_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `offer_id` (`offer_id`);

--
-- Indexes for table `placement_offers`
--
ALTER TABLE `placement_offers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `offer_id` (`offer_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notification_id` (`notification_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_calendar`
--
ALTER TABLE `academic_calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agent_decisions`
--
ALTER TABLE `agent_decisions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agent_notifications`
--
ALTER TABLE `agent_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `allocation_conflicts`
--
ALTER TABLE `allocation_conflicts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `allocation_requests`
--
ALTER TABLE `allocation_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assignment_submissions`
--
ALTER TABLE `assignment_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `classrooms`
--
ALTER TABLE `classrooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `classroom_allocations`
--
ALTER TABLE `classroom_allocations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `course_feedback`
--
ALTER TABLE `course_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `disciplinary_actions`
--
ALTER TABLE `disciplinary_actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `enrollment_requests`
--
ALTER TABLE `enrollment_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `examinations`
--
ALTER TABLE `examinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exam_results`
--
ALTER TABLE `exam_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fee_payments`
--
ALTER TABLE `fee_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fee_structure`
--
ALTER TABLE `fee_structure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `infrastructure_issues`
--
ALTER TABLE `infrastructure_issues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `maintenance_schedule`
--
ALTER TABLE `maintenance_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `placement_applications`
--
ALTER TABLE `placement_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_offers`
--
ALTER TABLE `placement_offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_notifications`
--
ALTER TABLE `user_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agent_decisions`
--
ALTER TABLE `agent_decisions`
  ADD CONSTRAINT `agent_decisions_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `allocation_requests` (`request_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `agent_decisions_ibfk_2` FOREIGN KEY (`suggested_room_id`) REFERENCES `classrooms` (`room_id`) ON DELETE SET NULL;

--
-- Constraints for table `agent_notifications`
--
ALTER TABLE `agent_notifications`
  ADD CONSTRAINT `agent_notifications_ibfk_1` FOREIGN KEY (`related_allocation_id`) REFERENCES `classroom_allocations` (`allocation_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `agent_notifications_ibfk_2` FOREIGN KEY (`related_request_id`) REFERENCES `allocation_requests` (`request_id`) ON DELETE SET NULL;

--
-- Constraints for table `allocation_conflicts`
--
ALTER TABLE `allocation_conflicts`
  ADD CONSTRAINT `allocation_conflicts_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `allocation_requests` (`request_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `allocation_conflicts_ibfk_2` FOREIGN KEY (`conflicting_allocation_id`) REFERENCES `classroom_allocations` (`allocation_id`) ON DELETE SET NULL;

--
-- Constraints for table `allocation_requests`
--
ALTER TABLE `allocation_requests`
  ADD CONSTRAINT `allocation_requests_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `allocation_requests_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE SET NULL;

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE CASCADE;

--
-- Constraints for table `assignment_submissions`
--
ALTER TABLE `assignment_submissions`
  ADD CONSTRAINT `assignment_submissions_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assignment_submissions_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE CASCADE;

--
-- Constraints for table `classroom_allocations`
--
ALTER TABLE `classroom_allocations`
  ADD CONSTRAINT `classroom_allocations_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `allocation_requests` (`request_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `classroom_allocations_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `classrooms` (`room_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `classroom_allocations_ibfk_3` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `classroom_allocations_ibfk_4` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE SET NULL;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE SET NULL;

--
-- Constraints for table `course_feedback`
--
ALTER TABLE `course_feedback`
  ADD CONSTRAINT `course_feedback_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `course_feedback_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE CASCADE;

--
-- Constraints for table `disciplinary_actions`
--
ALTER TABLE `disciplinary_actions`
  ADD CONSTRAINT `disciplinary_actions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE CASCADE;

--
-- Constraints for table `enrollment_requests`
--
ALTER TABLE `enrollment_requests`
  ADD CONSTRAINT `enrollment_requests_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollment_requests_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollment_requests_ibfk_3` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE;

--
-- Constraints for table `examinations`
--
ALTER TABLE `examinations`
  ADD CONSTRAINT `examinations_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE CASCADE;

--
-- Constraints for table `exam_results`
--
ALTER TABLE `exam_results`
  ADD CONSTRAINT `exam_results_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `examinations` (`exam_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `exam_results_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fee_payments`
--
ALTER TABLE `fee_payments`
  ADD CONSTRAINT `fee_payments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `maintenance_schedule`
--
ALTER TABLE `maintenance_schedule`
  ADD CONSTRAINT `maintenance_schedule_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `classrooms` (`room_id`) ON DELETE CASCADE;

--
-- Constraints for table `placement_applications`
--
ALTER TABLE `placement_applications`
  ADD CONSTRAINT `placement_applications_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `placement_applications_ibfk_2` FOREIGN KEY (`offer_id`) REFERENCES `placement_offers` (`offer_id`) ON DELETE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD CONSTRAINT `user_notifications_ibfk_1` FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`notification_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
