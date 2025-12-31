'use client';

import { useState, useEffect } from 'react';
import { studentAPI } from '../../../../lib/api.js';

interface Course {
  course_code: string;
  course_name: string;
  credits: number;
  slot: string;
  faculty_name: string;
  enrollment_status: string;
  enrolled_date: string;
}

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getCourses();
      if (response.success && response.data && response.data.courses) {
        setCourses(response.data.courses);
      } else {
        console.error('Invalid response structure:', response);
        setError('Failed to load courses - invalid data structure');
        setCourses([]);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'dropped': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          onClick={fetchCourses}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Courses
            </h1>
            <p className="text-slate-600 mt-2">Enrolled courses for current semester</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-600">Total Courses</p>
              <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Courses Found</h3>
          <p className="text-slate-600">You are not enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={`${course.course_code}-${index}`}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                      {course.course_code}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
                      Slot {course.slot}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition">
                    {course.course_name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Faculty: {course.faculty_name || 'Not assigned'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Credits</span>
                  <span className="font-semibold text-slate-900">{course.credits}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Status</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(course.enrollment_status)}`}>
                    {course.enrollment_status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Enrolled</span>
                  <span className="text-sm text-slate-900">
                    {new Date(course.enrolled_date).toLocaleDateString()}
                  </span>
                </div>

                {course.grade_points && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Grade Points</span>
                    <span className="font-semibold text-blue-600">{course.grade_points}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <button className="w-full py-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Course Details</h2>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-bold text-blue-600 bg-white px-3 py-1 rounded-lg">
                    {selectedCourse.course_code}
                  </span>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getCourseTypeColor(selectedCourse.course_type)}`}>
                    {selectedCourse.course_type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {selectedCourse.course_name}
                </h3>
                <p className="text-slate-600">
                  Faculty: {selectedCourse.faculty_name || 'Not assigned'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900">Course Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Credits</span>
                      <span className="font-semibold">{selectedCourse.credits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Course Type</span>
                      <span className="font-semibold capitalize">{selectedCourse.course_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status</span>
                      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${getStatusColor(selectedCourse.status)}`}>
                        {selectedCourse.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900">Performance</h4>
                  <div className="space-y-3">
                    {selectedCourse.grade && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Grade</span>
                        <span className="font-bold text-green-600">{selectedCourse.grade}</span>
                      </div>
                    )}
                    {selectedCourse.grade_points && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Grade Points</span>
                        <span className="font-semibold text-blue-600">{selectedCourse.grade_points}</span>
                      </div>
                    )}
                    {!selectedCourse.grade && (
                      <p className="text-slate-500 text-sm">Grade not available yet</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold">
                  View Assignments
                </button>
                <button className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition font-semibold">
                  View Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}