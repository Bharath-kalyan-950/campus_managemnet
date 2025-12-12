'use client';

import { useState } from 'react';

export default function AssignmentPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today');

  const courses = [
    { code: 'MMA11024', name: 'ENVIRONMENTAL MEETING' },
    { code: 'SBC6732', name: 'Product Design and Development for Next Generation' },
    { code: 'CS301', name: 'Data Structures & Algorithms' },
    { code: 'CS302', name: 'Database Management Systems' },
    { code: 'CS303', name: 'Web Development' },
  ];

  const todayAssignments = [
    {
      id: 1,
      course: 'SBC6732',
      courseName: 'Product Design and Development for Next Generation',
      title: 'Design Prototype Assignment',
      dueDate: 'Today, 11:59 PM',
      status: 'Pending',
      description: 'Create a prototype design for next generation product',
      marks: 20,
    },
    {
      id: 2,
      course: 'CS301',
      courseName: 'Data Structures & Algorithms',
      title: 'Binary Tree Implementation',
      dueDate: 'Today, 11:59 PM',
      status: 'Pending',
      description: 'Implement binary tree with all operations',
      marks: 15,
    },
  ];

  const upcomingAssignments = [
    {
      id: 3,
      course: 'CS302',
      courseName: 'Database Management Systems',
      title: 'SQL Query Assignment',
      dueDate: 'Mar 20, 2024',
      daysLeft: 5,
      status: 'Not Started',
      description: 'Write complex SQL queries for given scenarios',
      marks: 25,
    },
    {
      id: 4,
      course: 'CS303',
      courseName: 'Web Development',
      title: 'React Portfolio Website',
      dueDate: 'Mar 25, 2024',
      daysLeft: 10,
      status: 'Not Started',
      description: 'Build a responsive portfolio website using React',
      marks: 30,
    },
    {
      id: 5,
      course: 'MMA11024',
      courseName: 'ENVIRONMENTAL MEETING',
      title: 'Environmental Impact Report',
      dueDate: 'Mar 28, 2024',
      daysLeft: 13,
      status: 'Not Started',
      description: 'Prepare a detailed environmental impact assessment',
      marks: 20,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Assignment
        </h1>
        <p className="text-slate-600 mt-2">View and manage your course assignments</p>
      </div>

      {/* Course Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Course <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 font-medium"
        >
          <option value="">--Select--</option>
          {courses.map((course, idx) => (
            <option key={idx} value={course.code}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>

        {selectedCourse && (
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-sm font-semibold text-blue-900">
              Selected Course: <span className="text-blue-600">{courses.find(c => c.code === selectedCourse)?.name}</span>
            </p>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'today'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            📅 Today / Upcoming Assignment
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            📋 Upcoming Pending Assignment
          </button>
        </div>

        {/* Today's Assignments */}
        {activeTab === 'today' && (
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Today's Pending Assignment</h2>
              <p className="text-sm text-slate-600">To view the today pending assignment</p>
            </div>

            {todayAssignments.length > 0 ? (
              <div className="space-y-4">
                {todayAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border-l-4 border-red-500 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                            {assignment.course}
                          </span>
                          <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                            Due: {assignment.dueDate}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{assignment.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{assignment.courseName}</p>
                        <p className="text-sm text-slate-700">{assignment.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-blue-600">{assignment.marks}</div>
                        <div className="text-xs text-slate-600">Marks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                        📤 Submit Assignment
                      </button>
                      <button className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all">
                        📄 View Details
                      </button>
                      <span className="ml-auto px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold">
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-slate-600">No assignments due today</p>
              </div>
            )}
          </div>
        )}

        {/* Upcoming Assignments */}
        {activeTab === 'upcoming' && (
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Upcoming Pending Assignment</h2>
              <p className="text-sm text-slate-600">To view the upcoming pending assignment upto 30 days</p>
            </div>

            {upcomingAssignments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border-l-4 border-blue-500 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                            {assignment.course}
                          </span>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold">
                            {assignment.daysLeft} days left
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{assignment.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{assignment.courseName}</p>
                        <p className="text-sm text-slate-700">{assignment.description}</p>
                        <p className="text-sm text-slate-500 mt-2">📅 Due Date: {assignment.dueDate}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-blue-600">{assignment.marks}</div>
                        <div className="text-xs text-slate-600">Marks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                        📤 Submit Assignment
                      </button>
                      <button className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all">
                        📄 View Details
                      </button>
                      <span className="ml-auto px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold">
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-slate-600">No upcoming assignments</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
              ⏰
            </div>
            <div>
              <p className="text-sm text-slate-600">Due Today</p>
              <p className="text-2xl font-bold text-slate-900">{todayAssignments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <p className="text-sm text-slate-600">Upcoming</p>
              <p className="text-2xl font-bold text-slate-900">{upcomingAssignments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-slate-900">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
