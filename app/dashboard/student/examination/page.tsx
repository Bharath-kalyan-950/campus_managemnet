'use client';

import { useState, useEffect } from 'react';

export default function ExaminationPage() {
  const [examData, setExamData] = useState({ upcoming: [], results: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExaminations();
  }, []);

  const fetchExaminations = async () => {
    try {
      const response = await fetch('/api/student/examinations');
      const data = await response.json();
      
      if (data.success) {
        setExamData(data.data);
      }
    } catch (error) {
      console.error('Error fetching examinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading examinations...</p>
        </div>
      </div>
    );
  }

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
              <p className="text-2xl font-bold text-slate-900">{examData.upcoming.length}</p>
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
              <p className="text-2xl font-bold text-slate-900">{examData.results.length}</p>
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
              <p className="text-2xl font-bold text-slate-900">
                {examData.results.length > 0 
                  ? Math.round(examData.results.reduce((acc, result) => acc + ((result.marks_obtained / result.max_marks) * 100), 0) / examData.results.length)
                  : 0}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              🎓
            </div>
            <div>
              <p className="text-sm text-slate-600">Latest Grade</p>
              <p className="text-2xl font-bold text-slate-900">
                {examData.results.length > 0 ? examData.results[0].grade || 'N/A' : 'N/A'}
              </p>
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
              {examData.upcoming.map((exam, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-4 font-semibold text-slate-900">{exam.course_name}</td>
                  <td className="py-4 px-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {exam.course_code}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{formatDate(exam.exam_date)}</td>
                  <td className="py-4 px-4 text-slate-600">{formatTime(exam.start_time)} - {exam.duration} mins</td>
                  <td className="py-4 px-4">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {exam.venue || 'TBA'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{exam.exam_type}</td>
                </tr>
              ))}
              {examData.upcoming.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No upcoming examinations scheduled
                  </td>
                </tr>
              )}
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
              {examData.results.map((result, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-slate-900">{result.course_name}</p>
                      <p className="text-sm text-slate-600">{result.course_code}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-slate-900">-</td>
                  <td className="py-4 px-4 text-center font-semibold text-slate-900">{result.marks_obtained}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                      {result.marks_obtained}/{result.max_marks}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(result.grade || 'N/A')}`}>
                      {result.grade || 'N/A'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-slate-900">-</td>
                </tr>
              ))}
              {examData.results.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No exam results available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bar Graph */}
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Performance Overview</h3>
          <div className="space-y-4">
            {examData.results.map((result, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">{result.course_code}</span>
                  <span className="text-sm font-bold text-blue-600">
                    {((result.marks_obtained / result.max_marks) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                    style={{ width: `${(result.marks_obtained / result.max_marks) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {examData.results.length === 0 && (
              <p className="text-center text-slate-500 py-4">No results to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
