'use client';

import { useState } from 'react';

export default function DisciplinaryActionTaken() {
  const [activeTab, setActiveTab] = useState('inprogress');
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const stats = {
    inProgress: 0,
    closed: 0,
    total: 0
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Disciplinary Action Taken</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center">
              <div className="text-4xl font-bold mb-2">{stats.inProgress}</div>
              <div className="text-sm font-medium">InProgress</div>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-6 text-white text-center">
              <div className="text-4xl font-bold mb-2">{stats.closed}</div>
              <div className="text-sm font-medium">Closed</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center">
              <div className="text-4xl font-bold mb-2">{stats.total}</div>
              <div className="text-sm font-medium">Total</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('inprogress')}
              className={`pb-2 px-4 font-medium transition-colors ${
                activeTab === 'inprogress'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              InProgress
            </button>
            <button
              onClick={() => setActiveTab('closed')}
              className={`pb-2 px-4 font-medium transition-colors ${
                activeTab === 'closed'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Closed
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-sm text-gray-600">records</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-600 text-white">
                  <th className="border border-slate-400 px-4 py-3 text-left">RegNo.</th>
                  <th className="border border-slate-400 px-4 py-3 text-left">Student</th>
                  <th className="border border-slate-400 px-4 py-3 text-left">Issue Details</th>
                  <th className="border border-slate-400 px-4 py-3 text-left">Last Action Details</th>
                  <th className="border border-slate-400 px-4 py-3 text-left">Complainant</th>
                  <th className="border border-slate-400 px-4 py-3 text-left">Issue On</th>
                  <th className="border border-slate-400 px-4 py-3 text-left">View</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="border border-slate-300 px-4 py-12 text-center text-gray-400">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          <div className="mt-4 text-sm text-gray-600">
            Showing 0 to 0 of 0 entries
          </div>

          {/* Closed Cases Note */}
          {activeTab === 'closed' && (
            <div className="mt-4 text-sm text-gray-500 italic">
              Closed cases
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
