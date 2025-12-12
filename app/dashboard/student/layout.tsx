'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showInfraSubmenu, setShowInfraSubmenu] = useState(false);

  const menuItems = [
    { name: 'Home', icon: '🏠', path: '/dashboard/student' },
    { name: 'My Course', icon: '📚', path: '/dashboard/student/courses' },
    { name: 'My Course Feedback', icon: '📝', path: '/dashboard/student/feedback' },
    { name: 'Enrollment', icon: '✍️', path: '/dashboard/student/enrollment' },
    { name: 'Attendance', icon: '📅', path: '/dashboard/student/attendance' },
    { name: 'Assignment', icon: '📄', path: '/dashboard/student/assignment' },
    { name: 'Examination', icon: '📋', path: '/dashboard/student/examination' },
    { name: 'Financial Record', icon: '💰', path: '/dashboard/student/fees' },
    { name: 'Placement', icon: '💼', path: '/dashboard/student/placement' },
    { name: 'Disciplinary', icon: '⚖️', path: '/dashboard/student/disciplinary' },
    { name: 'Offer', icon: '🎁', path: '/dashboard/student/offers' },
    { name: 'My Profile', icon: '👤', path: '/dashboard/student/profile' },
  ];

  const infraIssueSubmenu = [
    { name: 'Raise Issue', path: '/dashboard/student/issues/raise' },
    { name: 'View Issue Solution', path: '/dashboard/student/issues/view' },
  ];

  const notifications = [
    { id: 1, title: 'Assignment Due Tomorrow', message: 'Data Structures Assignment', time: '2 hours ago', unread: true },
    { id: 2, title: 'Exam Schedule Released', message: 'Mid-term exams start next week', time: '5 hours ago', unread: true },
    { id: 3, title: 'Fee Payment Reminder', message: 'Due date: 15th March', time: '1 day ago', unread: false },
  ];

  const handleLogout = () => {
    router.push('/');
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
              {menuItems.map((item) => (
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
              
              {/* Raise Infra Issue with Submenu */}
              <li>
                <button
                  onClick={() => setShowInfraSubmenu(!showInfraSubmenu)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all text-left ${
                    pathname.startsWith('/dashboard/student/issues')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">🔧</span>
                    <span className="font-medium text-sm">Raise Infra Issue</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${showInfraSubmenu ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Submenu */}
                {showInfraSubmenu && (
                  <ul className="mt-1 ml-8 space-y-1">
                    {infraIssueSubmenu.map((subItem) => (
                      <li key={subItem.path}>
                        <button
                          onClick={() => {
                            router.push(subItem.path);
                            setSidebarOpen(false);
                          }}
                          className={`flex items-center w-full px-4 py-2 rounded-lg transition-all text-left text-sm ${
                            pathname === subItem.path
                              ? 'bg-blue-100 text-blue-700 font-semibold'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <span className="mr-2">•</span>
                          {subItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
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
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                      <div className="p-4 border-b border-slate-200">
                        <h3 className="font-bold text-slate-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${
                              notif.unread ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {notif.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 text-sm">{notif.title}</h4>
                                <p className="text-sm text-slate-600">{notif.message}</p>
                                <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center border-t border-slate-200">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                          View All Notifications
                        </button>
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
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                        JD
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-bold text-slate-900">John Doe</p>
                        <p className="text-xs text-slate-600">Student</p>
                      </div>
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                      <div className="p-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            JD
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">John Doe</h3>
                            <p className="text-sm text-slate-600">Student ID: STU2024001</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            router.push('/dashboard/student/profile');
                            setShowProfile(false);
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => {
                            router.push('/dashboard/student/settings');
                            setShowProfile(false);
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium"
                        >
                          Settings
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
