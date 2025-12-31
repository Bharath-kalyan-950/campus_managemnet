'use client';

import { useState, useEffect } from 'react';

export default function AttendanceMarkingPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolledStudents, setEnrolledStudents] = useState<any[]>([]);
  const [facultyId, setFacultyId] = useState('');
  const [attendanceData, setAttendanceData] = useState<{[key: string]: string}>({});
  const [sessionData, setSessionData] = useState({
    session_date: new Date().toISOString().split('T')[0],
    session_type: 'lecture',
    session_topic: '',
    session_duration: 60
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get faculty ID from session with multiple fallback methods
    let facultyIdToUse = 'FAC2024001'; // Default fallback
    
    try {
      // Method 1: Try localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        facultyIdToUse = user.faculty_id || user.registration_number || facultyIdToUse;
      }
      
      // Method 2: Try sessionStorage
      if (facultyIdToUse === 'FAC2024001') {
        const sessionUserStr = sessionStorage.getItem('user');
        if (sessionUserStr) {
          const sessionUser = JSON.parse(sessionUserStr);
          facultyIdToUse = sessionUser.faculty_id || sessionUser.registration_number || facultyIdToUse;
        }
      }
      
    } catch (error) {
      console.error('Error getting faculty ID from storage:', error);
      // Use default fallback
    }
    
    setFacultyId(facultyIdToUse);
  }, []);

  useEffect(() => {
    if (facultyId) {
      fetchFacultyCourses();
    }
  }, [facultyId]);

  useEffect(() => {
    if (selectedCourse) {
      fetchEnrolledStudents();
    }
  }, [selectedCourse]);

  const fetchFacultyCourses = async () => {
    try {
      const response = await fetch(`/api/faculty/courses/my-courses?faculty_id=${facultyId}`);
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data.courses);
      } else {
        console.error('Failed to fetch courses:', data.error);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchEnrolledStudents = async () => {
    try {
      const response = await fetch(`/api/faculty/students?course_code=${selectedCourse}&faculty_id=${facultyId}`);
      const data = await response.json();
      
      if (data.success) {
        // Ensure attendance_percentage is always a number
        const studentsWithSafeData = data.data.map(student => ({
          ...student,
          attendance_percentage: parseFloat(student.attendance_percentage) || 0,
          total_sessions: parseInt(student.total_sessions) || 0,
          attended_sessions: parseInt(student.attended_sessions) || 0
        }));
        
        setEnrolledStudents(studentsWithSafeData);
      } else {
        console.error('Failed to fetch students:', data.error);
      }
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
    }
  };

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    setShowCourseDropdown(false);
    setAttendanceData({}); // Reset attendance data when course changes
  };

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = async () => {
    if (!selectedCourse || enrolledStudents.length === 0) {
      alert('Please select a course and ensure students are enrolled');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // First create the session
      const sessionResponse = await fetch('/api/faculty/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_session',
          faculty_id: facultyId,
          course_code: selectedCourse,
          session_date: sessionData.session_date,
          session_time: new Date().toTimeString().split(' ')[0], // Current time
          session_topic: sessionData.session_topic || 'Class Session',
          session_type: sessionData.session_type,
          session_duration: sessionData.session_duration
        })
      });

      const sessionResult = await sessionResponse.json();
      
      if (!sessionResult.success) {
        throw new Error(sessionResult.error || 'Failed to create session');
      }

      const sessionId = sessionResult.data.session_id;

      // Prepare attendance data for all students
      const attendanceRecords = enrolledStudents.map(student => ({
        student_id: student.student_id,
        attendance_status: attendanceData[student.student_id] || 'absent',
        notes: null
      }));

      // Mark attendance
      const attendanceResponse = await fetch('/api/faculty/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'mark_attendance',
          session_id: sessionId,
          faculty_id: facultyId,
          attendance_data: attendanceRecords
        })
      });

      const attendanceResult = await attendanceResponse.json();
      
      if (attendanceResult.success) {
        // Show success message without debug info
        alert('✅ Attendance marked successfully!');
        
        // Reset form
        setAttendanceData({});
        setSessionData({
          session_date: new Date().toISOString().split('T')[0],
          session_type: 'lecture',
          session_topic: '',
          session_duration: 60
        });
        
        // Refresh enrolled students to get updated attendance stats
        fetchEnrolledStudents();
      } else {
        throw new Error(attendanceResult.error || 'Failed to mark attendance');
      }

    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Attendance Marking</h1>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        {/* Course Selection */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Course
          </label>
          <div className="relative">
            <button
              onClick={() => setShowCourseDropdown(!showCourseDropdown)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg text-left bg-white hover:border-blue-500 focus:outline-none focus:border-blue-500 transition flex items-center justify-between"
            >
              <span className={selectedCourse ? 'text-slate-900 font-medium' : 'text-slate-500'}>
                {selectedCourse || '--Select--'}
              </span>
              <svg
                className={`w-5 h-5 transition-transform ${showCourseDropdown ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showCourseDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-300 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                <div className="p-2">
                  <button
                    onClick={() => handleCourseSelect('')}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 rounded-lg transition text-slate-900 font-medium"
                  >
                    --Select--
                  </button>
                  {courses.map((course, index) => (
                    <button
                      key={index}
                      onClick={() => handleCourseSelect(course.course_code)}
                      className={`w-full px-4 py-2 text-left hover:bg-blue-50 rounded-lg transition ${
                        selectedCourse === course.course_code ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-slate-900'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{course.course_code} - {course.course_name}</div>
                        <div className="text-xs text-slate-500">Slot {course.slot} • {course.current_enrolled} enrolled</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Empty State or Content */}
        {!selectedCourse ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Course</h3>
            <p className="text-slate-600">Please select a course from the dropdown above to mark attendance</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Course Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Selected Course</h3>
              <p className="text-blue-700 font-semibold">{selectedCourse}</p>
            </div>

            {/* Date Selection */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={sessionData.session_date}
                  onChange={(e) => setSessionData({...sessionData, session_date: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Session Type
                </label>
                <select 
                  value={sessionData.session_type}
                  onChange={(e) => setSessionData({...sessionData, session_type: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
                >
                  <option value="lecture">Lecture</option>
                  <option value="lab">Lab</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="exam">Exam</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={sessionData.session_duration}
                  onChange={(e) => setSessionData({...sessionData, session_duration: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
                  min="30"
                  max="180"
                />
              </div>
            </div>

            {/* Session Topic */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Session Topic (Optional)
              </label>
              <input
                type="text"
                value={sessionData.session_topic}
                onChange={(e) => setSessionData({...sessionData, session_topic: e.target.value})}
                placeholder="e.g., Introduction to Data Structures"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium placeholder-slate-400"
              />
            </div>

            {/* Student List */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Mark Attendance ({enrolledStudents.length} students enrolled)
              </h3>
              {enrolledStudents.length === 0 ? (
                <div className="text-center py-8 border-2 border-slate-200 rounded-lg">
                  <p className="text-slate-500">No students enrolled in this course yet.</p>
                </div>
              ) : (
                <div className="border-2 border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-bold text-slate-900">Student ID</th>
                        <th className="text-left py-3 px-4 font-bold text-slate-900">Student Name</th>
                        <th className="text-center py-3 px-4 font-bold text-slate-900">Current %</th>
                        <th className="text-center py-3 px-4 font-bold text-slate-900">Present</th>
                        <th className="text-center py-3 px-4 font-bold text-slate-900">Absent</th>
                        <th className="text-center py-3 px-4 font-bold text-slate-900">Late</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrolledStudents.map((student, index) => (
                        <tr key={student.student_id} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-blue-700">{student.student_id}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">{student.student_name}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              (student.attendance_percentage || 0) >= 90 ? 'bg-green-100 text-green-800' :
                              (student.attendance_percentage || 0) >= 80 ? 'bg-blue-100 text-blue-800' :
                              (student.attendance_percentage || 0) >= 70 ? 'bg-yellow-100 text-yellow-800' :
                              (student.attendance_percentage || 0) >= 60 ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {(student.attendance_percentage || 0).toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input
                              type="radio"
                              name={`attendance-${student.student_id}`}
                              value="present"
                              checked={attendanceData[student.student_id] === 'present'}
                              onChange={() => handleAttendanceChange(student.student_id, 'present')}
                              className="w-4 h-4 text-green-600 focus:ring-green-500"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input
                              type="radio"
                              name={`attendance-${student.student_id}`}
                              value="absent"
                              checked={attendanceData[student.student_id] === 'absent' || !attendanceData[student.student_id]}
                              onChange={() => handleAttendanceChange(student.student_id, 'absent')}
                              className="w-4 h-4 text-red-600 focus:ring-red-500"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input
                              type="radio"
                              name={`attendance-${student.student_id}`}
                              value="late"
                              checked={attendanceData[student.student_id] === 'late'}
                              onChange={() => handleAttendanceChange(student.student_id, 'late')}
                              className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <button 
                onClick={handleSubmitAttendance}
                disabled={isSubmitting || enrolledStudents.length === 0}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  isSubmitting || enrolledStudents.length === 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
              </button>
              <button 
                onClick={() => {
                  setAttendanceData({});
                  setSessionData({
                    session_date: new Date().toISOString().split('T')[0],
                    session_type: 'lecture',
                    session_topic: '',
                    session_duration: 60
                  });
                }}
                className="px-8 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Classes Today</p>
              <h3 className="text-3xl font-bold mt-2">5</h3>
            </div>
            <div className="text-4xl opacity-80">📚</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Attendance Marked</p>
              <h3 className="text-3xl font-bold mt-2">3</h3>
            </div>
            <div className="text-4xl opacity-80">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Pending</p>
              <h3 className="text-3xl font-bold mt-2">2</h3>
            </div>
            <div className="text-4xl opacity-80">⏳</div>
          </div>
        </div>
      </div>
    </div>
  );
}