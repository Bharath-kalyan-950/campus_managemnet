'use client';

import { useState } from 'react';

export default function FormativeMarks() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [maxMark, setMaxMark] = useState('0');

  return (
    <div className="p-8">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Formative Marks</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Form Fields Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-red-500 mb-2">
                Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select Course</option>
                <option value="CS101">Computer Science 101</option>
                <option value="MATH201">Mathematics 201</option>
                <option value="PHY301">Physics 301</option>
              </select>
            </div>

            {/* Name of the Test */}
            <div>
              <label className="block text-sm font-medium text-red-500 mb-2">
                Name of the Test
              </label>
              <select
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">--Select--</option>
                <option value="test1">Formative Test 1</option>
                <option value="test2">Formative Test 2</option>
                <option value="test3">Formative Test 3</option>
              </select>
            </div>

            {/* Max Mark */}
            <div>
              <label className="block text-sm font-medium text-red-500 mb-2">
                Max Mark
              </label>
              <input
                type="number"
                value={maxMark}
                onChange={(e) => setMaxMark(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Note */}
          <div className="text-sm text-red-400 italic mb-6 text-center">
            Note: If student is absent please mark as "AB" in mark textbox<br />
            If marks wrongly entered, please reenter the marks again then system will replace the marks
          </div>

          {/* Student List Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-600 text-white">
                  <th className="border border-slate-400 px-4 py-3 text-left w-1/2">
                    Student List
                  </th>
                  <th className="border border-slate-400 px-4 py-3 text-left w-1/2">
                    Marks Entered
                  </th>
                </tr>
              </thead>
              <tbody>
                {!selectedCourse || !selectedTest ? (
                  <tr>
                    <td colSpan={2} className="border border-slate-300 px-4 py-12 text-center text-gray-400">
                      Please select a course and test to view student list
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-slate-300 px-4 py-3">
                        <div className="font-medium">STU2024001 - John Doe</div>
                      </td>
                      <td className="border border-slate-300 px-4 py-3">
                        <input
                          type="text"
                          placeholder="Enter marks or AB"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-slate-300 px-4 py-3">
                        <div className="font-medium">STU2024002 - Jane Smith</div>
                      </td>
                      <td className="border border-slate-300 px-4 py-3">
                        <input
                          type="text"
                          placeholder="Enter marks or AB"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-slate-300 px-4 py-3">
                        <div className="font-medium">STU2024003 - Mike Johnson</div>
                      </td>
                      <td className="border border-slate-300 px-4 py-3">
                        <input
                          type="text"
                          placeholder="Enter marks or AB"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Submit Button */}
          {selectedCourse && selectedTest && (
            <div className="flex justify-end mt-6">
              <button className="px-8 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md">
                Submit Marks
              </button>
            </div>
          )}
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
