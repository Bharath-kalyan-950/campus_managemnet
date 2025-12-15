'use client';

import { useState, useEffect } from 'react';
import { studentAPI } from '../../../../lib/api.js';

export default function AssignmentPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today');
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  useEffect(() => {
    fetchAssignments();
    fetchCourses();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getAssignments();
      if (response.success) {
        setAssignments(response.data);
      } else {
        setError('Failed to load assignments');
      }
    } catch (err) {
      setError('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await studentAPI.getCourses();
      if (response.success) {
        const courseList = response.data.map(course => ({
          code: course.course_code,
          name: course.course_name
        }));
        setCourses(courseList);
      }
    } catch (err) {
      console.error('Failed to load courses:', err);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!selectedAssignment || !submissionText.trim()) {
      alert('Please enter your submission text');
      return;
    }

    try {
      const response = await studentAPI.submitAssignment(selectedAssignment.assignment_id, submissionText);
      if (response.success) {
        alert('Assignment submitted successfully!');
        setShowSubmissionModal(false);
        setSubmissionText('');
        setSelectedAssignment(null);
        fetchAssignments(); // Refresh assignments
      } else {
        alert(response.message || 'Failed to submit assignment');
      }
    } catch (err) {
      alert('Failed to submit assignment');
    }
  };

  // Filter assignments based on due date
  const today = new Date();
  const todayAssignments = assignments.filter(assignment => {
    const dueDate = new Date(assignment.due_date);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1 && assignment.final_status !== 'submitted';
  });

  const upcomingAssignments = assignments.filter(assignment => {
    const dueDate = new Date(assignment.due_date);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 1 && diffDays <= 30 && assignment.final_status !== 'submitted';
  });

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return 'Overdue';
    return `${diffDays} days left`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchAssignments}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Assignment
        </h1>
        <p className="text-slate-600 mt-2">View and manage your course assignments</p>
      </div>

      {/* Course Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Course <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 font-medium"
        >
          <option value="">--Select--</option>
          {courses.map((course, idx) => (
            <option key={idx} value={course.code}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>

        {selectedCourse && (
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-sm font-semibold text-blue-900">
              Selected Course: <span className="text-blue-600">{courses.find(c => c.code === selectedCourse)?.name}</span>
            </p>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'today'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            📅 Today / Upcoming Assignment
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            📋 Upcoming Pending Assignment
          </button>
        </div>

        {/* Today's Assignments */}
        {activeTab === 'today' && (
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Today's Pending Assignment</h2>
              <p className="text-sm text-slate-600">To view the today pending assignment</p>
            </div>

            {todayAssignments.length > 0 ? (
              <div className="space-y-4">
                {todayAssignments.map((assignment) => (
                  <div key={assignment.assignment_id} className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border-l-4 border-red-500 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                            {assignment.course_code}
                          </span>
                          <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                            Due: {formatDueDate(assignment.due_date)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{assignment.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{assignment.course_name}</p>
                        <p className="text-sm text-slate-700">{assignment.description}</p>
                        <p className="text-xs text-slate-500 mt-2">Faculty: {assignment.faculty_name}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-blue-600">{assignment.max_marks}</div>
                        <div className="text-xs text-slate-600">Marks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      {assignment.final_status === 'submitted' ? (
                        <span className="px-6 py-2 bg-green-100 text-green-600 rounded-lg font-semibold">
                          ✅ Submitted
                        </span>
                      ) : (
                        <button 
                          onClick={() => {
                            setSelectedAssignment(assignment);
                            setShowSubmissionModal(true);
                          }}
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          📤 Submit Assignment
                        </button>
                      )}
                      <span className="ml-auto px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold">
                        {assignment.final_status === 'submitted' ? 'Submitted' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-slate-600">No assignments due today</p>
              </div>
            )}
          </div>
        )}

        {/* Upcoming Assignments */}
        {activeTab === 'upcoming' && (
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Upcoming Pending Assignment</h2>
              <p className="text-sm text-slate-600">To view the upcoming pending assignment upto 30 days</p>
            </div>

            {upcomingAssignments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.assignment_id} className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border-l-4 border-blue-500 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                            {assignment.course_code}
                          </span>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold">
                            {formatDueDate(assignment.due_date)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{assignment.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{assignment.course_name}</p>
                        <p className="text-sm text-slate-700">{assignment.description}</p>
                        <p className="text-sm text-slate-500 mt-2">📅 Due Date: {new Date(assignment.due_date).toLocaleDateString()}</p>
                        <p className="text-xs text-slate-500">Faculty: {assignment.faculty_name}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-blue-600">{assignment.max_marks}</div>
                        <div className="text-xs text-slate-600">Marks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      {assignment.final_status === 'submitted' ? (
                        <span className="px-6 py-2 bg-green-100 text-green-600 rounded-lg font-semibold">
                          ✅ Submitted
                        </span>
                      ) : (
                        <button 
                          onClick={() => {
                            setSelectedAssignment(assignment);
                            setShowSubmissionModal(true);
                          }}
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          📤 Submit Assignment
                        </button>
                      )}
                      <span className="ml-auto px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold">
                        {assignment.final_status === 'submitted' ? 'Submitted' : 'Not Started'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-slate-600">No upcoming assignments</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
              ⏰
            </div>
            <div>
              <p className="text-sm text-slate-600">Due Today</p>
              <p className="text-2xl font-bold text-slate-900">{todayAssignments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <p className="text-sm text-slate-600">Upcoming</p>
              <p className="text-2xl font-bold text-slate-900">{upcomingAssignments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-slate-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Submission Modal */}
      {showSubmissionModal && selectedAssignment && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Submit Assignment</h2>
              <button
                onClick={() => {
                  setShowSubmissionModal(false);
                  setSelectedAssignment(null);
                  setSubmissionText('');
                }}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-2">{selectedAssignment.title}</h3>
                <p className="text-sm text-slate-600 mb-2">{selectedAssignment.course_name} ({selectedAssignment.course_code})</p>
                <p className="text-sm text-slate-700">{selectedAssignment.description}</p>
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <span className="text-slate-600">Max Marks: <span className="font-bold text-blue-600">{selectedAssignment.max_marks}</span></span>
                  <span className="text-slate-600">Due: <span className="font-bold text-red-600">{new Date(selectedAssignment.due_date).toLocaleDateString()}</span></span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Submission <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"
                    placeholder="Enter your assignment submission text here..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSubmitAssignment}
                    disabled={!submissionText.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Assignment
                  </button>
                  <button
                    onClick={() => {
                      setShowSubmissionModal(false);
                      setSelectedAssignment(null);
                      setSubmissionText('');
                    }}
                    className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
