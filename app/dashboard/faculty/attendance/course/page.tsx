'use client';

import { useState } from 'react';

export default function CourseAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const courses = [
    'MMA1251-Mentor Mentee Meeting',
    'MMA1252-Mentor Mentee Meeting',
    'MMA1559-Mentor - Mentee Meeting',
    'MMA1601-Mentor and Mentee',
    'SPIC706-Product Development and Design for latest applications',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Course Attendance</h1>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Course Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Course
            </label>
            <div className="relative">
              <button
                onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg text-left bg-white hover:border-blue-500 focus:outline-none focus:border-blue-500 transition flex items-center justify-between"
              >
                <span className={selectedCourse ? 'text-slate-900' : 'text-slate-500'}>
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

              {showCourseDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-300 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setSelectedCourse('');
                        setShowCourseDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 rounded-lg transition text-slate-700"
                    >
                      --Select--
                    </button>
                    {courses.map((course, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowCourseDropdown(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-blue-50 rounded-lg transition ${
                          selectedCourse === course ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-slate-700'
                        }`}
                      >
                        {course}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Select Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* View Button */}
          <div className="flex items-end">
            <button className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
              View
            </button>
          </div>
        </div>

        {/* Warning Message */}
        {!selectedDate && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm">
              By default "Date" selection is empty
            </p>
          </div>
        )}

        {/* Empty State */}
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Select Course and Date</h3>
          <p className="text-slate-600">Choose a course and date to view attendance records</p>
        </div>
      </div>
    </div>
  );
}