'use client';

import { useState } from 'react';

export default function ViewResult() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const courses = [
    'ADM02-Data Science using Python',
    'ADM02-Data Science using Python',
    'ADM04-Introduction to Data Analytics',
    'ARM01-Autonomous Mobile Robot Systems',
    'ARM02-Kinematics and Dynamics of Robots',
    'BEM01-Intelligent Sensors and Signal Processing Techniques',
    'BEM02-Bioengineering Technology',
    'BIM02-Applications of BIOSENSIL and PYTHON',
    'BMA07-Radiological Equipment',
    'BMA07-Radiological Equipment',
    'BMA09-Diagnostic and Therapeutic Equipment',
    'BMA16-Biomechanics',
    'BTA01-Biology and Environmental Science for Engineers',
    'BTA01-Biology and Environmental Science for Engineers',
    'BTA10-Nano Technology',
    'CEA06-Fluid Mechanics and Machinery',
    'CEA07-Strength of Materials',
    'CEA07-Strength of Materials',
    'CEA07-Strength of Materials'
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">New View Result</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Form Controls */}
          <div className="flex items-center gap-6 mb-8">
            {/* Month & Year */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap">
                Month & Year
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">--Select--</option>
                <option value="March-2025">March-2025</option>
                <option value="February-2025">February-2025</option>
                <option value="January-2025">January-2025</option>
                <option value="December-2024">December-2024</option>
              </select>
            </div>

            {/* Course */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap">
                Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent min-w-[300px]"
              >
                <option value="">--Select--</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* View Result Button */}
            <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md">
              View Result
            </button>
          </div>

          {/* Content Area */}
          <div className="min-h-[400px] flex items-center justify-center text-gray-400">
            {!selectedCourse ? (
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Select Course to View Results</h3>
                <p className="text-slate-600">Please select a month/year and course to view the results.</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Results for {selectedCourse}</h3>
                <p className="text-slate-600">Results data will be displayed here for {selectedMonth}</p>
              </div>
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