# 🎓 Smart Campus Management System (SIMATS)

A comprehensive, full-stack campus management system built with **Next.js 16**, **React 19**, **MySQL**, and **Tailwind CSS**. This system provides complete management solutions for students, faculty, and administrators with dynamic database integration.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)

## ✨ Features

### 🎯 Student Portal
- **Profile Management** - View and update personal information
- **Course Enrollment** - Browse and enroll in courses
- **Attendance Tracking** - Real-time attendance monitoring
- **Assignment Management** - View, submit, and track assignments
- **Examination System** - Exam schedules and results
- **Fee Management** - View fee structure and payment history
- **Placement Portal** - Browse and apply for job opportunities
- **Feedback System** - Submit course and faculty feedback
- **Issue Reporting** - Report infrastructure issues
- **Disciplinary Records** - View disciplinary actions

### 👨‍🏫 Faculty Portal
- **Course Management** - Manage assigned courses
- **Student Management** - View enrolled students
- **Attendance Marking** - Mark and track attendance
- **Assignment Creation** - Create and grade assignments
- **Marks Entry** - Enter internal and external marks
- **Student 360° View** - Comprehensive student information
- **Issue Reporting** - Report infrastructure problems

### 🔐 Admin Dashboard
- **User Management** - Manage students, faculty, and staff
- **Course Administration** - Create and manage courses
- **Fee Structure** - Configure fee structures
- **Placement Management** - Post job opportunities
- **Notifications** - Send system-wide announcements
- **Calendar Management** - Manage academic calendar
- **Reports & Analytics** - Generate various reports

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- phpMyAdmin (optional, for database management)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd scm
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your MySQL credentials.

4. **Setup database**
```bash
node scripts/setup-database.js
```

5. **Test connection**
```bash
node scripts/test-connection.js
```

6. **Start development server**
```bash
npm run dev
```

7. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Student | john.doe@simats.edu | password |
| Faculty | shoba.pandian@simats.edu | password |
| Admin | admin@simats.edu | password |

## 📁 Project Structure

```
scm/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── student/           # Student APIs
│   │   ├── faculty/           # Faculty APIs
│   │   ├── notifications/     # Notification APIs
│   │   └── issues/            # Issue tracking APIs
│   ├── dashboard/             # Dashboard pages
│   │   ├── student/          # Student portal
│   │   ├── faculty/          # Faculty portal
│   │   └── admin/            # Admin dashboard
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Login page
├── lib/
│   ├── db.js                 # Database connection
│   ├── auth.js               # Authentication utilities
│   └── api.js                # Client-side API helpers
├── database/
│   └── schema.sql            # Database schema
├── scripts/
│   ├── setup-database.js     # Database setup script
│   ├── test-connection.js    # Connection test script
│   └── hash-password.js      # Password hashing utility
├── public/                    # Static assets
├── .env.local                # Environment variables
└── package.json              # Dependencies
```

## 🗄️ Database Schema

The system includes 20+ tables:
- **Core**: users, students, faculty, courses, enrollments
- **Academic**: attendance, assignments, examinations, exam_results
- **Financial**: fee_structure, fee_payments
- **Administrative**: disciplinary_actions, infrastructure_issues
- **Placement**: placement_offers, placement_applications
- **Communication**: notifications, user_notifications, academic_calendar
- **Feedback**: course_feedback

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Student
- `GET /api/student/profile` - Get profile
- `GET /api/student/courses` - Get enrolled courses
- `GET /api/student/attendance` - Get attendance
- `GET /api/student/assignments` - Get assignments
- `POST /api/student/assignments` - Submit assignment
- `GET /api/student/examinations` - Get exams
- `GET /api/student/fees` - Get fees
- `GET /api/student/placement` - Get placements
- `GET /api/student/feedback` - Get feedback
- `GET /api/student/enrollment` - Get enrollment

### Faculty
- `GET /api/faculty/profile` - Get profile
- `GET /api/faculty/courses` - Get courses
- `GET /api/faculty/students` - Get students

### Common
- `GET /api/notifications` - Get notifications
- `GET /api/issues` - Get issues
- `POST /api/issues` - Report issue
- `GET /api/calendar` - Get calendar

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4.0
- **Database**: MySQL 8.0
- **Authentication**: JWT, bcryptjs
- **API**: Next.js API Routes
- **Database Driver**: mysql2

## 📚 Documentation

- [Installation Guide](INSTALLATION_GUIDE.md) - Detailed setup instructions
- [Database Setup](DATABASE_SETUP.md) - Database configuration guide
- [Student Portal Guide](STUDENT_PORTAL_GUIDE.md) - Student features documentation

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- HTTP-only cookies
- Role-based access control
- SQL injection prevention
- XSS protection

## 🎨 UI/UX Features

- Modern, clean interface
- Responsive design (mobile, tablet, desktop)
- Premium light theme with gradients
- Smooth animations and transitions
- Intuitive navigation
- Real-time notifications
- Interactive dashboards

## 📊 phpMyAdmin Access

Access your database at: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)

Database name: `smart_campus_db`

## 🧪 Testing

Test database connection:
```bash
node scripts/test-connection.js
```

Generate password hashes:
```bash
node scripts/hash-password.js mypassword
```

## 🚧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📝 License

This project is developed for SIMATS Engineering College.

## 👥 Support

For issues and questions:
1. Check the [Installation Guide](INSTALLATION_GUIDE.md)
2. Review [Database Setup](DATABASE_SETUP.md)
3. Check browser console for errors
4. Verify MySQL is running

## 🎉 Acknowledgments

Built with ❤️ for SIMATS Engineering College

---

**Version**: 1.0.0  
**Last Updated**: December 2024