'use client';

import { useState, useEffect } from 'react';

export default function ViewCoursePage() {
  const [activeTab, setActiveTab] = useState('running');
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [facultyId, setFacultyId] = useState('');

  useEffect(() => {
    // Get faculty ID from session
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const facultyIdToUse = user.faculty_id || user.registration_number || 'FAC2024001';
        setFacultyId(facultyIdToUse);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        setFacultyId('FAC2024001');
      }
    } else {
      setFacultyId('FAC2024001');
    }
  }, []);

  useEffect(() => {
    if (facultyId) {
      fetchCourses();
    }
  }, [facultyId, activeTab]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/faculty/courses?faculty_id=${facultyId}`);
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data);
      } else {
        console.error('Failed to fetch courses:', data.error);
        setCourses([]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentCourses = () => {
    switch(activeTab) {
      case 'running': 
        // Show courses that have enrolled students (running courses)
        return courses.filter(course => course.enrolled_students > 0);
      case 'approved': 
        // Show courses that are created but not yet running (no enrolled students)
        return courses.filter(course => course.enrolled_students === 0);
      case 'rejected': 
        // For now, return empty array as we don't have rejected courses in DB
        return [];
      default: 
        return courses.filter(course => course.enrolled_students > 0);
    }
  };

  const filteredCourses = getCurrentCourses().filter(course => 
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.course_code.toLowerCase().includes(searchTerm.toLowerCase())
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
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
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
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Credits</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Slot</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Capacity</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Enrolled</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Available</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Pending</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">IsRunning</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, index) => (
                    <tr key={course.course_code} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-700">{index + 1}</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">{course.course_code}</td>
                      <td className="py-3 px-4 text-slate-700">{course.course_name}</td>
                      <td className="py-3 px-4 text-slate-600 capitalize">{course.course_type}</td>
                      <td className="py-3 px-4 text-slate-700">{course.credits}</td>
                      <td className="py-3 px-4 text-purple-600 font-semibold">Slot {course.slot}</td>
                      <td className="py-3 px-4 text-slate-700">{course.max_capacity}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">{course.current_enrolled}</td>
                      <td className="py-3 px-4 text-blue-600 font-semibold">{course.available_slots}</td>
                      <td className="py-3 px-4 text-orange-600 font-semibold">{course.pending_requests}</td>
                      <td className="py-3 px-4">
                        {course.enrolled_students > 0 ? (
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