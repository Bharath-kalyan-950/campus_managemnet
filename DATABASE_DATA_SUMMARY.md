# 📊 Database Data Summary

## ✅ Complete Data Population

Your Smart Campus Management System database is now fully populated with comprehensive, realistic data!

## 📈 Data Statistics

### Users & Authentication
- **Total Users**: 9
  - Students: 5
  - Faculty: 3
  - Admin: 1
- **All passwords**: `password` (hashed with bcrypt)

### Student Data
| Student ID | Name | Department | Year | Semester | CGPA | Batch |
|------------|------|------------|------|----------|------|-------|
| STU2024001 | John Doe | Computer Science | 2 | 4 | 8.5 | CSE-A |
| STU2024002 | Jane Smith | Computer Science | 2 | 4 | 8.2 | CSE-A |
| STU2024003 | Mike Johnson | Computer Science | 2 | 4 | 7.8 | CSE-B |
| STU2024004 | Sarah Williams | Computer Science | 2 | 4 | 9.1 | CSE-A |
| STU2024005 | David Brown | Computer Science | 2 | 4 | 7.5 | CSE-B |

### Faculty Data
| Faculty ID | Name | Designation | Department | Specialization |
|------------|------|-------------|------------|----------------|
| FAC2024001 | Shoba Pandian | Assistant Professor | Computer Science | Database Systems |
| FAC2024002 | Rajesh Kumar | Associate Professor | Computer Science | Machine Learning |
| FAC2024003 | Priya Sharma | Assistant Professor | Computer Science | Web Development |

### Course Data
**Total Courses**: 10

| Code | Course Name | Credits | Type | Semester |
|------|-------------|---------|------|----------|
| CS301 | Data Structures | 4 | core | 3 |
| CS302 | Database Management Systems | 4 | core | 4 |
| CS303 | Computer Networks | 3 | core | 4 |
| CS304 | Operating Systems | 4 | core | 4 |
| CS305 | Software Engineering | 3 | core | 4 |
| CS306 | Web Technologies | 3 | core | 4 |
| CS307 | Machine Learning | 4 | elective | 4 |
| CS308 | Mobile App Development | 3 | elective | 4 |
| CS309 | Cloud Computing | 3 | elective | 4 |
| CS310 | Cyber Security | 4 | elective | 4 |

### Enrollment Data
- **Total Enrollments**: 30
- Each student enrolled in 6 courses
- All enrollments are active (status: enrolled)

### Attendance Data
- **Total Records**: 100+
- Date range: December 1-5, 2024
- Average attendance: ~80%
- Tracked for 4 main courses per student

### Assignment Data
**Total Assignments**: 5

| ID | Course | Title | Due Date | Max Marks |
|----|--------|-------|----------|-----------|
| ASG001 | CS301 | Data Structures Implementation | Dec 20 | 100 |
| ASG002 | CS302 | Database Design Project | Dec 22 | 100 |
| ASG003 | CS303 | Network Protocol Analysis | Dec 25 | 100 |
| ASG004 | CS304 | OS Scheduling Algorithms | Dec 28 | 100 |
| ASG005 | CS305 | Software Testing Report | Dec 30 | 100 |

**Submissions**: 6 submissions from 3 students (graded)

### Examination Data
**Total Exams**: 5

| ID | Course | Exam Name | Type | Date | Marks |
|----|--------|-----------|------|------|-------|
| EX001 | CS301 | Data Structures Mid-Term | Internal | Dec 15 | 50 |
| EX002 | CS302 | DBMS Mid-Term | Internal | Dec 16 | 50 |
| EX003 | CS303 | Networks Mid-Term | Internal | Dec 17 | 50 |
| EX004 | CS301 | Data Structures Final | External | Jan 10 | 100 |
| EX005 | CS302 | DBMS Final | External | Jan 12 | 100 |

**Exam Results**: 15 results (3 exams × 5 students)

### Fee Management
**Fee Structure** (per student):
- Tuition Fee: ₹50,000
- Lab Fee: ₹5,000
- Library Fee: ₹2,000
- Exam Fee: ₹3,000
- Sports Fee: ₹1,000
- Development Fee: ₹5,000
- **Total**: ₹66,000

**Payments Recorded**: 5 students paid tuition fee (₹50,000 each)

### Placement Data
**Total Offers**: 8

| Company | Position | Package | Location | Type | Deadline |
|---------|----------|---------|----------|------|----------|
| TCS | Software Engineer | ₹4.5 LPA | Chennai | Full-time | Dec 31 |
| Infosys | System Engineer | ₹4.0 LPA | Bangalore | Full-time | Dec 25 |
| Wipro | Project Engineer | ₹4.2 LPA | Hyderabad | Full-time | Dec 28 |
| Cognizant | Software Developer | ₹3.8 LPA | Chennai | Full-time | Dec 30 |
| Accenture | Associate SWE | ₹4.2 LPA | Bangalore | Full-time | Dec 28 |
| HCL | Graduate Engineer | ₹3.5 LPA | Chennai | Full-time | Jan 5 |
| Tech Mahindra | Software Engineer | ₹4.0 LPA | Pune | Full-time | Jan 10 |
| Amazon | SDE Intern | ₹50k/month | Hyderabad | Internship | Dec 25 |

**Applications**: 10 applications from students

### Notifications
**Total Notifications**: 8

