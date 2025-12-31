'use client';

import { useState, useEffect } from 'react';

interface ODRequest {
  request_id: string;
  faculty_id: string;
  student_id: string;
  student_name: string;
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

export default function ODApprovalPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [odRequests, setOdRequests] = useState<ODRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ODRequest | null>(null);
  const [remarks, setRemarks] = useState('');
  const [actionType, setActionType] = useState<'approved' | 'rejected'>('approved');

  useEffect(() => {
    fetchODRequests();
  }, []);

  const fetchODRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/faculty/od-requests?faculty_id=FAC2024001');
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

  const handleApproveReject = async (requestId: string, status: 'approved' | 'rejected', facultyRemarks?: string) => {
    try {
      setProcessing(requestId);
      
      const response = await fetch('/api/faculty/od-requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request_id: requestId,
          status: status,
          faculty_remarks: facultyRemarks || ''
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(`OD request ${status} successfully!`);
        fetchODRequests(); // Refresh the list
        setShowRemarkModal(false);
        setRemarks('');
        setSelectedRequest(null);
      } else {
        alert(`Failed to ${status} OD request: ${data.error}`);
      }
    } catch (error) {
      console.error(`Error ${status} OD request:`, error);
      alert(`Error ${status} OD request. Please try again.`);
    } finally {
      setProcessing(null);
    }
  };

  const openRemarkModal = (request: ODRequest, action: 'approved' | 'rejected') => {
    setSelectedRequest(request);
    setActionType(action);
    setRemarks('');
    setShowRemarkModal(true);
  };

  const getCurrentRequests = () => {
    return odRequests.filter(req => req.status === activeTab);
  };

  const filteredRequests = getCurrentRequests().filter(req => 
    req.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.request_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Pending</span>;
    }
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
        <h1 className="text-2xl font-bold text-slate-900">OD Approval</h1>
        <p className="text-slate-600 mt-1">Review and approve/reject On Duty requests from students</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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
            Pending ({odRequests.filter(r => r.status === 'pending').length})
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
            Approved ({odRequests.filter(r => r.status === 'approved').length})
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
            Rejected ({odRequests.filter(r => r.status === 'rejected').length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 bg-white"
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
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 bg-white placeholder-slate-500"
                placeholder="Search by student, course, or request ID..."
              />
            </div>
          </div>

          {/* Table */}
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">
                {activeTab === 'pending' && '⏳'}
                {activeTab === 'approved' && '✅'}
                {activeTab === 'rejected' && '❌'}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No {activeTab} OD requests
              </h3>
              <p className="text-slate-500">
                {activeTab === 'pending' && 'No pending OD requests to review.'}
                {activeTab === 'approved' && 'No approved OD requests found.'}
                {activeTab === 'rejected' && 'No rejected OD requests found.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Request ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Student</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Course</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">OD Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Reason</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Requested On</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Status</th>
                    {activeTab === 'pending' && (
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Actions</th>
                    )}
                    {activeTab !== 'pending' && (
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 border-b">Remarks</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.slice(0, parseInt(recordsPerPage)).map((request) => (
                    <tr key={request.request_id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-slate-900">{request.request_id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {request.student_name || 'Unknown Student'}
                          </div>
                          <div className="text-sm text-slate-600">{request.student_id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-sm font-semibold text-blue-600">{request.course_code}</div>
                          <div className="text-sm text-slate-600">{request.course_name}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-900">{formatDate(request.od_date)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-900 capitalize">
                          {request.od_type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-slate-900 max-w-xs truncate" title={request.od_reason}>
                          {request.od_reason}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{formatDate(request.requested_at)}</span>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(request.status)}
                      </td>
                      {activeTab === 'pending' && (
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openRemarkModal(request, 'approved')}
                              disabled={processing === request.request_id}
                              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-semibold disabled:opacity-50"
                            >
                              {processing === request.request_id ? 'Processing...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => openRemarkModal(request, 'rejected')}
                              disabled={processing === request.request_id}
                              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-semibold disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      )}
                      {activeTab !== 'pending' && (
                        <td className="py-3 px-4">
                          <div className="text-sm text-slate-600 max-w-xs truncate" title={request.faculty_remarks}>
                            {request.faculty_remarks || 'No remarks'}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-slate-600">
              Showing {Math.min(filteredRequests.length, parseInt(recordsPerPage))} of {filteredRequests.length} entries
            </p>
          </div>
        </div>
      </div>

      {/* Remark Modal */}
      {showRemarkModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                {actionType === 'approved' ? 'Approve' : 'Reject'} OD Request
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-2">Request ID: {selectedRequest.request_id}</p>
                <p className="text-sm text-slate-600 mb-2">Student: {selectedRequest.student_name}</p>
                <p className="text-sm text-slate-600 mb-4">Course: {selectedRequest.course_code}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Faculty Remarks {actionType === 'rejected' && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={4}
                  placeholder={`Please provide remarks for ${actionType === 'approved' ? 'approving' : 'rejecting'} this OD request...`}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required={actionType === 'rejected'}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRemarkModal(false);
                    setRemarks('');
                    setSelectedRequest(null);
                  }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApproveReject(selectedRequest.request_id, actionType, remarks)}
                  disabled={actionType === 'rejected' && !remarks.trim()}
                  className={`px-6 py-2 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    actionType === 'approved'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {actionType === 'approved' ? 'Approve' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}