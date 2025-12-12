'use client';

import { useState } from 'react';

export default function DisciplinaryPage() {
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);

  const disciplinaryRecords = [
    {
      sno: 1,
      issueDetails: 'Operating classroom AC from his phone',
      lastActionDetails: 'Warning issued by HOD',
      lastActionOn: '15/04/2023',
      complainant: 'ADSA',
      issueOn: '15/04/2023',
      status: 'InProgress',
      severity: 'Minor',
      resolution: 'Student counseled about proper classroom conduct',
    },
    {
      sno: 2,
      issueDetails: 'Late attendance for 3 consecutive days',
      lastActionDetails: 'Written warning issued',
      lastActionOn: '20/03/2023',
      complainant: 'Faculty Advisor',
      issueOn: '18/03/2023',
      status: 'Closed',
      severity: 'Minor',
      resolution: 'Student committed to improve punctuality',
    },
    {
      sno: 3,
      issueDetails: 'Unauthorized use of lab equipment',
      lastActionDetails: 'Under investigation',
      lastActionOn: '10/04/2023',
      complainant: 'Lab Supervisor',
      issueOn: '08/04/2023',
      status: 'InProgress',
      severity: 'Moderate',
      resolution: 'Investigation ongoing',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'InProgress') return 'bg-orange-100 text-orange-600';
    if (status === 'Closed') return 'bg-emerald-100 text-emerald-600';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-600';
    return 'bg-slate-100 text-slate-600';
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'Minor') return 'bg-blue-100 text-blue-600';
    if (severity === 'Moderate') return 'bg-orange-100 text-orange-600';
    if (severity === 'Major') return 'bg-red-100 text-red-600';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Disciplinary Record
        </h1>
        <p className="text-slate-600 mt-2">View your disciplinary records and status</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Records</p>
              <p className="text-2xl font-bold text-slate-900">{disciplinaryRecords.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              ⏳
            </div>
            <div>
              <p className="text-sm text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-slate-900">
                {disciplinaryRecords.filter(r => r.status === 'InProgress').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-600">Closed</p>
              <p className="text-2xl font-bold text-slate-900">
                {disciplinaryRecords.filter(r => r.status === 'Closed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              ⚖️
            </div>
            <div>
              <p className="text-sm text-slate-600">Severity Level</p>
              <p className="text-lg font-bold text-slate-900">Minor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disciplinary Records Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
                <th className="text-left py-4 px-4 font-bold text-sm">Sno</th>
                <th className="text-left py-4 px-4 font-bold text-sm">Issue Details</th>
                <th className="text-left py-4 px-4 font-bold text-sm">Last Action Details</th>
                <th className="text-left py-4 px-4 font-bold text-sm">Last Action On</th>
                <th className="text-left py-4 px-4 font-bold text-sm">Complainant</th>
                <th className="text-left py-4 px-4 font-bold text-sm">Issue On</th>
                <th className="text-center py-4 px-4 font-bold text-sm">Status</th>
                <th className="text-center py-4 px-4 font-bold text-sm">View</th>
              </tr>
            </thead>
            <tbody>
              {disciplinaryRecords.map((record) => (
                <tr key={record.sno} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-4 font-semibold text-slate-900">{record.sno}</td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-slate-900 text-sm">{record.issueDetails}</p>
                  </td>
                  <td className="py-4 px-4 text-slate-600 text-sm">{record.lastActionDetails}</td>
                  <td className="py-4 px-4 text-slate-600 text-sm">{record.lastActionOn}</td>
                  <td className="py-4 px-4 text-slate-600 text-sm font-semibold">{record.complainant}</td>
                  <td className="py-4 px-4 text-slate-600 text-sm">{record.issueOn}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => setSelectedRecord(record.sno)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                    >
                      View File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {disciplinaryRecords.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-slate-600 font-semibold">No disciplinary records found</p>
            <p className="text-sm text-slate-500 mt-2">You have a clean record!</p>
          </div>
        )}
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-600 to-slate-700 text-white flex items-center justify-between">
              <h2 className="text-2xl font-bold">Disciplinary Record Details</h2>
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {disciplinaryRecords.filter(r => r.sno === selectedRecord).map(record => (
                <div key={record.sno} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600 mb-1">Record Number</p>
                      <p className="font-bold text-slate-900 text-lg">#{record.sno}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-2">Issue Details</p>
                    <p className="font-semibold text-slate-900">{record.issueDetails}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600 mb-1">Complainant</p>
                      <p className="font-semibold text-slate-900">{record.complainant}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600 mb-1">Issue Date</p>
                      <p className="font-semibold text-slate-900">{record.issueOn}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-2">Last Action Details</p>
                    <p className="font-semibold text-slate-900">{record.lastActionDetails}</p>
                    <p className="text-sm text-slate-500 mt-2">Last Updated: {record.lastActionOn}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-1">Severity Level</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getSeverityColor(record.severity)}`}>
                      {record.severity}
                    </span>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                    <p className="text-sm text-blue-900 font-semibold mb-1">Resolution</p>
                    <p className="text-sm text-blue-800">{record.resolution}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Information Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">ℹ️</span>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Important Information</h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Disciplinary records are maintained for academic and administrative purposes. 
              If you have any concerns or wish to appeal a decision, please contact the Student Affairs Office. 
              All records are handled with confidentiality and in accordance with institutional policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
