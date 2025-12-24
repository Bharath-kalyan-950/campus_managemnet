'use client';

import { useState, useEffect } from 'react';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
}

interface ClassroomSchedule {
  allocation_id: string;
  room_name: string;
  building: string;
  course_name: string;
  course_code: string;
  faculty_name: string;
  start_time: string;
  end_time: string;
  status: string;
  allocation_type: string;
  allocated_date: string;
}

export default function StudentDashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [classroomSchedule, setClassroomSchedule] = useState<ClassroomSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set current date on client side to avoid hydration mismatch
    setIsClient(true);
    setCurrentDate(new Date().toLocaleDateString());
    fetchUserInfo();
    fetchClassroomSchedule();
  }, []);

  // Utility function to format time consistently
  const formatTime = (timeString: string) => {
    if (!isClient) return timeString; // Return raw time on server
    try {
      return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return timeString; // Fallback to raw time if parsing fails
    }
  };

  const fetchClassroomSchedule = async () => {
    try {
      setLoading(true);
      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch approved classroom allocations for today
      const response = await fetch(`/api/classroom-agent/allocations?date=${today}&status=scheduled`);
      const data = await response.json();
      
      if (data.success) {
        setClassroomSchedule(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching classroom schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/api/student/profile');
      const data = await response.json();
      
      if (data.success) {
        setUserInfo({
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          email: data.data.email,
          studentId: data.data.student_id
        });
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const getFullName = () => {
    if (!userInfo) return 'Student';
    return `${userInfo.firstName} ${userInfo.lastName}`;
  };

  const quickStats = [
    { title: 'Enrolled Courses', value: '8', icon: '📚', color: 'from-blue-500 to-blue-600', change: '+2 this sem' },
    { title: 'Upcoming Exams', value: '3', icon: '📝', color: 'from-purple-500 to-purple-600', change: 'Next week' },
    { title: 'Attendance', value: '92%', icon: '📅', color: 'from-emerald-500 to-emerald-600', change: '+3% this month' },
    { title: 'Pending Fees', value: '$2,500', icon: '💰', color: 'from-orange-500 to-orange-600', change: 'Due: Mar 15' },
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
            <h1 className="text-3xl font-bold mb-2">Welcome back, {getFullName()}! 👋</h1>
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
          {/* My Classroom Schedule */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏫</span>
                <h2 className="text-xl font-bold text-slate-900">My Classroom Schedule</h2>
              </div>
              <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {currentDate || 'Today'}
              </span>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-slate-600">Loading schedule...</span>
              </div>
            ) : classroomSchedule.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Classes Today</h3>
                <p className="text-slate-600">Enjoy your free day! Check back tomorrow for your schedule.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {classroomSchedule
                  .sort((a, b) => a.start_time.localeCompare(b.start_time))
                  .map((schedule, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all">
                    <div className="text-center min-w-[80px]">
                      <div className="text-sm font-bold text-blue-600">
                        {formatTime(schedule.start_time)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatTime(schedule.end_time)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{schedule.course_name || schedule.course_code}</h3>
                      <p className="text-sm text-slate-700">
                        <span className="font-medium">{schedule.room_name}</span> • {schedule.building}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        Faculty: {schedule.faculty_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        schedule.allocation_type === 'regular' ? 'bg-green-100 text-green-700' :
                        schedule.allocation_type === 'makeup' ? 'bg-orange-100 text-orange-700' :
                        schedule.allocation_type === 'extra' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {schedule.allocation_type || 'Regular'}
                      </span>
                      <div className="text-xs text-slate-500 mt-1">
                        {schedule.status === 'scheduled' ? '📅 Scheduled' :
                         schedule.status === 'ongoing' ? '🟢 Ongoing' :
                         schedule.status === 'completed' ? '✅ Completed' : '📋 ' + schedule.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
              <a href="/dashboard/student/classroom-schedule" className="flex flex-col items-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition">
                <span className="text-2xl">🏫</span>
                <span className="text-xs font-semibold text-slate-700">Schedule</span>
              </a>
              <button className="flex flex-col items-center gap-2 p-4 bg-pink-50 hover:bg-pink-100 rounded-xl transition">
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
