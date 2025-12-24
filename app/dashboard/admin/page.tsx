'use client';

import { useState } from 'react';

type AgentType = 'fee' | 'exam' | 'placement' | 'classroom' | null;

export default function AdminDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(null);

  const agents = [
    {
      id: 'fee' as const,
      name: 'Fee & Finance',
      icon: '💰',
      color: 'from-emerald-500 to-teal-600',
      description: 'Manage student fees, payments, and financial records',
      stats: { total: 1234, active: 856, pending: 42 }
    },
    {
      id: 'exam' as const,
      name: 'Examination',
      icon: '📝',
      color: 'from-blue-500 to-indigo-600',
      description: 'Schedule exams, manage results, and generate reports',
      stats: { total: 856, active: 645, pending: 28 }
    },
    {
      id: 'placement' as const,
      name: 'Placement',
      icon: '🎯',
      color: 'from-purple-500 to-pink-600',
      description: 'Track placements, job opportunities, and student careers',
      stats: { total: 542, active: 387, pending: 15 }
    },
    {
      id: 'classroom' as const,
      name: 'Classroom Allocation',
      icon: '🏫',
      color: 'from-orange-500 to-red-600',
      description: 'Allocate classrooms, manage schedules, and resources',
      stats: { total: 245, active: 198, pending: 12 }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                SC
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Admin Portal</h1>
                <p className="text-xs text-slate-600">Welcome back, Administrator</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition">
                Settings
              </button>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">2,845</h3>
            <p className="text-sm text-slate-600">Total Students</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">156</h3>
            <p className="text-sm text-slate-600">Faculty Members</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+8%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">$2.4M</h3>
            <p className="text-sm text-slate-600">Revenue This Month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Good</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">94%</h3>
            <p className="text-sm text-slate-600">System Efficiency</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Campus Management Agents
          </h2>
          <p className="text-slate-600">
            Select an agent to manage your campus operations
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                selectedAgent === agent.id ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="p-6">
                <div className="text-5xl mb-4">{agent.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {agent.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {agent.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Active: {agent.stats.active}</span>
                  <span className="text-orange-600 font-semibold">Pending: {agent.stats.pending}</span>
                </div>
              </div>
              <div className={`h-1 bg-gradient-to-r ${agent.color}`} />
            </button>
          ))}
        </div>

        {/* Selected Agent Dashboard */}
        {selectedAgent && (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                {agents.find(a => a.id === selectedAgent)?.name} Dashboard
              </h3>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-slate-500 hover:text-slate-700 transition"
              >
                ✕
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-sm text-slate-600 mb-1">Total Records</div>
                <div className="text-3xl font-bold text-slate-900">{agents.find(a => a.id === selectedAgent)?.stats.total}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-sm text-slate-600 mb-1">Active</div>
                <div className="text-3xl font-bold text-slate-900">{agents.find(a => a.id === selectedAgent)?.stats.active}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-sm text-slate-600 mb-1">Pending</div>
                <div className="text-3xl font-bold text-slate-900">{agents.find(a => a.id === selectedAgent)?.stats.pending}</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 mb-3">Quick Actions</h4>
              {selectedAgent === 'classroom' ? (
                <>
                  <a href="/dashboard/admin/classroom-agent" className="block w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
                    <div className="font-medium text-slate-900">🤖 Classroom Agent Dashboard</div>
                    <div className="text-sm text-slate-600">AI-powered classroom allocation system</div>
                  </a>
                  <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
                    <div className="font-medium text-slate-900">📊 Room Utilization Report</div>
                    <div className="text-sm text-slate-600">View classroom usage analytics</div>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
                    <div className="font-medium text-slate-900">⚙️ Agent Configuration</div>
                    <div className="text-sm text-slate-600">Configure AI agent parameters</div>
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
                    <div className="font-medium text-slate-900">View All Records</div>
                    <div className="text-sm text-slate-600">Access complete database</div>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
                    <div className="font-medium text-slate-900">Generate Report</div>
                    <div className="text-sm text-slate-600">Create detailed analytics</div>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
                    <div className="font-medium text-slate-900">Agent Settings</div>
                    <div className="text-sm text-slate-600">Configure agent parameters</div>
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Recent Activity & System Status */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'New student enrollment', user: 'Admission Office', time: '5 mins ago', type: 'student' },
                { action: 'Fee payment processed', user: 'Finance Agent', time: '12 mins ago', type: 'fee' },
                { action: 'Exam schedule updated', user: 'Exam Controller', time: '1 hour ago', type: 'exam' },
                { action: 'Classroom allocated', user: 'Admin', time: '2 hours ago', type: 'classroom' },
                { action: 'Placement drive scheduled', user: 'Placement Cell', time: '3 hours ago', type: 'placement' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {activity.type === 'student' ? '👥' : activity.type === 'fee' ? '💰' : activity.type === 'exam' ? '📝' : activity.type === 'classroom' ? '🏫' : '🎯'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-sm">{activity.action}</h3>
                    <p className="text-xs text-slate-600">{activity.user}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">System Status</h2>
            <div className="space-y-4">
              {[
                { name: 'Fee & Finance Agent', status: 'operational', uptime: 99.9 },
                { name: 'Examination Agent', status: 'operational', uptime: 99.8 },
                { name: 'Placement Agent', status: 'operational', uptime: 99.7 },
                { name: 'Classroom Agent', status: 'maintenance', uptime: 98.5 },
              ].map((system, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 text-sm">{system.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${system.status === 'operational' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                      {system.status === 'operational' ? '● Operational' : '● Maintenance'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full" style={{ width: `${system.uptime}%` }}></div>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{system.uptime}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">All Systems Running</h3>
                  <p className="text-xs text-slate-600">Last checked: 2 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
