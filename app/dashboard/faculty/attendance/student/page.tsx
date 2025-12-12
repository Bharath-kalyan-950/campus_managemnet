'use client';

import { useState } from 'react';

export default function StudentAttendancePage() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Student Attendance</h1>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Select Student */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select Student
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by RegNo"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
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

        {/* Empty State */}
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl">
          <div className="text-6xl mb-4">👤</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Select Student and Date</h3>
          <p className="text-slate-600">Choose a student and date to view attendance records</p>
        </div>
      </div>
    </div>
  );
}