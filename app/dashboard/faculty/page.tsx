'use client';

import { useState, useEffect } from 'react';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  facultyId: string;
}

export default function FacultyDashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
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
        console.error('Failed to fetch user info:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFullName = () => {
    if (loading) return 'Loading...';
    if (!userInfo) return 'Faculty Member';
    return `${userInfo.firstName} ${userInfo.lastName}`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Welcome back, {getFullName()}
        </h1>
        <p className="text-slate-600 text-lg">Faculty Portal Dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Courses</p>
              <h3 className="text-3xl font-bold mt-2">5</h3>
            </div>
            <div className="text-4xl opacity-80">📚</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Students</p>
              <h3 className="text-3xl font-bold mt-2">180</h3>
            </div>
            <div className="text-4xl opacity-80">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Pending Tasks</p>
              <h3 className="text-3xl font-bold mt-2">12</h3>
            </div>
            <div className="text-4xl opacity-80">📋</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Attendance Rate</p>
              <h3 className="text-3xl font-bold mt-2">92%</h3>
            </div>
            <div className="text-4xl opacity-80">📊</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
            <div className="text-2xl">📅</div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">Mark Attendance</h3>
              <p className="text-sm text-slate-600">Record student attendance</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group">
            <div className="text-2xl">📄</div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600">Create Assignment</h3>
              <p className="text-sm text-slate-600">Add new assignment</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all group">
            <div className="text-2xl">📊</div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 group-hover:text-purple-600">Enter Marks</h3>
              <p className="text-sm text-slate-600">Update internal marks</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all group">
            <div className="text-2xl">👁️</div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 group-hover:text-orange-600">Student 360° View</h3>
              <p className="text-sm text-slate-600">View student details</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-red-500 hover:bg-red-50 transition-all group">
            <div className="text-2xl">🔧</div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 group-hover:text-red-600">Raise Issue</h3>
              <p className="text-sm text-slate-600">Report infrastructure issue</p>
            </div>
          </button>

          <a href="/dashboard/faculty/classroom-request" className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
            <div className="text-2xl">🏫</div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600">Request Classroom</h3>
              <p className="text-sm text-slate-600">AI-powered room allocation</p>
            </div>
          </a>

          <button className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all group">
            <div className="text-2xl">🎓</div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 group-hover:text-purple-600">View Results</h3>
              <p className="text-sm text-slate-600">Check exam results</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-slate-900 font-medium">Attendance marked for CS301 - Data Structures</p>
              <p className="text-sm text-slate-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-slate-900 font-medium">Assignment submitted by 45 students</p>
              <p className="text-sm text-slate-600">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-slate-900 font-medium">Internal marks updated for CS302</p>
              <p className="text-sm text-slate-600">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
