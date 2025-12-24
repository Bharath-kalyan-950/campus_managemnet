'use client';

import { useState, useEffect } from 'react';

export default function CourseApprovePage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [facultyId, setFacultyId] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [facultyCourses, setFacultyCourses] = useState<any[]>([]);

  useEffect(() => {
    // Get faculty ID from session
    const userStr = localStorage.getItem('user');
    console.log('🔍 User from localStorage:', userStr);
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('👤 Parsed user object:', user);
        console.log('🆔 Faculty ID from user:', user.faculty_id);
        const facultyIdToUse = user.faculty_id || user.registration_number || 'FAC2024001';
        console.log('🆔 Final faculty ID to use:', facultyIdToUse);
        setFacultyId(facultyIdToUse);
      } catch (error) {
        console.error('❌ Error parsing user from localStorage:', error);
        setFacultyId('FAC2024001'); // Fallback
      }
    } else {
      console.warn('⚠️ No user found in localStorage, using fallback');
      setFacultyId('FAC2024001'); // Fallback
    }
  }, []);

  useEffect(() => {
    if (facultyId) {
      console.log('🔄 useEffect triggered - activeTab:', activeTab, 'facultyId:', facultyId);
      fetchRequests();
      fetchFacultyCourses();
    }
  }, [activeTab, facultyId]);

  const fetchFacultyCourses = async () => {
    try {
      const apiUrl = `/api/faculty/courses?faculty_id=${facultyId}`;
      console.log('🔍 Fetching faculty courses from:', apiUrl);
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      console.log('📡 Faculty Courses API Response:', data);
      
      if (data.success) {
        setFacultyCourses(data.data);
        console.log('✅ Faculty courses set:', data.data.length, 'courses');
      } else {
        console.error('❌ Faculty Courses API Error:', data.error);
      }
    } catch (error) {
      console.error('❌ Faculty Courses Fetch Error:', error);
    }
  };

  const fetchRequests = async () => {
    if (!facultyId) {
      console.warn('⚠️ No faculty ID available, skipping fetch');
      return;
    }
    
    setLoading(true);
    try {
      const apiUrl = `/api/enrollment/requests?faculty_id=${facultyId}&status=${activeTab}`;
      console.log('🔍 Fetching requests from:', apiUrl);
      console.log('📊 Faculty ID:', facultyId);
      console.log('📊 Active Tab:', activeTab);
      
      const response = await fetch(apiUrl);
      console.log('📊 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('📡 API Response for tab', activeTab, ':', data);
      console.log('📊 Response success:', data.success);
      console.log('📊 Response data length:', data.data ? data.data.length : 0);
      
      if (data.success && Array.isArray(data.data)) {
        setRequests(data.data);
        console.log('✅ Requests set for', activeTab, 'tab:', data.data.length, 'items');
        
        // Log each request for debugging
        if (activeTab === 'enrolled') {
          console.log('🎯 ENROLLED STUDENTS:');
          data.data.forEach((req, index) => {
            console.log(`   ${index + 1}. ${req.student_name} (${req.student_id}) - ${req.course_code} - Slot ${req.slot} - Enrolled: ${req.enrollment_date}`);
          });
        } else {
          data.data.forEach((req, index) => {
            console.log(`   ${index + 1}. ${req.student_name} - ${req.course_code} - Slot ${req.slot} - Status: ${req.status}`);
          });
        }
      } else {
        console.error('❌ API Error or invalid data:', data.error || 'Invalid response format');
        setRequests([]);
      }
    } catch (error) {
      console.error('❌ Fetch Error:', error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.student_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = selectedCourse === '' || req.course_code === selectedCourse;
    const matchesSlot = selectedSlot === '' || req.slot === selectedSlot;
    
    return matchesSearch && matchesCourse && matchesSlot;
  });

  const handleApprove = async (requestId: string, studentName: string, courseCode: string, slot: string) => {
    const confirmMessage = `Are you sure you want to approve this enrollment?\n\nStudent: ${studentName}\nCourse: ${courseCode}\nSlot: ${slot}\n\nThis will enroll the student in the course and it will appear in their "My Courses" section.`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await fetch('/api/enrollment/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: requestId,
          action: 'approve',
          faculty_id: facultyId,
          faculty_notes: `Approved by faculty for Slot ${slot}`
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`✅ Enrollment approved successfully!\n\nStudent: ${studentName}\nCourse: ${courseCode}\nSlot: ${slot}\n\nThe course will now appear in the student's "My Courses" section.`);
        fetchRequests(); // Refresh the list
      } else {
        alert(data.error || 'Failed to approve request');
      }
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve request');
    }
  };

  const handleReject = async (requestId: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      const response = await fetch('/api/enrollment/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: requestId,
          action: 'reject',
          faculty_id: facultyId,
          faculty_notes: reason
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Enrollment request rejected');
        fetchRequests(); // Refresh the list
      } else {
        alert(data.error || 'Failed to reject request');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request');
    }
  };

  const handleRejectEnrolled = async (studentId: string, courseCode: string, studentName: string) => {
    const confirmMessage = `Are you sure you want to reject this enrolled student?\n\nStudent: ${studentName}\nCourse: ${courseCode}\n\nThis will drop the student from the course and free up a slot.`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    const reason = prompt('Please provide a reason for rejecting this student:');
    if (!reason) return;

    try {
      const response = await fetch('/api/enrollment/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject_enrolled',
          student_id: studentId,
          course_code: courseCode,
          faculty_id: facultyId,
          faculty_notes: reason
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`✅ Student rejected from course successfully!\n\nStudent: ${studentName}\nCourse: ${courseCode}\n\nThe slot is now available for other students.`);
        fetchRequests(); // Refresh the list
      } else {
        alert(data.error || 'Failed to reject student');
      }
    } catch (error) {
      console.error('Error rejecting enrolled student:', error);
      alert('Failed to reject student');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Enrollment - Course Approve</h1>
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
            onClick={() => setActiveTab('enrolled')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'enrolled'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="mr-2">👥</span>
            Enrolled
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
              {activeTab === 'pending' && 'Pending Enrolled Course Approval Pending'}
              {activeTab === 'approved' && 'Approved Enrollments'}
              {activeTab === 'enrolled' && 'Currently Enrolled Students'}
              {activeTab === 'rejected' && 'Rejected Enrollments'}
            </h3>
            
            {/* Controls */}
            <div className="space-y-4 mb-6">
              {/* Filters Row */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-slate-700">Course:</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 font-medium"
                  >
                    <option value="">All Courses</option>
                    {facultyCourses.map((course) => (
                      <option key={course.course_code} value={course.course_code}>
                        {course.course_code} - {course.course_name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-slate-700">Slot:</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 font-medium"
                  >
                    <option value="">All Slots</option>
                    <option value="A">Slot A</option>
                    <option value="B">Slot B</option>
                    <option value="C">Slot C</option>
                    <option value="D">Slot D</option>
                    <option value="E">Slot E</option>
                    <option value="F">Slot F</option>
                    <option value="G">Slot G</option>
                  </select>
                </div>
                
                {(selectedCourse || selectedSlot) && (
                  <button
                    onClick={() => {
                      setSelectedCourse('');
                      setSelectedSlot('');
                    }}
                    className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition text-sm"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
              
              {/* Search and Records Row */}
              <div className="flex items-center justify-between">
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
                    placeholder="Search student name, ID, or course..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">Loading requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No data available in table</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Student</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Course Code</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Course Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Slot</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Student Info</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Available Count</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Requested On</th>
                    {activeTab === 'pending' && (
                      <>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Approve</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Reject</th>
                      </>
                    )}
                    {activeTab === 'approved' && (
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Approved On</th>
                    )}
                    {activeTab === 'enrolled' && (
                      <>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Enrolled On</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Reject</th>
                      </>
                    )}
                    {activeTab === 'rejected' && (
                      <>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Rejected On</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Reason</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.request_id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-700">
                        <div>
                          <div className="font-semibold">{request.student_name}</div>
                          <div className="text-xs text-slate-500">{request.student_id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-blue-600">{request.course_code}</td>
                      <td className="py-3 px-4 text-slate-700">{request.course_name}</td>
                      <td className="py-3 px-4 text-purple-600 font-semibold">Slot {request.slot}</td>
                      <td className="py-3 px-4 text-slate-600 text-xs">
                        <div>Year: {request.student_year}, Sem: {request.student_semester}</div>
                        <div>CGPA: {request.student_cgpa}</div>
                        <div>{request.student_department}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{request.available_slots}</td>
                      <td className="py-3 px-4 text-slate-600">{new Date(request.request_date).toLocaleDateString()}</td>
                      {activeTab === 'pending' && (
                        <>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleApprove(request.request_id, request.student_name, request.course_code, request.slot)}
                              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold"
                            >
                              ✓ Approve
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleReject(request.request_id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold"
                            >
                              ✗ Reject
                            </button>
                          </td>
                        </>
                      )}
                      {activeTab === 'approved' && (
                        <td className="py-3 px-4 text-slate-600">{new Date(request.processed_at).toLocaleDateString()}</td>
                      )}
                      {activeTab === 'enrolled' && (
                        <>
                          <td className="py-3 px-4 text-slate-600">{new Date(request.enrollment_date || request.processed_at).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleRejectEnrolled(request.student_id, request.course_code, request.student_name)}
                              className="px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded text-xs font-semibold hover:shadow-md transition-all"
                            >
                              ✗ Reject
                            </button>
                          </td>
                        </>
                      )}
                      {activeTab === 'rejected' && (
                        <>
                          <td className="py-3 px-4 text-slate-600">{new Date(request.processed_at).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-red-600">{request.faculty_notes}</td>
                        </>
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