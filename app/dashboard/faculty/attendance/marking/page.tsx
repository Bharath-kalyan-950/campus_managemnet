'use client';

import { useState } from 'react';

export default function AttendanceMarkingPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const courses = [
    'MMA1251-Mentor Mentee Meeting',
    'MMA1252-Mentor Mentee Meeting',
    'MMA1559-Mentor - Mentee Meeting',
    'MMA1601-Mentor and Mentee',
    'SPIC706-Product Development and Design for latest applications',
  ];

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    setShowCourseDropdown(false);
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
          <label className="block text-sm font-semibold text-red-500 mb-3">
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

            {/* Dropdown Menu */}
            {showCourseDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-300 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                <div className="p-2">
                  <button
                    onClick={() => handleCourseSelect('')}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 rounded-lg transition text-slate-700"
                  >
                    --Select--
                  </button>
                  {courses.map((course, index) => (
                    <button
                      key={index}
                      onClick={() => handleCourseSelect(course)}
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
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Session Type
                </label>
                <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition">
                  <option>Lecture</option>
                  <option>Lab</option>
                  <option>Tutorial</option>
                </select>
              </div>
            </div>

            {/* Student List */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Mark Attendance</h3>
              <div className="border-2 border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Roll No</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Student Name</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Present</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Absent</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Late</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rollNo: 'STU2024001', name: 'John Doe' },
                      { rollNo: 'STU2024002', name: 'Jane Smith' },
                      { rollNo: 'STU2024003', name: 'Mike Johnson' },
                      { rollNo: 'STU2024004', name: 'Sarah Williams' },
                      { rollNo: 'STU2024005', name: 'David Brown' },
                    ].map((student, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 font-semibold text-blue-600">{student.rollNo}</td>
                        <td className="py-3 px-4 text-slate-700">{student.name}</td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="radio"
                            name={`attendance-${index}`}
                            defaultChecked
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="radio"
                            name={`attendance-${index}`}
                            className="w-4 h-4 text-red-600 focus:ring-red-500"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="radio"
                            name={`attendance-${index}`}
                            className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
                Submit Attendance
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
                Cancel
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