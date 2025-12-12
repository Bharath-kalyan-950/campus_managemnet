# 🚀 Quick Start Guide - Smart Campus Management System

## ✅ System Status: READY

Your Smart Campus Management System is now fully configured and running!

## 📊 Database Status

✅ **Database Created**: smart_campus_db  
✅ **Tables Created**: 20 tables  
✅ **Sample Data**: Inserted  
✅ **Connection**: Working  

### Tables Created:
1. users
2. students
3. faculty
4. courses
5. enrollments
6. attendance
7. assignments
8. assignment_submissions
9. examinations
10. exam_results
11. fee_structure
12. fee_payments
13. disciplinary_actions
14. placement_offers
15. placement_applications
16. course_feedback
17. infrastructure_issues
18. notifications
19. user_notifications
20. academic_calendar

## 🔐 Login Credentials

### Student Account
- **Email**: john.doe@simats.edu
- **Password**: password
- **Dashboard**: http://localhost:3000/dashboard/student

### Faculty Account
- **Email**: shoba.pandian@simats.edu
- **Password**: password
- **Dashboard**: http://localhost:3000/dashboard/faculty

### Admin Account
- **Email**: admin@simats.edu
- **Password**: password
- **Dashboard**: http://localhost:3000/dashboard/admin

## 🌐 Access Points

- **Application**: http://localhost:3000
- **phpMyAdmin**: http://localhost/phpmyadmin
- **Database Name**: smart_campus_db

## ✨ Features Working

### Student Portal ✅
- ✅ Profile Management
- ✅ Course Enrollment (3 courses enrolled)
- ✅ Attendance Tracking (records available)
- ✅ Assignment Management
- ✅ Examination System
- ✅ Fee Management (1 payment recorded)
- ✅ Placement Portal (3 job offers available)
- ✅ Feedback System
- ✅ Issue Reporting
- ✅ Notifications (3 notifications)

### Faculty Portal ✅
- ✅ Profile Management
- ✅ Course Management (5 courses)
- ✅ Student Management
- ✅ Attendance Marking
- ✅ Assignment Creation
- ✅ Marks Entry

### Admin Dashboard ✅
- ✅ User Management
- ✅ System Overview
- ✅ Reports & Analytics

## 📝 Sample Data Available

- **Users**: 3 (1 student, 1 faculty, 1 admin)
- **Courses**: 5 courses
- **Enrollments**: 3 enrollments
- **Attendance**: 4 records
- **Notifications**: 3 notifications
- **Placement Offers**: 3 job offers
- **Fee Structure**: 3 fee types
- **Fee Payments**: 1 payment

## 🎯 Test the System

### 1. Login Test
1. Go to http://localhost:3000
2. Enter: john.doe@simats.edu / password
3. Click Login
4. Should redirect to student dashboard

### 2. View Courses
1. Click "My Course" in sidebar
2. Should see 3 enrolled courses:
   - CS301: Data Structures
   - CS302: Database Management Systems
   - CS303: Computer Networks

### 3. Check Attendance
1. Click "Attendance" in sidebar
2. Should see attendance records and percentage

### 4. View Placement Offers
1. Click "Offer" in sidebar
2. Should see 3 job opportunities:
   - TCS - Software Engineer
   - Infosys - System Engineer
   - Wipro - Project Engineer

### 5. Check Fees
1. Click "Financial Record" in sidebar
2. Should see fee structure and payment history

## 🔧 Maintenance Commands

### Restart Database Setup
```bash
node scripts/setup-database.js
```

### Test Database Connection
```bash
node scripts/test-connection.js
```

### Start Development Server
```bash
npm run dev
```

### Generate Password Hash
```bash
node scripts/hash-password.js yourpassword
```

## 📊 Database Management

### View Data in phpMyAdmin
1. Open http://localhost/phpmyadmin
2. Select `smart_campus_db` from left sidebar
3. Click on any table to view data

### Common SQL Queries

**View all students:**
```sql
SELECT s.student_id, u.first_name, u.last_name, s.department, s.cgpa
FROM students s
JOIN users u ON s.user_id = u.id;
```

**View enrollments:**
```sql
SELECT s.student_id, c.course_name, e.status
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN courses c ON e.course_code = c.course_code;
```

**View attendance percentage:**
```sql
SELECT 
  s.student_id,
  c.course_name,
  COUNT(*) as total_classes,
  SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present,
  ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as percentage
FROM attendance a
JOIN students s ON a.student_id = s.student_id
JOIN courses c ON a.course_code = c.course_code
GROUP BY s.student_id, c.course_name;
```

## 🎨 Customization

### Add New Student
```sql
-- Add user first
INSERT INTO users (user_id, email, password, role, first_name, last_name, phone)
VALUES ('STU2024002', 'jane.smith@simats.edu', '$2b$12$hash', 'student', 'Jane', 'Smith', '9876543213');

-- Add student details
INSERT INTO students (student_id, user_id, department, year, semester, batch, cgpa)
VALUES ('STU2024002', LAST_INSERT_ID(), 'Computer Science', 1, 1, 'CSE-B', 0.00);
```

### Add New Course
```sql
INSERT INTO courses (course_code, course_name, department, credits, semester, year, course_type)
VALUES ('CS401', 'Machine Learning', 'Computer Science', 4, 7, 4, 'elective');
```

### Enroll Student
```sql
INSERT INTO enrollments (student_id, course_code, faculty_id, status)
VALUES ('STU2024001', 'CS401', 'FAC2024001', 'enrolled');
```

## 🐛 Troubleshooting

### Issue: Cannot login
**Solution**: 
- Check if database is running
- Verify credentials: john.doe@simats.edu / password
- Check browser console for errors

### Issue: No data showing
**Solution**:
- Run: `node scripts/test-connection.js`
- Check if sample data exists
- Verify API endpoints are working

### Issue: Database connection error
**Solution**:
- Check MySQL is running
- Verify credentials in `.env.local`
- Run: `node scripts/setup-database.js`

## 📞 Support

- **Installation Guide**: See `INSTALLATION_GUIDE.md`
- **Database Setup**: See `DATABASE_SETUP.md`
- **Complete Setup**: See `SETUP_COMPLETE.md`

## 🎉 Success Checklist

- ✅ MySQL server running
- ✅ Database created (smart_campus_db)
- ✅ 20 tables created
- ✅ Sample data inserted
- ✅ Development server running (localhost:3000)
- ✅ Login working
- ✅ API endpoints responding
- ✅ Dynamic data loading
- ✅ All pages accessible

## 🚀 You're All Set!

Your Smart Campus Management System is fully operational with:
- Complete database integration
- 15+ API endpoints
- Dynamic data loading
- Secure authentication
- Role-based access control
- Professional UI/UX

**Start exploring the system at: http://localhost:3000**

Happy coding! 🎓