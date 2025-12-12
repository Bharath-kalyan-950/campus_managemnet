'use client';

import { useState } from 'react';

export default function FeedbackPage() {
  const [showInProgress, setShowInProgress] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  const inProgressCourses = [
    {
      courseCode: 'MMA11150',
      courseName: 'MENTOR MENTEE MEETING',
      status: 'InProgress',
      facultyName: 'Dr. C Sunitha Ram',
      enrollOn: '07/02/2025',
    },
    {
      courseCode: 'SPIC732',
      courseName: 'Product Design and Development for Next Generation',
      status: 'InProgress',
      facultyName: 'Dr.Moorthy A',
      enrollOn: '23/10/2025',
    },
  ];

  const completedCourses = [
    { sno: 1, courseCode: 'UBA29', courseName: 'Technical English', facultyName: '', monthYear: 'October-2025' },
    { sno: 2, courseCode: 'SPIC4', courseName: 'Core Project', facultyName: '', monthYear: 'September-2025' },
    { sno: 3, courseCode: 'SPIC9', courseName: 'Professional Certification', facultyName: '', monthYear: 'September-2025' },
    { sno: 4, courseCode: 'CSA15', courseName: 'Cloud Computing and Big Data Analytics', facultyName: '', monthYear: 'July-2025' },
    { sno: 5, courseCode: 'UBA10', courseName: 'Numerical Methods', facultyName: '', monthYear: 'July-2025' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          My Course Feedback
        </h1>
        <p className="text-slate-600 mt-2">Provide feedback for your enrolled courses</p>
      </div>

      {/* In Progress Courses */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <button
          onClick={() => setShowInProgress(!showInProgress)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">📚</span>
            <h2 className="text-lg font-bold">INPROGRESS COURSES</h2>
          </div>
          <svg
            className={`w-6 h-6 transition-transform ${showInProgress ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showInProgress && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-bold text-slate-700 text-sm">Course Code</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-700 text-sm">Course Name</th>
                  <th className="text-center py-3 px-4 font-bold text-slate-700 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-700 text-sm">Faculty Name</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-700 text-sm">Enroll On</th>
                  <th className="text-center py-3 px-4 font-bold text-slate-700 text-sm">Submit Feedback</th>
                </tr>
              </thead>
              <tbody>
                {inProgressCourses.map((course, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-4 px-4 font-semibold text-slate-900">{course.courseCode}</td>
                    <td className="py-4 px-4 text-slate-700">{course.courseName}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-4 py-1 bg-blue-500 text-white rounded text-sm font-semibold">
                        {course.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-700">{course.facultyName}</td>
                    <td className="py-4 px-4 text-slate-700">{course.enrollOn}</td>
                    <td className="py-4 px-4 text-center">
                      <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm">
                        Submit Feedback
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Completed Courses */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <h2 className="text-lg font-bold">COMPLETED COURSES</h2>
          </div>
          <svg
            className={`w-6 h-6 transition-transform ${showCompleted ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showCompleted && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-bold text-slate-700 text-sm">Sno</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-700 text-sm">Course Code</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-700 text-sm">Course Name</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-700 text-sm">Faculty Name</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-700 text-sm">Month&Year</th>
                  <th className="text-center py-3 px-4 font-bold text-slate-700 text-sm">Submit</th>
                </tr>
              </thead>
              <tbody>
                {completedCourses.map((course) => (
                  <tr key={course.sno} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-4 px-4 font-semibold text-slate-900">{course.sno}</td>
                    <td className="py-4 px-4 font-semibold text-slate-900">{course.courseCode}</td>
                    <td className="py-4 px-4 text-slate-700">{course.courseName}</td>
                    <td className="py-4 px-4 text-slate-700">{course.facultyName || '-'}</td>
                    <td className="py-4 px-4 text-slate-700">{course.monthYear}</td>
                    <td className="py-4 px-4 text-center">
                      <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm">
                        Submit Feedback
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
              📚
            </div>
            <div>
              <p className="text-sm text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-slate-900">{inProgressCourses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-slate-900">{completedCourses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              📝
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Courses</p>
              <p className="text-2xl font-bold text-slate-900">{inProgressCourses.length + completedCourses.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Information Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">ℹ️</span>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Feedback Guidelines</h3>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>• Provide honest and constructive feedback</li>
              <li>• Rate faculty performance and course content</li>
              <li>• Your feedback helps improve teaching quality</li>
              <li>• All responses are kept confidential</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
