-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2025 at 04:14 AM
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

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `assignment_id`, `course_code`, `faculty_id`, `title`, `description`, `due_date`, `max_marks`, `assignment_type`, `file_path`, `created_at`) VALUES
(1, 'CS301_ASG_1', 'CS301', 'FAC001', 'Data Structures and Algorithms Assignment', 'Assignment for Data Structures and Algorithms', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:46'),
(2, 'CS302_ASG_1', 'CS302', 'FAC002', 'Database Management Systems Assignment', 'Assignment for Database Management Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:46'),
(3, 'CS303_ASG_1', 'CS303', 'FAC001', 'Web Development Assignment', 'Assignment for Web Development', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:46'),
(4, 'CS304_ASG_1', 'CS304', 'FAC002', 'Operating Systems Assignment', 'Assignment for Operating Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:46'),
(5, 'CS305_ASG_1', 'CS305', 'FAC001', 'Computer Networks Assignment', 'Assignment for Computer Networks', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:46'),
(6, 'CS306_ASG_1', 'CS306', 'FAC002', 'Software Engineering Assignment', 'Assignment for Software Engineering', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:46'),
(7, 'CS301_ASG_2', 'CS301', 'FAC001', 'Data Structures and Algorithms Assignment', 'Assignment for Data Structures and Algorithms', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(8, 'CS302_ASG_2', 'CS302', 'FAC002', 'Database Management Systems Assignment', 'Assignment for Database Management Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(9, 'CS303_ASG_2', 'CS303', 'FAC001', 'Web Development Assignment', 'Assignment for Web Development', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(10, 'CS304_ASG_2', 'CS304', 'FAC002', 'Operating Systems Assignment', 'Assignment for Operating Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(11, 'CS305_ASG_2', 'CS305', 'FAC001', 'Computer Networks Assignment', 'Assignment for Computer Networks', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(12, 'CS306_ASG_2', 'CS306', 'FAC002', 'Software Engineering Assignment', 'Assignment for Software Engineering', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(13, 'IT301_ASG_3', 'IT301', 'FAC003', 'System Analysis and Design Assignment', 'Assignment for System Analysis and Design', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(14, 'IT302_ASG_3', 'IT302', 'FAC003', 'Network Security Assignment', 'Assignment for Network Security', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(15, 'IT303_ASG_3', 'IT303', 'FAC003', 'Mobile Application Development Assignment', 'Assignment for Mobile Application Development', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(16, 'IT304_ASG_3', 'IT304', 'FAC003', 'Cloud Computing Assignment', 'Assignment for Cloud Computing', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(17, 'IT305_ASG_3', 'IT305', 'FAC003', 'Data Mining Assignment', 'Assignment for Data Mining', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(18, 'IT306_ASG_3', 'IT306', 'FAC003', 'Internet of Things Assignment', 'Assignment for Internet of Things', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(19, 'EC301_ASG_4', 'EC301', 'FAC004', 'Digital Signal Processing Assignment', 'Assignment for Digital Signal Processing', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:47'),
(20, 'EC302_ASG_4', 'EC302', 'FAC004', 'Microprocessors Assignment', 'Assignment for Microprocessors', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(21, 'EC303_ASG_4', 'EC303', 'FAC004', 'Communication Systems Assignment', 'Assignment for Communication Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(22, 'EC304_ASG_4', 'EC304', 'FAC004', 'VLSI Design Assignment', 'Assignment for VLSI Design', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(23, 'EC305_ASG_4', 'EC305', 'FAC004', 'Embedded Systems Assignment', 'Assignment for Embedded Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(24, 'EC306_ASG_4', 'EC306', 'FAC004', 'Control Systems Assignment', 'Assignment for Control Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(25, 'ME301_ASG_5', 'ME301', 'FAC005', 'Thermodynamics Assignment', 'Assignment for Thermodynamics', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(26, 'ME302_ASG_5', 'ME302', 'FAC005', 'Fluid Mechanics Assignment', 'Assignment for Fluid Mechanics', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(27, 'ME303_ASG_5', 'ME303', 'FAC005', 'Machine Design Assignment', 'Assignment for Machine Design', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(28, 'ME304_ASG_5', 'ME304', 'FAC005', 'Manufacturing Processes Assignment', 'Assignment for Manufacturing Processes', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(29, 'ME305_ASG_5', 'ME305', 'FAC005', 'Heat Transfer Assignment', 'Assignment for Heat Transfer', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(30, 'ME306_ASG_5', 'ME306', 'FAC005', 'Automobile Engineering Assignment', 'Assignment for Automobile Engineering', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(31, 'CS301_ASG_6', 'CS301', 'FAC001', 'Data Structures and Algorithms Assignment', 'Assignment for Data Structures and Algorithms', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(32, 'CS302_ASG_6', 'CS302', 'FAC002', 'Database Management Systems Assignment', 'Assignment for Database Management Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(33, 'CS303_ASG_6', 'CS303', 'FAC001', 'Web Development Assignment', 'Assignment for Web Development', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(34, 'CS304_ASG_6', 'CS304', 'FAC002', 'Operating Systems Assignment', 'Assignment for Operating Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(35, 'CS305_ASG_6', 'CS305', 'FAC001', 'Computer Networks Assignment', 'Assignment for Computer Networks', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(36, 'CS306_ASG_6', 'CS306', 'FAC002', 'Software Engineering Assignment', 'Assignment for Software Engineering', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:48'),
(37, 'CE301_ASG_7', 'CE301', 'FAC006', 'Structural Analysis Assignment', 'Assignment for Structural Analysis', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(38, 'CE302_ASG_7', 'CE302', 'FAC006', 'Concrete Technology Assignment', 'Assignment for Concrete Technology', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(39, 'CE303_ASG_7', 'CE303', 'FAC006', 'Geotechnical Engineering Assignment', 'Assignment for Geotechnical Engineering', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(40, 'CE304_ASG_7', 'CE304', 'FAC006', 'Transportation Engineering Assignment', 'Assignment for Transportation Engineering', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(41, 'CE305_ASG_7', 'CE305', 'FAC006', 'Environmental Engineering Assignment', 'Assignment for Environmental Engineering', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(42, 'CE306_ASG_7', 'CE306', 'FAC006', 'Construction Management Assignment', 'Assignment for Construction Management', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(43, 'IT301_ASG_8', 'IT301', 'FAC003', 'System Analysis and Design Assignment', 'Assignment for System Analysis and Design', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(44, 'IT302_ASG_8', 'IT302', 'FAC003', 'Network Security Assignment', 'Assignment for Network Security', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(45, 'IT303_ASG_8', 'IT303', 'FAC003', 'Mobile Application Development Assignment', 'Assignment for Mobile Application Development', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(46, 'IT304_ASG_8', 'IT304', 'FAC003', 'Cloud Computing Assignment', 'Assignment for Cloud Computing', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(47, 'IT305_ASG_8', 'IT305', 'FAC003', 'Data Mining Assignment', 'Assignment for Data Mining', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(48, 'IT306_ASG_8', 'IT306', 'FAC003', 'Internet of Things Assignment', 'Assignment for Internet of Things', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(49, 'EC301_ASG_9', 'EC301', 'FAC004', 'Digital Signal Processing Assignment', 'Assignment for Digital Signal Processing', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(50, 'EC302_ASG_9', 'EC302', 'FAC004', 'Microprocessors Assignment', 'Assignment for Microprocessors', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(51, 'EC303_ASG_9', 'EC303', 'FAC004', 'Communication Systems Assignment', 'Assignment for Communication Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:49'),
(52, 'EC304_ASG_9', 'EC304', 'FAC004', 'VLSI Design Assignment', 'Assignment for VLSI Design', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:50'),
(53, 'EC305_ASG_9', 'EC305', 'FAC004', 'Embedded Systems Assignment', 'Assignment for Embedded Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:50'),
(54, 'EC306_ASG_9', 'EC306', 'FAC004', 'Control Systems Assignment', 'Assignment for Control Systems', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:50'),
(55, 'ME301_ASG_10', 'ME301', 'FAC005', 'Thermodynamics Assignment', 'Assignment for Thermodynamics', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:50'),
(56, 'ME302_ASG_10', 'ME302', 'FAC005', 'Fluid Mechanics Assignment', 'Assignment for Fluid Mechanics', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:50'),
(57, 'ME303_ASG_10', 'ME303', 'FAC005', 'Machine Design Assignment', 'Assignment for Machine Design', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:50'),
(58, 'ME304_ASG_10', 'ME304', 'FAC005', 'Manufacturing Processes Assignment', 'Assignment for Manufacturing Processes', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:50'),
(59, 'ME305_ASG_10', 'ME305', 'FAC005', 'Heat Transfer Assignment', 'Assignment for Heat Transfer', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:50'),
(60, 'ME306_ASG_10', 'ME306', 'FAC005', 'Automobile Engineering Assignment', 'Assignment for Automobile Engineering', '2024-03-15 00:00:00', 100, 'individual', NULL, '2025-12-13 07:27:50');

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

--
-- Dumping data for table `assignment_submissions`
--

INSERT INTO `assignment_submissions` (`id`, `assignment_id`, `student_id`, `submission_text`, `file_path`, `submitted_at`, `marks_obtained`, `feedback`, `status`) VALUES
(1, 'CS301_ASG_1', 'SIMATS2021001', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:46', 63, NULL, 'graded'),
(2, 'CS302_ASG_1', 'SIMATS2021001', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:46', 85, NULL, 'graded'),
(3, 'CS303_ASG_1', 'SIMATS2021001', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:46', 92, NULL, 'graded'),
(4, 'CS304_ASG_1', 'SIMATS2021001', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:46', 69, NULL, 'graded'),
(5, 'CS305_ASG_1', 'SIMATS2021001', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:46', 73, NULL, 'graded'),
(6, 'CS306_ASG_1', 'SIMATS2021001', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:46', 82, NULL, 'graded'),
(7, 'CS301_ASG_2', 'SIMATS2021002', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 81, NULL, 'graded'),
(8, 'CS302_ASG_2', 'SIMATS2021002', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 72, NULL, 'graded'),
(9, 'CS303_ASG_2', 'SIMATS2021002', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 74, NULL, 'graded'),
(10, 'CS304_ASG_2', 'SIMATS2021002', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 78, NULL, 'graded'),
(11, 'CS305_ASG_2', 'SIMATS2021002', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 93, NULL, 'graded'),
(12, 'CS306_ASG_2', 'SIMATS2021002', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 74, NULL, 'graded'),
(13, 'IT301_ASG_3', 'SIMATS2021003', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 60, NULL, 'graded'),
(14, 'IT302_ASG_3', 'SIMATS2021003', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 94, NULL, 'graded'),
(15, 'IT303_ASG_3', 'SIMATS2021003', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 63, NULL, 'graded'),
(16, 'IT304_ASG_3', 'SIMATS2021003', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 92, NULL, 'graded'),
(17, 'IT305_ASG_3', 'SIMATS2021003', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 79, NULL, 'graded'),
(18, 'IT306_ASG_3', 'SIMATS2021003', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 89, NULL, 'graded'),
(19, 'EC301_ASG_4', 'SIMATS2021004', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:47', 80, NULL, 'graded'),
(20, 'EC302_ASG_4', 'SIMATS2021004', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 64, NULL, 'graded'),
(21, 'EC303_ASG_4', 'SIMATS2021004', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 87, NULL, 'graded'),
(22, 'EC304_ASG_4', 'SIMATS2021004', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 68, NULL, 'graded'),
(23, 'EC305_ASG_4', 'SIMATS2021004', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 78, NULL, 'graded'),
(24, 'EC306_ASG_4', 'SIMATS2021004', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 80, NULL, 'graded'),
(25, 'ME301_ASG_5', 'SIMATS2021005', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 71, NULL, 'graded'),
(26, 'ME302_ASG_5', 'SIMATS2021005', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 65, NULL, 'graded'),
(27, 'ME303_ASG_5', 'SIMATS2021005', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 85, NULL, 'graded'),
(28, 'ME304_ASG_5', 'SIMATS2021005', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 66, NULL, 'graded'),
(29, 'ME305_ASG_5', 'SIMATS2021005', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 78, NULL, 'graded'),
(30, 'ME306_ASG_5', 'SIMATS2021005', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 84, NULL, 'graded'),
(31, 'CS301_ASG_6', 'SIMATS2021006', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 92, NULL, 'graded'),
(32, 'CS302_ASG_6', 'SIMATS2021006', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 80, NULL, 'graded'),
(33, 'CS303_ASG_6', 'SIMATS2021006', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 84, NULL, 'graded'),
(34, 'CS304_ASG_6', 'SIMATS2021006', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 76, NULL, 'graded'),
(35, 'CS305_ASG_6', 'SIMATS2021006', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 85, NULL, 'graded'),
(36, 'CS306_ASG_6', 'SIMATS2021006', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:48', 74, NULL, 'graded'),
(37, 'CE301_ASG_7', 'SIMATS2021007', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 79, NULL, 'graded'),
(38, 'CE302_ASG_7', 'SIMATS2021007', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 71, NULL, 'graded'),
(39, 'CE303_ASG_7', 'SIMATS2021007', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 67, NULL, 'graded'),
(40, 'CE304_ASG_7', 'SIMATS2021007', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 72, NULL, 'graded'),
(41, 'CE305_ASG_7', 'SIMATS2021007', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 91, NULL, 'graded'),
(42, 'CE306_ASG_7', 'SIMATS2021007', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 87, NULL, 'graded'),
(43, 'IT301_ASG_8', 'SIMATS2021008', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 85, NULL, 'graded'),
(44, 'IT302_ASG_8', 'SIMATS2021008', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 77, NULL, 'graded'),
(45, 'IT303_ASG_8', 'SIMATS2021008', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 75, NULL, 'graded'),
(46, 'IT304_ASG_8', 'SIMATS2021008', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 65, NULL, 'graded'),
(47, 'IT305_ASG_8', 'SIMATS2021008', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 70, NULL, 'graded'),
(48, 'IT306_ASG_8', 'SIMATS2021008', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 81, NULL, 'graded'),
(49, 'EC301_ASG_9', 'SIMATS2021009', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 79, NULL, 'graded'),
(50, 'EC302_ASG_9', 'SIMATS2021009', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 60, NULL, 'graded'),
(51, 'EC303_ASG_9', 'SIMATS2021009', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:49', 90, NULL, 'graded'),
(52, 'EC304_ASG_9', 'SIMATS2021009', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:50', 63, NULL, 'graded'),
(53, 'EC305_ASG_9', 'SIMATS2021009', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:50', 76, NULL, 'graded'),
(54, 'EC306_ASG_9', 'SIMATS2021009', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:50', 88, NULL, 'graded'),
(55, 'ME301_ASG_10', 'SIMATS2021010', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:50', 82, NULL, 'graded'),
(56, 'ME302_ASG_10', 'SIMATS2021010', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:50', 93, NULL, 'graded'),
(57, 'ME303_ASG_10', 'SIMATS2021010', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:50', 94, NULL, 'graded'),
(58, 'ME304_ASG_10', 'SIMATS2021010', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:50', 72, NULL, 'graded'),
(59, 'ME305_ASG_10', 'SIMATS2021010', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:50', 86, NULL, 'graded'),
(60, 'ME306_ASG_10', 'SIMATS2021010', 'Assignment submitted successfully', NULL, '2025-12-13 07:27:50', 85, NULL, 'graded');

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
(5, 'SIMATS2021001', 'CS301', 'FAC001', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(6, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(7, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(8, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(9, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(10, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(11, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(12, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(13, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(14, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(15, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(16, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(17, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(18, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(19, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(20, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(21, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(22, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(23, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(24, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(25, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(26, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(27, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(28, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(29, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(30, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(31, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(32, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(33, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(34, 'SIMATS2021001', 'CS301', 'FAC001', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(35, 'SIMATS2021001', 'CS302', 'FAC002', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(36, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(37, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(38, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(39, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(40, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(41, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(42, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(43, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(44, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(45, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(46, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(47, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(48, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(49, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(50, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(51, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(52, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(53, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(54, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(55, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(56, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(57, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(58, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(59, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(60, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(61, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(62, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(63, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(64, 'SIMATS2021001', 'CS302', 'FAC002', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(65, 'SIMATS2021001', 'CS303', 'FAC001', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(66, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(67, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(68, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(69, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(70, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(71, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(72, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(73, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(74, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(75, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(76, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(77, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(78, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(79, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(80, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(81, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(82, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(83, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(84, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(85, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(86, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(87, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(88, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(89, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(90, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(91, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(92, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(93, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(94, 'SIMATS2021001', 'CS303', 'FAC001', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(95, 'SIMATS2021001', 'CS304', 'FAC002', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(96, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(97, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(98, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(99, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(100, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(101, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(102, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(103, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(104, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(105, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(106, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(107, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(108, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(109, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(110, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(111, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(112, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(113, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(114, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(115, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(116, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(117, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(118, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(119, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(120, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(121, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(122, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-27', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(123, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(124, 'SIMATS2021001', 'CS304', 'FAC002', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(125, 'SIMATS2021001', 'CS305', 'FAC001', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(126, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(127, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(128, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(129, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(130, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(131, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(132, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(133, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(134, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(135, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(136, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(137, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(138, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(139, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(140, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(141, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(142, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(143, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(144, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(145, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(146, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(147, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(148, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(149, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(150, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(151, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(152, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(153, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(154, 'SIMATS2021001', 'CS305', 'FAC001', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(155, 'SIMATS2021001', 'CS306', 'FAC002', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(156, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(157, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(158, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(159, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(160, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(161, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(162, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(163, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(164, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(165, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(166, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(167, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(168, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(169, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(170, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(171, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(172, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(173, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(174, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(175, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(176, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(177, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(178, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(179, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(180, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:46'),
(181, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(182, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(183, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(184, 'SIMATS2021001', 'CS306', 'FAC002', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:46'),
(185, 'SIMATS2021002', 'CS301', 'FAC001', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(186, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(187, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(188, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(189, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(190, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(191, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(192, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(193, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(194, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(195, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(196, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(197, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(198, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(199, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(200, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(201, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(202, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(203, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(204, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(205, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(206, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(207, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-22', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(208, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(209, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(210, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(211, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(212, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(213, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(214, 'SIMATS2021002', 'CS301', 'FAC001', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(215, 'SIMATS2021002', 'CS302', 'FAC002', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(216, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(217, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(218, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(219, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(220, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(221, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(222, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(223, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(224, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(225, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(226, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(227, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(228, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(229, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(230, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(231, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(232, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(233, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(234, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(235, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(236, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(237, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(238, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(239, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(240, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(241, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(242, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(243, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(244, 'SIMATS2021002', 'CS302', 'FAC002', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(245, 'SIMATS2021002', 'CS303', 'FAC001', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(246, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(247, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(248, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(249, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(250, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(251, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(252, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(253, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(254, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(255, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(256, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(257, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(258, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(259, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(260, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(261, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(262, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(263, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(264, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(265, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(266, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(267, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(268, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(269, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(270, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(271, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(272, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(273, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(274, 'SIMATS2021002', 'CS303', 'FAC001', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(275, 'SIMATS2021002', 'CS304', 'FAC002', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(276, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(277, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(278, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(279, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(280, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(281, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(282, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(283, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(284, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(285, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(286, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(287, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(288, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(289, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(290, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(291, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(292, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(293, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(294, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(295, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(296, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(297, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(298, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(299, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(300, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(301, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(302, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(303, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(304, 'SIMATS2021002', 'CS304', 'FAC002', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(305, 'SIMATS2021002', 'CS305', 'FAC001', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(306, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(307, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(308, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(309, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(310, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(311, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(312, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(313, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(314, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(315, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(316, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(317, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(318, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(319, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(320, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(321, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(322, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(323, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(324, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(325, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(326, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(327, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(328, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(329, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(330, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(331, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(332, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(333, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(334, 'SIMATS2021002', 'CS305', 'FAC001', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(335, 'SIMATS2021002', 'CS306', 'FAC002', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(336, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(337, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(338, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(339, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(340, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(341, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(342, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(343, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(344, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(345, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(346, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(347, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(348, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(349, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(350, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(351, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(352, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(353, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(354, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(355, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(356, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(357, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(358, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(359, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(360, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(361, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(362, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(363, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(364, 'SIMATS2021002', 'CS306', 'FAC002', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(365, 'SIMATS2021003', 'IT301', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(366, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(367, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(368, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(369, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(370, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(371, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(372, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(373, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(374, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(375, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(376, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(377, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(378, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(379, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(380, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(381, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(382, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(383, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(384, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(385, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(386, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(387, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(388, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(389, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(390, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(391, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(392, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(393, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(394, 'SIMATS2021003', 'IT301', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(395, 'SIMATS2021003', 'IT302', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(396, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(397, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(398, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(399, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(400, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(401, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(402, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(403, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(404, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(405, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(406, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(407, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(408, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(409, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(410, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(411, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(412, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(413, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(414, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(415, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(416, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(417, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(418, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(419, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(420, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(421, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(422, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-27', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(423, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(424, 'SIMATS2021003', 'IT302', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(425, 'SIMATS2021003', 'IT303', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(426, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(427, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(428, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(429, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(430, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(431, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(432, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(433, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(434, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(435, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(436, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(437, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(438, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(439, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(440, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(441, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(442, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(443, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(444, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(445, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(446, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(447, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(448, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(449, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(450, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(451, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(452, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(453, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(454, 'SIMATS2021003', 'IT303', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(455, 'SIMATS2021003', 'IT304', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(456, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(457, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(458, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(459, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(460, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(461, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(462, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(463, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(464, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(465, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(466, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(467, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(468, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(469, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(470, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(471, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(472, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(473, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(474, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(475, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47');
INSERT INTO `attendance` (`id`, `student_id`, `course_code`, `faculty_id`, `date`, `status`, `session_type`, `remarks`, `marked_at`) VALUES
(476, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(477, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(478, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(479, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(480, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(481, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(482, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-27', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(483, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(484, 'SIMATS2021003', 'IT304', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(485, 'SIMATS2021003', 'IT305', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(486, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(487, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(488, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(489, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(490, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(491, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(492, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(493, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(494, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(495, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(496, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(497, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(498, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(499, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(500, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(501, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(502, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(503, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(504, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(505, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(506, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(507, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(508, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(509, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(510, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(511, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(512, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(513, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(514, 'SIMATS2021003', 'IT305', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(515, 'SIMATS2021003', 'IT306', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(516, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(517, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(518, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(519, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(520, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(521, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(522, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(523, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(524, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(525, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(526, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(527, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(528, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(529, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(530, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(531, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(532, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(533, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(534, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(535, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(536, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(537, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(538, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(539, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(540, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(541, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(542, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(543, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(544, 'SIMATS2021003', 'IT306', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(545, 'SIMATS2021004', 'EC301', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(546, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(547, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(548, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(549, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(550, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(551, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(552, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(553, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(554, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(555, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(556, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(557, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(558, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(559, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(560, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(561, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(562, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(563, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(564, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(565, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(566, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(567, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(568, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(569, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(570, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(571, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(572, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(573, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(574, 'SIMATS2021004', 'EC301', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:47'),
(575, 'SIMATS2021004', 'EC302', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(576, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:47'),
(577, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(578, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(579, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(580, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(581, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(582, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(583, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(584, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(585, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(586, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(587, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(588, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(589, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(590, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(591, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(592, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(593, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(594, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(595, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(596, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(597, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(598, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(599, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(600, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(601, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(602, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(603, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(604, 'SIMATS2021004', 'EC302', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(605, 'SIMATS2021004', 'EC303', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(606, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(607, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(608, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(609, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(610, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(611, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(612, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(613, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(614, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(615, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(616, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(617, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(618, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(619, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(620, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(621, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(622, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(623, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(624, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(625, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(626, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(627, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(628, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(629, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(630, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(631, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(632, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(633, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(634, 'SIMATS2021004', 'EC303', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(635, 'SIMATS2021004', 'EC304', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(636, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(637, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(638, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(639, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(640, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(641, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(642, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(643, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(644, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(645, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(646, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(647, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(648, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(649, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(650, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(651, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(652, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(653, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(654, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(655, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(656, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(657, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(658, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(659, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(660, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(661, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(662, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(663, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(664, 'SIMATS2021004', 'EC304', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(665, 'SIMATS2021004', 'EC305', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(666, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(667, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(668, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(669, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(670, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(671, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(672, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(673, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(674, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(675, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(676, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(677, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(678, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(679, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(680, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(681, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(682, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(683, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(684, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(685, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(686, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(687, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(688, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(689, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(690, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(691, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(692, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(693, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(694, 'SIMATS2021004', 'EC305', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(695, 'SIMATS2021004', 'EC306', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(696, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(697, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(698, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(699, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(700, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(701, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(702, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(703, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(704, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(705, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(706, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(707, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(708, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(709, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(710, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(711, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(712, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(713, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(714, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(715, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(716, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(717, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(718, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(719, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(720, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(721, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(722, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-27', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(723, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(724, 'SIMATS2021004', 'EC306', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(725, 'SIMATS2021005', 'ME301', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(726, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(727, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(728, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(729, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(730, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(731, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(732, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(733, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(734, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(735, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(736, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(737, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(738, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(739, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(740, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(741, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(742, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(743, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(744, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(745, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(746, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(747, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(748, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(749, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(750, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(751, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(752, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-27', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(753, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(754, 'SIMATS2021005', 'ME301', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(755, 'SIMATS2021005', 'ME302', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(756, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(757, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(758, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(759, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(760, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(761, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(762, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(763, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(764, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(765, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(766, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(767, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(768, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(769, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(770, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(771, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(772, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(773, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(774, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(775, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(776, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(777, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(778, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(779, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(780, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(781, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(782, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(783, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(784, 'SIMATS2021005', 'ME302', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(785, 'SIMATS2021005', 'ME303', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(786, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(787, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(788, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(789, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(790, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(791, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(792, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(793, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(794, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(795, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(796, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(797, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(798, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(799, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(800, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(801, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(802, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(803, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(804, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(805, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(806, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(807, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(808, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(809, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(810, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(811, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(812, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(813, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(814, 'SIMATS2021005', 'ME303', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(815, 'SIMATS2021005', 'ME304', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(816, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(817, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(818, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(819, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(820, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(821, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(822, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(823, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(824, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(825, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(826, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(827, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(828, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(829, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(830, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(831, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(832, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(833, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(834, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(835, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(836, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(837, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(838, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(839, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(840, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(841, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(842, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(843, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(844, 'SIMATS2021005', 'ME304', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(845, 'SIMATS2021005', 'ME305', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(846, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(847, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(848, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(849, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(850, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(851, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(852, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(853, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(854, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(855, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(856, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(857, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(858, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(859, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(860, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(861, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(862, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(863, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(864, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(865, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(866, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(867, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-22', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(868, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(869, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(870, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(871, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(872, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(873, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(874, 'SIMATS2021005', 'ME305', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(875, 'SIMATS2021005', 'ME306', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(876, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(877, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(878, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(879, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(880, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(881, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(882, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(883, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(884, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(885, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(886, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(887, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(888, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(889, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(890, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(891, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(892, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(893, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(894, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(895, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(896, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(897, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(898, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(899, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(900, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(901, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(902, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(903, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(904, 'SIMATS2021005', 'ME306', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(905, 'SIMATS2021006', 'CS301', 'FAC001', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(906, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(907, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(908, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(909, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(910, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(911, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(912, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(913, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(914, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(915, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(916, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(917, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(918, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(919, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(920, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(921, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(922, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(923, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(924, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(925, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(926, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(927, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(928, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(929, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(930, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(931, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(932, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(933, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(934, 'SIMATS2021006', 'CS301', 'FAC001', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(935, 'SIMATS2021006', 'CS302', 'FAC002', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(936, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(937, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(938, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(939, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(940, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(941, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(942, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(943, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(944, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(945, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(946, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48');
INSERT INTO `attendance` (`id`, `student_id`, `course_code`, `faculty_id`, `date`, `status`, `session_type`, `remarks`, `marked_at`) VALUES
(947, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(948, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(949, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(950, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(951, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(952, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(953, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(954, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(955, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(956, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(957, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(958, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(959, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(960, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(961, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(962, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(963, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(964, 'SIMATS2021006', 'CS302', 'FAC002', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(965, 'SIMATS2021006', 'CS303', 'FAC001', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(966, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(967, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(968, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(969, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(970, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(971, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(972, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(973, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(974, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(975, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(976, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(977, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(978, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(979, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(980, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(981, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(982, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(983, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(984, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(985, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(986, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(987, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-22', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(988, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(989, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(990, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(991, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(992, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(993, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(994, 'SIMATS2021006', 'CS303', 'FAC001', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(995, 'SIMATS2021006', 'CS304', 'FAC002', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(996, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(997, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(998, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(999, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1000, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1001, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1002, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1003, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1004, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1005, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1006, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1007, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1008, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1009, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1010, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1011, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1012, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1013, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1014, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1015, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1016, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1017, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1018, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1019, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1020, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1021, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1022, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1023, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1024, 'SIMATS2021006', 'CS304', 'FAC002', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1025, 'SIMATS2021006', 'CS305', 'FAC001', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1026, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1027, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1028, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1029, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1030, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1031, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1032, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1033, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1034, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1035, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1036, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1037, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1038, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1039, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1040, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1041, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1042, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1043, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1044, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1045, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1046, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1047, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-22', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1048, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1049, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1050, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1051, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1052, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1053, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1054, 'SIMATS2021006', 'CS305', 'FAC001', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1055, 'SIMATS2021006', 'CS306', 'FAC002', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1056, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1057, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1058, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1059, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1060, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1061, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1062, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1063, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1064, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1065, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1066, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1067, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1068, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1069, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1070, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1071, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1072, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1073, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1074, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1075, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1076, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:48'),
(1077, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-22', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1078, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1079, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1080, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1081, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1082, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1083, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1084, 'SIMATS2021006', 'CS306', 'FAC002', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:48'),
(1085, 'SIMATS2021007', 'CE301', 'FAC006', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1086, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1087, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1088, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1089, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1090, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1091, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1092, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1093, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1094, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1095, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1096, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1097, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1098, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1099, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1100, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1101, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1102, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1103, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1104, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1105, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1106, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1107, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1108, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1109, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1110, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1111, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1112, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1113, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1114, 'SIMATS2021007', 'CE301', 'FAC006', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1115, 'SIMATS2021007', 'CE302', 'FAC006', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1116, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1117, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1118, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1119, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1120, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1121, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1122, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1123, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1124, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1125, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1126, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1127, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1128, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1129, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1130, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1131, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1132, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1133, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1134, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1135, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1136, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1137, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1138, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1139, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1140, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1141, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1142, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-27', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1143, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1144, 'SIMATS2021007', 'CE302', 'FAC006', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1145, 'SIMATS2021007', 'CE303', 'FAC006', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1146, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1147, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1148, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1149, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1150, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1151, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1152, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1153, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1154, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1155, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1156, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1157, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1158, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1159, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1160, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1161, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1162, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1163, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1164, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1165, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1166, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1167, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1168, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1169, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1170, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1171, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1172, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1173, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1174, 'SIMATS2021007', 'CE303', 'FAC006', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1175, 'SIMATS2021007', 'CE304', 'FAC006', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1176, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1177, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1178, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1179, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1180, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1181, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1182, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1183, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1184, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1185, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1186, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1187, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1188, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1189, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1190, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1191, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1192, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1193, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1194, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1195, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1196, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1197, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1198, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1199, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1200, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1201, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1202, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-27', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1203, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1204, 'SIMATS2021007', 'CE304', 'FAC006', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1205, 'SIMATS2021007', 'CE305', 'FAC006', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1206, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1207, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1208, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1209, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1210, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1211, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1212, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1213, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1214, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1215, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1216, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1217, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1218, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1219, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1220, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1221, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1222, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1223, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1224, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1225, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1226, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1227, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1228, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1229, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1230, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1231, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1232, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1233, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1234, 'SIMATS2021007', 'CE305', 'FAC006', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1235, 'SIMATS2021007', 'CE306', 'FAC006', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1236, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1237, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1238, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1239, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1240, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1241, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1242, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1243, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1244, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1245, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1246, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1247, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1248, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1249, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1250, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1251, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1252, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1253, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1254, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1255, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1256, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1257, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1258, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1259, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1260, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1261, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1262, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1263, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1264, 'SIMATS2021007', 'CE306', 'FAC006', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1265, 'SIMATS2021008', 'IT301', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1266, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1267, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1268, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1269, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1270, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1271, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1272, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1273, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1274, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1275, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1276, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1277, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1278, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1279, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1280, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1281, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1282, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1283, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1284, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1285, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1286, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1287, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1288, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1289, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1290, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1291, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1292, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1293, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1294, 'SIMATS2021008', 'IT301', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1295, 'SIMATS2021008', 'IT302', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1296, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1297, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1298, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1299, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1300, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1301, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1302, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1303, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1304, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1305, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1306, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1307, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1308, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1309, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1310, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1311, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1312, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1313, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1314, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1315, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1316, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1317, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1318, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1319, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1320, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1321, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1322, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1323, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1324, 'SIMATS2021008', 'IT302', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1325, 'SIMATS2021008', 'IT303', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1326, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1327, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1328, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1329, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1330, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1331, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1332, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1333, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1334, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1335, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1336, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1337, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1338, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1339, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1340, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1341, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1342, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1343, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1344, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1345, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1346, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1347, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1348, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1349, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1350, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1351, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1352, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-27', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1353, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1354, 'SIMATS2021008', 'IT303', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1355, 'SIMATS2021008', 'IT304', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1356, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1357, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1358, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1359, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1360, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1361, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1362, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1363, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1364, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1365, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1366, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1367, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1368, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1369, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1370, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1371, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1372, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1373, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1374, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1375, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1376, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1377, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1378, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1379, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1380, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1381, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1382, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1383, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1384, 'SIMATS2021008', 'IT304', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1385, 'SIMATS2021008', 'IT305', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1386, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1387, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1388, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1389, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1390, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1391, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1392, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1393, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1394, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1395, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1396, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1397, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1398, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1399, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1400, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1401, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1402, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1403, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1404, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1405, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1406, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1407, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1408, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1409, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1410, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1411, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1412, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-27', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1413, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49');
INSERT INTO `attendance` (`id`, `student_id`, `course_code`, `faculty_id`, `date`, `status`, `session_type`, `remarks`, `marked_at`) VALUES
(1414, 'SIMATS2021008', 'IT305', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1415, 'SIMATS2021008', 'IT306', 'FAC003', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1416, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1417, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1418, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1419, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1420, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1421, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1422, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1423, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1424, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1425, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1426, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1427, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1428, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1429, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1430, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1431, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1432, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1433, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1434, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1435, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1436, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1437, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1438, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1439, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1440, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1441, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1442, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1443, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1444, 'SIMATS2021008', 'IT306', 'FAC003', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1445, 'SIMATS2021009', 'EC301', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1446, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1447, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1448, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1449, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1450, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1451, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1452, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1453, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1454, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1455, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1456, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1457, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1458, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1459, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1460, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1461, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1462, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1463, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1464, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1465, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1466, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1467, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1468, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1469, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1470, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1471, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1472, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1473, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1474, 'SIMATS2021009', 'EC301', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1475, 'SIMATS2021009', 'EC302', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1476, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1477, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1478, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1479, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1480, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1481, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1482, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1483, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1484, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1485, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1486, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1487, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1488, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1489, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1490, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1491, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1492, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1493, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1494, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1495, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1496, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1497, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1498, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1499, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1500, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1501, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1502, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1503, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1504, 'SIMATS2021009', 'EC302', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1505, 'SIMATS2021009', 'EC303', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1506, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1507, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1508, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1509, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1510, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1511, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1512, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1513, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1514, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1515, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1516, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1517, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1518, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1519, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1520, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1521, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1522, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1523, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1524, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1525, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1526, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1527, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1528, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1529, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1530, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1531, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1532, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1533, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1534, 'SIMATS2021009', 'EC303', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1535, 'SIMATS2021009', 'EC304', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1536, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1537, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1538, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1539, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1540, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1541, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1542, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1543, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1544, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1545, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1546, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1547, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1548, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1549, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1550, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1551, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1552, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1553, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1554, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1555, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1556, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1557, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1558, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1559, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:49'),
(1560, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1561, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1562, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1563, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:49'),
(1564, 'SIMATS2021009', 'EC304', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1565, 'SIMATS2021009', 'EC305', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1566, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1567, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1568, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1569, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1570, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1571, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1572, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1573, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1574, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1575, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1576, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1577, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1578, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1579, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1580, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1581, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1582, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1583, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1584, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1585, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1586, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1587, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1588, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1589, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1590, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1591, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1592, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1593, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1594, 'SIMATS2021009', 'EC305', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1595, 'SIMATS2021009', 'EC306', 'FAC004', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1596, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1597, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1598, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1599, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1600, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1601, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1602, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1603, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1604, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1605, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1606, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1607, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1608, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1609, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1610, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1611, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1612, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1613, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1614, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1615, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1616, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1617, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1618, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1619, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1620, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1621, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1622, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1623, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1624, 'SIMATS2021009', 'EC306', 'FAC004', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1625, 'SIMATS2021010', 'ME301', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1626, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1627, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1628, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1629, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1630, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1631, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1632, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1633, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1634, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1635, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1636, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1637, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1638, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1639, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1640, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1641, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1642, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1643, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1644, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1645, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1646, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1647, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1648, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1649, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1650, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1651, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1652, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1653, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1654, 'SIMATS2021010', 'ME301', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1655, 'SIMATS2021010', 'ME302', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1656, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1657, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1658, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1659, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1660, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1661, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1662, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1663, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1664, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1665, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1666, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1667, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1668, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1669, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1670, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1671, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1672, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1673, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1674, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1675, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1676, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1677, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1678, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1679, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1680, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1681, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1682, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1683, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1684, 'SIMATS2021010', 'ME302', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1685, 'SIMATS2021010', 'ME303', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1686, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1687, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1688, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1689, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1690, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1691, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1692, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1693, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1694, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1695, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1696, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1697, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1698, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1699, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1700, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1701, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1702, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1703, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1704, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1705, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1706, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1707, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1708, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1709, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1710, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1711, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1712, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1713, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1714, 'SIMATS2021010', 'ME303', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1715, 'SIMATS2021010', 'ME304', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1716, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1717, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1718, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1719, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1720, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1721, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1722, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1723, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1724, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1725, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1726, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1727, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1728, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1729, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1730, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1731, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1732, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1733, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1734, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1735, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1736, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1737, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1738, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1739, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1740, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1741, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1742, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-27', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1743, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1744, 'SIMATS2021010', 'ME304', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1745, 'SIMATS2021010', 'ME305', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1746, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1747, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1748, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1749, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1750, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1751, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1752, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1753, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1754, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1755, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1756, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1757, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1758, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1759, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1760, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1761, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1762, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1763, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1764, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1765, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1766, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1767, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1768, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-23', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1769, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-24', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1770, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-25', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1771, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-26', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1772, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1773, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1774, 'SIMATS2021010', 'ME305', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1775, 'SIMATS2021010', 'ME306', 'FAC005', '2023-12-31', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1776, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-01', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1777, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-02', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1778, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-03', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1779, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-04', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1780, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-05', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1781, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-06', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1782, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-07', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1783, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-08', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1784, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-09', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1785, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-10', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1786, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-11', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1787, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-12', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1788, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-13', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1789, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-14', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1790, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-15', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1791, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-16', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1792, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-17', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1793, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-18', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1794, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-19', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1795, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-20', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1796, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-21', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1797, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-22', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1798, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-23', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1799, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-24', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1800, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-25', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1801, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-26', 'present', 'lecture', NULL, '2025-12-13 07:27:50'),
(1802, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-27', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1803, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-28', 'absent', 'lecture', NULL, '2025-12-13 07:27:50'),
(1804, 'SIMATS2021010', 'ME306', 'FAC005', '2024-01-29', 'absent', 'lecture', NULL, '2025-12-13 07:27:50');

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
  `description` text DEFAULT NULL,
  `syllabus` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_code`, `course_name`, `department`, `credits`, `semester`, `year`, `course_type`, `description`, `syllabus`, `created_at`) VALUES
(6, 'CS301', 'Data Structures and Algorithms', 'Computer Science', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(7, 'CS302', 'Database Management Systems', 'Computer Science', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(8, 'CS303', 'Web Development', 'Computer Science', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(9, 'CS304', 'Operating Systems', 'Computer Science', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(10, 'CS305', 'Computer Networks', 'Computer Science', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(11, 'CS306', 'Software Engineering', 'Computer Science', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(12, 'IT301', 'System Analysis and Design', 'Information Technology', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(13, 'IT302', 'Network Security', 'Information Technology', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(14, 'IT303', 'Mobile Application Development', 'Information Technology', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(15, 'IT304', 'Cloud Computing', 'Information Technology', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(16, 'IT305', 'Data Mining', 'Information Technology', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(17, 'IT306', 'Internet of Things', 'Information Technology', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(18, 'EC301', 'Digital Signal Processing', 'Electronics', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(19, 'EC302', 'Microprocessors', 'Electronics', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(20, 'EC303', 'Communication Systems', 'Electronics', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(21, 'EC304', 'VLSI Design', 'Electronics', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(22, 'EC305', 'Embedded Systems', 'Electronics', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(23, 'EC306', 'Control Systems', 'Electronics', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(24, 'ME301', 'Thermodynamics', 'Mechanical', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(25, 'ME302', 'Fluid Mechanics', 'Mechanical', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(26, 'ME303', 'Machine Design', 'Mechanical', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(27, 'ME304', 'Manufacturing Processes', 'Mechanical', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(28, 'ME305', 'Heat Transfer', 'Mechanical', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(29, 'ME306', 'Automobile Engineering', 'Mechanical', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(30, 'CE301', 'Structural Analysis', 'Civil', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(31, 'CE302', 'Concrete Technology', 'Civil', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(32, 'CE303', 'Geotechnical Engineering', 'Civil', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(33, 'CE304', 'Transportation Engineering', 'Civil', 4, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(34, 'CE305', 'Environmental Engineering', 'Civil', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45'),
(35, 'CE306', 'Construction Management', 'Civil', 3, 6, 3, 'core', NULL, NULL, '2025-12-13 07:27:45');

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

--
-- Dumping data for table `course_feedback`
--

INSERT INTO `course_feedback` (`id`, `student_id`, `course_code`, `faculty_id`, `rating`, `teaching_quality`, `course_content`, `assignments_quality`, `comments`, `feedback_date`) VALUES
(1, 'SIMATS2021001', 'CS302', 'FAC001', 5, 5, 4, 4, 'Good course content and teaching methodology', '2025-12-13'),
(2, 'SIMATS2021001', 'CS303', 'FAC001', 5, 5, 5, 4, 'Good course content and teaching methodology', '2025-12-13'),
(3, 'SIMATS2021001', 'CS304', 'FAC001', 4, 5, 5, 4, 'Good course content and teaching methodology', '2025-12-13'),
(4, 'SIMATS2021002', 'CS301', 'FAC001', 4, 4, 5, 4, 'Good course content and teaching methodology', '2025-12-13'),
(5, 'SIMATS2021002', 'CS303', 'FAC001', 4, 5, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(6, 'SIMATS2021002', 'CS304', 'FAC001', 5, 4, 5, 5, 'Good course content and teaching methodology', '2025-12-13'),
(7, 'SIMATS2021002', 'CS306', 'FAC001', 5, 4, 4, 4, 'Good course content and teaching methodology', '2025-12-13'),
(8, 'SIMATS2021003', 'IT301', 'FAC003', 5, 4, 5, 5, 'Good course content and teaching methodology', '2025-12-13'),
(9, 'SIMATS2021003', 'IT303', 'FAC003', 4, 4, 5, 5, 'Good course content and teaching methodology', '2025-12-13'),
(10, 'SIMATS2021003', 'IT306', 'FAC003', 4, 4, 5, 4, 'Good course content and teaching methodology', '2025-12-13'),
(11, 'SIMATS2021004', 'EC301', 'FAC004', 4, 5, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(12, 'SIMATS2021004', 'EC304', 'FAC004', 4, 5, 4, 4, 'Good course content and teaching methodology', '2025-12-13'),
(13, 'SIMATS2021005', 'ME301', 'FAC005', 4, 5, 5, 4, 'Good course content and teaching methodology', '2025-12-13'),
(14, 'SIMATS2021005', 'ME302', 'FAC005', 5, 5, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(15, 'SIMATS2021005', 'ME304', 'FAC005', 4, 4, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(16, 'SIMATS2021005', 'ME306', 'FAC005', 5, 5, 5, 4, 'Good course content and teaching methodology', '2025-12-13'),
(17, 'SIMATS2021006', 'CS302', 'FAC001', 5, 4, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(18, 'SIMATS2021006', 'CS303', 'FAC001', 4, 5, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(19, 'SIMATS2021006', 'CS304', 'FAC001', 5, 5, 5, 4, 'Good course content and teaching methodology', '2025-12-13'),
(20, 'SIMATS2021006', 'CS305', 'FAC001', 4, 4, 4, 4, 'Good course content and teaching methodology', '2025-12-13'),
(21, 'SIMATS2021006', 'CS306', 'FAC001', 4, 5, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(22, 'SIMATS2021007', 'CE301', 'FAC006', 4, 4, 5, 5, 'Good course content and teaching methodology', '2025-12-13'),
(23, 'SIMATS2021007', 'CE304', 'FAC006', 5, 5, 5, 5, 'Good course content and teaching methodology', '2025-12-13'),
(24, 'SIMATS2021007', 'CE305', 'FAC006', 5, 4, 5, 5, 'Good course content and teaching methodology', '2025-12-13'),
(25, 'SIMATS2021008', 'IT301', 'FAC003', 5, 4, 5, 5, 'Good course content and teaching methodology', '2025-12-13'),
(26, 'SIMATS2021008', 'IT303', 'FAC003', 4, 4, 5, 5, 'Good course content and teaching methodology', '2025-12-13'),
(27, 'SIMATS2021008', 'IT304', 'FAC003', 4, 5, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(28, 'SIMATS2021008', 'IT305', 'FAC003', 5, 5, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(29, 'SIMATS2021009', 'EC301', 'FAC004', 4, 4, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(30, 'SIMATS2021009', 'EC302', 'FAC004', 4, 5, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(31, 'SIMATS2021009', 'EC303', 'FAC004', 5, 4, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(32, 'SIMATS2021009', 'EC304', 'FAC004', 5, 4, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(33, 'SIMATS2021009', 'EC305', 'FAC004', 5, 5, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(34, 'SIMATS2021009', 'EC306', 'FAC004', 5, 5, 4, 4, 'Good course content and teaching methodology', '2025-12-13'),
(35, 'SIMATS2021010', 'ME302', 'FAC005', 4, 4, 5, 4, 'Good course content and teaching methodology', '2025-12-13'),
(36, 'SIMATS2021010', 'ME303', 'FAC005', 4, 4, 4, 4, 'Good course content and teaching methodology', '2025-12-13'),
(37, 'SIMATS2021010', 'ME304', 'FAC005', 4, 5, 5, 4, 'Good course content and teaching methodology', '2025-12-13'),
(38, 'SIMATS2021010', 'ME305', 'FAC005', 4, 4, 4, 5, 'Good course content and teaching methodology', '2025-12-13'),
(39, 'SIMATS2021010', 'ME306', 'FAC005', 4, 4, 5, 4, 'Good course content and teaching methodology', '2025-12-13');

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

--
-- Dumping data for table `disciplinary_actions`
--

INSERT INTO `disciplinary_actions` (`id`, `action_id`, `student_id`, `faculty_id`, `violation_type`, `description`, `action_taken`, `severity`, `date_reported`, `status`) VALUES
(1, 'DA_SIMATS2021001_1', 'SIMATS2021001', 'FAC001', 'Improper conduct', 'Student involved in Improper conduct', 'Warning issued', 'minor', '2025-12-13', 'resolved'),
(2, 'DA_SIMATS2021006_1', 'SIMATS2021006', 'FAC001', 'Improper conduct', 'Student involved in Improper conduct', 'Warning issued', 'minor', '2025-12-13', 'resolved');

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
(4, 'SIMATS2021001', 'CS301', 'FAC001', '2025-12-13', 'enrolled', NULL, NULL),
(5, 'SIMATS2021001', 'CS302', 'FAC002', '2025-12-13', 'enrolled', NULL, NULL),
(6, 'SIMATS2021001', 'CS303', 'FAC001', '2025-12-13', 'enrolled', NULL, NULL),
(7, 'SIMATS2021001', 'CS304', 'FAC002', '2025-12-13', 'enrolled', NULL, NULL),
(8, 'SIMATS2021001', 'CS305', 'FAC001', '2025-12-13', 'enrolled', NULL, NULL),
(9, 'SIMATS2021001', 'CS306', 'FAC002', '2025-12-13', 'enrolled', NULL, NULL),
(10, 'SIMATS2021002', 'CS301', 'FAC001', '2025-12-13', 'enrolled', NULL, NULL),
(11, 'SIMATS2021002', 'CS302', 'FAC002', '2025-12-13', 'enrolled', NULL, NULL),
(12, 'SIMATS2021002', 'CS303', 'FAC001', '2025-12-13', 'enrolled', NULL, NULL),
(13, 'SIMATS2021002', 'CS304', 'FAC002', '2025-12-13', 'enrolled', NULL, NULL),
(14, 'SIMATS2021002', 'CS305', 'FAC001', '2025-12-13', 'enrolled', NULL, NULL),
(15, 'SIMATS2021002', 'CS306', 'FAC002', '2025-12-13', 'enrolled', NULL, NULL),
(16, 'SIMATS2021003', 'IT301', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(17, 'SIMATS2021003', 'IT302', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(18, 'SIMATS2021003', 'IT303', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(19, 'SIMATS2021003', 'IT304', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(20, 'SIMATS2021003', 'IT305', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(21, 'SIMATS2021003', 'IT306', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(22, 'SIMATS2021004', 'EC301', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(23, 'SIMATS2021004', 'EC302', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(24, 'SIMATS2021004', 'EC303', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(25, 'SIMATS2021004', 'EC304', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(26, 'SIMATS2021004', 'EC305', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(27, 'SIMATS2021004', 'EC306', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(28, 'SIMATS2021005', 'ME301', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(29, 'SIMATS2021005', 'ME302', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(30, 'SIMATS2021005', 'ME303', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(31, 'SIMATS2021005', 'ME304', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(32, 'SIMATS2021005', 'ME305', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(33, 'SIMATS2021005', 'ME306', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(34, 'SIMATS2021006', 'CS301', 'FAC001', '2025-12-13', 'enrolled', NULL, NULL),
(35, 'SIMATS2021006', 'CS302', 'FAC002', '2025-12-13', 'enrolled', NULL, NULL),
(36, 'SIMATS2021006', 'CS303', 'FAC001', '2025-12-13', 'enrolled', NULL, NULL),
(37, 'SIMATS2021006', 'CS304', 'FAC002', '2025-12-13', 'enrolled', NULL, NULL),
(38, 'SIMATS2021006', 'CS305', 'FAC001', '2025-12-13', 'enrolled', NULL, NULL),
(39, 'SIMATS2021006', 'CS306', 'FAC002', '2025-12-13', 'enrolled', NULL, NULL),
(40, 'SIMATS2021007', 'CE301', 'FAC006', '2025-12-13', 'enrolled', NULL, NULL),
(41, 'SIMATS2021007', 'CE302', 'FAC006', '2025-12-13', 'enrolled', NULL, NULL),
(42, 'SIMATS2021007', 'CE303', 'FAC006', '2025-12-13', 'enrolled', NULL, NULL),
(43, 'SIMATS2021007', 'CE304', 'FAC006', '2025-12-13', 'enrolled', NULL, NULL),
(44, 'SIMATS2021007', 'CE305', 'FAC006', '2025-12-13', 'enrolled', NULL, NULL),
(45, 'SIMATS2021007', 'CE306', 'FAC006', '2025-12-13', 'enrolled', NULL, NULL),
(46, 'SIMATS2021008', 'IT301', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(47, 'SIMATS2021008', 'IT302', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(48, 'SIMATS2021008', 'IT303', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(49, 'SIMATS2021008', 'IT304', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(50, 'SIMATS2021008', 'IT305', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(51, 'SIMATS2021008', 'IT306', 'FAC003', '2025-12-13', 'enrolled', NULL, NULL),
(52, 'SIMATS2021009', 'EC301', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(53, 'SIMATS2021009', 'EC302', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(54, 'SIMATS2021009', 'EC303', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(55, 'SIMATS2021009', 'EC304', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(56, 'SIMATS2021009', 'EC305', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(57, 'SIMATS2021009', 'EC306', 'FAC004', '2025-12-13', 'enrolled', NULL, NULL),
(58, 'SIMATS2021010', 'ME301', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(59, 'SIMATS2021010', 'ME302', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(60, 'SIMATS2021010', 'ME303', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(61, 'SIMATS2021010', 'ME304', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(62, 'SIMATS2021010', 'ME305', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL),
(63, 'SIMATS2021010', 'ME306', 'FAC005', '2025-12-13', 'enrolled', NULL, NULL);

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

--
-- Dumping data for table `examinations`
--

INSERT INTO `examinations` (`id`, `exam_id`, `course_code`, `exam_name`, `exam_type`, `exam_date`, `start_time`, `duration`, `max_marks`, `venue`, `instructions`, `created_at`) VALUES
(1, 'CS301_EXAM_1', 'CS301', 'Data Structures and Algorithms Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:46'),
(2, 'CS302_EXAM_1', 'CS302', 'Database Management Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:46'),
(3, 'CS303_EXAM_1', 'CS303', 'Web Development Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:46'),
(4, 'CS304_EXAM_1', 'CS304', 'Operating Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:46'),
(5, 'CS305_EXAM_1', 'CS305', 'Computer Networks Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:46'),
(6, 'CS306_EXAM_1', 'CS306', 'Software Engineering Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:46'),
(7, 'CS301_EXAM_2', 'CS301', 'Data Structures and Algorithms Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(8, 'CS302_EXAM_2', 'CS302', 'Database Management Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(9, 'CS303_EXAM_2', 'CS303', 'Web Development Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(10, 'CS304_EXAM_2', 'CS304', 'Operating Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(11, 'CS305_EXAM_2', 'CS305', 'Computer Networks Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(12, 'CS306_EXAM_2', 'CS306', 'Software Engineering Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(13, 'IT301_EXAM_3', 'IT301', 'System Analysis and Design Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(14, 'IT302_EXAM_3', 'IT302', 'Network Security Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(15, 'IT303_EXAM_3', 'IT303', 'Mobile Application Development Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(16, 'IT304_EXAM_3', 'IT304', 'Cloud Computing Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(17, 'IT305_EXAM_3', 'IT305', 'Data Mining Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(18, 'IT306_EXAM_3', 'IT306', 'Internet of Things Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(19, 'EC301_EXAM_4', 'EC301', 'Digital Signal Processing Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:47'),
(20, 'EC302_EXAM_4', 'EC302', 'Microprocessors Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(21, 'EC303_EXAM_4', 'EC303', 'Communication Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(22, 'EC304_EXAM_4', 'EC304', 'VLSI Design Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(23, 'EC305_EXAM_4', 'EC305', 'Embedded Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(24, 'EC306_EXAM_4', 'EC306', 'Control Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(25, 'ME301_EXAM_5', 'ME301', 'Thermodynamics Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(26, 'ME302_EXAM_5', 'ME302', 'Fluid Mechanics Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(27, 'ME303_EXAM_5', 'ME303', 'Machine Design Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(28, 'ME304_EXAM_5', 'ME304', 'Manufacturing Processes Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(29, 'ME305_EXAM_5', 'ME305', 'Heat Transfer Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(30, 'ME306_EXAM_5', 'ME306', 'Automobile Engineering Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(31, 'CS301_EXAM_6', 'CS301', 'Data Structures and Algorithms Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(32, 'CS302_EXAM_6', 'CS302', 'Database Management Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(33, 'CS303_EXAM_6', 'CS303', 'Web Development Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(34, 'CS304_EXAM_6', 'CS304', 'Operating Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(35, 'CS305_EXAM_6', 'CS305', 'Computer Networks Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(36, 'CS306_EXAM_6', 'CS306', 'Software Engineering Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:48'),
(37, 'CE301_EXAM_7', 'CE301', 'Structural Analysis Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(38, 'CE302_EXAM_7', 'CE302', 'Concrete Technology Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(39, 'CE303_EXAM_7', 'CE303', 'Geotechnical Engineering Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(40, 'CE304_EXAM_7', 'CE304', 'Transportation Engineering Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(41, 'CE305_EXAM_7', 'CE305', 'Environmental Engineering Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(42, 'CE306_EXAM_7', 'CE306', 'Construction Management Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(43, 'IT301_EXAM_8', 'IT301', 'System Analysis and Design Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(44, 'IT302_EXAM_8', 'IT302', 'Network Security Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(45, 'IT303_EXAM_8', 'IT303', 'Mobile Application Development Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(46, 'IT304_EXAM_8', 'IT304', 'Cloud Computing Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(47, 'IT305_EXAM_8', 'IT305', 'Data Mining Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(48, 'IT306_EXAM_8', 'IT306', 'Internet of Things Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(49, 'EC301_EXAM_9', 'EC301', 'Digital Signal Processing Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(50, 'EC302_EXAM_9', 'EC302', 'Microprocessors Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(51, 'EC303_EXAM_9', 'EC303', 'Communication Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:49'),
(52, 'EC304_EXAM_9', 'EC304', 'VLSI Design Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:50'),
(53, 'EC305_EXAM_9', 'EC305', 'Embedded Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:50'),
(54, 'EC306_EXAM_9', 'EC306', 'Control Systems Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:50'),
(55, 'ME301_EXAM_10', 'ME301', 'Thermodynamics Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:50'),
(56, 'ME302_EXAM_10', 'ME302', 'Fluid Mechanics Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:50'),
(57, 'ME303_EXAM_10', 'ME303', 'Machine Design Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:50'),
(58, 'ME304_EXAM_10', 'ME304', 'Manufacturing Processes Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:50'),
(59, 'ME305_EXAM_10', 'ME305', 'Heat Transfer Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:50'),
(60, 'ME306_EXAM_10', 'ME306', 'Automobile Engineering Final Exam', 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A', NULL, '2025-12-13 07:27:50');

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

--
-- Dumping data for table `exam_results`
--

INSERT INTO `exam_results` (`id`, `exam_id`, `student_id`, `marks_obtained`, `grade`, `remarks`, `result_date`) VALUES
(1, 'CS301_EXAM_1', 'SIMATS2021001', 75, 'B+', NULL, '2025-12-13'),
(2, 'CS302_EXAM_1', 'SIMATS2021001', 88, 'A', NULL, '2025-12-13'),
(3, 'CS303_EXAM_1', 'SIMATS2021001', 70, 'B+', NULL, '2025-12-13'),
(4, 'CS304_EXAM_1', 'SIMATS2021001', 88, 'A', NULL, '2025-12-13'),
(5, 'CS305_EXAM_1', 'SIMATS2021001', 70, 'B+', NULL, '2025-12-13'),
(6, 'CS306_EXAM_1', 'SIMATS2021001', 79, 'B+', NULL, '2025-12-13'),
(7, 'CS301_EXAM_2', 'SIMATS2021002', 71, 'B+', NULL, '2025-12-13'),
(8, 'CS302_EXAM_2', 'SIMATS2021002', 72, 'B+', NULL, '2025-12-13'),
(9, 'CS303_EXAM_2', 'SIMATS2021002', 79, 'B+', NULL, '2025-12-13'),
(10, 'CS304_EXAM_2', 'SIMATS2021002', 68, 'B', NULL, '2025-12-13'),
(11, 'CS305_EXAM_2', 'SIMATS2021002', 75, 'B+', NULL, '2025-12-13'),
(12, 'CS306_EXAM_2', 'SIMATS2021002', 93, 'A+', NULL, '2025-12-13'),
(13, 'IT301_EXAM_3', 'SIMATS2021003', 76, 'B+', NULL, '2025-12-13'),
(14, 'IT302_EXAM_3', 'SIMATS2021003', 66, 'B', NULL, '2025-12-13'),
(15, 'IT303_EXAM_3', 'SIMATS2021003', 79, 'B+', NULL, '2025-12-13'),
(16, 'IT304_EXAM_3', 'SIMATS2021003', 88, 'A', NULL, '2025-12-13'),
(17, 'IT305_EXAM_3', 'SIMATS2021003', 73, 'B+', NULL, '2025-12-13'),
(18, 'IT306_EXAM_3', 'SIMATS2021003', 90, 'A+', NULL, '2025-12-13'),
(19, 'EC301_EXAM_4', 'SIMATS2021004', 82, 'A', NULL, '2025-12-13'),
(20, 'EC302_EXAM_4', 'SIMATS2021004', 92, 'A+', NULL, '2025-12-13'),
(21, 'EC303_EXAM_4', 'SIMATS2021004', 91, 'A+', NULL, '2025-12-13'),
(22, 'EC304_EXAM_4', 'SIMATS2021004', 94, 'A+', NULL, '2025-12-13'),
(23, 'EC305_EXAM_4', 'SIMATS2021004', 85, 'A', NULL, '2025-12-13'),
(24, 'EC306_EXAM_4', 'SIMATS2021004', 92, 'A+', NULL, '2025-12-13'),
(25, 'ME301_EXAM_5', 'SIMATS2021005', 91, 'A+', NULL, '2025-12-13'),
(26, 'ME302_EXAM_5', 'SIMATS2021005', 94, 'A+', NULL, '2025-12-13'),
(27, 'ME303_EXAM_5', 'SIMATS2021005', 79, 'B+', NULL, '2025-12-13'),
(28, 'ME304_EXAM_5', 'SIMATS2021005', 86, 'A', NULL, '2025-12-13'),
(29, 'ME305_EXAM_5', 'SIMATS2021005', 76, 'B+', NULL, '2025-12-13'),
(30, 'ME306_EXAM_5', 'SIMATS2021005', 73, 'B+', NULL, '2025-12-13'),
(31, 'CS301_EXAM_6', 'SIMATS2021006', 89, 'A', NULL, '2025-12-13'),
(32, 'CS302_EXAM_6', 'SIMATS2021006', 78, 'B+', NULL, '2025-12-13'),
(33, 'CS303_EXAM_6', 'SIMATS2021006', 66, 'B', NULL, '2025-12-13'),
(34, 'CS304_EXAM_6', 'SIMATS2021006', 77, 'B+', NULL, '2025-12-13'),
(35, 'CS305_EXAM_6', 'SIMATS2021006', 93, 'A+', NULL, '2025-12-13'),
(36, 'CS306_EXAM_6', 'SIMATS2021006', 65, 'B', NULL, '2025-12-13'),
(37, 'CE301_EXAM_7', 'SIMATS2021007', 72, 'B+', NULL, '2025-12-13'),
(38, 'CE302_EXAM_7', 'SIMATS2021007', 84, 'A', NULL, '2025-12-13'),
(39, 'CE303_EXAM_7', 'SIMATS2021007', 91, 'A+', NULL, '2025-12-13'),
(40, 'CE304_EXAM_7', 'SIMATS2021007', 81, 'A', NULL, '2025-12-13'),
(41, 'CE305_EXAM_7', 'SIMATS2021007', 68, 'B', NULL, '2025-12-13'),
(42, 'CE306_EXAM_7', 'SIMATS2021007', 68, 'B', NULL, '2025-12-13'),
(43, 'IT301_EXAM_8', 'SIMATS2021008', 93, 'A+', NULL, '2025-12-13'),
(44, 'IT302_EXAM_8', 'SIMATS2021008', 74, 'B+', NULL, '2025-12-13'),
(45, 'IT303_EXAM_8', 'SIMATS2021008', 86, 'A', NULL, '2025-12-13'),
(46, 'IT304_EXAM_8', 'SIMATS2021008', 69, 'B', NULL, '2025-12-13'),
(47, 'IT305_EXAM_8', 'SIMATS2021008', 65, 'B', NULL, '2025-12-13'),
(48, 'IT306_EXAM_8', 'SIMATS2021008', 72, 'B+', NULL, '2025-12-13'),
(49, 'EC301_EXAM_9', 'SIMATS2021009', 88, 'A', NULL, '2025-12-13'),
(50, 'EC302_EXAM_9', 'SIMATS2021009', 67, 'B', NULL, '2025-12-13'),
(51, 'EC303_EXAM_9', 'SIMATS2021009', 73, 'B+', NULL, '2025-12-13'),
(52, 'EC304_EXAM_9', 'SIMATS2021009', 74, 'B+', NULL, '2025-12-13'),
(53, 'EC305_EXAM_9', 'SIMATS2021009', 78, 'B+', NULL, '2025-12-13'),
(54, 'EC306_EXAM_9', 'SIMATS2021009', 76, 'B+', NULL, '2025-12-13'),
(55, 'ME301_EXAM_10', 'SIMATS2021010', 77, 'B+', NULL, '2025-12-13'),
(56, 'ME302_EXAM_10', 'SIMATS2021010', 78, 'B+', NULL, '2025-12-13'),
(57, 'ME303_EXAM_10', 'SIMATS2021010', 71, 'B+', NULL, '2025-12-13'),
(58, 'ME304_EXAM_10', 'SIMATS2021010', 82, 'A', NULL, '2025-12-13'),
(59, 'ME305_EXAM_10', 'SIMATS2021010', 73, 'B+', NULL, '2025-12-13'),
(60, 'ME306_EXAM_10', 'SIMATS2021010', 89, 'A', NULL, '2025-12-13');

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
(2, 'FAC001', 4, 'Computer Science', 'Professor', 'Ph.D', 0, NULL, NULL, NULL),
(3, 'FAC002', 5, 'Computer Science', 'Professor', 'Ph.D', 0, NULL, NULL, NULL),
(4, 'FAC003', 6, 'Information Technology', 'Professor', 'Ph.D', 0, NULL, NULL, NULL),
(5, 'FAC004', 7, 'Electronics', 'Professor', 'Ph.D', 0, NULL, NULL, NULL),
(6, 'FAC005', 8, 'Mechanical', 'Professor', 'Ph.D', 0, NULL, NULL, NULL),
(7, 'FAC006', 9, 'Civil', 'Professor', 'Ph.D', 0, NULL, NULL, NULL),
(8, 'FAC2024001', 2, 'Computer Science', 'Professor', 'Ph.D in Computer Science', 10, 'Database Systems, Software Engineering', 'Room 101, CS Block', '2020-01-15');

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
(2, 'PAY_SIMATS2021001_1', 'SIMATS2021001', 'Tuition Fee', 50000.00, '2025-12-13', 'online', 'TXN_1765610866995_0', 'completed', NULL),
(3, 'PAY_SIMATS2021001_2', 'SIMATS2021001', 'Lab Fee', 10000.00, '2025-12-13', 'online', 'TXN_1765610867000_1', 'completed', NULL),
(4, 'PAY_SIMATS2021001_3', 'SIMATS2021001', 'Library Fee', 2000.00, '2025-12-13', 'online', 'TXN_1765610867002_2', 'completed', NULL),
(5, 'PAY_SIMATS2021001_4', 'SIMATS2021001', 'Sports Fee', 1000.00, '2025-12-13', 'online', 'TXN_1765610867003_3', 'completed', NULL),
(6, 'PAY_SIMATS2021001_5', 'SIMATS2021001', 'Exam Fee', 3000.00, '2025-12-13', 'online', 'TXN_1765610867007_4', 'completed', NULL),
(7, 'PAY_SIMATS2021002_1', 'SIMATS2021002', 'Tuition Fee', 50000.00, '2025-12-13', 'online', 'TXN_1765610867427_0', 'completed', NULL),
(8, 'PAY_SIMATS2021002_3', 'SIMATS2021002', 'Library Fee', 2000.00, '2025-12-13', 'online', 'TXN_1765610867432_2', 'completed', NULL),
(9, 'PAY_SIMATS2021002_4', 'SIMATS2021002', 'Sports Fee', 1000.00, '2025-12-13', 'online', 'TXN_1765610867435_3', 'completed', NULL),
(10, 'PAY_SIMATS2021002_5', 'SIMATS2021002', 'Exam Fee', 3000.00, '2025-12-13', 'online', 'TXN_1765610867439_4', 'completed', NULL),
(11, 'PAY_SIMATS2021003_1', 'SIMATS2021003', 'Tuition Fee', 50000.00, '2025-12-13', 'online', 'TXN_1765610867834_0', 'completed', NULL),
(12, 'PAY_SIMATS2021003_2', 'SIMATS2021003', 'Lab Fee', 10000.00, '2025-12-13', 'online', 'TXN_1765610867837_1', 'completed', NULL),
(13, 'PAY_SIMATS2021003_3', 'SIMATS2021003', 'Library Fee', 2000.00, '2025-12-13', 'online', 'TXN_1765610867841_2', 'completed', NULL),
(14, 'PAY_SIMATS2021003_4', 'SIMATS2021003', 'Sports Fee', 1000.00, '2025-12-13', 'online', 'TXN_1765610867842_3', 'completed', NULL),
(15, 'PAY_SIMATS2021004_5', 'SIMATS2021004', 'Exam Fee', 3000.00, '2025-12-13', 'online', 'TXN_1765610868250_4', 'completed', NULL),
(16, 'PAY_SIMATS2021005_4', 'SIMATS2021005', 'Sports Fee', 1000.00, '2025-12-13', 'online', 'TXN_1765610868615_3', 'completed', NULL),
(17, 'PAY_SIMATS2021005_5', 'SIMATS2021005', 'Exam Fee', 3000.00, '2025-12-13', 'online', 'TXN_1765610868616_4', 'completed', NULL),
(18, 'PAY_SIMATS2021006_1', 'SIMATS2021006', 'Tuition Fee', 50000.00, '2025-12-13', 'online', 'TXN_1765610868966_0', 'completed', NULL),
(19, 'PAY_SIMATS2021006_2', 'SIMATS2021006', 'Lab Fee', 10000.00, '2025-12-13', 'online', 'TXN_1765610868971_1', 'completed', NULL),
(20, 'PAY_SIMATS2021006_3', 'SIMATS2021006', 'Library Fee', 2000.00, '2025-12-13', 'online', 'TXN_1765610868972_2', 'completed', NULL),
(21, 'PAY_SIMATS2021006_4', 'SIMATS2021006', 'Sports Fee', 1000.00, '2025-12-13', 'online', 'TXN_1765610868974_3', 'completed', NULL),
(22, 'PAY_SIMATS2021006_5', 'SIMATS2021006', 'Exam Fee', 3000.00, '2025-12-13', 'online', 'TXN_1765610868975_4', 'completed', NULL),
(23, 'PAY_SIMATS2021007_1', 'SIMATS2021007', 'Tuition Fee', 50000.00, '2025-12-13', 'online', 'TXN_1765610869337_0', 'completed', NULL),
(24, 'PAY_SIMATS2021007_5', 'SIMATS2021007', 'Exam Fee', 3000.00, '2025-12-13', 'online', 'TXN_1765610869342_4', 'completed', NULL),
(25, 'PAY_SIMATS2021008_1', 'SIMATS2021008', 'Tuition Fee', 50000.00, '2025-12-13', 'online', 'TXN_1765610869714_0', 'completed', NULL),
(26, 'PAY_SIMATS2021008_2', 'SIMATS2021008', 'Lab Fee', 10000.00, '2025-12-13', 'online', 'TXN_1765610869717_1', 'completed', NULL),
(27, 'PAY_SIMATS2021008_3', 'SIMATS2021008', 'Library Fee', 2000.00, '2025-12-13', 'online', 'TXN_1765610869719_2', 'completed', NULL),
(28, 'PAY_SIMATS2021008_4', 'SIMATS2021008', 'Sports Fee', 1000.00, '2025-12-13', 'online', 'TXN_1765610869721_3', 'completed', NULL),
(29, 'PAY_SIMATS2021009_1', 'SIMATS2021009', 'Tuition Fee', 50000.00, '2025-12-13', 'online', 'TXN_1765610870097_0', 'completed', NULL),
(30, 'PAY_SIMATS2021009_2', 'SIMATS2021009', 'Lab Fee', 10000.00, '2025-12-13', 'online', 'TXN_1765610870100_1', 'completed', NULL),
(31, 'PAY_SIMATS2021009_5', 'SIMATS2021009', 'Exam Fee', 3000.00, '2025-12-13', 'online', 'TXN_1765610870104_4', 'completed', NULL),
(32, 'PAY_SIMATS2021010_1', 'SIMATS2021010', 'Tuition Fee', 50000.00, '2025-12-13', 'online', 'TXN_1765610870461_0', 'completed', NULL),
(33, 'PAY_SIMATS2021010_4', 'SIMATS2021010', 'Sports Fee', 1000.00, '2025-12-13', 'online', 'TXN_1765610870466_3', 'completed', NULL);

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
(4, 'Computer Science', 3, 6, 'Tuition Fee', 50000.00, '2024-03-31', '2023-24'),
(5, 'Computer Science', 3, 6, 'Lab Fee', 10000.00, '2024-03-31', '2023-24'),
(6, 'Computer Science', 3, 6, 'Library Fee', 2000.00, '2024-03-31', '2023-24'),
(7, 'Computer Science', 3, 6, 'Sports Fee', 1000.00, '2024-03-31', '2023-24'),
(8, 'Computer Science', 3, 6, 'Exam Fee', 3000.00, '2024-03-31', '2023-24'),
(9, 'Computer Science', 3, 6, 'Tuition Fee', 50000.00, '2024-03-31', '2023-24'),
(10, 'Computer Science', 3, 6, 'Lab Fee', 10000.00, '2024-03-31', '2023-24'),
(11, 'Computer Science', 3, 6, 'Library Fee', 2000.00, '2024-03-31', '2023-24'),
(12, 'Computer Science', 3, 6, 'Sports Fee', 1000.00, '2024-03-31', '2023-24'),
(13, 'Computer Science', 3, 6, 'Exam Fee', 3000.00, '2024-03-31', '2023-24'),
(14, 'Information Technology', 3, 6, 'Tuition Fee', 50000.00, '2024-03-31', '2023-24'),
(15, 'Information Technology', 3, 6, 'Lab Fee', 10000.00, '2024-03-31', '2023-24'),
(16, 'Information Technology', 3, 6, 'Library Fee', 2000.00, '2024-03-31', '2023-24'),
(17, 'Information Technology', 3, 6, 'Sports Fee', 1000.00, '2024-03-31', '2023-24'),
(18, 'Information Technology', 3, 6, 'Exam Fee', 3000.00, '2024-03-31', '2023-24'),
(19, 'Electronics', 3, 6, 'Tuition Fee', 50000.00, '2024-03-31', '2023-24'),
(20, 'Electronics', 3, 6, 'Lab Fee', 10000.00, '2024-03-31', '2023-24'),
(21, 'Electronics', 3, 6, 'Library Fee', 2000.00, '2024-03-31', '2023-24'),
(22, 'Electronics', 3, 6, 'Sports Fee', 1000.00, '2024-03-31', '2023-24'),
(23, 'Electronics', 3, 6, 'Exam Fee', 3000.00, '2024-03-31', '2023-24'),
(24, 'Mechanical', 3, 6, 'Tuition Fee', 50000.00, '2024-03-31', '2023-24'),
(25, 'Mechanical', 3, 6, 'Lab Fee', 10000.00, '2024-03-31', '2023-24'),
(26, 'Mechanical', 3, 6, 'Library Fee', 2000.00, '2024-03-31', '2023-24'),
(27, 'Mechanical', 3, 6, 'Sports Fee', 1000.00, '2024-03-31', '2023-24'),
(28, 'Mechanical', 3, 6, 'Exam Fee', 3000.00, '2024-03-31', '2023-24'),
(29, 'Computer Science', 3, 6, 'Tuition Fee', 50000.00, '2024-03-31', '2023-24'),
(30, 'Computer Science', 3, 6, 'Lab Fee', 10000.00, '2024-03-31', '2023-24'),
(31, 'Computer Science', 3, 6, 'Library Fee', 2000.00, '2024-03-31', '2023-24'),
(32, 'Computer Science', 3, 6, 'Sports Fee', 1000.00, '2024-03-31', '2023-24'),
(33, 'Computer Science', 3, 6, 'Exam Fee', 3000.00, '2024-03-31', '2023-24'),
(34, 'Civil', 3, 6, 'Tuition Fee', 50000.00, '2024-03-31', '2023-24'),
(35, 'Civil', 3, 6, 'Lab Fee', 10000.00, '2024-03-31', '2023-24'),
(36, 'Civil', 3, 6, 'Library Fee', 2000.00, '2024-03-31', '2023-24'),
(37, 'Civil', 3, 6, 'Sports Fee', 1000.00, '2024-03-31', '2023-24'),
(38, 'Civil', 3, 6, 'Exam Fee', 3000.00, '2024-03-31', '2023-24'),
(39, 'Information Technology', 3, 6, 'Tuition Fee', 50000.00, '2024-03-31', '2023-24'),
(40, 'Information Technology', 3, 6, 'Lab Fee', 10000.00, '2024-03-31', '2023-24'),
(41, 'Information Technology', 3, 6, 'Library Fee', 2000.00, '2024-03-31', '2023-24'),
(42, 'Information Technology', 3, 6, 'Sports Fee', 1000.00, '2024-03-31', '2023-24'),
(43, 'Information Technology', 3, 6, 'Exam Fee', 3000.00, '2024-03-31', '2023-24'),
(44, 'Electronics', 3, 6, 'Tuition Fee', 50000.00, '2024-03-31', '2023-24'),
(45, 'Electronics', 3, 6, 'Lab Fee', 10000.00, '2024-03-31', '2023-24'),
(46, 'Electronics', 3, 6, 'Library Fee', 2000.00, '2024-03-31', '2023-24'),
(47, 'Electronics', 3, 6, 'Sports Fee', 1000.00, '2024-03-31', '2023-24'),
(48, 'Electronics', 3, 6, 'Exam Fee', 3000.00, '2024-03-31', '2023-24'),
(49, 'Mechanical', 3, 6, 'Tuition Fee', 50000.00, '2024-03-31', '2023-24'),
(50, 'Mechanical', 3, 6, 'Lab Fee', 10000.00, '2024-03-31', '2023-24'),
(51, 'Mechanical', 3, 6, 'Library Fee', 2000.00, '2024-03-31', '2023-24'),
(52, 'Mechanical', 3, 6, 'Sports Fee', 1000.00, '2024-03-31', '2023-24'),
(53, 'Mechanical', 3, 6, 'Exam Fee', 3000.00, '2024-03-31', '2023-24');

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

--
-- Dumping data for table `placement_applications`
--

INSERT INTO `placement_applications` (`id`, `student_id`, `offer_id`, `application_date`, `status`, `interview_feedback`) VALUES
(1, 'SIMATS2021001', 'PO001', '2025-12-13', 'applied', NULL),
(2, 'SIMATS2021001', 'PO002', '2025-12-13', 'shortlisted', NULL),
(3, 'SIMATS2021001', 'PO003', '2025-12-13', 'shortlisted', NULL),
(4, 'SIMATS2021002', 'PO001', '2025-12-13', 'shortlisted', NULL),
(5, 'SIMATS2021003', 'PO001', '2025-12-13', 'applied', NULL),
(6, 'SIMATS2021003', 'PO002', '2025-12-13', 'shortlisted', NULL),
(7, 'SIMATS2021004', 'PO001', '2025-12-13', 'selected', NULL),
(8, 'SIMATS2021005', 'PO001', '2025-12-13', 'shortlisted', NULL),
(9, 'SIMATS2021005', 'PO002', '2025-12-13', 'rejected', NULL),
(10, 'SIMATS2021005', 'PO003', '2025-12-13', 'applied', NULL),
(11, 'SIMATS2021006', 'PO001', '2025-12-13', 'shortlisted', NULL),
(12, 'SIMATS2021006', 'PO002', '2025-12-13', 'shortlisted', NULL),
(13, 'SIMATS2021006', 'PO003', '2025-12-13', 'applied', NULL),
(14, 'SIMATS2021007', 'PO001', '2025-12-13', 'applied', NULL),
(15, 'SIMATS2021007', 'PO002', '2025-12-13', 'selected', NULL),
(16, 'SIMATS2021008', 'PO001', '2025-12-13', 'selected', NULL),
(17, 'SIMATS2021008', 'PO002', '2025-12-13', 'shortlisted', NULL),
(18, 'SIMATS2021009', 'PO001', '2025-12-13', 'shortlisted', NULL),
(19, 'SIMATS2021009', 'PO002', '2025-12-13', 'applied', NULL),
(20, 'SIMATS2021010', 'PO001', '2025-12-13', 'rejected', NULL),
(21, 'SIMATS2021010', 'PO002', '2025-12-13', 'rejected', NULL);

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
(4, 'PO001', 'TCS', 'Software Developer', 350000.00, 'Chennai', 'full_time', NULL, '2024-04-15', NULL, 'open', '2025-12-13 07:27:46'),
(5, 'PO002', 'Infosys', 'System Engineer', 380000.00, 'Bangalore', 'full_time', NULL, '2024-04-20', NULL, 'open', '2025-12-13 07:27:46'),
(6, 'PO003', 'Wipro', 'Software Engineer', 360000.00, 'Hyderabad', 'full_time', NULL, '2024-04-25', NULL, 'open', '2025-12-13 07:27:46'),
(7, 'PO004', 'Cognizant', 'Associate Developer', 340000.00, 'Chennai', 'full_time', NULL, '2024-05-01', NULL, 'open', '2025-12-13 07:27:46'),
(8, 'PO005', 'Accenture', 'Technology Analyst', 420000.00, 'Mumbai', 'full_time', NULL, '2024-05-10', NULL, 'open', '2025-12-13 07:27:46');

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
(2, 'SIMATS2021001', 10, 'Computer Science', 3, 6, '2021-25', NULL, NULL, 8.50, 20, 0, 'Suresh Kumar', '9876543211', '123 Anna Nagar, Chennai, Tamil Nadu', 'B+', '2003-05-15'),
(3, 'SIMATS2021002', 11, 'Computer Science', 3, 6, '2021-25', NULL, NULL, 9.20, 20, 0, 'Vikram Sharma', '9876543213', '456 T Nagar, Chennai, Tamil Nadu', 'A+', '2003-08-22'),
(4, 'SIMATS2021003', 12, 'Information Technology', 3, 6, '2021-25', NULL, NULL, 7.80, 20, 0, 'Ramesh Reddy', '9876543215', '789 Velachery, Chennai, Tamil Nadu', 'O+', '2003-03-10'),
(5, 'SIMATS2021004', 13, 'Electronics', 3, 6, '2021-25', NULL, NULL, 8.90, 20, 0, 'Mahesh Patel', '9876543217', '321 Adyar, Chennai, Tamil Nadu', 'AB+', '2003-11-05'),
(6, 'SIMATS2021005', 14, 'Mechanical', 3, 6, '2021-25', NULL, NULL, 7.50, 20, 0, 'Sunil Nair', '9876543219', '654 Mylapore, Chennai, Tamil Nadu', 'B-', '2003-07-18'),
(7, 'SIMATS2021006', 15, 'Computer Science', 3, 6, '2021-25', NULL, NULL, 8.70, 20, 0, 'Rajesh Singh', '9876543221', '987 Tambaram, Chennai, Tamil Nadu', 'A-', '2003-09-12'),
(8, 'SIMATS2021007', 16, 'Civil', 3, 6, '2021-25', NULL, NULL, 8.10, 20, 0, 'Anil Gupta', '9876543223', '147 Porur, Chennai, Tamil Nadu', 'O-', '2003-04-25'),
(9, 'SIMATS2021008', 17, 'Information Technology', 3, 6, '2021-25', NULL, NULL, 9.00, 20, 0, 'Krishnan Iyer', '9876543225', '258 Guindy, Chennai, Tamil Nadu', 'AB-', '2003-12-08'),
(10, 'SIMATS2021009', 18, 'Electronics', 3, 6, '2021-25', NULL, NULL, 7.90, 20, 0, 'Deepak Joshi', '9876543227', '369 Chrompet, Chennai, Tamil Nadu', 'B+', '2003-06-30'),
(11, 'SIMATS2021010', 19, 'Mechanical', 3, 6, '2021-25', NULL, NULL, 8.30, 20, 0, 'Venkat Krishnan', '9876543229', '741 Pallavaram, Chennai, Tamil Nadu', 'A+', '2003-01-14');

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
(2, 'FAC2024001', 'daniel@simats.edu', '$2a$12$OcM2oc5cOYpZhGIWWfxE2Os6iz24clJCK29Ez3A.WU8X9hC8CHlbG', 'faculty', 'Daniel', 'Faculty', '9876543211', 'active', '2025-12-09 04:17:05', '2025-12-09 04:17:05'),
(3, 'ADM2024001', 'admin@simats.edu', '$2a$12$OcM2oc5cOYpZhGIWWfxE2Os6iz24clJCK29Ez3A.WU8X9hC8CHlbG', 'admin', 'Admin', 'User', '9876543212', 'active', '2025-12-09 04:17:05', '2025-12-09 04:17:05'),
(4, 'FAC001', 'fac001@simats.edu', '$2a$10$5YHWn02VTVR/us//FZmAM.Ox3B4XdYoTyuHL230EDRhBwjg3/xC7y', 'faculty', 'Rajesh', 'Kumar', '9876543000', 'active', '2025-12-13 07:27:45', '2025-12-13 07:27:45'),
(5, 'FAC002', 'fac002@simats.edu', '$2a$10$cpMMsAFoaMWIslzkz8GJ0uToo9aLSsKwlZxeMCjsrF9.q3RNLTbey', 'faculty', 'Priya', 'Sharma', '9876543000', 'active', '2025-12-13 07:27:46', '2025-12-13 07:27:46'),
(6, 'FAC003', 'fac003@simats.edu', '$2a$10$xrd9TogrP9LP9fEjNkNXyOm0lxtDYDX4.l9XjuCwMyOCM9ZFubv9i', 'faculty', 'Arjun', 'Reddy', '9876543000', 'active', '2025-12-13 07:27:46', '2025-12-13 07:27:46'),
(7, 'FAC004', 'fac004@simats.edu', '$2a$10$834UeILZSI5aX/esR8exIeoxiPjJdlBAI9VkP4qhHNgFDlVq.YQCe', 'faculty', 'Sneha', 'Patel', '9876543000', 'active', '2025-12-13 07:27:46', '2025-12-13 07:27:46'),
(8, 'FAC005', 'fac005@simats.edu', '$2a$10$i032Lcm9512h6qz42YIIi.5RGUcN/xW0La5/l5wj3AKIXkEbcHRha', 'faculty', 'Karthik', 'Nair', '9876543000', 'active', '2025-12-13 07:27:46', '2025-12-13 07:27:46'),
(9, 'FAC006', 'fac006@simats.edu', '$2a$10$QXt6rkKsHaTkb1ciTYODvOTDscHPA.8s1PH6.Pza6M8lmqggNcXO.', 'faculty', 'Divya', 'Singh', '9876543000', 'active', '2025-12-13 07:27:46', '2025-12-13 07:27:46'),
(10, 'SIMATS2021001', 'rajesh.kumar@simats.edu', '$2a$10$rvCP1wcppQsE8OiNf8iGZeVqjfzCL7157lIl9HR.E9dzTEgy2Y5iq', 'student', 'Rajesh', 'Kumar', '9876543210', 'active', '2025-12-13 07:27:46', '2025-12-13 07:27:46'),
(11, 'SIMATS2021002', 'priya.sharma@simats.edu', '$2a$10$5nUto3gdGV4PSCAa0ujj0eM2PdtKT4hi/uBVVP0kwbN51tSnF2tim', 'student', 'Priya', 'Sharma', '9876543212', 'active', '2025-12-13 07:27:47', '2025-12-13 07:27:47'),
(12, 'SIMATS2021003', 'arjun.reddy@simats.edu', '$2a$10$5fu3jFbETXX59NI7caOEGOk/1eKaEDylxawPCD6gbGkLYukDkNU.G', 'student', 'Arjun', 'Reddy', '9876543214', 'active', '2025-12-13 07:27:47', '2025-12-13 07:27:47'),
(13, 'SIMATS2021004', 'sneha.patel@simats.edu', '$2a$10$DCbVf0yCkvZarS0a7p4VnOiqmOxFPJ5//N.Dnl.C/YGFlwU0w98fO', 'student', 'Sneha', 'Patel', '9876543216', 'active', '2025-12-13 07:27:47', '2025-12-13 07:27:47'),
(14, 'SIMATS2021005', 'karthik.nair@simats.edu', '$2a$10$L3rVN/WqTq5QXdKuEnsVkuZYTrksKHlC/0Y.eFsOOOwMrzqUdByYe', 'student', 'Karthik', 'Nair', '9876543218', 'active', '2025-12-13 07:27:48', '2025-12-13 07:27:48'),
(15, 'SIMATS2021006', 'divya.singh@simats.edu', '$2a$10$aJIw2kyv5sUyZujdWav9Ke/x8w6qYk5GzURy9D4Lql/o6wfS3nEOO', 'student', 'Divya', 'Singh', '9876543220', 'active', '2025-12-13 07:27:48', '2025-12-13 07:27:48'),
(16, 'SIMATS2021007', 'rohit.gupta@simats.edu', '$2a$10$bYJNQDs4O7.nAGSCMmG4melXcfbA85gtVdm4YtQjLrMdIUlFdP85W', 'student', 'Rohit', 'Gupta', '9876543222', 'active', '2025-12-13 07:27:49', '2025-12-13 07:27:49'),
(17, 'SIMATS2021008', 'ananya.iyer@simats.edu', '$2a$10$tDrrBNeA1EipMqLmoYzLL.8XYp2LMXJ/wZjqkjqZf2Mi2ix5OguCu', 'student', 'Ananya', 'Iyer', '9876543224', 'active', '2025-12-13 07:27:49', '2025-12-13 07:27:49'),
(18, 'SIMATS2021009', 'vikram.joshi@simats.edu', '$2a$10$FUANFaYN4IHIKl3saozf4erP2/OU3bNYrdPIGl5.SP5s4ceopImr.', 'student', 'Vikram', 'Joshi', '9876543226', 'active', '2025-12-13 07:27:49', '2025-12-13 07:27:49'),
(19, 'SIMATS2021010', 'meera.krishnan@simats.edu', '$2a$10$ETaw7246ATO.W7hfUCJQt.vbn2tGWFj66sbORv5ZHASKBe1vwDI46', 'student', 'Meera', 'Krishnan', '9876543228', 'active', '2025-12-13 07:27:50', '2025-12-13 07:27:50');

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
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course_code` (`course_code`);

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
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `assignment_submissions`
--
ALTER TABLE `assignment_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1805;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `course_feedback`
--
ALTER TABLE `course_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `disciplinary_actions`
--
ALTER TABLE `disciplinary_actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `examinations`
--
ALTER TABLE `examinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `exam_results`
--
ALTER TABLE `exam_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `fee_payments`
--
ALTER TABLE `fee_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `fee_structure`
--
ALTER TABLE `fee_structure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `infrastructure_issues`
--
ALTER TABLE `infrastructure_issues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `placement_applications`
--
ALTER TABLE `placement_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `placement_offers`
--
ALTER TABLE `placement_offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_notifications`
--
ALTER TABLE `user_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

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
