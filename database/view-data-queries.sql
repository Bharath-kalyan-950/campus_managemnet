-- Useful SQL Queries to View Data in phpMyAdmin
-- Copy and paste these queries in phpMyAdmin SQL tab

-- 1. View all users with their roles
SELECT user_id, email, role, CONCAT(first_name, ' ', last_name) as full_name, phone, status
FROM users
ORDER BY role, user_id;

-- 2. View all students with details
SELECT 
    s.student_id, 
    CONCAT(u.first_name, ' ', u.last_name) as name,
    s.department, 
    s.year, 
    s.semester, 
    s.batch, 
    s.cgpa,
    u.email,
    u.phone
FROM students s
JOIN users u ON s.user_id = u.id
ORDER BY s.student_id;

-- 3. View all faculty with details
SELECT 
    f.faculty_id,
    CONCAT(u.first_name, ' ', u.last_name) as name,
    f.department,
    f.designation,
    f.qualification,
    f.experience_years,
    u.email
FROM faculty f
JOIN users u ON f.user_id = u.id
ORDER BY f.faculty_id;

-- 4. View all courses
SELECT course_code, course_name, department, credits, semester, year, course_type
FROM courses
ORDER BY course_code;

-- 5. View enrollments with student and course names
SELECT 
    e.student_id,
    CONCAT(u.first_name, ' ', u.last_name) as student_name,
    c.course_code,
    c.course_name,
    e.status,
    e.grade
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN users u ON s.user_id = u.id
JOIN courses c ON e.course_code = c.course_code
ORDER BY e.student_id, c.course_code;

-- 6. View attendance summary by student and course
SELECT 
    s.student_id,
    CONCAT(u.first_name, ' ', u.last_name) as student_name,
    c.course_name,
    COUNT(*) as total_classes,
    SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present,
    SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) as absent,
    ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as attendance_percentage
FROM attendance a
JOIN students s ON a.student_id = s.student_id
JOIN users u ON s.user_id = u.id
JOIN courses c ON a.course_code = c.course_code
GROUP BY s.student_id, c.course_name
ORDER BY s.student_id, c.course_name;

-- 7. View all assignments with course details
SELECT 
    a.assignment_id,
    c.course_name,
    a.title,
    a.due_date,
    a.max_marks,
    a.assignment_type,
    CONCAT(u.first_name, ' ', u.last_name) as faculty_name
FROM assignments a
JOIN courses c ON a.course_code = c.course_code
LEFT JOIN faculty f ON a.faculty_id = f.faculty_id
LEFT JOIN users u ON f.user_id = u.id
ORDER BY a.due_date;

-- 8. View assignment submissions with grades
SELECT 
    a.assignment_id,
    a.title as assignment_title,
    CONCAT(u.first_name, ' ', u.last_name) as student_name,
    sub.submitted_at,
    sub.marks_obtained,
    a.max_marks,
    sub.status
FROM assignment_submissions sub
JOIN assignments a ON sub.assignment_id = a.assignment_id
JOIN students s ON sub.student_id = s.student_id
JOIN users u ON s.user_id = u.id
ORDER BY a.assignment_id, u.last_name;

-- 9. View upcoming examinations
SELECT 
    e.exam_id,
    c.course_name,
    e.exam_name,
    e.exam_type,
    e.exam_date,
    e.start_time,
    e.duration,
    e.max_marks,
    e.venue
FROM examinations e
JOIN courses c ON e.course_code = c.course_code
WHERE e.exam_date >= CURDATE()
ORDER BY e.exam_date, e.start_time;

-- 10. View exam results with student details
SELECT 
    CONCAT(u.first_name, ' ', u.last_name) as student_name,
    ex.exam_name,
    c.course_name,
    er.marks_obtained,
    ex.max_marks,
    er.grade,
    ROUND((er.marks_obtained / ex.max_marks) * 100, 2) as percentage
FROM exam_results er
JOIN examinations ex ON er.exam_id = ex.exam_id
JOIN courses c ON ex.course_code = c.course_code
JOIN students s ON er.student_id = s.student_id
JOIN users u ON s.user_id = u.id
ORDER BY u.last_name, ex.exam_date;

-- 11. View fee structure and payments
SELECT 
    s.student_id,
    CONCAT(u.first_name, ' ', u.last_name) as student_name,
    fs.fee_type,
    fs.amount as fee_amount,
    COALESCE(SUM(fp.amount), 0) as paid_amount,
    fs.amount - COALESCE(SUM(fp.amount), 0) as pending_amount,
    fs.due_date
