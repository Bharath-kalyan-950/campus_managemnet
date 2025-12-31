'use client';

import { useState, useEffect } from 'react';

export default function FacultyAttendancePage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [newSession, setNewSession] = useState({
    session_date: '',
    session_time: '',
    session_topic: '',
    session_type: 'lecture',
    session_duration: 60
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchSessions(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      // In real implementation, get faculty_id from session/auth
      const facultyId = 'FAC2024001'; // Daniel
      const response = await fetch(`/api/faculty/attendance?faculty_id=${facultyId}`);
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async (courseCode) => {
    try {
      const facultyId = 'FAC2024001';
      const response = await fetch(`/api/faculty/attendance?faculty_id=${facultyId}&course_code=${courseCode}`);
      const data = await response.json();
      
      if (data.success) {
        setSessions(data.data.sessions);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchSessionDetails = async (sessionId) => {
    try {
      const facultyId = 'FAC2024001';
      const response = await fetch(`/api/faculty/attendance?faculty_id=${facultyId}&session_id=${sessionId}`);
      const data = await response.json();
      
      if (data.success) {
        setSelectedSession(data.data.session);
        setStudents(data.data.students);
        
        // Initialize attendance data
        const initialAttendance = {};
        data.data.students.forEach(student => {
          initialAttendance[student.student_id] = {
            attendance_status: student.attendance_status,
            notes: student.notes || ''
          };
        });
        setAttendanceData(initialAttendance);
      }
    } catch (error) {
      console.error('Error fetching session details:', error);
    }
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      const facultyId = 'FAC2024001';
      
      const response = await fetch('/api/faculty/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_session',
          faculty_id: facultyId,
          course_code: selectedCourse,
          ...newSession
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('✅ Session created successfully!');
        setShowCreateSession(false);
        setNewSession({
          session_date: '',
          session_time: '',
          session_topic: '',
          session_type: 'lecture',
          session_duration: 60
        });
        fetchSessions(selectedCourse);
      } else {
        alert(`❌ Failed to create session: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating session:', error);
      alert('❌ Failed to create session');
    } finally {
      setSaving(false);
    }
  };

  const handleAttendanceChange = (studentId, field, value) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const markAllPresent = () => {
    const updatedData = {};
    students.forEach(student => {
      updatedData[student.student_id] = {
        ...attendanceData[student.student_id],
        attendance_status: 'present'
      };
    });
    setAttendanceData(updatedData);
  };

  const markAllAbsent = () => {
    const updatedData = {};
    students.forEach(student => {
      updatedData[student.student_id] = {
        ...attendanceData[student.student_id],
        attendance_status: 'absent'
      };
    });
    setAttendanceData(updatedData);
  };

  const saveAttendance = async () => {
    try {
      setSaving(true);
      const facultyId = 'FAC2024001';
      
      // Prepare attendance data
      const attendanceArray = students.map(student => ({
        student_id: student.student_id,
        attendance_status: attendanceData[student.student_id]?.attendance_status || 'absent',
        notes: attendanceData[student.student_id]?.notes || ''
      }));

      const response = await fetch('/api/faculty/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'mark_attendance',
          session_id: selectedSession.session_id,
          faculty_id: facultyId,
          attendance_data: attendanceArray
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`✅ Attendance saved successfully! ${data.data.present_students}/${data.data.marked_students} students present (${data.data.attendance_percentage}%)`);
        fetchSessions(selectedCourse);
        setSelectedSession(null);
        setStudents([]);
      } else {
        alert(`❌ Failed to save attendance: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('❌ Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading attendance system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            📋 Attendance Management
          </h1>
          <p className="text-slate-600">
            Mark attendance for your courses and track student participation
          </p>
        </div>

        {/* Course Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Select Course</h2>
            <p className="text-slate-600">Choose a course to manage attendance</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div
                  key={course.course_code}
                  onClick={() => setSelectedCourse(course.course_code)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedCourse === course.course_code ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h3 className="font-semibold text-slate-900">{course.course_code}</h3>
                  <p className="text-sm text-slate-600 mb-2">{course.course_name}</p>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>{course.enrolled_students} students</span>
                    <span>{course.completed_sessions}/{course.total_sessions} sessions</span>
                  </div>
                  {course.avg_attendance_percentage && (
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {course.avg_attendance_percentage.toFixed(1)}% avg attendance
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sessions Management */}
        {selectedCourse && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sessions List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Sessions - {selectedCourse}</h2>
                    <p className="text-slate-600">Manage attendance sessions</p>
                  </div>
                  <button
                    onClick={() => setShowCreateSession(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    New Session
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {sessions.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="h-12 w-12 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Sessions Yet</h3>
                    <p className="text-slate-600">Create your first attendance session</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sessions.map((session) => (
                      <div
                        key={session.session_id}
                        onClick={() => fetchSessionDetails(session.session_id)}
                        className="border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900">{session.session_topic || 'Class Session'}</h3>
                            <p className="text-sm text-slate-600">
                              {new Date(session.session_date).toLocaleDateString()} • {session.session_time}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            session.status === 'completed' ? 'bg-green-100 text-green-800' :
                            session.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span className="capitalize">{session.session_type} • {session.session_duration}min</span>
                          {session.status === 'completed' && (
                            <span>{session.present_students}/{session.enrolled_students} present ({session.attendance_percentage?.toFixed(1)}%)</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Attendance Marking */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">Mark Attendance</h2>
                <p className="text-slate-600">
                  {selectedSession ? `${selectedSession.session_topic} - ${new Date(selectedSession.session_date).toLocaleDateString()}` : 'Select a session to mark attendance'}
                </p>
              </div>
              
              <div className="p-6">
                {selectedSession ? (
                  <div>
                    {/* Quick Actions */}
                    <div className="flex space-x-3 mb-6">
                      <button
                        onClick={markAllPresent}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Mark All Present
                      </button>
                      <button
                        onClick={markAllAbsent}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Mark All Absent
                      </button>
                    </div>

                    {/* Students List */}
                    <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                      {students.map((student) => (
                        <div key={student.student_id} className="border border-slate-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-slate-900">{student.student_name}</h3>
                              <p className="text-sm text-slate-600">{student.student_id} • {student.email}</p>
                            </div>
                            <div className="flex space-x-2">
                              {['present', 'absent', 'late', 'excused'].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => handleAttendanceChange(student.student_id, 'attendance_status', status)}
                                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                                    attendanceData[student.student_id]?.attendance_status === status
                                      ? status === 'present' ? 'bg-green-600 text-white' :
                                        status === 'late' ? 'bg-yellow-600 text-white' :
                                        status === 'excused' ? 'bg-blue-600 text-white' :
                                        'bg-red-600 text-white'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                          <input
                            type="text"
                            placeholder="Notes (optional)"
                            value={attendanceData[student.student_id]?.notes || ''}
                            onChange={(e) => handleAttendanceChange(student.student_id, 'notes', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={saveAttendance}
                      disabled={saving}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Saving...' : 'Save Attendance'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="h-12 w-12 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Select a Session</h3>
                    <p className="text-slate-600">Choose a session from the list to mark attendance</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Create Session Modal */}
        {showCreateSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">Create New Session</h2>
                <p className="text-slate-600">Add a new attendance session for {selectedCourse}</p>
              </div>
              
              <form onSubmit={handleCreateSession} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Session Date</label>
                  <input
                    type="date"
                    value={newSession.session_date}
                    onChange={(e) => setNewSession({...newSession, session_date: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Session Time</label>
                  <input
                    type="time"
                    value={newSession.session_time}
                    onChange={(e) => setNewSession({...newSession, session_time: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Session Topic</label>
                  <input
                    type="text"
                    value={newSession.session_topic}
                    onChange={(e) => setNewSession({...newSession, session_topic: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Introduction to Programming"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Session Type</label>
                    <select
                      value={newSession.session_type}
                      onChange={(e) => setNewSession({...newSession, session_type: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="lecture">Lecture</option>
                      <option value="lab">Lab</option>
                      <option value="tutorial">Tutorial</option>
                      <option value="exam">Exam</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (minutes)</label>
                    <input
                      type="number"
                      value={newSession.session_duration}
                      onChange={(e) => setNewSession({...newSession, session_duration: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="15"
                      max="300"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateSession(false)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Creating...' : 'Create Session'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}