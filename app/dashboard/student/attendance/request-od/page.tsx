'use client';

import { useState, useEffect } from 'react';

interface Course {
  course_code: string;
  course_name: string;
  credits: number;
  slot: string;
  faculty_name: string;
}

interface ODRequest {
  request_id: string;
  student_id: string;
  course_code: string;
  course_name: string;
  od_date: string;
  od_reason: string;
  od_type: string;
  supporting_document?: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  faculty_remarks?: string;
}

export default function StudentRequestODPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [odRequests, setOdRequests] = useState<ODRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [odDate, setOdDate] = useState('');
  const [odReason, setOdReason] = useState('');
  const [odType, setOdType] = useState('official');
  const [supportingDocument, setSupportingDocument] = useState<File | null>(null);

  useEffect(() => {
    fetchEnrolledCourses();
    fetchMyODRequests();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch('/api/student/courses');
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data.courses || []);
      } else {
        console.error('Failed to fetch courses:', data.error);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchMyODRequests = async () => {
    try {
      const response = await fetch('/api/student/od-requests');
      const data = await response.json();
      
      if (data.success) {
        setOdRequests(data.data.requests || []);
      } else {
        console.error('Failed to fetch OD requests:', data.error);
      }
    } catch (error) {
      console.error('Error fetching OD requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitODRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse || !odDate || !odReason.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('course_code', selectedCourse);
      formData.append('od_date', odDate);
      formData.append('od_reason', odReason);
      formData.append('od_type', odType);
      
      if (supportingDocument) {
        formData.append('supporting_document', supportingDocument);
      }

      const response = await fetch('/api/student/od-requests', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        alert('OD request submitted successfully!');
        setShowForm(false);
        setSelectedCourse('');
        setOdDate('');
        setOdReason('');
        setOdType('official');
        setSupportingDocument(null);
        fetchMyODRequests(); // Refresh the list
      } else {
        alert(`Failed to submit OD request: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting OD request:', error);
      alert('Error submitting OD request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">✅ Approved</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">❌ Rejected</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">⏳ Pending</span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Request On Duty (OD)</h1>
            <p className="text-slate-600 mt-1">Submit OD requests for official duties, conferences, and events</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            {showForm ? 'Cancel' : '+ New OD Request'}
          </button>
        </div>
      </div>

      {/* OD Request Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Submit New OD Request</h2>
          
          <form onSubmit={handleSubmitODRequest} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.course_code} value={course.course_code}>
                      {course.course_code} - {course.course_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* OD Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  OD Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={odDate}
                  onChange={(e) => setOdDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* OD Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  OD Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={odType}
                  onChange={(e) => setOdType(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="official">Official Work</option>
                  <option value="conference">Conference/Seminar</option>
                  <option value="training">Training Program</option>
                  <option value="competition">Competition/Contest</option>
                  <option value="internship">Internship Interview</option>
                  <option value="medical">Medical Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Supporting Document */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Supporting Document
                </label>
                <input
                  type="file"
                  onChange={(e) => setSupportingDocument(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Upload supporting documents (PDF, DOC, DOCX, JPG, PNG - Max 5MB)
                </p>
              </div>
            </div>

            {/* OD Reason */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Reason for OD <span className="text-red-500">*</span>
              </label>
              <textarea
                value={odReason}
                onChange={(e) => setOdReason(e.target.value)}
                rows={4}
                placeholder="Please provide detailed reason for the OD request..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit OD Request'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* My OD Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">My OD Requests</h2>
          <p className="text-slate-600 mt-1">Track your submitted OD requests and their approval status</p>
        </div>

        <div className="overflow-x-auto">
          {odRequests.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No OD Requests</h3>
              <p className="text-slate-600">You haven't submitted any OD requests yet.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Submit Your First Request
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    OD Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Faculty Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {odRequests.map((request) => (
                  <tr key={request.request_id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-slate-900">
                        {request.request_id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {request.course_code}
                        </div>
                        <div className="text-sm text-slate-600">
                          {request.course_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-900">
                        {formatDate(request.od_date)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-900 capitalize">
                        {request.od_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 max-w-xs truncate" title={request.od_reason}>
                        {request.od_reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-600">
                        {formatDate(request.requested_at)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 max-w-xs truncate" title={request.faculty_remarks}>
                        {request.faculty_remarks || '-'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}