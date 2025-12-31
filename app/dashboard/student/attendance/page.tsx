'use client';

import { useState, useEffect } from 'react';

export default function StudentAttendancePage() {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/api/student/profile');
      const data = await response.json();
      
      if (data.success) {
        setUserInfo(data.data);
        fetchAttendanceData(data.data.student_id);
      } else {
        console.error('Failed to fetch user info:', data.error || 'Unknown error');
        // Fallback to John Doe for development
        fetchAttendanceData('STU2024001');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      // Fallback to John Doe for development
      fetchAttendanceData('STU2024001');
    }
  };

  const fetchAttendanceData = async (studentId) => {
    try {
      const response = await fetch(`/api/student/attendance?student_id=${studentId}`);
      const data = await response.json();
      
      if (data.success) {
        setAttendanceData(data.data);
      } else {
        console.error('Failed to fetch attendance data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceColor = (percentage) => {
    const numPercentage = parseFloat(percentage) || 0;
    if (numPercentage >= 90) return 'text-green-600 bg-green-100';
    if (numPercentage >= 80) return 'text-blue-600 bg-blue-100';
    if (numPercentage >= 70) return 'text-yellow-600 bg-yellow-100';
    if (numPercentage >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">📊 My Attendance</h1>
        <p className="text-slate-600">Track your course-wise attendance and exam eligibility</p>
      </div>

      {/* Overall Statistics */}
      {attendanceData?.overall_stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Courses</p>
                <p className="text-2xl font-bold text-slate-900">{attendanceData.overall_stats.total_courses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Overall Attendance</p>
                <p className="text-2xl font-bold text-slate-900">
                  {parseFloat(attendanceData.overall_stats.overall_percentage || 0).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Eligible Courses</p>
                <p className="text-2xl font-bold text-green-600">{attendanceData.overall_stats.eligible_courses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">At Risk</p>
                <p className="text-2xl font-bold text-red-600">{attendanceData.overall_stats.ineligible_courses}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course-wise Attendance */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Course-wise Attendance</h2>
          <p className="text-slate-600">Your attendance percentage for each enrolled course</p>
        </div>
        
        <div className="p-6">
          {attendanceData?.courses?.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📚</span>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Courses Found</h3>
              <p className="text-slate-600">You are not enrolled in any courses yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attendanceData?.courses?.map((course) => (
                <div
                  key={course.course_code}
                  className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900">{course.course_code}</h3>
                      <p className="text-sm text-slate-600">{course.course_name}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {course.credits} credits • Slot {course.slot}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getAttendanceColor(course.attendance_percentage)}`}>
                        {parseFloat(course.attendance_percentage || 0).toFixed(1)}%
                      </span>
                      <p className="text-xs text-slate-500 mt-1">{course.attendance_grade}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Sessions Attended:</span>
                      <span className="font-semibold">{course.attended_sessions}/{course.total_sessions}</span>
                    </div>
                    
                    {course.late_sessions > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Late Sessions:</span>
                        <span className="text-yellow-600 font-semibold">{course.late_sessions}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Exam Eligibility:</span>
                      <span className={`font-semibold ${
                        course.exam_eligibility === 'Eligible' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {course.exam_eligibility}
                      </span>
                    </div>
                    
                    <div className="text-xs text-slate-500 mt-2">
                      Faculty: {course.faculty_name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}