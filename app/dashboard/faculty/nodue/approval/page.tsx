'use client';

import { useState } from 'react';

export default function NoDueApprovalPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const requests = [
    {
      sno: 1,
      regNo: 'STU2024001',
      studentName: 'John Doe',
      courseCode: 'CS301',
      courseName: 'Data Structures',
      program: 'B.Tech CSE',
      year: '2024',
      requestedOn: '2024-12-01'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">No Due Approval</h1>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <select
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
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
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Table */}
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No data available in table</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">SNo. ▲</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">RegNo.</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Student Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Course Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Course Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Program</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Year</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Requested On</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">{request.sno}</td>
                    <td className="py-3 px-4 font-semibold text-blue-600">{request.regNo}</td>
                    <td className="py-3 px-4 text-slate-700">{request.studentName}</td>
                    <td className="py-3 px-4 text-slate-700">{request.courseCode}</td>
                    <td className="py-3 px-4 text-slate-700">{request.courseName}</td>
                    <td className="py-3 px-4 text-slate-700">{request.program}</td>
                    <td className="py-3 px-4 text-slate-700">{request.year}</td>
                    <td className="py-3 px-4 text-slate-600">{request.requestedOn}</td>
                    <td className="py-3 px-4">
                      <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold">
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-slate-600">
            Showing 0 to {requests.length} of {requests.length} entries
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
  );
}