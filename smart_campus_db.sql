-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2025 at 04:51 AM
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

--
-- Dumping data for table `agent_decisions`
--

INSERT INTO `agent_decisions` (`id`, `decision_id`, `request_id`, `decision_type`, `suggested_room_id`, `suggested_time_start`, `suggested_time_end`, `confidence_score`, `reasoning`, `conflicts_detected`, `alternative_options`, `admin_override`, `created_at`) VALUES
(1, 'DEC1766559821440', 'REQ1766559821421', 'auto_approve', 'SEM001', '13:33:00', '14:33:00', 0.95, 'Automatically approved. No conflicts detected. Allocated to Seminar Room 1 (capacity: 30)', NULL, NULL, 0, '2025-12-24 07:03:41'),
(3, 'DECISION_17665666872', 'REQ_AI_1766566418805', '', NULL, NULL, NULL, 0.80, 'Room capacity and availability match: Lecture Hall 1', NULL, '[\"LH001\",\"LH002\"]', 0, '2025-12-24 08:58:07'),
(7, 'DECISION_17665670037', 'TEST_REQ_17665669996', '', NULL, NULL, NULL, 0.50, 'Adjust time slot to avoid conflicts', NULL, '[\"LAB001\",\"LAB002\"]', 0, '2025-12-24 09:03:23'),
(8, 'DECISION_17665670039', 'TEST_REQ_17665669996', '', NULL, NULL, NULL, 0.80, 'Room capacity and availability match: Lecture Hall 3', NULL, '[\"LH003\",\"LAB001\"]', 0, '2025-12-24 09:03:23'),
(9, 'DECISION_17665670514', 'TEST_REQ_17665669996', '', NULL, NULL, NULL, 0.50, 'Provide alternative equipment setup', NULL, '[\"LH002\",\"LH003\"]', 0, '2025-12-24 09:04:11'),
(10, 'DECISION_17665678387', 'TEST_REQ_17665669996', '', NULL, NULL, NULL, 0.50, 'Provide alternative equipment setup', NULL, '[\"LAB002\",\"LAB003\"]', 0, '2025-12-24 09:17:18'),
(12, 'DECISION_17665678390', 'TEST_REQ_17665673138', '', NULL, NULL, NULL, 0.80, 'Room capacity and availability match: Computer Lab 1', NULL, '[\"LAB001\",\"LAB002\"]', 0, '2025-12-24 09:17:19'),
(13, 'DEC1766734213730', 'REQ1766734213676', 'conflict_detected', NULL, '12:59:00', '13:59:00', 0.20, 'No suitable rooms available for the requested time slot and requirements', NULL, NULL, 0, '2025-12-26 07:30:13'),
(14, 'DEC1766734946871', 'REQ1766734946847', 'auto_approve', 'SEM001', '13:12:00', '14:12:00', 0.95, 'Automatically approved. No conflicts detected. Allocated to Seminar Room 1 (capacity: 30)', NULL, NULL, 0, '2025-12-26 07:42:26'),
(15, 'DEC1766822075039', 'REQ1766822074905', 'auto_approve', 'SEM001', '14:25:00', '16:25:00', 0.95, 'Automatically approved. No conflicts detected. Allocated to Seminar Room 1 (capacity: 30)', NULL, NULL, 0, '2025-12-27 07:54:35');

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
(3, 'NOT003', 'STU2024001', 'student', 'room_changed', 'Room Update', 'Your CS301 class location has been confirmed: LH001 (Academic Block A)', 'ALLOC001', NULL, 'low', 0, '2025-12-23 07:12:42', NULL),
(4, 'NOT1766559821452_ge9', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for class room has been approved and allocated to room SEM001', NULL, NULL, 'medium', 0, '2025-12-24 07:03:41', NULL),
(5, 'NOT_1766566687358_es', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 1', NULL, NULL, 'medium', 0, '2025-12-24 08:58:07', NULL),
(6, 'NOT_1766566687362_8l', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 1', NULL, NULL, 'medium', 0, '2025-12-24 08:58:07', NULL),
(7, 'NOT_1766566778867_o9', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 2', NULL, NULL, 'medium', 0, '2025-12-24 08:59:38', NULL),
(8, 'NOT_1766566778870_xb', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 1', NULL, NULL, 'medium', 0, '2025-12-24 08:59:38', NULL),
(9, 'NOT_1766566778873_gh', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 1', NULL, NULL, 'medium', 0, '2025-12-24 08:59:38', NULL),
(10, 'NOT_1766567004092_e9', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 3', NULL, NULL, 'medium', 0, '2025-12-24 09:03:24', NULL),
(11, 'NOT_1766567004096_c3', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 2', NULL, NULL, 'medium', 0, '2025-12-24 09:03:24', NULL),
(12, 'NOT_1766567004100_1l', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 1', NULL, NULL, 'medium', 0, '2025-12-24 09:03:24', NULL),
(13, 'NOT_1766567004104_8a', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 1', NULL, NULL, 'medium', 0, '2025-12-24 09:03:24', NULL),
(14, 'NOT_1766567004109_gj', 'admin', 'admin', '', 'Allocation Conflict Detected', 'room_overlap: Multiple high-priority requests competing for limited classroom resources during peak hours', NULL, NULL, 'medium', 0, '2025-12-24 09:03:24', NULL),
(15, 'NOT_1766567146099_ip', 'admin', 'admin', '', 'Allocation Conflict Detected', 'room_overlap: Multiple high-priority requests competing for limited classroom resources during peak hours', NULL, NULL, 'medium', 0, '2025-12-24 09:05:46', NULL),
(16, 'NOT_1766567839236_f1', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Computer Lab 1', NULL, NULL, 'medium', 0, '2025-12-24 09:17:19', NULL),
(17, 'NOT_1766567839238_ac', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 3', NULL, NULL, 'medium', 0, '2025-12-24 09:17:19', NULL),
(18, 'NOT_1766567839241_br', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 2', NULL, NULL, 'medium', 0, '2025-12-24 09:17:19', NULL),
(19, 'NOT_1766567839244_wd', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 1', NULL, NULL, 'medium', 0, '2025-12-24 09:17:19', NULL),
(20, 'NOT_1766567839246_bu', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 has been allocated to Lecture Hall 1', NULL, NULL, 'medium', 0, '2025-12-24 09:17:19', NULL),
(21, 'NOT_1766567839247_p3', 'admin', 'admin', '', 'Allocation Conflict Detected', 'room_overlap: Multiple high-priority requests competing for limited classroom resources during peak hours', NULL, NULL, 'medium', 0, '2025-12-24 09:17:19', NULL),
(22, 'NOT_1766567839251_hf', 'admin', 'admin', '', 'Allocation Conflict Detected', 'room_overlap: Multiple high-priority requests competing for limited classroom resources during peak hours', NULL, NULL, 'medium', 0, '2025-12-24 09:17:19', NULL),
(23, 'NOT1766734213741_tiv', 'FAC2024001', 'faculty', '', '📋 Classroom Request - Under Review', 'Your classroom request for \"classroom\" is being reviewed by administration.\n\n📋 Request Details:\n• Course: CSA022\n• Date & Time: Fri Dec 26 2025 00:00:00 GMT+0530 (India Standard Time), 12:59:00-13:59:00\n• Expected Students: 1\n\n⏳ What happens next:\n1. Administration will review your request within 1-2 business days\n2. You\'ll receive a notification once a decision is made\n3. If approved, students will be automatically notified of the schedule\n\nPlease wait for approval. Contact administration if urgent.', NULL, NULL, 'medium', 0, '2025-12-26 07:30:13', NULL),
(24, 'NOT1766734213748_zfn', 'admin', 'admin', '', 'Manual Review Required', 'Allocation request REQ1766734213676 requires manual review due to conflicts', NULL, NULL, 'medium', 0, '2025-12-26 07:30:13', NULL),
(25, 'NOT1766734946893_lxc', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for classroom has been approved and allocated to room SEM001', NULL, NULL, 'medium', 0, '2025-12-26 07:42:26', NULL),
(26, 'NOT1766822075054_r24', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for examination supply has been approved and allocated to room SEM001', NULL, NULL, 'medium', 0, '2025-12-27 07:54:35', NULL);

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

--
-- Dumping data for table `allocation_conflicts`
--

INSERT INTO `allocation_conflicts` (`id`, `conflict_id`, `request_id`, `conflicting_allocation_id`, `conflict_type`, `severity`, `description`, `resolution_status`, `resolved_at`, `resolved_by`, `resolution_notes`, `created_at`) VALUES
(3, 'TEST_CONF_1766566999', 'TEST_REQ_17665669996', NULL, 'room_overlap', 'high', 'Multiple high-priority requests competing for limited classroom resources during peak hours', 'resolved', '2025-12-26 07:31:05', NULL, 'Resolved by admin', '2025-12-24 09:03:19'),
(4, 'TEST_CONF_1766567313', 'TEST_REQ_17665673138', NULL, 'room_overlap', 'high', 'Multiple high-priority requests competing for limited classroom resources during peak hours', 'unresolved', NULL, NULL, NULL, '2025-12-24 09:08:33');

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
(11, 'REQ005', 'FAC2024001', 'CS305', '2024-12-22', '14:00:00', '16:00:00', 60, '{\"projector\": true, \"audio_system\": true, \"computers\": 60}', 'Machine Learning Workshop', 'medium', 'pending', '2025-12-23 07:12:42', NULL, NULL, NULL),
(13, 'REQ1766559821421', 'FAC2024001', 'CS301', '2025-12-25', '13:33:00', '14:33:00', 30, '{\"projector\":true,\"whiteboard\":true}', 'class room', 'low', 'approved', '2025-12-24 07:03:41', '2025-12-24 07:03:41', NULL, NULL),
(21, 'REQ_AI_1766566418805', 'FAC2024001', 'CS301', '2025-01-25', '09:00:00', '10:30:00', 45, NULL, 'Database Systems Lecture - Section A', 'high', 'approved', '2025-12-24 08:53:38', '2025-12-24 08:58:07', NULL, NULL),
(25, 'TEST_REQ_17665669996', 'FAC2024001', 'CS301', '2025-01-25', '09:00:00', '11:00:00', 50, NULL, 'Machine Learning Workshop - AI Testing', 'high', 'approved', '2025-12-24 09:03:19', '2025-12-24 09:03:23', NULL, NULL),
(26, 'TEST_REQ_17665673138', 'FAC2024001', 'CS301', '2025-01-25', '09:00:00', '11:00:00', 50, NULL, 'AI Testing - Machine Learning Workshop', 'high', 'approved', '2025-12-24 09:08:33', '2025-12-24 09:17:19', NULL, NULL),
(27, 'REQ1766734213676', 'FAC2024001', 'CSA022', '2025-12-26', '12:59:00', '13:59:00', 1, '{\"whiteboard\":true,\"lab_equipment\":false,\"computers\":true,\"ac\":true}', 'classroom', 'high', 'pending', '2025-12-26 07:30:13', NULL, NULL, NULL),
(28, 'REQ1766734946847', 'FAC2024001', 'UBA0123', '2025-12-26', '13:12:00', '14:12:00', 30, '{\"whiteboard\":true}', 'classroom', 'medium', 'approved', '2025-12-26 07:42:26', '2025-12-26 07:42:26', NULL, NULL),
(29, 'REQ1766822074905', 'FAC2024001', 'UBA0123', '2025-12-27', '14:25:00', '16:25:00', 30, '{}', 'examination supply', 'low', 'approved', '2025-12-27 07:54:34', '2025-12-27 07:54:35', NULL, NULL);

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
-- Table structure for table `attendance_records`
--

CREATE TABLE `attendance_records` (
  `record_id` varchar(50) NOT NULL,
  `session_id` varchar(50) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `attendance_status` enum('present','absent','late','excused') DEFAULT 'absent',
  `marked_at` timestamp NULL DEFAULT NULL,
  `marked_by` varchar(20) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance_records`
--

INSERT INTO `attendance_records` (`record_id`, `session_id`, `student_id`, `course_code`, `attendance_status`, `marked_at`, `marked_by`, `notes`, `created_at`, `updated_at`) VALUES
('REC_CS301_001_STU001', 'SESS_CS301_001', 'STU2024001', 'CS301', 'present', '2024-12-01 08:35:00', 'FAC2024001', NULL, '2025-12-29 03:57:49', '2025-12-29 03:57:49'),
('REC_CSA022_001_STU001', 'SESS_CSA022_001', 'STU2024001', 'CSA022', 'present', '2024-12-01 03:32:00', 'FAC2024001', NULL, '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('REC_CSA022_001_STU002', 'SESS_CSA022_001', 'STU2024002', 'CSA022', 'present', '2024-12-01 03:35:00', 'FAC2024001', NULL, '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('REC_CSA022_002_STU001', 'SESS_CSA022_002', 'STU2024001', 'CSA022', 'absent', NULL, NULL, NULL, '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('REC_CSA022_002_STU002', 'SESS_CSA022_002', 'STU2024002', 'CSA022', 'present', '2024-12-03 03:33:00', 'FAC2024001', NULL, '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('REC_CSA022_003_STU001', 'SESS_CSA022_003', 'STU2024001', 'CSA022', 'present', '2024-12-05 03:31:00', 'FAC2024001', NULL, '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('REC_CSA022_003_STU002', 'SESS_CSA022_003', 'STU2024002', 'CSA022', 'late', '2024-12-05 03:45:00', 'FAC2024001', NULL, '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('REC_CSA022_004_STU002', 'SESS_CSA022_004', 'STU2024002', 'CSA022', 'absent', NULL, NULL, NULL, '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('REC_CSA022_005_STU002', 'SESS_CSA022_005', 'STU2024002', 'CSA022', 'present', '2024-12-10 03:32:00', 'FAC2024001', NULL, '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('REC_SESS_CSA022_1767081689508_STU2024002', 'SESS_CSA022_1767081689508', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:01:29', 'FAC2024001', NULL, '2025-12-30 08:01:29', '2025-12-30 08:01:29'),
('REC_SESS_CSA022_1767081714704_STU2024002', 'SESS_CSA022_1767081714704', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:01:54', 'FAC2024001', NULL, '2025-12-30 08:01:54', '2025-12-30 08:01:54'),
('REC_SESS_CSA022_1767082550940_STU2024002', 'SESS_CSA022_1767082550940', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:15:50', 'FAC2024001', NULL, '2025-12-30 08:15:50', '2025-12-30 08:15:50'),
('REC_SESS_CSA022_1767082778401_STU2024002', 'SESS_CSA022_1767082778401', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:19:38', 'FAC2024001', 'Final test', '2025-12-30 08:19:38', '2025-12-30 08:19:38'),
('REC_SESS_CSA022_1767082952644_STU2024002', 'SESS_CSA022_1767082952644', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:22:32', 'FAC2024001', NULL, '2025-12-30 08:22:32', '2025-12-30 08:22:32'),
('REC_SESS_CSA022_1767083118884_STU2024002', 'SESS_CSA022_1767083118884', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:25:18', 'FAC2024001', NULL, '2025-12-30 08:25:18', '2025-12-30 08:25:18'),
('REC_SESS_CSA022_1767083231419_STU2024002', 'SESS_CSA022_1767083231419', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:27:11', 'FAC2024001', 'API test', '2025-12-30 08:27:11', '2025-12-30 08:27:11'),
('REC_SESS_CSA022_1767083327762_STU2024002', 'SESS_CSA022_1767083327762', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:28:47', 'FAC2024001', 'Final test', '2025-12-30 08:28:47', '2025-12-30 08:28:47'),
('REC_SESS_CSA022_1767083865538_STU2024002', 'SESS_CSA022_1767083865538', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:37:45', 'FAC2024001', 'Final test', '2025-12-30 08:37:45', '2025-12-30 08:37:45'),
('REC_SESS_CSA022_1767083989407_STU2024002', 'SESS_CSA022_1767083989407', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:39:49', 'FAC2024001', 'Final test', '2025-12-30 08:39:49', '2025-12-30 08:39:49'),
('REC_SESS_CSA022_1767084138689_STU2024002', 'SESS_CSA022_1767084138689', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:42:18', 'FAC2024001', 'Final test', '2025-12-30 08:42:18', '2025-12-30 08:42:18'),
('REC_SESS_CSA022_1767084253650_STU2024002', 'SESS_CSA022_1767084253650', 'STU2024002', 'CSA022', 'present', '2025-12-30 08:44:13', 'FAC2024001', 'Comprehensive test attendance', '2025-12-30 08:44:13', '2025-12-30 08:44:13'),
('REC_SESS_CSA022_1767150751028_STU2024002', 'SESS_CSA022_1767150751028', 'STU2024002', 'CSA022', 'present', '2025-12-31 03:12:31', 'FAC2024001', 'Comprehensive test attendance', '2025-12-31 03:12:31', '2025-12-31 03:12:31'),
('REC_SESS_CSA022_1767150854607_STU2024002', 'SESS_CSA022_1767150854607', 'STU2024002', 'CSA022', 'absent', NULL, 'FAC2024001', 'Student was absent', '2025-12-31 03:14:14', '2025-12-31 03:14:14'),
('REC_SESS_CSA022_1767150854702_STU2024002', 'SESS_CSA022_1767150854702', 'STU2024002', 'CSA022', 'late', '2025-12-31 03:14:14', 'FAC2024001', 'Student arrived 15 minutes late', '2025-12-31 03:14:14', '2025-12-31 03:14:14'),
('REC_SESS_CSA022_1767150937293_STU2024002', 'SESS_CSA022_1767150937293', 'STU2024002', 'CSA022', 'present', '2025-12-31 03:15:37', 'FAC2024001', 'Multi-student test - present', '2025-12-31 03:15:37', '2025-12-31 03:15:37'),
('REC_SESS_CSA022_1767151153314_STU2024002', 'SESS_CSA022_1767151153314', 'STU2024002', 'CSA022', 'present', '2025-12-31 03:19:13', 'FAC2024001', NULL, '2025-12-31 03:19:13', '2025-12-31 03:19:13'),
('REC_SESS_UBA0123_1767081192492_STU2024002', 'SESS_UBA0123_1767081192492', 'STU2024002', 'UBA0123', 'present', '2025-12-30 07:53:12', 'FAC2024001', NULL, '2025-12-30 07:53:12', '2025-12-30 07:53:12'),
('REC_SESS_UBA0123_1767081220446_STU2024002', 'SESS_UBA0123_1767081220446', 'STU2024002', 'UBA0123', 'present', '2025-12-30 07:53:40', 'FAC2024001', NULL, '2025-12-30 07:53:40', '2025-12-30 07:53:40'),
('REC_SESS_UBA0123_1767081267727_STU2024002', 'SESS_UBA0123_1767081267727', 'STU2024002', 'UBA0123', 'present', '2025-12-30 07:54:27', 'FAC2024001', NULL, '2025-12-30 07:54:27', '2025-12-30 07:54:27'),
('REC_SESS_UBA0123_1767081309651_STU2024002', 'SESS_UBA0123_1767081309651', 'STU2024002', 'UBA0123', 'absent', NULL, 'FAC2024001', NULL, '2025-12-30 07:55:09', '2025-12-30 07:55:09'),
('REC_SESS_UBA0123_1767081625649_STU2024002', 'SESS_UBA0123_1767081625649', 'STU2024002', 'UBA0123', 'present', '2025-12-30 08:00:25', 'FAC2024001', NULL, '2025-12-30 08:00:25', '2025-12-30 08:00:25'),
('REC_SESS_UBA0123_1767081734975_STU2024002', 'SESS_UBA0123_1767081734975', 'STU2024002', 'UBA0123', 'present', '2025-12-30 08:02:15', 'FAC2024001', NULL, '2025-12-30 08:02:15', '2025-12-30 08:02:15'),
('REC_SESS_UBA0123_1767081740556_STU2024002', 'SESS_UBA0123_1767081740556', 'STU2024002', 'UBA0123', 'present', '2025-12-30 08:02:20', 'FAC2024001', NULL, '2025-12-30 08:02:20', '2025-12-30 08:02:20'),
('REC_SESS_UBA0123_1767081995752_STU2024002', 'SESS_UBA0123_1767081995752', 'STU2024002', 'UBA0123', 'present', '2025-12-30 08:06:35', 'FAC2024001', NULL, '2025-12-30 08:06:35', '2025-12-30 08:06:35'),
('REC_SESS_UBA0123_1767082022416_STU2024002', 'SESS_UBA0123_1767082022416', 'STU2024002', 'UBA0123', 'present', '2025-12-30 08:07:02', 'FAC2024001', NULL, '2025-12-30 08:07:02', '2025-12-30 08:07:02'),
('REC_SESS_UBA0123_1767082120615_STU2024002', 'SESS_UBA0123_1767082120615', 'STU2024002', 'UBA0123', 'present', '2025-12-30 08:08:40', 'FAC2024001', NULL, '2025-12-30 08:08:40', '2025-12-30 08:08:40'),
('REC_SESS_UBA0123_1767082236755_STU2024002', 'SESS_UBA0123_1767082236755', 'STU2024002', 'UBA0123', 'present', '2025-12-30 08:10:36', 'FAC2024001', NULL, '2025-12-30 08:10:36', '2025-12-30 08:10:36'),
('REC_SESS_UBA0123_1767082289083_STU2024002', 'SESS_UBA0123_1767082289083', 'STU2024002', 'UBA0123', 'present', '2025-12-30 08:11:29', 'FAC2024001', NULL, '2025-12-30 08:11:29', '2025-12-30 08:11:29'),
('REC_SESS_UBA0123_1767151166376_STU2024002', 'SESS_UBA0123_1767151166376', 'STU2024002', 'UBA0123', 'present', '2025-12-31 03:19:26', 'FAC2024001', NULL, '2025-12-31 03:19:26', '2025-12-31 03:19:26'),
('REC_UBA0123_001_STU002', 'SESS_UBA0123_001', 'STU2024002', 'UBA0123', 'present', '2024-12-02 05:35:00', 'FAC2024001', NULL, '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('REC_UBA0123_002_STU002', 'SESS_UBA0123_002', 'STU2024002', 'UBA0123', 'present', '2024-12-04 05:32:00', 'FAC2024001', NULL, '2025-12-29 03:34:27', '2025-12-29 03:34:27');

-- --------------------------------------------------------

--
-- Table structure for table `attendance_sessions`
--

CREATE TABLE `attendance_sessions` (
  `session_id` varchar(50) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `faculty_id` varchar(20) NOT NULL,
  `session_date` date NOT NULL,
  `session_time` time NOT NULL,
  `session_duration` int(11) DEFAULT 60,
  `session_topic` varchar(255) DEFAULT NULL,
  `session_type` enum('lecture','lab','tutorial','exam') DEFAULT 'lecture',
  `total_students` int(11) DEFAULT 0,
  `present_students` int(11) DEFAULT 0,
  `attendance_percentage` decimal(5,2) DEFAULT 0.00,
  `status` enum('scheduled','ongoing','completed','cancelled') DEFAULT 'scheduled',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance_sessions`
--

INSERT INTO `attendance_sessions` (`session_id`, `course_code`, `faculty_id`, `session_date`, `session_time`, `session_duration`, `session_topic`, `session_type`, `total_students`, `present_students`, `attendance_percentage`, `status`, `created_at`, `updated_at`) VALUES
('SESS_CS301_001', 'CS301', 'FAC2024001', '2024-12-01', '14:00:00', 60, 'Database Design Principles', 'lecture', 20, 19, 95.00, 'completed', '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('SESS_CSA022_001', 'CSA022', 'FAC2024001', '2024-12-01', '09:00:00', 60, 'Introduction to Computer Science', 'lecture', 25, 23, 92.00, 'completed', '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('SESS_CSA022_002', 'CSA022', 'FAC2024001', '2024-12-03', '09:00:00', 60, 'Programming Fundamentals', 'lecture', 25, 22, 88.00, 'completed', '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('SESS_CSA022_003', 'CSA022', 'FAC2024001', '2024-12-05', '09:00:00', 60, 'Data Structures Basics', 'lecture', 25, 24, 96.00, 'completed', '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('SESS_CSA022_004', 'CSA022', 'FAC2024001', '2024-12-08', '09:00:00', 60, 'Algorithms Introduction', 'lecture', 25, 21, 84.00, 'completed', '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('SESS_CSA022_005', 'CSA022', 'FAC2024001', '2024-12-10', '09:00:00', 60, 'Object-Oriented Programming', 'lecture', 25, 25, 100.00, 'completed', '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('SESS_CSA022_1767081689508', 'CSA022', 'FAC2024001', '2025-12-30', '13:31:29', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:01:29', '2025-12-30 08:01:29'),
('SESS_CSA022_1767081714704', 'CSA022', 'FAC2024001', '2025-12-30', '13:31:54', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:01:54', '2025-12-30 08:01:54'),
('SESS_CSA022_1767082550940', 'CSA022', 'FAC2024001', '2025-12-30', '13:45:50', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:15:50', '2025-12-30 08:15:50'),
('SESS_CSA022_1767082778401', 'CSA022', 'FAC2024001', '2025-12-30', '15:00:00', 60, 'Final Test Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:19:38', '2025-12-30 08:19:38'),
('SESS_CSA022_1767082952644', 'CSA022', 'FAC2024001', '2025-12-30', '13:52:32', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:22:32', '2025-12-30 08:22:32'),
('SESS_CSA022_1767083118884', 'CSA022', 'FAC2024001', '2025-12-30', '13:55:18', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:25:18', '2025-12-30 08:25:18'),
('SESS_CSA022_1767083231419', 'CSA022', 'FAC2024001', '2025-12-30', '16:00:00', 60, 'API Test Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:27:11', '2025-12-30 08:27:11'),
('SESS_CSA022_1767083327762', 'CSA022', 'FAC2024001', '2025-12-30', '17:00:00', 60, 'Final API Test', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:28:47', '2025-12-30 08:28:47'),
('SESS_CSA022_1767083865538', 'CSA022', 'FAC2024001', '2025-12-30', '17:00:00', 60, 'Final API Test', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:37:45', '2025-12-30 08:37:45'),
('SESS_CSA022_1767083989407', 'CSA022', 'FAC2024001', '2025-12-30', '17:00:00', 60, 'Final API Test', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:39:49', '2025-12-30 08:39:49'),
('SESS_CSA022_1767084138689', 'CSA022', 'FAC2024001', '2025-12-30', '17:00:00', 60, 'Final API Test', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:42:18', '2025-12-30 08:42:18'),
('SESS_CSA022_1767084253650', 'CSA022', 'FAC2024001', '2025-12-30', '14:00:00', 60, 'Comprehensive Test Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:44:13', '2025-12-30 08:44:13'),
('SESS_CSA022_1767150751028', 'CSA022', 'FAC2024001', '2025-12-31', '14:00:00', 60, 'Comprehensive Test Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-31 03:12:31', '2025-12-31 03:12:31'),
('SESS_CSA022_1767150854607', 'CSA022', 'FAC2024001', '2025-12-31', '15:00:00', 60, 'Absent Test Session', 'lecture', 1, 0, 0.00, 'completed', '2025-12-31 03:14:14', '2025-12-31 03:14:14'),
('SESS_CSA022_1767150854702', 'CSA022', 'FAC2024001', '2025-12-31', '16:00:00', 60, 'Late Test Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-31 03:14:14', '2025-12-31 03:14:14'),
('SESS_CSA022_1767150937293', 'CSA022', 'FAC2024001', '2025-12-31', '17:00:00', 60, 'Multi-Student Test Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-31 03:15:37', '2025-12-31 03:15:37'),
('SESS_CSA022_1767151153314', 'CSA022', 'FAC2024001', '2025-12-31', '08:49:13', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-31 03:19:13', '2025-12-31 03:19:13'),
('SESS_UBA0123_001', 'UBA0123', 'FAC2024001', '2024-12-02', '11:00:00', 60, 'Business Fundamentals', 'lecture', 30, 28, 93.33, 'completed', '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('SESS_UBA0123_002', 'UBA0123', 'FAC2024001', '2024-12-04', '11:00:00', 60, 'Marketing Principles', 'lecture', 30, 27, 90.00, 'completed', '2025-12-29 03:34:27', '2025-12-29 03:34:27'),
('SESS_UBA0123_1767080880763', 'UBA0123', 'FAC2024001', '2025-12-30', '13:18:00', 60, 'Class Session', 'lecture', 1, 0, 0.00, 'scheduled', '2025-12-30 07:48:00', '2025-12-30 07:48:00'),
('SESS_UBA0123_1767081158361', 'UBA0123', 'FAC2024001', '2025-12-30', '10:00:00', 60, 'Test Session', 'lecture', 1, 0, 0.00, 'scheduled', '2025-12-30 07:52:38', '2025-12-30 07:52:38'),
('SESS_UBA0123_1767081192492', 'UBA0123', 'FAC2024001', '2025-12-30', '10:00:00', 60, 'Test Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 07:53:12', '2025-12-30 07:53:12'),
('SESS_UBA0123_1767081220446', 'UBA0123', 'FAC2024001', '2025-12-30', '10:00:00', 60, 'Test Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 07:53:40', '2025-12-30 07:53:40'),
('SESS_UBA0123_1767081267727', 'UBA0123', 'FAC2024001', '2025-12-30', '10:00:00', 60, 'Test Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 07:54:27', '2025-12-30 07:54:27'),
('SESS_UBA0123_1767081309651', 'UBA0123', 'FAC2024001', '2025-12-30', '13:25:09', 60, 'Class Session', 'lecture', 1, 0, 0.00, 'completed', '2025-12-30 07:55:09', '2025-12-30 07:55:09'),
('SESS_UBA0123_1767081625649', 'UBA0123', 'FAC2024001', '2025-12-30', '13:30:25', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:00:25', '2025-12-30 08:00:25'),
('SESS_UBA0123_1767081734975', 'UBA0123', 'FAC2024001', '2025-12-30', '13:32:14', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:02:14', '2025-12-30 08:02:15'),
('SESS_UBA0123_1767081740556', 'UBA0123', 'FAC2024001', '2025-12-30', '13:32:20', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:02:20', '2025-12-30 08:02:20'),
('SESS_UBA0123_1767081995752', 'UBA0123', 'FAC2024001', '2025-12-31', '13:36:35', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:06:35', '2025-12-30 08:06:35'),
('SESS_UBA0123_1767082022416', 'UBA0123', 'FAC2024001', '2025-12-30', '13:37:02', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:07:02', '2025-12-30 08:07:02'),
('SESS_UBA0123_1767082120615', 'UBA0123', 'FAC2024001', '2025-12-30', '11:00:00', 60, 'Test New Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:08:40', '2025-12-30 08:08:40'),
('SESS_UBA0123_1767082236755', 'UBA0123', 'FAC2024001', '2025-12-30', '11:00:00', 60, 'Test New Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:10:36', '2025-12-30 08:10:36'),
('SESS_UBA0123_1767082289083', 'UBA0123', 'FAC2024001', '2025-12-30', '11:00:00', 60, 'Test New Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-30 08:11:29', '2025-12-30 08:11:29'),
('SESS_UBA0123_1767151166376', 'UBA0123', 'FAC2024001', '2025-12-31', '08:49:26', 60, 'Class Session', 'lecture', 1, 1, 100.00, 'completed', '2025-12-31 03:19:26', '2025-12-31 03:19:26');

-- --------------------------------------------------------

--
-- Table structure for table `attendance_summary`
--

CREATE TABLE `attendance_summary` (
  `summary_id` varchar(50) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `total_sessions` int(11) DEFAULT 0,
  `attended_sessions` int(11) DEFAULT 0,
  `late_sessions` int(11) DEFAULT 0,
  `excused_sessions` int(11) DEFAULT 0,
  `attendance_percentage` decimal(5,2) DEFAULT 0.00,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance_summary`
--

INSERT INTO `attendance_summary` (`summary_id`, `student_id`, `course_code`, `total_sessions`, `attended_sessions`, `late_sessions`, `excused_sessions`, `attendance_percentage`, `last_updated`) VALUES
('SUM_STU2024001_CS301', 'STU2024001', 'CS301', 1, 1, 0, 0, 100.00, '2025-12-30 08:10:15'),
('SUM_STU2024001_CSA022', 'STU2024001', 'CSA022', 21, 2, 0, 0, 9.52, '2025-12-31 03:17:48'),
('SUM_STU2024002_CSA022', 'STU2024002', 'CSA022', 22, 20, 2, 0, 90.91, '2025-12-31 03:19:13'),
('SUM_STU2024002_UBA0123', 'STU2024002', 'UBA0123', 15, 14, 0, 0, 93.33, '2025-12-31 03:19:26');

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
(3, 'ALLOC003', NULL, 'LAB003', 'FAC2024001', 'CS303', '2024-12-18', '14:00:00', '17:00:00', NULL, 'scheduled', 'regular', '2025-12-23 07:12:42', '2025-12-23 07:12:42'),
(4, 'ALLOC1766559821444', 'REQ1766559821421', 'SEM001', 'FAC2024001', 'CS301', '2025-12-25', '13:33:00', '14:33:00', NULL, 'scheduled', 'regular', '2025-12-24 07:03:41', '2025-12-24 07:03:41'),
(5, 'ALLOC_1766566687181_', NULL, 'LH001', 'FAC2024001', 'CS301', '2025-01-25', '09:00:00', '10:30:00', NULL, 'scheduled', '', '2025-12-24 08:58:07', '2025-12-24 08:58:07'),
(6, 'ALLOC_1766566687206_', NULL, 'LH001', 'FAC2024001', 'CS301', '2025-01-25', '09:00:00', '11:00:00', NULL, 'scheduled', '', '2025-12-24 08:58:07', '2025-12-24 08:58:07'),
(7, 'ALLOC_1766566778710_', NULL, 'LH002', 'FAC2024001', 'CS301', '2025-01-25', '09:00:00', '11:00:00', NULL, 'scheduled', '', '2025-12-24 08:59:38', '2025-12-24 08:59:38'),
(8, 'ALLOC_1766567003920_', NULL, 'LH003', 'FAC2024001', 'CS301', '2025-01-25', '09:00:00', '11:00:00', NULL, 'scheduled', '', '2025-12-24 09:03:23', '2025-12-24 09:03:23'),
(9, 'ALLOC_1766567839061_', NULL, 'LAB001', 'FAC2024001', 'CS301', '2025-01-25', '09:00:00', '11:00:00', NULL, 'scheduled', '', '2025-12-24 09:17:19', '2025-12-24 09:17:19'),
(10, 'ALLOC1766734946876', 'REQ1766734946847', 'SEM001', 'FAC2024001', 'UBA0123', '2025-12-26', '13:12:00', '14:12:00', NULL, 'scheduled', 'regular', '2025-12-26 07:42:26', '2025-12-26 07:42:26'),
(11, 'ALLOC1766822075046', 'REQ1766822074905', 'SEM001', 'FAC2024001', 'UBA0123', '2025-12-27', '14:25:00', '16:25:00', NULL, 'scheduled', 'regular', '2025-12-27 07:54:35', '2025-12-27 07:54:35');

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
(1, 'CS301', 'Data Structures', 'Computer Science', 4, 3, 2, 'core', 'A', 40, 0, 'FAC2024001', NULL, NULL, '2025-12-23 07:07:54'),
(2, 'CS302', 'Database Management Systems', 'Computer Science', 4, 4, 2, 'core', 'B', 35, 0, 'FAC2024001', NULL, NULL, '2025-12-23 07:07:54'),
(3, 'CS303', 'Computer Networks', 'Computer Science', 3, 4, 2, 'core', 'C', 30, 0, 'FAC2024001', NULL, NULL, '2025-12-23 07:07:54'),
(4, 'CS304', 'Operating Systems', 'Computer Science', 4, 4, 2, 'core', NULL, 30, 0, NULL, NULL, NULL, '2025-12-23 07:07:54'),
(5, 'CS305', 'Software Engineering', 'Computer Science', 3, 4, 2, 'core', NULL, 30, 0, NULL, NULL, NULL, '2025-12-23 07:07:54'),
(6, 'UBA0123', 'ENGINEERING MATHEMATICS 1', 'Computer Science', 3, 1, 2024, 'core', 'A', 30, 1, 'FAC2024001', 'ENGINEERING MATHEMATICS 1 - Theory created by faculty', NULL, '2025-12-23 07:46:06'),
(7, 'CSA022', 'PYTHON PROGRAMMING', 'Computer Science', 3, 1, 2024, 'core', 'B', 30, 1, 'FAC2024001', 'PYTHON PROGRAMMING - Practical created by faculty', NULL, '2025-12-23 07:49:21'),
(8, 'CEA022', 'Automobile engineering', 'Computer Science', 3, 1, 2024, 'core', 'A', 30, 0, 'FAC2024001', 'Automobile engineering - Theory created by faculty', NULL, '2025-12-30 07:36:40');

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
(5, 'STU2024002', 'CSA022', 'FAC2024001', '2025-12-23', 'dropped', NULL, NULL);

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
(8, 'ENR_REQ_1766476197970_9vswl', 'STU2024002', 'CSA022', 'FAC2024001', 'B', '2025-12-23 07:49:57', 'approved', 'Approved by faculty for Slot B [REJECTED FROM ENROLLED - 2025-12-27 13:27:01]', '2025-12-27 07:57:01', 'FAC2024001');

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
-- Table structure for table `od_requests`
--

CREATE TABLE `od_requests` (
  `request_id` varchar(50) NOT NULL,
  `faculty_id` varchar(20) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `od_date` date NOT NULL,
  `od_reason` text NOT NULL,
  `od_type` enum('official','conference','training','meeting','other') DEFAULT 'official',
  `supporting_document` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `faculty_remarks` text DEFAULT NULL,
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `od_requests`
--

INSERT INTO `od_requests` (`request_id`, `faculty_id`, `student_id`, `course_code`, `od_date`, `od_reason`, `od_type`, `supporting_document`, `status`, `faculty_remarks`, `requested_at`, `updated_at`) VALUES
('OD_1767151000001_ABC123', 'FAC2024001', 'STU2024002', 'CSA022', '2025-01-05', 'Attending IEEE Conference on Computer Science and Applications at Chennai. This conference will help me understand the latest trends in Python programming and machine learning applications.', 'conference', NULL, 'pending', NULL, '2025-12-30 09:00:00', '2025-12-31 03:25:31'),
('OD_1767151000002_DEF456', 'FAC2024001', 'STU2024002', 'UBA0123', '2025-01-08', 'Official meeting with industry partners for internship program coordination. This meeting is essential for finalizing internship placements for final year students.', 'meeting', NULL, 'approved', NULL, '2025-12-29 04:45:00', '2025-12-31 03:25:31'),
('OD_1767151000003_GHI789', 'FAC2024001', 'STU2024002', 'CSA022', '2025-01-12', 'Training program on Advanced Python Development and Data Science at IIT Madras. This 3-day intensive training will enhance my technical skills.', 'training', NULL, 'rejected', NULL, '2025-12-28 11:15:00', '2025-12-31 03:25:31'),
('OD_1767151606423_4V7TU5', 'FAC2024001', 'STU2024002', 'CSA022', '2025-01-15', 'Test OD request for API validation - attending workshop on advanced Python programming', 'training', NULL, 'approved', 'Approved for professional development', '2025-12-31 03:26:46', '2025-12-31 03:26:46'),
('OD_1767151763833_9LZ231', 'FAC2024001', 'STU2024002', 'CSA022', '2025-01-20', 'Complete system test - attending technical workshop on AI and Machine Learning', 'conference', NULL, 'approved', 'Approved for professional development and skill enhancement', '2025-12-31 03:29:23', '2025-12-31 03:29:23'),
('OD_1767151766495_FA1ALB', 'FAC2024001', 'STU2024002', 'UBA0123', '2025-01-25', 'Workflow test - official meeting with university administration', 'meeting', NULL, 'approved', 'Approved - important administrative meeting', '2025-12-31 03:29:26', '2025-12-31 03:29:26'),
('OD_1767152061778_AGGVQL', 'FAC2024001', 'STU2024002', 'CSA022', '2025-01-30', 'Student test - attending technical symposium on emerging technologies', 'conference', NULL, 'pending', NULL, '2025-12-31 03:34:21', '2025-12-31 03:34:21'),
('OD_1767152155305_1CLT1G', 'FAC2024001', 'STU2024002', 'UBA0123', '2025-02-05', 'Final test - attending national level mathematics competition', '', NULL, 'approved', 'Approved - excellent opportunity for academic growth', '2025-12-31 03:35:55', '2025-12-31 03:35:55');

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
(2, 'FAC2024001', 'daniel@simats.edu', '$2a$12$dFwwK6AqgalFWuaXZJGcAe6ea9S7SLZeHcwJ8gx0AXfA4rL5B4WUe', 'faculty', 'Daniel', 'Wilson', '9876543211', 'active', '2025-12-23 07:07:54', '2025-12-30 07:33:58'),
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
-- Indexes for table `attendance_records`
--
ALTER TABLE `attendance_records`
  ADD PRIMARY KEY (`record_id`),
  ADD UNIQUE KEY `unique_student_session` (`session_id`,`student_id`),
  ADD KEY `idx_student_course` (`student_id`,`course_code`),
  ADD KEY `idx_session_status` (`session_id`,`attendance_status`);

--
-- Indexes for table `attendance_sessions`
--
ALTER TABLE `attendance_sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `idx_course_date` (`course_code`,`session_date`),
  ADD KEY `idx_faculty_date` (`faculty_id`,`session_date`);

--
-- Indexes for table `attendance_summary`
--
ALTER TABLE `attendance_summary`
  ADD PRIMARY KEY (`summary_id`),
  ADD UNIQUE KEY `unique_student_course` (`student_id`,`course_code`),
  ADD KEY `idx_student_attendance` (`student_id`,`attendance_percentage`),
  ADD KEY `idx_course_attendance` (`course_code`,`attendance_percentage`);

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
-- Indexes for table `od_requests`
--
ALTER TABLE `od_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `idx_faculty_id` (`faculty_id`),
  ADD KEY `idx_student_id` (`student_id`),
  ADD KEY `idx_course_code` (`course_code`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_od_date` (`od_date`),
  ADD KEY `idx_od_requests_faculty_status` (`faculty_id`,`status`),
  ADD KEY `idx_od_requests_date_range` (`od_date`,`requested_at`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `agent_notifications`
--
ALTER TABLE `agent_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `allocation_conflicts`
--
ALTER TABLE `allocation_conflicts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `allocation_requests`
--
ALTER TABLE `allocation_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
-- Constraints for table `od_requests`
--
ALTER TABLE `od_requests`
  ADD CONSTRAINT `od_requests_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `od_requests_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `od_requests_ibfk_3` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE CASCADE;

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
