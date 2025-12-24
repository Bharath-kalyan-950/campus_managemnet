'use client';

import { useState } from 'react';

export default function NoDueApprovedRejectedPage() {
  const [activeTab, setActiveTab] = useState('approved');
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const approvedRequests: any[] = [];
  const rejectedRequests: any[] = [];

  const getCurrentRequests = () => {
    return activeTab === 'approved' ? approvedRequests : rejectedRequests;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">No Due Approval / Rejected List</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'approved'
                ? 'bg-green-50 text-green-600 border-b-2 border-green-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="mr-2">✅</span>
            Approved
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'rejected'
                ? 'bg-red-50 text-red-600 border-b-2 border-red-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="mr-2">❌</span>
            Rejected
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {activeTab === 'approved' ? 'Approved No Due Approved' : 'Rejected No Due Requests'}
            </h3>
            
            {/* Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <select
                  value={recordsPerPage}
                  onChange={(e) => setRecordsPerPage(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 bg-white"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="text-slate-600">records</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Search:</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 bg-white placeholder-slate-500"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No data available in table</p>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-slate-600">Showing 0 to 0 of 0 entries</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">
                ‹
              </button>
              <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}