1. Assignment Due Tomorrow (High Priority)
2. Exam Schedule Released (Medium Priority)
3. Fee Payment Reminder (High Priority)
4. Holiday Announcement (Medium Priority)
5. Library Books Due (Low Priority)
6. Placement Drive (High Priority)
7. Faculty Meeting (Medium Priority)
8. Exam Schedule Update (High Priority)

### Infrastructure Issues
**Total Issues**: 4

| ID | Type | Location | Priority | Status |
|----|------|----------|----------|--------|
| ISS001 | AC Not Working | Lab B-301 | High | Open |
| ISS002 | Projector Issue | Classroom A-201 | Medium | In Progress |
| ISS003 | WiFi Problem | Library | High | Open |
| ISS004 | Broken Chair | Classroom B-105 | Low | Resolved |

### Academic Calendar
**Total Events**: 6

| Event | Type | Date | Audience |
|-------|------|------|----------|
| Christmas Holiday | Holiday | Dec 25 | All |
| New Year Holiday | Holiday | Jan 1 | All |
| Mid-Term Exams | Exam | Dec 15-20 | Students |
| Final Exams | Exam | Jan 10-20 | Students |
| Tech Fest | Cultural | Jan 25-27 | All |
| Sports Day | Cultural | Feb 5 | All |

### Course Feedback
- **Total Feedback**: 6 submissions
- Average ratings: 4-5 stars
- Covers 2 courses from 3 students

## 🔍 How to View Data

### Option 1: phpMyAdmin
1. Open http://localhost/phpmyadmin
2. Select `smart_campus_db` database
3. Click on any table to view data
4. Use SQL tab to run custom queries

### Option 2: Use Provided Queries
Open `database/view-data-queries.sql` and copy queries to phpMyAdmin SQL tab.

**Available Queries**:
1. View all users
2. View students with details
3. View faculty information
4. View all courses
5. View enrollments
6. View attendance summary
7. View assignments
8. View exam results
9. View fee structure
10. View placement offers
11. View notifications
12. View infrastructure issues
13. View calendar events
14. View course feedback
15. View student performance
16. View faculty workload
17. View department statistics
...and more!

### Option 3: Through Application
1. Login at http://localhost:3000
2. Navigate through different pages
3. All data is dynamically loaded from database

## 📝 Test Scenarios

### Student Portal Testing
1. **Login**: john.doe@simats.edu / password
2. **View Profile**: See complete student information
3. **Check Courses**: 6 enrolled courses visible
4. **View Attendance**: See attendance percentage per course
5. **Check Assignments**: 5 assignments listed
6. **View Exams**: See exam schedule and results
7. **Check Fees**: View fee structure and payments
8. **Browse Placements**: 8 job offers available
9. **Submit Feedback**: Rate courses and faculty
10. **Report Issues**: View and create infrastructure issues

### Faculty Portal Testing
1. **Login**: shoba.pandian@simats.edu / password
2. **View Profile**: See faculty information
3. **Check Courses**: See assigned courses
4. **View Students**: List of enrolled students
5. **Manage Assignments**: Create and grade assignments
6. **Mark Attendance**: Record student attendance

### Admin Portal Testing
1. **Login**: admin@simats.edu / password
2. **Dashboard**: View system statistics
3. **Manage Users**: View all users
4. **System Overview**: Check overall metrics

## 🎯 Data Relationships

All data is properly linked with foreign keys:
- ✅ Users → Students/Faculty
- ✅ Students → Enrollments → Courses
- ✅ Students → Attendance → Courses
- ✅ Students → Assignment Submissions → Assignments
- ✅ Students → Exam Results → Examinations
- ✅ Students → Fee Payments
- ✅ Students → Placement Applications → Offers
- ✅ Students → Course Feedback → Courses

## 🔄 Adding More Data

### Add New Student
```sql
-- 1. Add user
INSERT INTO users (user_id, email, password, role, first_name, last_name, phone)
VALUES ('STU2024006', 'new.student@simats.edu', '$2b$12$hash', 'student', 'New', 'Student', '9876543224');

-- 2. Add student details
INSERT INTO students (student_id, user_id, department, year, semester, batch, cgpa)
VALUES ('STU2024006', LAST_INSERT_ID(), 'Computer Science', 1, 1, 'CSE-A', 0.00);
```

### Enroll in Course
```sql
INSERT INTO enrollments (student_id, course_code, faculty_id, status)
VALUES ('STU2024006', 'CS301', 'FAC2024001', 'enrolled');
```

### Add Attendance
```sql
INSERT INTO attendance (student_id, course_code, faculty_id, date, status)
VALUES ('STU2024006', 'CS301', 'FAC2024001', CURDATE(), 'present');
```

## 🎉 Summary

Your database now contains:
- ✅ 9 users (5 students, 3 faculty, 1 admin)
- ✅ 10 courses across Computer Science
- ✅ 30 course enrollments
- ✅ 100+ attendance records
- ✅ 5 assignments with submissions
- ✅ 5 examinations with results
- ✅ 8 placement opportunities
- ✅ 8 system notifications
- ✅ 4 infrastructure issues
- ✅ 6 calendar events
- ✅ Complete fee structure and payments
- ✅ Course feedback from students

**All data is realistic, properly linked, and ready for testing!**

Visit http://localhost:3000 and explore your fully functional Smart Campus Management System! 🚀
