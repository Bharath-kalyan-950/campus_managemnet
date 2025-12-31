'use client';

import { useState, useEffect } from 'react';

export default function EnrollmentPage() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]); // Track all selected courses
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error', show: boolean}>({
    message: '',
    type: 'success',
    show: false
  });

  const slots = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, show: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 5000); // Hide after 5 seconds
  };

  useEffect(() => {
    // Get student ID from server instead of localStorage
    fetchStudentIdFromServer();
  }, []);

  const fetchStudentIdFromServer = async () => {
    try {
      console.log('🔍 Fetching student ID from server...');
      const response = await fetch('/api/student/profile');
      const data = await response.json();
      
      if (data.success) {
        const studentIdToUse = data.data.student_id;
        console.log('✅ Student ID from server:', studentIdToUse);
        setStudentId(studentIdToUse);
      } else {
        console.error('❌ Failed to get student ID from server:', data.error || 'Unknown error');
        setStudentId('STU2024001'); // Fallback to John Doe
      }
    } catch (error) {
      console.error('❌ Error fetching student ID from server:', error);
      setStudentId('STU2024001'); // Fallback to John Doe
    }
  };

  useEffect(() => {
    console.log('🔄 useEffect triggered - selectedSlot:', selectedSlot, 'studentId:', studentId);
    if (selectedSlot) {
      console.log('✅ Slot selected, calling fetchCoursesBySlot');
      fetchCoursesBySlot();
    } else {
      console.log('⚠️ No slot selected yet');
    }
  }, [selectedSlot, studentId]);

  // Fetch student's enrollment requests to sync with database
  useEffect(() => {
    if (studentId) {
      fetchStudentEnrollmentRequests();
    }
  }, [studentId]);

  // Refresh enrollment data every 30 seconds to catch faculty approvals
  useEffect(() => {
    if (studentId) {
      const interval = setInterval(() => {
        fetchStudentEnrollmentRequests();
        if (selectedSlot) {
          fetchCoursesBySlot();
        }
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [studentId, selectedSlot]);

  const fetchCoursesBySlot = async () => {
    setLoading(true);
    try {
      // Build API URL - student_id is optional now
      const apiUrl = `/api/enrollment/slots?slot=${selectedSlot}${studentId ? `&student_id=${studentId}` : ''}`;
      console.log('🔍 Fetching courses from:', apiUrl);
      console.log('📊 Student ID:', studentId || 'NOT SET');
      console.log('📊 Selected Slot:', selectedSlot);
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      console.log('📡 API Response:', data);
      
      if (data.success) {
        console.log('✅ API Success - Found courses:', data.data.length);
        console.log('📚 Courses:', data.data.map(c => `${c.course_code} - ${c.course_name}`));
        
        // Show only courses with available slots and mark their status
        const coursesWithStatus = data.data
          .filter((c: any) => c.available_slots > 0 || c.enrollment_status === 'pending' || c.enrollment_status === 'enrolled')
          .map((c: any) => {
            const isSelected = selectedCourses.some((sc: any) => sc.course_code === c.course_code);
            return {
              ...c,
              // Override enrollment_status if locally selected but not yet in database
              enrollment_status: isSelected && c.enrollment_status === 'available' ? 'pending' : c.enrollment_status
            };
          });
        
        console.log('🔍 Courses with status:', coursesWithStatus.length);
        setCourses(coursesWithStatus);
        
        // Update enrolled courses from API (actual enrollments)
        const enrolled = studentId ? data.data.filter((c: any) => c.enrollment_status === 'enrolled') : [];
        setEnrolledCourses(enrolled);
      } else {
        console.error('❌ API Error:', data.error);
        setCourses([]);
      }
    } catch (error) {
      console.error('❌ Fetch Error:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollDirect = async (course: any) => {
    if (!selectedSlot) {
      showToast('Please select a slot first', 'error');
      return;
    }

    try {
      const response = await fetch('/api/enrollment/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          course_code: course.course_code,
          slot: selectedSlot
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Add course to selected courses list (persistent across slots)
        const newSelectedCourse = {
          ...course,
          enrollment_status: 'pending',
          selected_slot: selectedSlot
        };
        
        setSelectedCourses(prev => [...prev, newSelectedCourse]);
        
        showToast(`Enrollment request submitted for ${course.course_name} (Slot ${selectedSlot})`, 'success');
        fetchCoursesBySlot(); // Refresh courses to show updated status
      } else {
        showToast(data.error || 'Failed to submit enrollment request', 'error');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      showToast('Failed to submit enrollment request', 'error');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'enrolled':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Enrolled</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">Pending</span>;
      default:
        return null;
    }
  };

  const fetchStudentEnrollmentRequests = async () => {
    if (!studentId) return;
    
    try {
      console.log('🔍 Fetching student enrollment requests for:', studentId);
      const response = await fetch(`/api/enrollment/requests?student_id=${studentId}`);
      const data = await response.json();
      
      if (data.success) {
        console.log('📋 Found enrollment requests:', data.data.length);
        
        // Only get pending requests for selected courses
        const pendingRequests = data.data.filter((req: any) => req.status === 'pending');
        
        // Update selected courses with pending requests only
        const pendingCourses = pendingRequests.map((req: any) => ({
          course_code: req.course_code,
          course_name: req.course_name,
          slot: req.slot,
          selected_slot: req.slot,
          credits: 3, // Default credits
          enrollment_status: 'pending',
          faculty_name: req.faculty_name
        }));
        
        setSelectedCourses(pendingCourses);
        console.log('✅ Updated selected courses from database:', pendingCourses.length);
        
        // Get enrolled courses separately
        fetchEnrolledCourses();
      }
    } catch (error) {
      console.error('❌ Error fetching enrollment requests:', error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch('/api/student/courses');
      const data = await response.json();
      
      if (data.success && data.data && data.data.courses) {
        // Filter only courses that are actually enrolled (not dropped)
        const enrolledCourses = data.data.courses
          .filter((course: any) => course.enrollment_status === 'enrolled' || course.enrollment_status === 'approved')
          .map((course: any) => ({
            course_code: course.course_code,
            course_name: course.course_name,
            slot: course.slot,
            credits: course.credits,
            enrollment_status: course.enrollment_status,
            faculty_name: course.faculty_name
          }));
        
        setEnrolledCourses(enrolledCourses);
        console.log('✅ Updated enrolled courses from student courses API:', enrolledCourses.length);
      } else {
        console.error('❌ Invalid data structure from student courses API:', data);
        setEnrolledCourses([]);
      }
    } catch (error) {
      console.error('❌ Error fetching enrolled courses:', error);
      setEnrolledCourses([]);
    }
  };

  const removeSelectedCourse = async (courseCode: string) => {
    try {
      // Find the course to get its details
      const courseToRemove = selectedCourses.find(c => c.course_code === courseCode);
      if (!courseToRemove) {
        console.error('Course not found in selected courses');
        return;
      }

      console.log('🗑️ Removing course:', courseCode, 'from slot:', courseToRemove.selected_slot || courseToRemove.slot);

      // Call API to delete the enrollment request from database
      const response = await fetch(`/api/enrollment/requests?student_id=${studentId}&course_code=${courseCode}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove from local state
        setSelectedCourses(prev => prev.filter(c => c.course_code !== courseCode));
        
        // Refresh enrollment requests to sync with database
        await fetchStudentEnrollmentRequests();
        
        // Refresh current slot to show the course again if we're viewing its slot
        const courseSlot = courseToRemove.selected_slot || courseToRemove.slot;
        if (selectedSlot === courseSlot) {
          await fetchCoursesBySlot();
        }
        
        console.log('✅ Course removed successfully and will appear in slot', courseSlot);
        showToast(`Course ${courseCode} removed successfully! Available in Slot ${courseSlot}`, 'success');
      } else {
        console.error('❌ Failed to remove course:', data.error);
        showToast(data.error || 'Failed to remove course', 'error');
      }
    } catch (error) {
      console.error('❌ Error removing course:', error);
      showToast('Failed to remove course', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-lg">
              {toast.type === 'success' ? '✅' : '❌'}
            </span>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Enrollment
        </h1>
        <p className="text-slate-600 mt-2">Select your courses for the current semester</p>
        

      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Section - Slot Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Slot Selector */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Select Slot <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => {
                  console.log('🎯 Slot selected:', e.target.value);
                  setSelectedSlot(e.target.value);
                  // Refresh enrollment data to get latest capacity
                  if (studentId) {
                    fetchStudentEnrollmentRequests();
                  }
                }}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 font-medium"
              >
                <option value="">--Select--</option>
                {slots.map((slot, idx) => (
                  <option key={idx} value={slot}>Slot {slot}</option>
                ))}
              </select>
            </div>

            {selectedSlot && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <p className="text-sm font-semibold text-blue-900">
                  Selected Slot: <span className="text-blue-600">Slot {selectedSlot}</span>
                </p>
                {loading && <p className="text-sm text-blue-700 mt-1">Loading courses...</p>}
              </div>
            )}
          </div>



          {/* Available Courses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {selectedSlot ? `Available Courses in Slot ${selectedSlot}` : 'Available Courses'}
            </h2>
            {!selectedSlot ? (
              <p className="text-slate-500 text-center py-8">Please select a slot to view available courses</p>
            ) : loading ? (
              <p className="text-slate-500 text-center py-8">Loading courses...</p>
            ) : courses.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No courses available in this slot</p>
            ) : (
              <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.course_code} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900">{course.course_code} - {course.course_name}</h3>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          👨‍🏫 {course.faculty_name} • 📅 Slot {course.slot} • 🎓 {course.credits} Credits
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          Capacity: {course.available_slots} available
                        </p>
                      </div>
                      {course.enrollment_status === 'available' ? (
                        <button 
                          onClick={() => handleEnrollDirect(course)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                        >
                          Enroll
                        </button>
                      ) : course.enrollment_status === 'pending' ? (
                        <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-semibold text-sm">
                          Pending
                        </span>
                      ) : course.enrollment_status === 'enrolled' ? (
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">
                          Enrolled
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Status */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Enrollment Status</h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">Total Credits</p>
                <p className="text-2xl font-bold text-slate-900">
                  {enrolledCourses.reduce((sum: number, c: any) => sum + (c.credits || 0), 0) + 
                   selectedCourses.reduce((sum: number, c: any) => sum + (c.credits || 0), 0)}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-emerald-600">{enrolledCourses.length}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">Pending Courses</p>
                <p className="text-2xl font-bold text-yellow-600">{selectedCourses.length}</p>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">My Enrolled Courses</h2>
            {enrolledCourses.length === 0 && selectedCourses.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">No enrolled courses yet</p>
            ) : (
              <div className="space-y-3">
                {/* Show actually enrolled courses */}
                {enrolledCourses.map((course: any) => (
                  <div key={`enrolled-${course.course_code}`} className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{course.course_code}</h3>
                        <p className="text-xs text-slate-600">{course.course_name}</p>
                        <p className="text-xs text-slate-500 mt-1">Slot {course.slot || course.selected_slot} • {course.credits} Credits</p>
                        {course.faculty_name && (
                          <p className="text-xs text-slate-500">Faculty: {course.faculty_name}</p>
                        )}
                      </div>
                      <span className="px-2 py-1 bg-emerald-600 text-white rounded text-xs font-bold">
                        ✓ Enrolled
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Show selected courses (pending approval) */}
                {selectedCourses.map((course: any) => (
                  <div key={`selected-${course.course_code}`} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-sm">{course.course_code}</h3>
                        <p className="text-xs text-slate-600">{course.course_name}</p>
                        <p className="text-xs text-slate-500 mt-1">Slot {course.selected_slot || course.slot} • {course.credits} Credits</p>
                        {course.faculty_name && (
                          <p className="text-xs text-slate-500">Faculty: {course.faculty_name}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs font-bold">
                          ⏳ Pending
                        </span>
                        <button
                          onClick={() => removeSelectedCourse(course.course_code)}
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600 transition"
                          title="Remove from selection"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-lg font-bold mb-3">Need Help?</h2>
            <p className="text-sm text-blue-100 mb-4">
              Contact the academic office for enrollment assistance
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-semibold transition-all">
              📧 Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
