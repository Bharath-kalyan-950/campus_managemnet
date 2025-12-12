'use client';

import { useState } from 'react';

export default function ViewIssue() {
  const [activeTab, setActiveTab] = useState('inprogress');

  const issues = [
    { id: 1, title: 'Projector malfunction in Faculty Room 205', status: 'In Progress', date: '2024-01-15', location: 'Faculty Room 205', description: 'The projector is not displaying properly and makes strange noises.' },
    { id: 2, title: 'AC not working in Conference Hall', status: 'Resolved', date: '2024-01-10', location: 'Conference Hall', description: 'Air conditioning unit stopped working during the meeting.' },
    { id: 3, title: 'Whiteboard marker shortage in Lab 3', status: 'In Progress', date: '2024-01-12', location: 'Lab 3', description: 'Need more whiteboard markers for daily classes.' },
    { id: 4, title: 'Broken chair in Faculty Lounge', status: 'Closed', date: '2024-01-08', location: 'Faculty Lounge', description: 'One of the chairs has a broken leg and is unsafe to use.' },
  ];

  const filteredIssues = issues.filter(issue => {
    if (activeTab === 'inprogress') return issue.status === 'In Progress';
    if (activeTab === 'closed') return issue.status === 'Resolved' || issue.status === 'Closed';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          View Issue
        </h1>
        <p className="text-slate-600 mt-2">Track your submitted infrastructure issues</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
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

        {/* Content */}
        <div className="text-sm text-gray-600 mb-4">
          UnAssigned,Assigned and Completed Issues
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Issues Found</h3>
              <p className="text-slate-600">No {activeTab === 'inprogress' ? 'in progress' : 'closed'} issues to display.</p>
            </div>
          ) : (
            filteredIssues.map((issue) => (
              <div key={issue.id} className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-all border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{issue.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {issue.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {issue.date}
                      </span>
                    </div>
                    <p className="text-slate-700 mb-4">{issue.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ml-4 ${
                    issue.status === 'Resolved' || issue.status === 'Closed' ? 'bg-emerald-100 text-emerald-600' :
                    issue.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-500">
                    Issue ID: #{issue.id.toString().padStart(4, '0')}
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Issues</p>
              <h3 className="text-3xl font-bold mt-2">{issues.length}</h3>
            </div>
            <div className="text-4xl opacity-80">📋</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">In Progress</p>
              <h3 className="text-3xl font-bold mt-2">{issues.filter(i => i.status === 'In Progress').length}</h3>
            </div>
            <div className="text-4xl opacity-80">⏳</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Resolved</p>
              <h3 className="text-3xl font-bold mt-2">{issues.filter(i => i.status === 'Resolved' || i.status === 'Closed').length}</h3>
            </div>
            <div className="text-4xl opacity-80">✅</div>
          </div>
        </div>
      </div>
    </div>
  );
}