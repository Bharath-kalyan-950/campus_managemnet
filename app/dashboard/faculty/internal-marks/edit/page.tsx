'use client';

import { useState } from 'react';

export default function EditInternalMarks() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [activeTab, setActiveTab] = useState('competency');

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit or Update Marks</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Course Selection */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-red-500 whitespace-nowrap w-32">
              Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 bg-white"
            >
              <option value="">Select Course</option>
              <option value="CS101">Computer Science 101</option>
              <option value="MATH201">Mathematics 201</option>
              <option value="PHY301">Physics 301</option>
            </select>
          </div>

          {/* Test Name Selection */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-red-500 whitespace-nowrap w-32">
              Test Name
            </label>
            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(e.target.value)}
              className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 bg-white"
            >
              <option value="">-Select-</option>
              <option value="test1">Internal Test 1</option>
              <option value="test2">Internal Test 2</option>
              <option value="test3">Internal Test 3</option>
            </select>
          </div>

          {/* Tabs */}
          <div className="flex justify-end gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('competency')}
              className={`pb-2 px-4 font-medium transition-colors ${
                activeTab === 'competency'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Competency Test
            </button>
            <button
              onClick={() => setActiveTab('competency2')}
              className={`pb-2 px-4 font-medium transition-colors ${
                activeTab === 'competency2'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Competency
            </button>
          </div>

          {/* Help Text */}
          <div className="text-sm text-red-400 italic mb-6">
            Please enter marks in % (only decimal or integer values)
          </div>

          {/* Content Area */}
          <div className="min-h-[200px] flex items-center justify-center text-gray-400">
            {!selectedCourse || !selectedTest ? (
              <p>Please select a course and test to edit marks</p>
            ) : (
              <p>Marks editing interface will appear here</p>
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
