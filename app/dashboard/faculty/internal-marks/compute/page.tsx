'use client';

import { useState } from 'react';

export default function ComputeInternalWeightage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [weightage, setWeightage] = useState('');
  const [tests, setTests] = useState<Array<{id: number, test: string, weightage: string}>>([]);

  const handleAdd = () => {
    if (selectedTest && weightage) {
      setTests([...tests, {
        id: Date.now(),
        test: selectedTest,
        weightage: weightage
      }]);
      setSelectedTest('');
      setWeightage('');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Compute IA Weightage</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Course Selection */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-red-500 whitespace-nowrap w-32">
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
          </div>

          {/* Test Name and Weightage */}
          <div className="flex gap-4 items-start mb-6">
            <div className="flex items-center gap-4 flex-1">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap w-32">
                Test Name
              </label>
              <select
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">-Select-</option>
                <option value="Internal Test 1">Internal Test 1</option>
                <option value="Internal Test 2">Internal Test 2</option>
                <option value="Internal Test 3">Internal Test 3</option>
              </select>
            </div>

            <div className="flex items-center gap-4 flex-1">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap w-32">
                Weightage
              </label>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="0"
                  value={weightage}
                  onChange={(e) => setWeightage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <p className="text-xs text-red-400 mt-1">one decimal only</p>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md whitespace-nowrap"
            >
              + Add
            </button>
          </div>

          {/* Note */}
          <div className="text-sm text-red-400 italic mb-6">
            Note: Mark details can't be change once submit into system
          </div>

          {/* Added Tests Table */}
          {tests.length > 0 && (
            <div className="mt-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Test Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Weightage</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test) => (
                    <tr key={test.id}>
                      <td className="border border-gray-300 px-4 py-2">{test.test}</td>
                      <td className="border border-gray-300 px-4 py-2">{test.weightage}%</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => setTests(tests.filter(t => t.id !== test.id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
