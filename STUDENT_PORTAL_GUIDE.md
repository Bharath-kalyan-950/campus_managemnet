# Smart Campus - Student Portal Documentation

## 🎓 Complete Student Portal System

A comprehensive, modern student management portal with premium UI/UX design, built with Next.js 14, TypeScript, and Tailwind CSS.

---

## 📁 Project Structure

```
app/
├── page.tsx                              # Login Page (Landing)
├── not-found.tsx                         # 404 Error Page
├── error.tsx                             # Global Error Handler
├── dashboard/
│   ├── student/
│   │   ├── layout.tsx                    # Shared Layout (Sidebar + Header)
│   │   ├── page.tsx                      # Dashboard Home
│   │   ├── profile/page.tsx              # Student Profile
│   │   ├── courses/page.tsx              # Courses Management
│   │   ├── examination/page.tsx          # Exams & Results
│   │   ├── attendance/page.tsx           # Attendance & OD Requests
│   │   ├── fees/page.tsx                 # Fees & Finance
│   │   ├── placement/page.tsx            # Placement Drives
│   │   └── settings/page.tsx             # Settings & Preferences
│   ├── faculty/page.tsx                  # Faculty Dashboard
│   └── admin/page.tsx                    # Admin Dashboard
└── globals.css                           # Global Styles & Animations
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) to Purple (#8b5cf6) gradients
- **Success**: Emerald (#10b981)
- **Warning**: Orange (#f97316)
- **Danger**: Red (#ef4444)
- **Neutral**: Slate shades

### Components
- **Cards**: Rounded-2xl with shadow-lg
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Border-2 with focus rings
- **Tables**: Hover states with alternating rows
- **Modals**: Backdrop blur with smooth animations

---

## 📄 Page Details

### 1. Login Page (`/`)
**Features:**
- Single unified login form
- Auto-routing based on ID prefix:
  - `admin*` → Admin Dashboard
  - `fac*` or `prof*` → Faculty Dashboard
  - `stu*` or numeric → Student Dashboard
- Password visibility toggle
- Loading states
- Animated gradient background
- Responsive design

**Test Credentials:**
- Student: `stu123` / any password
- Faculty: `fac456` / any password
- Admin: `admin` / any password

---

### 2. Student Dashboard (`/dashboard/student`)
**Features:**
- Welcome message with student name
- 4 Quick stat cards:
  - Enrolled Courses (8)
  - Upcoming Exams (3)
  - Attendance (92%)
  - Pending Fees ($2,500)
- Today's schedule with time slots
- Recent activities feed
- Placement updates with apply buttons
- Quick action buttons
- Performance overview (CGPA, Rank, Credits)

**Components:**
- Stat cards with icons and gradients
- Schedule timeline
- Activity feed
- Placement cards with company logos

---

### 3. Profile Page (`/dashboard/student/profile`)
**Features:**
- Profile photo with upload button
- Edit mode toggle
- Personal Information:
  - First Name, Last Name
  - Email, Phone
  - Date of Birth, Blood Group
  - Address
- Emergency Contact details
- Academic Information (read-only):
  - Student ID, Registration No
  - Department, Year, Section
  - Batch, Mentor, CGPA
- Academic stats sidebar
- Save changes functionality

**Form Validation:**
- Required fields
- Email format validation
- Phone number format

---

### 4. Courses Page (`/dashboard/student/courses`)
**Features:**
- Course statistics (Total, Completed, In Progress, Credits)
- Course cards with:
  - Course code and title
  - Faculty name
  - Classroom and schedule
  - Progress bar
  - Credits badge
- "View Course Materials" modal with:
  - Lecture notes
  - Assignments
  - Videos
  - Reference materials
  - Download buttons

**Data Displayed:**
- 6 enrolled courses
- Progress tracking (55% - 85%)
- Total 21 credits

---

### 5. Examination Page (`/dashboard/student/examination`)
**Features:**
- Exam statistics dashboard
- **Exam Timetable:**
  - Subject, Code, Date, Time
  - Room allocation
  - Duration
  - Download Hall Ticket button
- **Internal Marks:**
  - Test 1, Test 2, Assignment scores
  - Total marks and percentage
  - Color-coded performance
- **Semester Results:**
  - Internal + External marks
  - Total score out of 150
  - Grade (A+, A, B+, etc.)
  - Credits
  - Performance bar graphs

**Visual Elements:**
- Color-coded grades
- Progress bars for each subject
- Downloadable hall ticket
- Results table with sorting

---

### 6. Attendance Page (`/dashboard/student/attendance`)
**Features:**
- Overall attendance percentage (92%)
- Classes attended/missed statistics
- **Course-wise Attendance:**
  - Subject name and code
  - Present/Total classes
  - Percentage with color indicators
  - Progress bars (Green: >80%, Orange: <80%)
- **Monthly Trend Chart:**
  - Last 6 months data
  - Visual progress bars
- **OD Request System:**
  - New request form with:
    - Event Name
    - Reason (textarea)
    - Date picker
    - Duration dropdown
  - Request history table
  - Status tracking (Approved/Pending/Rejected)
- Attendance goal tracker

**OD Request Statuses:**
- ✅ Approved (Green)
- ⏳ Pending (Orange)
- ❌ Rejected (Red)

---

### 7. Fees & Finance Page (`/dashboard/student/fees`)
**Features:**
- Financial overview:
  - Total Fees
  - Paid Amount
  - Pending Amount
  - Due Date
- **Fee Breakdown Table:**
  - Tuition, Lab, Library, Sports, Exam, Hostel fees
  - Individual amounts
  - Due dates
  - Payment status
- **Payment History:**
  - Transaction ID
  - Date and amount
  - Payment method
  - Download receipt button
- **Pie Chart:**
  - Visual representation of Paid vs Pending
  - Percentage display
- Quick action buttons
- Payment reminder alert

**Payment Methods:**
- Online
- Bank Transfer
- Cash

---

### 8. Placement Page (`/dashboard/student/placement`)
**Features:**
- Placement statistics
- **Job Drives:**
  - Company name and logo
  - Role and type (Full-time/Internship)
  - Package details
  - Location
  - Deadline countdown
  - Eligibility criteria
  - Apply button
- **Company Details Modal:**
  - Full job description
  - Requirements list
  - Package and location
  - Apply functionality
- **My Applications:**
  - Applied jobs table
  - Application status tracking
  - Date tracking
- **Training & Workshops:**
  - Upcoming sessions
  - Date, time, venue
  - Workshop type
- Placement statistics (Students placed, Avg package, Highest package)

**Job Drive Companies:**
- Google, Microsoft, Amazon, Meta
- Packages: $95K - $150K

---

### 9. Settings Page (`/dashboard/student/settings`)
**Features:**
- **Change Password:**
  - Current password
  - New password
  - Confirm password
  - Validation
- **Notification Preferences:**
  - Email notifications
  - SMS notifications
  - Push notifications
  - Specific alerts:
    - Exam reminders
    - Fee reminders
    - Placement updates
    - Attendance alerts
- **Appearance:**
  - Dark mode toggle (Coming Soon)
- **Account Actions:**
  - Logout button with confirmation

**Toggle Switches:**
- Custom styled toggles
- Smooth animations
- Instant feedback

---

### 10. System Pages

#### 404 Not Found (`/not-found`)
- Large 404 text with gradient
- Search icon emoji
- Helpful message
- Navigation buttons:
  - Go to Login
  - Go to Dashboard

#### Error Page (`/error`)
- Warning icon
- Error message display
- Error details in code block
- Action buttons:
  - Try Again
  - Go to Login

---

## 🎯 Shared Layout Features

### Sidebar Navigation
- Fixed left sidebar
- Logo and branding
- Menu items with icons:
  - Dashboard
  - Profile
  - Courses
  - Examination
  - Attendance
  - Fees & Finance
  - Placement
  - Settings
- Active state highlighting
- Logout button at bottom
- Mobile responsive (collapsible)

### Header Bar
- Page title
- Notification bell with:
  - Unread count badge
  - Dropdown with notifications
  - Mark as read functionality
- Profile dropdown with:
  - Student name and ID
  - Profile picture
  - Quick links (Profile, Settings)
  - Logout option
- Mobile menu toggle

### Notifications
- Real-time notification count
- Dropdown panel with:
  - Notification title
  - Message
  - Timestamp
  - Unread indicator
- "View All" link

---

## 🔄 Navigation Flow

```
Login (/)
  ↓
