'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  facultyId: string;
}

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCourseSubmenu, setShowCourseSubmenu] = useState(false);
  const [showAttendanceSubmenu, setShowAttendanceSubmenu] = useState(false);
  const [showNoDueSubmenu, setShowNoDueSubmenu] = useState(false);
  const [showAssignmentSubmenu, setShowAssignmentSubmenu] = useState(false);
  const [showInternalMarksSubmenu, setShowInternalMarksSubmenu] = useState(false);
  const [showDisciplinarySubmenu, setShowDisciplinarySubmenu] = useState(false);
  const [showRaiseInfraSubmenu, setShowRaiseInfraSubmenu] = useState(false);
  const [showResultSubmenu, setShowResultSubmenu] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [classroomNotifications, setClassroomNotifications] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchUserInfo();
    fetchClassroomNotifications();
    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchClassroomNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchClassroomNotifications = async () => {
    try {
      const response = await fetch('/api/classroom-agent/notifications?recipient_type=faculty');
      const data = await response.json();
      
      if (data.success) {
        const notifications = data.data || [];
        setClassroomNotifications(notifications);
        // Count unread notifications (created in last 24 hours)
        const unreadCount = notifications.filter(n => {
          const createdAt = new Date(n.created_at);
          const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
          return createdAt > oneDayAgo;
        }).length;
        setNotificationCount(unreadCount);
      }
    } catch (error) {
      console.error('Error fetching classroom notifications:', error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/api/faculty/profile');
      const data = await response.json();
      
      if (data.success) {
        setUserInfo({
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          email: data.data.email,
          facultyId: data.data.faculty_id
        });
      } else {
        console.error('Failed to fetch faculty profile:', data.message);
      }
    } catch (error) {
      console.error('Error fetching faculty user info:', error);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  const menuItems = [
    { name: 'Home', icon: '🏠', path: '/dashboard/faculty' },
    { name: 'Formative Marks', icon: '📈', path: '/dashboard/faculty/formative-marks' },
    { name: "Student 360° View", icon: '👁️', path: '/dashboard/faculty/student-view' },
    { name: 'Others', icon: '📋', path: '/dashboard/faculty/others' },
    { name: 'My Profile', icon: '👤', path: '/dashboard/faculty/profile' },
  ];

  // Helper functions - defined before use
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const isRecentNotification = (dateString: string) => {
    const date = new Date(dateString);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return date > oneDayAgo;
  };

  // Combine classroom notifications with general notifications
  const generalNotifications = [
    { id: 'gen1', title: 'New Assignment Submission', message: 'Student submitted assignment', time: '1 hour ago', unread: true, type: 'assignment' },
    { id: 'gen2', title: 'Attendance Reminder', message: 'Mark attendance for today', time: '3 hours ago', unread: true, type: 'attendance' },
    { id: 'gen3', title: 'Meeting Schedule', message: 'Faculty meeting at 3 PM', time: '5 hours ago', unread: false, type: 'meeting' },
  ];

  // Format classroom notifications
  const formattedClassroomNotifications = classroomNotifications.map(notif => ({
    id: notif.notification_id,
    title: notif.title,
    message: notif.message,
    time: formatTimeAgo(notif.created_at),
    unread: isRecentNotification(notif.created_at),
    type: 'classroom'
  }));

  // Combine all notifications
  const allNotifications = [...formattedClassroomNotifications, ...generalNotifications];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-full overflow-y-auto bg-white border-r border-slate-200 shadow-xl">
          {/* Logo */}
          <div className="px-4 py-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <img 
                  src="https://simatscgpa.netlify.app/logo2.png" 
                  alt="SIMATS Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-blue-600">SIMATS</h1>
                <p className="text-xs text-blue-500 font-semibold tracking-wider">ENGINEERING</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="px-3 py-4">
            <ul className="space-y-1">
              {/* Home - First Item */}
              <li>
                <button
                  onClick={() => {
                    router.push('/dashboard/faculty');
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-xl transition-all text-left group ${
                    pathname === '/dashboard/faculty'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg mr-3">🏠</span>
                  <span className="font-medium text-sm">Home</span>
                </button>
              </li>

              {/* Course with Submenu - Second Item */}
              <li>
                <button
                  onClick={() => setShowCourseSubmenu(!showCourseSubmenu)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all text-left ${
                    pathname.startsWith('/dashboard/faculty/course')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">📚</span>
                    <span className="font-medium text-sm">Course</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${showCourseSubmenu ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Course Submenu */}
                {showCourseSubmenu && (
                  <ul className="mt-1 ml-8 space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/course/create');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/course/create'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Create Course
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/course/view');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/course/view'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        View Course
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/course/approve');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/course/approve'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Course Approve
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* Attendance with Submenu - Third Item */}
              <li>
                <button
                  onClick={() => setShowAttendanceSubmenu(!showAttendanceSubmenu)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all text-left ${
                    pathname.startsWith('/dashboard/faculty/attendance')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">📅</span>
                    <span className="font-medium text-sm">Attendance</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${showAttendanceSubmenu ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Attendance Submenu */}
                {showAttendanceSubmenu && (
                  <ul className="mt-1 ml-8 space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/attendance/marking');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/attendance/marking'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Attendance Marking
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/attendance/grade');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/attendance/grade'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Grade
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/attendance/od-approval');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/attendance/od-approval'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        OD Approval
                        <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">New</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/attendance/course');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/attendance/course'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Course Attendance
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/attendance/student');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/attendance/student'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Student Attendance
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* No Due with Submenu */}
              <li>
                <button
                  onClick={() => setShowNoDueSubmenu(!showNoDueSubmenu)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all text-left ${
                    pathname.startsWith('/dashboard/faculty/nodue')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">✅</span>
                    <span className="font-medium text-sm">No Due</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${showNoDueSubmenu ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showNoDueSubmenu && (
                  <ul className="mt-1 ml-8 space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/nodue/approval');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/nodue/approval'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        No Due Approval
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/nodue/approved-rejected');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/nodue/approved-rejected'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        No Due Approval / Rejected List
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* Assignment with Submenu */}
              <li>
                <button
                  onClick={() => setShowAssignmentSubmenu(!showAssignmentSubmenu)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all text-left ${
                    pathname.startsWith('/dashboard/faculty/assignment')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">📄</span>
                    <span className="font-medium text-sm">Assignment</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${showAssignmentSubmenu ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showAssignmentSubmenu && (
                  <ul className="mt-1 ml-8 space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/assignment/publish');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/assignment/publish'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Publish Assignment
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/assignment/approve');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/assignment/approve'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Approve Assignment
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/assignment/upload');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/assignment/upload'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Upload Content
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* Internal Marks with Submenu */}
              <li>
                <button
                  onClick={() => setShowInternalMarksSubmenu(!showInternalMarksSubmenu)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all text-left ${
                    pathname.startsWith('/dashboard/faculty/internal-marks')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">📊</span>
                    <span className="font-medium text-sm">Internal Marks</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${showInternalMarksSubmenu ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showInternalMarksSubmenu && (
                  <ul className="mt-1 ml-8 space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/internal-marks/declare');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/internal-marks/declare'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Declare & Enter Marks
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/internal-marks/edit');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/internal-marks/edit'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Edit or Update Marks
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/internal-marks/view');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/internal-marks/view'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        View Marks
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/internal-marks/compute');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/internal-marks/compute'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Compute IA Weightage
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/internal-marks/final');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/internal-marks/final'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        View Final IA
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* Disciplinary with Submenu */}
              <li>
                <button
                  onClick={() => setShowDisciplinarySubmenu(!showDisciplinarySubmenu)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all text-left ${
                    pathname.startsWith('/dashboard/faculty/disciplinary')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">⚖️</span>
                    <span className="font-medium text-sm">Disciplinary</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${showDisciplinarySubmenu ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDisciplinarySubmenu && (
                  <ul className="mt-1 ml-8 space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/disciplinary/entry');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/disciplinary/entry'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Disciplinary Entry
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/disciplinary/action-taken');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/disciplinary/action-taken'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Disciplinary Action Taken
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* Raise Infra Issue with Submenu */}
              <li>
                <button
                  onClick={() => setShowRaiseInfraSubmenu(!showRaiseInfraSubmenu)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all text-left ${
                    pathname.startsWith('/dashboard/faculty/issues')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">🔧</span>
                    <span className="font-medium text-sm">Raise Infra Issue</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${showRaiseInfraSubmenu ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showRaiseInfraSubmenu && (
                  <ul className="mt-1 ml-8 space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/issues/raise');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/issues/raise'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Raise Issue
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/issues/view');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/issues/view'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        View Issue Solution
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* Result with Submenu */}
              <li>
                <button
                  onClick={() => setShowResultSubmenu(!showResultSubmenu)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all text-left ${
                    pathname.startsWith('/dashboard/faculty/result')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">🎓</span>
                    <span className="font-medium text-sm">Result</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${showResultSubmenu ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showResultSubmenu && (
                  <ul className="mt-1 ml-8 space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/result/view');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/result/view'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        View Result
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          router.push('/dashboard/faculty/result/analysis');
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                          pathname === '/dashboard/faculty/result/analysis'
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mr-2">•</span>
                        Result Analysis
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* Classroom Request */}
              <li>
                <button
                  onClick={() => {
                    router.push('/dashboard/faculty/classroom-request');
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-xl transition-all text-left group ${
                    pathname === '/dashboard/faculty/classroom-request'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg mr-3">🏫</span>
                  <span className="font-medium text-sm">Classroom Request</span>
                </button>
              </li>

              {/* Rest of Menu Items */}
              {menuItems.slice(1).map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      router.push(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all text-left group ${
                      pathname === item.path
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Page Title */}
              <div className="hidden lg:block">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {menuItems.find(item => item.path === pathname)?.name || 'Home'}
                </h2>
              </div>

              {/* Right Side - Notifications & Profile */}
              <div className="flex items-center gap-3">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {(notificationCount + allNotifications.filter(n => n.unread).length) > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                        {Math.min(notificationCount + allNotifications.filter(n => n.unread).length, 9)}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                      <div className="p-4 border-b border-slate-200">
                        <h3 className="font-bold text-slate-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {allNotifications.length === 0 ? (
                          <div className="p-8 text-center text-slate-500">
                            <div className="text-4xl mb-2">🔔</div>
                            <p>No notifications yet</p>
                          </div>
                        ) : (
                          allNotifications.map((notif) => (
                            <div
                              key={notif.id}
                              className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${
                                notif.unread ? 'bg-blue-50/50' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                  {notif.type === 'classroom' && <span className="text-lg">🏫</span>}
                                  {notif.type === 'assignment' && <span className="text-lg">📄</span>}
                                  {notif.type === 'attendance' && <span className="text-lg">📅</span>}
                                  {notif.type === 'meeting' && <span className="text-lg">👥</span>}
                                </div>
                                {notif.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-slate-900 text-sm truncate">{notif.title}</h4>
                                  <p className="text-sm text-slate-600 line-clamp-2">{notif.message}</p>
                                  <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-2 hover:bg-slate-100 rounded-lg p-2 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                        {userInfo ? getInitials(userInfo.firstName, userInfo.lastName) : 'FA'}
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-bold text-slate-900">
                          {userInfo ? getFullName(userInfo.firstName, userInfo.lastName).toUpperCase() : 'Loading...'}
                        </p>
                        <p className="text-xs text-slate-600">Faculty</p>
                      </div>
                    </div>
                  </button>

                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                      <div className="p-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {userInfo ? getInitials(userInfo.firstName, userInfo.lastName) : 'FA'}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">
                              {userInfo ? getFullName(userInfo.firstName, userInfo.lastName) : 'Loading...'}
                            </h3>
                            <p className="text-sm text-slate-600">
                              Faculty ID: {userInfo ? userInfo.facultyId : 'Loading...'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            router.push('/dashboard/faculty/profile');
                            setShowProfile(false);
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 font-medium"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
