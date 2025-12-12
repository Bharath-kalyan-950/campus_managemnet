'use client';

import { useState } from 'react';

export default function ResultAnalysis() {
  const [selectedMonth, setSelectedMonth] = useState('');

  const resultData = [
    {
      sno: 1,
      code: 'BTA01',
      name: 'Biology and Environmental Science for Engineers',
      totalCount: 26,
      passCount: 26,
      theoryAverage: 108,
      theoryStandardDeviation: 13.7,
      grandTotal: 385,
      grandTotalStandardDeviation: 26.5,
      facultyName: 'Dr. Jyotsna',
      passPercentage: 100
    },
    {
      sno: 2,
      code: 'UBA30',
      name: 'Aptitude and Competency Skills',
      totalCount: 40,
      passCount: 40,
      theoryAverage: 160,
      theoryStandardDeviation: 13.6,
      grandTotal: 395,
      grandTotalStandardDeviation: 22.7,
      facultyName: 'Dr.Praveen John Kennedy.J',
      passPercentage: 100
    },
    {
      sno: 3,
      code: 'CSA01',
      name: 'Object Oriented Programming with C++',
      totalCount: 38,
      passCount: 38,
      theoryAverage: 119,
      theoryStandardDeviation: 21.6,
      grandTotal: 337,
      grandTotalStandardDeviation: 43.7,
      facultyName: 'NanthiniS',
      passPercentage: 100
    },
    {
      sno: 4,
      code: 'CSA05',
      name: 'Design and Analysis of Algorithms',
      totalCount: 36,
      passCount: 36,
      theoryAverage: 137,
      theoryStandardDeviation: 16.2,
      grandTotal: 378,
      grandTotalStandardDeviation: 31.6,
      facultyName: 'Dr M.AMANULLAH',
      passPercentage: 92.3
    },
    {
      sno: 5,
      code: 'MFA06',
      name: 'Theory of Machines',
      totalCount: 1,
      passCount: 1,
      theoryAverage: 125,
      theoryStandardDeviation: 'null',
      grandTotal: 374,
      grandTotalStandardDeviation: 'null',
      facultyName: 'Dr Isaac Dinaharan',
      passPercentage: 100
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Result Analysis</h1>

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
                <option value="July-2025">July-2025</option>
                <option value="June-2025">June-2025</option>
                <option value="May-2025">May-2025</option>
                <option value="April-2025">April-2025</option>
              </select>
            </div>

            {/* View Analysis Button */}
            <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md">
              View Analysis
            </button>
          </div>

          {/* Content Area */}
          {selectedMonth ? (
            <>
              {/* Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-600 text-white">
                      <th className="border border-slate-400 px-3 py-2 text-left">Sno.</th>
                      <th className="border border-slate-400 px-3 py-2 text-left">Code</th>
                      <th className="border border-slate-400 px-3 py-2 text-left">Name</th>
                      <th className="border border-slate-400 px-3 py-2 text-left">Totalcount</th>
                      <th className="border border-slate-400 px-3 py-2 text-left">Passcount</th>
                      <th className="border border-slate-400 px-3 py-2 text-left">Theory Average</th>
                      <th className="border border-slate-400 px-3 py-2 text-left">Theory Standard Deviation</th>
                      <th className="border border-slate-400 px-3 py-2 text-left">Grand Total Average</th>
                      <th className="border border-slate-400 px-3 py-2 text-left">Grand Total Standard Deviation</th>
                      <th className="border border-slate-400 px-3 py-2 text-left">Faculty Name</th>
                      <th className="border border-slate-400 px-3 py-2 text-left">PassPercentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.map((row) => (
                      <tr key={row.sno} className="hover:bg-gray-50">
                        <td className="border border-slate-300 px-3 py-2">{row.sno}</td>
                        <td className="border border-slate-300 px-3 py-2 font-medium text-blue-600">{row.code}</td>
                        <td className="border border-slate-300 px-3 py-2">{row.name}</td>
                        <td className="border border-slate-300 px-3 py-2 text-center">{row.totalCount}</td>
                        <td className="border border-slate-300 px-3 py-2 text-center">{row.passCount}</td>
                        <td className="border border-slate-300 px-3 py-2 text-center">{row.theoryAverage}</td>
                        <td className="border border-slate-300 px-3 py-2 text-center">{row.theoryStandardDeviation}</td>
                        <td className="border border-slate-300 px-3 py-2 text-center">{row.grandTotal}</td>
                        <td className="border border-slate-300 px-3 py-2 text-center">{row.grandTotalStandardDeviation}</td>
                        <td className="border border-slate-300 px-3 py-2">{row.facultyName}</td>
                        <td className="border border-slate-300 px-3 py-2 text-center font-semibold text-green-600">{row.passPercentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Stats */}
              <div className="mt-8 grid md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center">
                  <div className="text-2xl font-bold">{resultData.length}</div>
                  <div className="text-sm text-blue-100">Total Courses</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white text-center">
                  <div className="text-2xl font-bold">{resultData.reduce((sum, row) => sum + row.totalCount, 0)}</div>
                  <div className="text-sm text-green-100">Total Students</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white text-center">
                  <div className="text-2xl font-bold">{resultData.reduce((sum, row) => sum + row.passCount, 0)}</div>
                  <div className="text-sm text-purple-100">Passed Students</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white text-center">
                  <div className="text-2xl font-bold">{Math.round(resultData.reduce((sum, row) => sum + row.passPercentage, 0) / resultData.length)}%</div>
                  <div className="text-sm text-orange-100">Average Pass Rate</div>
                </div>
              </div>
            </>
          ) : (
            <div className="min-h-[400px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Select Month to View Analysis</h3>
                <p className="text-slate-600">Please select a month/year to view the result analysis data.</p>
              </div>
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