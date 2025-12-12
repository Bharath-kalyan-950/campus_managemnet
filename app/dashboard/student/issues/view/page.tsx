'use client';

import { useState } from 'react';

export default function ViewIssueSolutionPage() {
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  const issues = [
    {
      id: 1,
      title: 'Broken AC in Classroom 301',
      description: 'The air conditioning unit is not working properly',
      location: 'Building A, Room 301',
      reportedDate: '15/04/2023',
      status: 'Resolved',
      priority: 'High',
      solution: 'AC unit has been repaired and is now functioning properly. Maintenance team completed the work on 17/04/2023.',
      resolvedDate: '17/04/2023',
      assignedTo: 'Maintenance Team',
    },
    {
      id: 2,
      title: 'Damaged desk in Library',
      description: 'One of the study desks has a broken leg',
      location: 'Library, 2nd Floor',
      reportedDate: '10/04/2023',
      status: 'Resolved',
      priority: 'Medium',
      solution: 'Desk has been replaced with a new one. Old desk removed from library.',
      resolvedDate: '12/04/2023',
      assignedTo: 'Facilities Team',
    },
    {
      id: 3,
      title: 'Faulty projector in Lab 2',
      description: 'Projector not displaying properly, showing distorted images',
      location: 'Computer Lab 2',
      reportedDate: '18/04/2023',
      status: 'In Progress',
      priority: 'High',
      solution: 'Technician has been assigned. Parts ordered and expected to arrive by 22/04/2023.',
      resolvedDate: null,
      assignedTo: 'IT Support',
    },
    {
      id: 4,
      title: 'Leaking water tap in Restroom',
      description: 'Water tap continuously leaking in mens restroom',
      location: 'Building B, Ground Floor',
      reportedDate: '20/04/2023',
      status: 'Under Review',
      priority: 'Medium',
      solution: 'Issue has been logged and plumber will be assigned shortly.',
      resolvedDate: null,
      assignedTo: 'Pending Assignment',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Resolved') return 'bg-emerald-100 text-emerald-600';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-600';
    if (status === 'Under Review') return 'bg-orange-100 text-orange-600';
    return 'bg-slate-100 text-slate-600';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'bg-red-100 text-red-600';
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-600';
    if (priority === 'Low') return 'bg-green-100 text-green-600';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          View Issue Solution
        </h1>
        <p className="text-slate-600 mt-2">Track the status and solutions of your reported issues</p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Issues</p>
              <p className="text-2xl font-bold text-slate-900">{issues.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-600">Resolved</p>
              <p className="text-2xl font-bold text-slate-900">
                {issues.filter(i => i.status === 'Resolved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              ⏳
            </div>
            <div>
              <p className="text-sm text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-slate-900">
                {issues.filter(i => i.status === 'In Progress').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              👁️
            </div>
            <div>
              <p className="text-sm text-slate-600">Under Review</p>
              <p className="text-2xl font-bold text-slate-900">
                {issues.filter(i => i.status === 'Under Review').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Your Reported Issues</h2>
        <div className="space-y-4">
          {issues.map((issue) => (
            <div key={issue.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(issue.priority)}`}>
                      {issue.priority} Priority
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{issue.title}</h3>
                  <p className="text-sm text-slate-600 mb-2">{issue.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>📍 {issue.location}</span>
                    <span>📅 Reported: {issue.reportedDate}</span>
                    {issue.resolvedDate && <span>✅ Resolved: {issue.resolvedDate}</span>}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500 mb-4">
                <p className="text-sm font-semibold text-slate-700 mb-1">Solution/Update:</p>
                <p className="text-sm text-slate-600">{issue.solution}</p>
                <p className="text-xs text-slate-500 mt-2">Assigned to: {issue.assignedTo}</p>
              </div>

              <button
                onClick={() => setSelectedIssue(issue.id)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
              >
                View Full Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Issue Details Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
              <h2 className="text-2xl font-bold">Issue Details</h2>
              <button
                onClick={() => setSelectedIssue(null)}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {issues.filter(i => i.id === selectedIssue).map(issue => (
                <div key={issue.id} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600 mb-1">Issue ID</p>
                      <p className="font-bold text-slate-900 text-lg">#{issue.id}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-2">Issue Title</p>
                    <p className="font-bold text-slate-900">{issue.title}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-2">Description</p>
                    <p className="text-slate-900">{issue.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600 mb-1">Location</p>
                      <p className="font-semibold text-slate-900">{issue.location}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600 mb-1">Priority</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600 mb-1">Reported Date</p>
                      <p className="font-semibold text-slate-900">{issue.reportedDate}</p>
                    </div>
                    {issue.resolvedDate && (
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-sm text-slate-600 mb-1">Resolved Date</p>
                        <p className="font-semibold text-slate-900">{issue.resolvedDate}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                    <p className="text-sm text-blue-900 font-semibold mb-2">Solution/Update</p>
                    <p className="text-sm text-blue-800">{issue.solution}</p>
                    <p className="text-xs text-blue-700 mt-2">Assigned to: {issue.assignedTo}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setSelectedIssue(null)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
