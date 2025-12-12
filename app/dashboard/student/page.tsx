'use client';

export default function StudentDashboard() {
  const studentName = "John Doe";

  const quickStats = [
    { title: 'Enrolled Courses', value: '8', icon: '📚', color: 'from-blue-500 to-blue-600', change: '+2 this sem' },
    { title: 'Upcoming Exams', value: '3', icon: '📝', color: 'from-purple-500 to-purple-600', change: 'Next week' },
    { title: 'Attendance', value: '92%', icon: '📅', color: 'from-emerald-500 to-emerald-600', change: '+3% this month' },
    { title: 'Pending Fees', value: '$2,500', icon: '💰', color: 'from-orange-500 to-orange-600', change: 'Due: Mar 15' },
  ];

  const upcomingSchedule = [
    { time: '09:00 AM', subject: 'Data Structures', room: 'Room 301', type: 'Lecture' },
    { time: '11:00 AM', subject: 'Database Systems', room: 'Lab 2', type: 'Lab' },
    { time: '02:00 PM', subject: 'Web Development', room: 'Room 205', type: 'Lecture' },
    { time: '04:00 PM', subject: 'Soft Skills Training', room: 'Auditorium', type: 'Workshop' },
  ];

  const placementUpdates = [
    { company: 'Google', role: 'Software Engineer', deadline: '2 days left', logo: '🔵' },
    { company: 'Microsoft', role: 'Cloud Developer', deadline: '5 days left', logo: '🟦' },
    { company: 'Amazon', role: 'Full Stack Developer', deadline: '1 week left', logo: '🟧' },
  ];

  const recentActivities = [
    { action: 'Assignment submitted', course: 'Data Structures', time: '2 hours ago' },
    { action: 'Attendance marked', course: 'Database Systems', time: '5 hours ago' },
    { action: 'Fee payment received', course: 'Semester Fee', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {studentName}! 👋</h1>
            <p className="text-blue-100">Here's what's happening with your academics today</p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-blue-100">Current Semester</p>
              <p className="text-2xl font-bold">Spring 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                {stat.icon}
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Schedule & Activities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Today's Schedule</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">View All</button>
            </div>
            <div className="space-y-3">
              {upcomingSchedule.map((schedule, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-600">{schedule.time.split(' ')[0]}</div>
                    <div className="text-xs text-slate-500">{schedule.time.split(' ')[1]}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{schedule.subject}</h3>
                    <p className="text-sm text-slate-600">{schedule.room} • {schedule.type}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    schedule.type === 'Lecture' ? 'bg-blue-100 text-blue-600' :
                    schedule.type === 'Lab' ? 'bg-purple-100 text-purple-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {schedule.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activities</h2>
            <div className="space-y-3">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-sm">{activity.action}</h3>
                    <p className="text-sm text-slate-600">{activity.course}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Placement & Quick Actions */}
        <div className="space-y-6">
          {/* Placement Updates */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Placement Updates</h2>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">3 New</span>
            </div>
            <div className="space-y-3">
              {placementUpdates.map((update, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{update.logo}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900">{update.company}</h3>
                      <p className="text-sm text-slate-600">{update.role}</p>
                      <p className="text-xs text-orange-600 font-semibold mt-1">⏰ {update.deadline}</p>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition">
                <span className="text-2xl">📖</span>
                <span className="text-xs font-semibold text-slate-700">View Courses</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition">
                <span className="text-2xl">📝</span>
                <span className="text-xs font-semibold text-slate-700">Exams</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition">
                <span className="text-2xl">💳</span>
                <span className="text-xs font-semibold text-slate-700">Pay Fees</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition">
                <span className="text-2xl">📄</span>
                <span className="text-xs font-semibold text-slate-700">Results</span>
              </button>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-lg font-bold mb-4">Performance Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">CGPA</span>
                <span className="text-2xl font-bold">8.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">Rank</span>
                <span className="text-2xl font-bold">12/150</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">Credits</span>
                <span className="text-2xl font-bold">120/180</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
