'use client';

import { useState } from 'react';

export default function ODApprovalPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const pendingRequests = [
    {
      regNo: 1,
      studentName: 'John Doe (STU2024001)',
      courseCode: 'CS301',
      courseName: 'Data Structures',
      startDate: '2024-12-10',
      endDate: '2024-12-12',
      requestedOn: '2024-12-08',
      reason: 'Medical Emergency'
    },
  ];

  const approvedRequests = [];
  const rejectedRequests = [];

  const getCurrentRequests = () => {
    switch(activeTab) {
      case 'pending': return pendingRequests;
      case 'approved': return approvedRequests;
      case 'rejected': return rejectedRequests;
      default: return pendingRequests;
    }
  };

  const filteredRequests = getCurrentRequests().filter(req => 
    req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">OD Approval</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'pending'
                ? 'bg-yellow-50 text-yellow-600 border-b-2 border-yellow-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="mr-2">⏳</span>
            Pending
          </button>
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
              {activeTab === 'pending' && 'Pending OD Approval No Pending'}
              {activeTab === 'approved' && 'Approved OD Requests'}
              {activeTab === 'rejected' && 'Rejected OD Requests'}
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
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No data available in table</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">RegNo. ▲</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Student Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Course Code</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Course Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Start date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">End date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Requested On</th>
                    {activeTab === 'pending' && (
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Approve</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-700">{request.regNo}</td>
                      <td className="py-3 px-4 text-slate-700">{request.studentName}</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">{request.courseCode}</td>
                      <td className="py-3 px-4 text-slate-700">{request.courseName}</td>
                      <td className="py-3 px-4 text-slate-600">{request.startDate}</td>
                      <td className="py-3 px-4 text-slate-600">{request.endDate}</td>
                      <td className="py-3 px-4 text-slate-600">{request.requestedOn}</td>
                      {activeTab === 'pending' && (
                        <td className="py-3 px-4">
                          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold">
                            Approve
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-slate-600">
              Showing 0 to {filteredRequests.length} of {filteredRequests.length} entries
            </p>
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