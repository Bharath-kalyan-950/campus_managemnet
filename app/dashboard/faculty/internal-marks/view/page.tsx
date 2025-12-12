'use client';

import { useState } from 'react';

export default function ViewInternalMarks() {
  const [selectedCourse, setSelectedCourse] = useState('');

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">View Marks</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Course Selection */}
          <div className="flex items-center gap-4 mb-8">
            <label className="text-sm font-medium text-red-500 whitespace-nowrap">
              Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select Course</option>
              <option value="CS101">Computer Science 101</option>
              <option value="MATH201">Mathematics 201</option>
              <option value="PHY301">Physics 301</option>
            </select>
            <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md">
              View
            </button>
          </div>

          {/* Content Area */}
          <div className="min-h-[300px] flex items-center justify-center text-gray-400">
            {!selectedCourse ? (
              <p>Please select a course to view internal marks</p>
            ) : (
              <p>Marks data will be displayed here</p>
            )}
          </div>
        </div>

        {/* Decorative Image */}
        <div className="mt-8 flex justify-end">
          <img 
            src="https://i.imgur.com/9FLlMSu.png" 
            alt="Mascot" 
            className="w-48 h-auto opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
