'use client';

import { useState } from 'react';

type AgentType = 'fee' | 'exam' | 'placement' | 'classroom' | null;

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(null);

  const agents = [
    {
      id: 'fee' as const,
      name: 'Fee & Finance',
      icon: '💰',
      color: 'from-emerald-500 to-teal-600',
      description: 'Manage student fees, payments, and financial records'
    },
    {
      id: 'exam' as const,
      name: 'Examination',
      icon: '📝',
      color: 'from-blue-500 to-indigo-600',
      description: 'Schedule exams, manage results, and generate reports'
    },
    {
      id: 'placement' as const,
      name: 'Placement',
      icon: '🎯',
      color: 'from-purple-500 to-pink-600',
      description: 'Track placements, job opportunities, and student careers'
    },
    {
      id: 'classroom' as const,
      name: 'Classroom Allocation',
      icon: '🏫',
      color: 'from-orange-500 to-red-600',
      description: 'Allocate classrooms, manage schedules, and resources'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                SC
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Smart Campus</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition">
                Notifications
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-semibold">
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, Admin
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Select an agent to manage your campus operations
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                selectedAgent === agent.id ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="p-6">
                <div className="text-5xl mb-4">{agent.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {agent.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {agent.description}
                </p>
              </div>
              <div className={`h-1 bg-gradient-to-r ${agent.color}`} />
            </button>
          ))}
        </div>

        {/* Selected Agent Dashboard */}
        {selectedAgent && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {agents.find(a => a.id === selectedAgent)?.name} Dashboard
              </h3>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                ✕
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Records</div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">1,234</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Active</div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">856</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Pending</div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">42</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Quick Actions</h4>
              <button className="w-full text-left px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition">
                <div className="font-medium text-slate-900 dark:text-white">View All Records</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Access complete database</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition">
                <div className="font-medium text-slate-900 dark:text-white">Generate Report</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Create detailed analytics</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition">
                <div className="font-medium text-slate-900 dark:text-white">Settings</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Configure agent parameters</div>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
