'use client';

import { useState } from 'react';

export default function ViewCoursePage() {
  const [activeTab, setActiveTab] = useState('running');
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const runningCourses = [
    { 
      sno: 1, code: 'CS301', name: 'Data Structures', type: 'Contact Course', 
      subjectCategory: 'Theory', courseCategory: 'Core', prerequisite: 'None',
      slot: 'A', available: 30, principal: 45, createdOn: '2024-01-15',
      attendance: '85%', noDue: 'Yes', isRunning: true
    },
    { 
      sno: 2, code: 'CS302', name: 'Database Management Systems', type: 'Contact Course',
      subjectCategory: 'Theory', courseCategory: 'Core', prerequisite: 'CS301',
      slot: 'B', available: 28, principal: 42, createdOn: '2024-01-15',
      attendance: '88%', noDue: 'Yes', isRunning: true
    },
    { 
      sno: 3, code: 'CS303', name: 'Computer Networks', type: 'Contact Course',
      subjectCategory: 'Theory', courseCategory: 'Core', prerequisite: 'None',
      slot: 'C', available: 25, principal: 40, createdOn: '2024-01-16',
      attendance: '82%', noDue: 'Yes', isRunning: true
    },
  ];

  const approvedCourses = [
    { 
      sno: 1, code: 'CS307', name: 'Machine Learning', type: 'Contact Course',
      subjectCategory: 'Theory', courseCategory: 'Elective', prerequisite: 'CS301',
      slot: 'E', available: 20, principal: 25, createdOn: '2024-11-30',
      attendance: 'N/A', noDue: 'N/A', isRunning: false
    },
  ];

  const rejectedCourses = [
    { 
      sno: 1, code: 'CS320', name: 'Quantum Computing', type: 'Online Course',
      subjectCategory: 'Theory', courseCategory: 'Elective', prerequisite: 'CS301',
      slot: 'F', available: 15, principal: 20, createdOn: '2024-11-25',
      attendance: 'N/A', noDue: 'N/A', isRunning: false, reason: 'Insufficient resources'
    },
  ];

  const getCurrentCourses = () => {
    switch(activeTab) {
      case 'running': return runningCourses;
      case 'approved': return approvedCourses;
      case 'rejected': return rejectedCourses;
      default: return runningCourses;
    }
  };

  const filteredCourses = getCurrentCourses().filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">View Course</h1>
        </div>
        <button
          onClick={() => window.location.href = '/dashboard/faculty/course/create'}
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          + Create Course
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('running')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'running'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="mr-2">⏱️</span>
            Running / Approved
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
            Completed
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
              {activeTab === 'running' && 'Running Running courses'}
              {activeTab === 'approved' && 'Completed Courses'}
              {activeTab === 'rejected' && 'Rejected Courses'}
            </h3>
            
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
                  placeholder="Search courses..."
                />
              </div>
            </div>
          </div>

          {/* Table */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No data available in table</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Sno ▲</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Code</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Course Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Subject Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Course Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Prerequisite</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Slot</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Available</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Principal</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Created On</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Attendance</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">No Due</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">IsRunning</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.sno} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-700">{course.sno}</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">{course.code}</td>
                      <td className="py-3 px-4 text-slate-700">{course.name}</td>
                      <td className="py-3 px-4 text-slate-600">{course.type}</td>
                      <td className="py-3 px-4 text-slate-600">{course.subjectCategory}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          course.courseCategory === 'Core' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {course.courseCategory}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{course.prerequisite}</td>
                      <td className="py-3 px-4 text-slate-700">{course.slot}</td>
                      <td className="py-3 px-4 text-slate-700">{course.available}</td>
                      <td className="py-3 px-4 text-slate-700">{course.principal}</td>
                      <td className="py-3 px-4 text-slate-600">{course.createdOn}</td>
                      <td className="py-3 px-4 text-slate-700">{course.attendance}</td>
                      <td className="py-3 px-4 text-slate-700">{course.noDue}</td>
                      <td className="py-3 px-4">
                        {course.isRunning ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            Yes
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                            No
                          </span>
                        )}
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
              Showing 0 to {filteredCourses.length} of {filteredCourses.length} entries
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