'use client';

import { useState } from 'react';

export default function AttendancePage() {
  const [showODForm, setShowODForm] = useState(false);
  const [odForm, setOdForm] = useState({
    eventName: '',
    reason: '',
    date: '',
    duration: '',
  });

  const attendanceData = [
    { subject: 'Data Structures & Algorithms', code: 'CS301', present: 42, total: 45, percentage: 93.3, status: 'good' },
    { subject: 'Database Management Systems', code: 'CS302', present: 38, total: 42, percentage: 90.5, status: 'good' },
    { subject: 'Web Development', code: 'CS303', present: 40, total: 43, percentage: 93.0, status: 'good' },
    { subject: 'Operating Systems', code: 'CS304', present: 35, total: 44, percentage: 79.5, status: 'warning' },
    { subject: 'Computer Networks', code: 'CS305', present: 41, total: 45, percentage: 91.1, status: 'good' },
    { subject: 'Software Engineering', code: 'CS306', present: 39, total: 42, percentage: 92.9, status: 'good' },
  ];

  const monthlyTrend = [
    { month: 'Sep', percentage: 88 },
    { month: 'Oct', percentage: 90 },
    { month: 'Nov', percentage: 92 },
    { month: 'Dec', percentage: 89 },
    { month: 'Jan', percentage: 91 },
    { month: 'Feb', percentage: 93 },
  ];

  const odRequests = [
    { id: 1, eventName: 'Technical Symposium', date: 'Feb 15, 2024', duration: '2 days', status: 'Approved', reason: 'Participation in coding competition' },
    { id: 2, eventName: 'Sports Meet', date: 'Jan 20, 2024', duration: '1 day', status: 'Approved', reason: 'Inter-college basketball tournament' },
    { id: 3, eventName: 'Workshop', date: 'Mar 5, 2024', duration: '3 days', status: 'Pending', reason: 'AI/ML Workshop at IIT' },
    { id: 4, eventName: 'Hackathon', date: 'Dec 10, 2023', duration: '2 days', status: 'Rejected', reason: 'Insufficient documentation' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'good') return 'text-emerald-600 bg-emerald-100';
    if (status === 'warning') return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getODStatusColor = (status: string) => {
    if (status === 'Approved') return 'bg-emerald-100 text-emerald-600';
    if (status === 'Pending') return 'bg-orange-100 text-orange-600';
    return 'bg-red-100 text-red-600';
  };

  const handleODSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('OD Request submitted successfully!');
    setShowODForm(false);
    setOdForm({ eventName: '', reason: '', date: '', duration: '' });
  };

  const overallAttendance = (
    attendanceData.reduce((sum, item) => sum + item.present, 0) /
    attendanceData.reduce((sum, item) => sum + item.total, 0) * 100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-600">Overall Attendance</p>
              <p className="text-2xl font-bold text-emerald-600">{overallAttendance}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              📅
            </div>
            <div>
              <p className="text-sm text-slate-600">Classes Attended</p>
              <p className="text-2xl font-bold text-slate-900">
                {attendanceData.reduce((sum, item) => sum + item.present, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              ❌
            </div>
            <div>
              <p className="text-sm text-slate-600">Classes Missed</p>
              <p className="text-2xl font-bold text-slate-900">
                {attendanceData.reduce((sum, item) => sum + (item.total - item.present), 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <p className="text-sm text-slate-600">OD Requests</p>
              <p className="text-2xl font-bold text-slate-900">{odRequests.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course-wise Attendance */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course-wise Attendance</h2>
            <div className="space-y-4">
              {attendanceData.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900">{item.subject}</h3>
                      <p className="text-sm text-slate-600">{item.code}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${item.status === 'good' ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {item.percentage.toFixed(1)}%
                      </p>
                      <p className="text-sm text-slate-600">{item.present}/{item.total} classes</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        item.status === 'good' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                      {item.status === 'good' ? '✓ Good Standing' : '⚠ Below 80%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OD Requests Table */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">OD Request History</h2>
              <button
                onClick={() => setShowODForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                + New Request
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Event</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Date</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Duration</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {odRequests.map((request) => (
                    <tr key={request.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{request.eventName}</p>
                        <p className="text-sm text-slate-600">{request.reason}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{request.date}</td>
                      <td className="py-3 px-4 text-slate-600">{request.duration}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getODStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Monthly Trend</h2>
            <div className="space-y-4">
              {monthlyTrend.map((month, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">{month.month}</span>
                    <span className="text-sm font-bold text-blue-600">{month.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${month.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Goal */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-lg font-bold mb-4">Attendance Goal</h2>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold mb-2">{overallAttendance}%</div>
              <p className="text-blue-100">Current Attendance</p>
            </div>
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-blue-100 mb-2">Target: 90%</p>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((parseFloat(overallAttendance) / 90) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OD Request Form Modal */}
      {showODForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">New OD Request</h2>
              <button
                onClick={() => setShowODForm(false)}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleODSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Event Name</label>
                <input
                  type="text"
                  value={odForm.eventName}
                  onChange={(e) => setOdForm({ ...odForm, eventName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  placeholder="e.g., Technical Symposium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Reason</label>
                <textarea
                  value={odForm.reason}
                  onChange={(e) => setOdForm({ ...odForm, reason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  placeholder="Explain the reason for OD request"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={odForm.date}
                    onChange={(e) => setOdForm({ ...odForm, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
                  <select
                    value={odForm.duration}
                    onChange={(e) => setOdForm({ ...odForm, duration: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="Half Day">Half Day</option>
                    <option value="1 Day">1 Day</option>
                    <option value="2 Days">2 Days</option>
                    <option value="3 Days">3 Days</option>
                    <option value="1 Week">1 Week</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