Student Dashboard (/dashboard/student)
  ├→ Profile (/dashboard/student/profile)
  ├→ Courses (/dashboard/student/courses)
  ├→ Examination (/dashboard/student/examination)
  ├→ Attendance (/dashboard/student/attendance)
  ├→ Fees (/dashboard/student/fees)
  ├→ Placement (/dashboard/student/placement)
  └→ Settings (/dashboard/student/settings)
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Collapsible sidebar
- Hamburger menu
- Stacked cards
- Touch-friendly buttons
- Optimized tables (horizontal scroll)

---

## 🎨 Animations & Transitions

### CSS Animations
- **Blob Animation**: Floating gradient orbs (7s infinite)
- **Fade In**: Smooth entry animations (0.3s)
- **Pulse**: Status indicators
- **Hover Effects**: Scale, shadow, translate

### Transitions
- All interactive elements: 200-300ms
- Smooth color changes
- Transform animations
- Opacity fades

---

## 🔐 Security Features

- Password visibility toggle
- Session timeout handling
- Logout confirmation
- Secure routing
- Form validation

---

## 📊 Data Visualization

### Charts & Graphs
- **Pie Chart**: Fee payment status
- **Bar Graphs**: Exam results performance
- **Progress Bars**: Course completion, Attendance
- **Line Trends**: Monthly attendance

