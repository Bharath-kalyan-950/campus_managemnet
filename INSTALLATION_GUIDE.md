# Smart Campus Management System - Complete Installation Guide

## 🚀 Quick Start

This guide will help you set up the complete Smart Campus Management System with dynamic database integration.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/

2. **MySQL Server** (v8.0 or higher)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP/WAMP which includes MySQL and phpMyAdmin

3. **phpMyAdmin** (usually comes with XAMPP/WAMP)
   - Should be accessible at: http://localhost/phpmyadmin

## 📦 Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- Next.js 16
- React 19
- MySQL2 (database driver)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- Tailwind CSS

## 🗄️ Step 2: Start MySQL Server

### If using XAMPP:
1. Open XAMPP Control Panel
2. Start Apache and MySQL services
3. Verify MySQL is running (green indicator)

### If using standalone MySQL:
1. Start MySQL service from Services (Windows) or Terminal (Mac/Linux)
2. Verify it's running on port 3306

## 🔧 Step 3: Configure Database Connection

1. Copy the environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_campus_db
JWT_SECRET=your-secret-key
```

**Note:** If you're using XAMPP, the default password is usually empty.

## 🏗️ Step 4: Create Database and Tables

Run the database setup script:

```bash
node scripts/setup-database.js
```

This script will:
- Create the `smart_campus_db` database
- Create all required tables (20+ tables)
- Insert sample data for testing
- Set up relationships and indexes

### Verify Database Creation:

1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Look for `smart_campus_db` in the left sidebar
3. Click on it to see all tables

Expected tables:
- users
- students
- faculty
- courses
- enrollments
- attendance
- assignments
- assignment_submissions
- examinations
- exam_results
- fee_structure
- fee_payments
- disciplinary_actions
- placement_offers
- placement_applications
- course_feedback
- infrastructure_issues
- notifications
- user_notifications
- academic_calendar

## 🎯 Step 5: Start the Development Server

```bash
npm run dev
```

The application will start at: **http://localhost:3000**

## 🔐 Step 6: Test Login

Use these default credentials to test the system:

### Student Login:
- Email: `john.doe@simats.edu`
- Password: `password`
- Redirects to: `/dashboard/student`

### Faculty Login:
- Email: `shoba.pandian@simats.edu`
- Password: `password`
- Redirects to: `/dashboard/faculty`

### Admin Login:
- Email: `admin@simats.edu`
- Password: `password`
- Redirects to: `/dashboard/admin`

## ✅ Step 7: Verify Dynamic Data

After logging in, check that data is loading dynamically:

### For Students:
1. **Profile Page** - Should show student details from database
2. **Courses Page** - Should display enrolled courses
3. **Attendance Page** - Should show attendance records
4. **Assignments Page** - Should list assignments
5. **Fees Page** - Should show fee structure and payments
6. **Placement Page** - Should display job opportunities

### For Faculty:
1. **Profile Page** - Should show faculty details
2. **Courses Page** - Should list assigned courses
3. **Students Page** - Should show enrolled students

## 🔍 Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
- Verify MySQL is running
- Check credentials in `.env.local`
- Test connection in phpMyAdmin

### Issue: "Table doesn't exist"
**Solution:**
- Run the setup script again: `node scripts/setup-database.js`
- Check phpMyAdmin to verify tables were created

### Issue: "Login fails with correct credentials"
**Solution:**
- Check if sample data was inserted
- Run this SQL in phpMyAdmin:
```sql
SELECT * FROM users;
```
- If empty, run setup script again

### Issue: "API returns 500 error"
**Solution:**
- Check browser console for errors
- Check terminal for server errors
- Verify database connection is working

### Issue: "Module not found" errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📊 Database Management

### View Data in phpMyAdmin:
1. Go to http://localhost/phpmyadmin
2. Select `smart_campus_db`
3. Click on any table to view data
4. Use SQL tab to run custom queries

### Add New Student:
```sql
-- First, add user
INSERT INTO users (user_id, email, password, role, first_name, last_name, phone) 
VALUES ('STU2024002', 'student2@simats.edu', '$2b$10$hash', 'student', 'Jane', 'Smith', '9876543210');

-- Then, add student details
INSERT INTO students (student_id, user_id, department, year, semester, batch, cgpa) 
VALUES ('STU2024002', LAST_INSERT_ID(), 'Computer Science', 1, 1, 'CSE-A', 0.00);
```

### Add New Course:
```sql
INSERT INTO courses (course_code, course_name, department, credits, semester, year, course_type, description)
VALUES ('CS401', 'Machine Learning', 'Computer Science', 4, 7, 4, 'elective', 'Introduction to ML algorithms');
```

### Enroll Student in Course:
```sql
INSERT INTO enrollments (student_id, course_code, faculty_id, status)
VALUES ('STU2024001', 'CS401', 'FAC2024001', 'enrolled');
```

## 🔒 Security Notes

### For Production Deployment:

1. **Change JWT Secret:**
   - Generate a strong random key
   - Update in `.env.local`

2. **Hash Passwords:**
   - Never store plain text passwords
   - Use bcrypt for hashing (already implemented)

3. **Database Security:**
   - Create a dedicated MySQL user (not root)
   - Grant only necessary permissions
   - Use strong passwords

4. **Environment Variables:**
   - Never commit `.env.local` to git
   - Use secure environment variable management

## 📱 API Endpoints Reference

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Student Endpoints
- `GET /api/student/profile` - Get profile
- `PUT /api/student/profile` - Update profile
- `GET /api/student/courses` - Get courses
- `GET /api/student/attendance` - Get attendance
- `GET /api/student/assignments` - Get assignments
- `POST /api/student/assignments` - Submit assignment
- `GET /api/student/examinations` - Get exams
- `GET /api/student/fees` - Get fees
- `GET /api/student/placement` - Get placements
- `POST /api/student/placement` - Apply for job
- `GET /api/student/disciplinary` - Get records
- `GET /api/student/feedback` - Get feedback forms
- `POST /api/student/feedback` - Submit feedback
- `GET /api/student/enrollment` - Get enrollment info
- `POST /api/student/enrollment` - Enroll in course

### Faculty Endpoints
- `GET /api/faculty/profile` - Get profile
- `GET /api/faculty/courses` - Get courses
- `GET /api/faculty/students` - Get students

### Common Endpoints
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications` - Mark as read
- `GET /api/issues` - Get issues
- `POST /api/issues` - Report issue
- `GET /api/calendar` - Get calendar events

## 🎨 Customization

### Change Theme Colors:
Edit `app/globals.css` to modify the color scheme.

### Add New Pages:
1. Create page in `app/dashboard/[role]/` directory
2. Add route to sidebar in layout file
3. Create corresponding API endpoint if needed

### Modify Database Schema:
1. Update `database/schema.sql`
2. Run setup script again
3. Update API routes to match new schema

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review error messages in browser console
3. Check server logs in terminal
4. Verify database connection in phpMyAdmin

## 🎉 Success!

If everything is working:
- ✅ Database is created and populated
- ✅ Server is running on localhost:3000
- ✅ Login works with sample credentials
- ✅ Pages display dynamic data from database
- ✅ API endpoints respond correctly

You now have a fully functional Smart Campus Management System with dynamic database integration!

## 📚 Next Steps

1. Add more sample data for testing
2. Customize the UI to match your requirements
3. Add additional features as needed
4. Set up proper authentication for production
5. Deploy to a production server

Happy coding! 🚀