FROM students s
JOIN users u ON s.user_id = u.id
JOIN fee_structure fs ON s.department = fs.department AND s.year = fs.year AND s.semester = fs.semester
LEFT JOIN fee_payments fp ON s.student_id = fp.student_id AND fs.fee_type = fp.fee_type AND fp.status = 'completed'
GROUP BY s.student_id, fs.fee_type
ORDER BY s.student_id, fs.fee_type;

-- 12. View placement offers with application status
SELECT 
    po.offer_id,
    po.company_name,
    po.job_title,
    po.package_amount,
    po.job_location,
    po.application_deadline,
    COUNT(pa.id) as total_applications,
    SUM(CASE WHEN pa.status = 'selected' THEN 1 ELSE 0 END) as selected_count
FROM placement_offers po
LEFT JOIN placement_applications pa ON po.offer_id = pa.offer_id
GROUP BY po.offer_id
ORDER BY po.application_deadline;

-- 13. View student placement applications
SELECT 
    CONCAT(u.first_name, ' ', u.last_name) as student_name,
    po.company_name,
    po.job_title,
    po.package_amount,
    pa.application_date,
    pa.status
FROM placement_applications pa
JOIN students s ON pa.student_id = s.student_id
JOIN users u ON s.user_id = u.id
JOIN placement_offers po ON pa.offer_id = po.offer_id
ORDER BY pa.application_date DESC;

-- 14. View all notifications
SELECT 
    notification_id,
    title,
    message,
    sender_type,
    target_audience,
    priority,
    created_at
FROM notifications
ORDER BY created_at DESC;

-- 15. View infrastructure issues
SELECT 
    issue_id,
    issue_type,
    location,
    description,
    priority,
    status,
    reported_date,
    reporter_type
FROM infrastructure_issues
ORDER BY 
    CASE priority
        WHEN 'critical' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        WHEN 'low' THEN 4
    END,
    reported_date DESC;

-- 16. View academic calendar events
SELECT 
    event_id,
    event_name,
    event_type,
    start_date,
    end_date,
    description,
    target_audience
FROM academic_calendar
ORDER BY start_date;

-- 17. View course feedback summary
SELECT 
    c.course_name,
    CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
    COUNT(cf.id) as feedback_count,
    ROUND(AVG(cf.rating), 2) as avg_rating,
    ROUND(AVG(cf.teaching_quality), 2) as avg_teaching_quality,
    ROUND(AVG(cf.course_content), 2) as avg_course_content,
    ROUND(AVG(cf.assignments_quality), 2) as avg_assignments_quality
FROM course_feedback cf
JOIN courses c ON cf.course_code = c.course_code
LEFT JOIN faculty f ON cf.faculty_id = f.faculty_id
LEFT JOIN users u ON f.user_id = u.id
GROUP BY c.course_code
ORDER BY avg_rating DESC;

-- 18. View student performance summary
SELECT 
    s.student_id,
    CONCAT(u.first_name, ' ', u.last_name) as student_name,
    s.cgpa,
    COUNT(DISTINCT e.course_code) as courses_enrolled,
    ROUND(AVG(CASE WHEN a.status = 'present' THEN 100 ELSE 0 END), 2) as avg_attendance,
    COUNT(DISTINCT sub.assignment_id) as assignments_submitted,
    ROUND(AVG(sub.marks_obtained), 2) as avg_assignment_marks
FROM students s
JOIN users u ON s.user_id = u.id
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN attendance a ON s.student_id = a.student_id
LEFT JOIN assignment_submissions sub ON s.student_id = sub.student_id
GROUP BY s.student_id
ORDER BY s.cgpa DESC;

-- 19. View faculty workload
SELECT 
    f.faculty_id,
    CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
    f.designation,
    COUNT(DISTINCT e.course_code) as courses_teaching,
    COUNT(DISTINCT e.student_id) as total_students,
    COUNT(DISTINCT a.assignment_id) as assignments_created
FROM faculty f
JOIN users u ON f.user_id = u.id
LEFT JOIN enrollments e ON f.faculty_id = e.faculty_id
LEFT JOIN assignments a ON f.faculty_id = a.faculty_id
GROUP BY f.faculty_id
ORDER BY courses_teaching DESC;

-- 20. View department statistics
SELECT 
    s.department,
    COUNT(DISTINCT s.student_id) as total_students,
    ROUND(AVG(s.cgpa), 2) as avg_cgpa,
    COUNT(DISTINCT c.course_code) as total_courses,
    COUNT(DISTINCT f.faculty_id) as total_faculty
FROM students s
LEFT JOIN courses c ON s.department = c.department
LEFT JOIN faculty f ON s.department = f.department
GROUP BY s.department;
