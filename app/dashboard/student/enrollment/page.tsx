'use client';

import { useState } from 'react';

export default function EnrollmentPage() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  const slots = [
    'Slot A', 'Slot B', 'Slot C', 'Slot D', 'Slot E', 'Slot F',
    'Slot G', 'Slot H', 'Slot I', 'Slot J', 'Slot K', 'Slot L',
    'Slot M', 'Slot N', 'Slot O', 'Slot P', 'Slot Q', 'Slot R', 'Slot S'
  ];

  const courses = [
    { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, faculty: 'Dr. Smith', slot: 'Slot A' },
    { code: 'CS302', name: 'Database Management Systems', credits: 4, faculty: 'Prof. Johnson', slot: 'Slot B' },
    { code: 'CS303', name: 'Web Development', credits: 3, faculty: 'Dr. Williams', slot: 'Slot C' },
    { code: 'CS304', name: 'Operating Systems', credits: 4, faculty: 'Dr. Davis', slot: 'Slot D' },
    { code: 'CS305', name: 'Computer Networks', credits: 3, faculty: 'Prof. Brown', slot: 'Slot E' },
  ];

  const enrolledCourses = [
    { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, status: 'Enrolled', slot: 'Slot A' },
    { code: 'CS302', name: 'Database Management Systems', credits: 4, status: 'Enrolled', slot: 'Slot B' },
  ];

  const handleEnroll = () => {
    if (selectedSlot && selectedCourse) {
      alert(`Enrolling in ${selectedCourse} for ${selectedSlot}`);
    } else {
      alert('Please select both slot and course');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Enrollment
        </h1>
        <p className="text-slate-600 mt-2">Select your courses for the current semester</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Section - Slot Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Slot Selector */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Select Slot <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 font-medium"
              >
                <option value="">--Select--</option>
                {slots.map((slot, idx) => (
                  <option key={idx} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {selectedSlot && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <p className="text-sm font-semibold text-blue-900">
                  Selected Slot: <span className="text-blue-600">{selectedSlot}</span>
                </p>
              </div>
            )}
          </div>

          {/* Course Details Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <button
              onClick={() => setShowCourseDetails(!showCourseDetails)}
              className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📚</span>
                <h2 className="text-xl font-bold">Course Details</h2>
              </div>
              <svg
                className={`w-6 h-6 transition-transform ${showCourseDetails ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showCourseDetails && (
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Select Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 font-medium"
                  >
                    <option value="">--Select Course--</option>
                    {courses.map((course, idx) => (
                      <option key={idx} value={course.name}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCourse && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    {courses.filter(c => c.name === selectedCourse).map((course, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700">Course Code:</span>
                          <span className="text-sm font-bold text-slate-900">{course.code}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700">Course Name:</span>
                          <span className="text-sm font-bold text-slate-900">{course.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700">Credits:</span>
                          <span className="text-sm font-bold text-blue-600">{course.credits}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700">Faculty:</span>
                          <span className="text-sm font-bold text-slate-900">{course.faculty}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700">Slot:</span>
                          <span className="text-sm font-bold text-purple-600">{course.slot}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleEnroll}
                  disabled={!selectedSlot || !selectedCourse}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Enroll Now
                </button>
              </div>
            )}
          </div>

          {/* Available Courses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Available Courses</h2>
            <div className="space-y-3">
              {courses.map((course, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">{course.code} - {course.name}</h3>
                      <p className="text-sm text-slate-600">👨‍🏫 {course.faculty} • 📅 {course.slot} • 🎓 {course.credits} Credits</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Status */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Enrollment Status</h2>
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                Rejected
              </span>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">Total Credits</p>
                <p className="text-2xl font-bold text-slate-900">8</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-slate-900">{enrolledCourses.length}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">Available Slots</p>
                <p className="text-2xl font-bold text-slate-900">{slots.length}</p>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">My Enrolled Courses</h2>
            <div className="space-y-3">
              {enrolledCourses.map((course, idx) => (
                <div key={idx} className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{course.code}</h3>
                      <p className="text-xs text-slate-600">{course.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{course.slot} • {course.credits} Credits</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-600 text-white rounded text-xs font-bold">
                      ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-lg font-bold mb-3">Need Help?</h2>
            <p className="text-sm text-blue-100 mb-4">
              Contact the academic office for enrollment assistance
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-semibold transition-all">
              📧 Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
