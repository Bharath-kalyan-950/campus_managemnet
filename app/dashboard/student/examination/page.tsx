'use client';

export default function ExaminationPage() {
  const examTimetable = [
    { subject: 'Data Structures & Algorithms', code: 'CS301', date: 'March 15, 2024', time: '09:00 AM - 12:00 PM', room: 'Hall A', duration: '3 hours' },
    { subject: 'Database Management Systems', code: 'CS302', date: 'March 18, 2024', time: '02:00 PM - 05:00 PM', room: 'Hall B', duration: '3 hours' },
    { subject: 'Web Development', code: 'CS303', date: 'March 21, 2024', time: '09:00 AM - 12:00 PM', room: 'Hall A', duration: '3 hours' },
    { subject: 'Operating Systems', code: 'CS304', date: 'March 24, 2024', time: '02:00 PM - 05:00 PM', room: 'Hall C', duration: '3 hours' },
    { subject: 'Computer Networks', code: 'CS305', date: 'March 27, 2024', time: '09:00 AM - 12:00 PM', room: 'Hall B', duration: '3 hours' },
  ];

  const internalMarks = [
    { subject: 'Data Structures & Algorithms', code: 'CS301', test1: 18, test2: 20, assignment: 9, total: 47, outOf: 50 },
    { subject: 'Database Management Systems', code: 'CS302', test1: 17, test2: 19, assignment: 8, total: 44, outOf: 50 },
    { subject: 'Web Development', code: 'CS303', test1: 19, test2: 20, assignment: 10, total: 49, outOf: 50 },
    { subject: 'Operating Systems', code: 'CS304', test1: 16, test2: 18, assignment: 8, total: 42, outOf: 50 },
    { subject: 'Computer Networks', code: 'CS305', test1: 18, test2: 19, assignment: 9, total: 46, outOf: 50 },
  ];

  const results = [
    { subject: 'Data Structures & Algorithms', code: 'CS301', internal: 47, external: 78, total: 125, grade: 'A+', credits: 4 },
    { subject: 'Database Management Systems', code: 'CS302', internal: 44, external: 72, total: 116, grade: 'A', credits: 4 },
    { subject: 'Web Development', code: 'CS303', internal: 49, external: 85, total: 134, grade: 'A+', credits: 3 },
    { subject: 'Operating Systems', code: 'CS304', internal: 42, external: 68, total: 110, grade: 'A', credits: 4 },
    { subject: 'Computer Networks', code: 'CS305', internal: 46, external: 75, total: 121, grade: 'A+', credits: 3 },
  ];

  const getGradeColor = (grade: string) => {
    if (grade === 'A+') return 'bg-emerald-100 text-emerald-600';
    if (grade === 'A') return 'bg-blue-100 text-blue-600';
    if (grade === 'B+') return 'bg-purple-100 text-purple-600';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              📝
            </div>
            <div>
              <p className="text-sm text-slate-600">Upcoming Exams</p>
              <p className="text-2xl font-bold text-slate-900">{examTimetable.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-slate-900">{results.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <p className="text-sm text-slate-600">Average Score</p>
              <p className="text-2xl font-bold text-slate-900">85%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              🎓
            </div>
            <div>
              <p className="text-sm text-slate-600">Current CGPA</p>
              <p className="text-2xl font-bold text-slate-900">8.5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Timetable */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Exam Timetable</h2>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Hall Ticket
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-4 px-4 font-bold text-slate-700">Subject</th>
                <th className="text-left py-4 px-4 font-bold text-slate-700">Code</th>
                <th className="text-left py-4 px-4 font-bold text-slate-700">Date</th>
                <th className="text-left py-4 px-4 font-bold text-slate-700">Time</th>
                <th className="text-left py-4 px-4 font-bold text-slate-700">Room</th>
                <th className="text-left py-4 px-4 font-bold text-slate-700">Duration</th>
              </tr>
            </thead>
            <tbody>
              {examTimetable.map((exam, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-4 font-semibold text-slate-900">{exam.subject}</td>
                  <td className="py-4 px-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {exam.code}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{exam.date}</td>
                  <td className="py-4 px-4 text-slate-600">{exam.time}</td>
                  <td className="py-4 px-4">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {exam.room}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{exam.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internal Marks */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Internal Assessment Marks</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-4 px-4 font-bold text-slate-700">Subject</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Test 1</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Test 2</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Assignment</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Total</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {internalMarks.map((mark, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-slate-900">{mark.subject}</p>
                      <p className="text-sm text-slate-600">{mark.code}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-slate-900">{mark.test1}/20</td>
                  <td className="py-4 px-4 text-center font-semibold text-slate-900">{mark.test2}/20</td>
                  <td className="py-4 px-4 text-center font-semibold text-slate-900">{mark.assignment}/10</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                      {mark.total}/{mark.outOf}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-emerald-600">
                    {((mark.total / mark.outOf) * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results with Graph */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Semester Results</h2>
        
        {/* Results Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-4 px-4 font-bold text-slate-700">Subject</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Internal</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">External</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Total</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Grade</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Credits</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-slate-900">{result.subject}</p>
                      <p className="text-sm text-slate-600">{result.code}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-slate-900">{result.internal}/50</td>
                  <td className="py-4 px-4 text-center font-semibold text-slate-900">{result.external}/100</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                      {result.total}/150
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-slate-900">{result.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bar Graph */}
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Performance Overview</h3>
          <div className="space-y-4">
            {results.map((result, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">{result.code}</span>
                  <span className="text-sm font-bold text-blue-600">{((result.total / 150) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                    style={{ width: `${(result.total / 150) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
