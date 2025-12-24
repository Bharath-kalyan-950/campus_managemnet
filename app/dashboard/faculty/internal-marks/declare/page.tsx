'use client';

import { useState } from 'react';

export default function DeclareInternalMarks() {
  const [formData, setFormData] = useState({
    testName: '',
    competencyTest: '',
    course: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Declaring internal marks:', formData);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Declare & Enter Marks</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name of the Test */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap w-40">
                Name of the Test
              </label>
              <input
                type="text"
                placeholder="Name of the Test"
                value={formData.testName}
                onChange={(e) => setFormData({...formData, testName: e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Competency Test */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap w-40">
                Competency Test
              </label>
              <input
                type="text"
                placeholder="Competency"
                value={formData.competencyTest}
                onChange={(e) => setFormData({...formData, competencyTest: e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Course */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap w-40">
                Course
              </label>
              <select
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 bg-white"
              >
                <option value="">Select Course</option>
                <option value="CS101">Computer Science 101</option>
                <option value="MATH201">Mathematics 201</option>
                <option value="PHY301">Physics 301</option>
              </select>
            </div>

            {/* Help Text */}
            <div className="text-sm text-red-400 italic">
              Please enter marks in % (only decimal or integer values)<br />
              Please fill the mark % without empty. Enter Zero if absent
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
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