### Color Coding
- **Green**: Good/Success (>80%)
- **Orange**: Warning (60-80%)
- **Red**: Critical (<60%)

---

## 🚀 Performance Optimizations

- Client-side rendering for interactivity
- Lazy loading for modals
- Optimized images
- Minimal re-renders
- Efficient state management

---

## 🎯 Key Features Summary

✅ **Complete Student Portal** with 9 pages
✅ **Responsive Design** for all devices
✅ **Modern UI/UX** with premium styling
✅ **Interactive Components** (modals, dropdowns, forms)
✅ **Data Visualization** (charts, graphs, progress bars)
✅ **Form Handling** (validation, submission)
✅ **Navigation System** (sidebar, header, routing)
✅ **Notification System** (real-time updates)
✅ **Error Handling** (404, error pages)
✅ **Settings Management** (password, notifications)

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Emoji-based (universal compatibility)
- **Routing**: Next.js App Router
- **State**: React useState hooks
- **Forms**: Controlled components

---

## 📝 Usage Instructions

### Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

### Login Credentials

Use any of these prefixes:
- **Student**: `stu123`, `stu456`, or any number
- **Faculty**: `fac123`, `prof456`
- **Admin**: `admin`, `admin123`

Password: Any value (authentication not implemented)

---

## 🎓 Student Portal Features Checklist

- ✅ Dashboard with stats and quick actions
- ✅ Profile management with edit functionality
- ✅ Course enrollment and materials
- ✅ Exam timetable and results
- ✅ Attendance tracking and OD requests
- ✅ Fee payment and history
- ✅ Placement drives and applications
- ✅ Settings and preferences
- ✅ Notification system
- ✅ Error handling (404, errors)
- ✅ Responsive design
- ✅ Modern UI/UX

---

## 📞 Support

For any issues or questions, contact the administrator through the "Contact Administrator" link in the login page or settings.

---

**Built with ❤️ for Smart Campus Management System**
