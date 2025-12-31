'use client';

import { useState, useEffect } from 'react';
// Using inline SVG icons to match existing codebase style

export default function ClassroomRequestPage() {
  const [requests, setRequests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [formData, setFormData] = useState({
    course_code: '',
    requested_date: '',
    start_time: '',
    end_time: '',
    expected_strength: '',
    required_equipment: {},
    purpose: '',
    priority: 'medium'
  });

  useEffect(() => {
    fetchRequests();
    fetchRooms();
    fetchMyCourses();
    fetchAiSuggestions();
  }, []);

  const fetchRequests = async () => {
    try {
      // In real implementation, get faculty_id from session/auth
      const facultyId = 'FAC2024001'; 
      const response = await fetch(`/api/classroom-agent/requests?faculty_id=${facultyId}`);
      const data = await response.json();
      
      if (data.success) {
        setRequests(data.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/classroom-agent/rooms');
      const data = await response.json();
      
      if (data.success) {
        setRooms(data.data.rooms);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchMyCourses = async () => {
    try {
      // In real implementation, get faculty_id from session/auth
      const facultyId = 'FAC2024001';
      const response = await fetch(`/api/faculty/courses/my-courses?faculty_id=${facultyId}`);
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data.courses);
      }
    } catch (error) {
      console.error('Error fetching my courses:', error);
    }
  };

  const fetchAiSuggestions = async () => {
    try {
      // In real implementation, get faculty_id from session/auth
      const facultyId = 'FAC2024001';
      const response = await fetch(`/api/classroom-agent/suggestions?faculty_id=${facultyId}`);
      const data = await response.json();
      
      if (data.success) {
        setAiSuggestions(data.data.suggestions || []);
      }
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
    }
  };

  const handleApproveSuggestion = async (requestId, selectedOption) => {
    try {
      const response = await fetch('/api/classroom-agent/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: requestId,
          faculty_id: 'FAC2024001',
          action: 'approve',
          selected_option: selectedOption
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Show success message
        alert(`✅ ${data.data.message}`);
        
        // Refresh data
        fetchRequests();
        fetchAiSuggestions();
        setShowSuggestionModal(false);
        setSelectedSuggestion(null);
      } else {
        alert(`❌ Failed to approve suggestion: ${data.error}`);
      }
    } catch (error) {
      console.error('Error approving suggestion:', error);
      alert('❌ Failed to approve suggestion');
    }
  };

  const handleRejectSuggestion = async (requestId, reason) => {
    try {
      const response = await fetch('/api/classroom-agent/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: requestId,
          faculty_id: 'FAC2024001',
          action: 'reject',
          rejection_reason: reason
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`✅ ${data.data.message}`);
        fetchRequests();
        fetchAiSuggestions();
        setShowSuggestionModal(false);
        setSelectedSuggestion(null);
      } else {
        alert(`❌ Failed to reject suggestion: ${data.error}`);
      }
    } catch (error) {
      console.error('Error rejecting suggestion:', error);
      alert('❌ Failed to reject suggestion');
    }
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/classroom-agent/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          faculty_id: 'FAC2024001', // In real implementation, get from session/auth
          required_equipment: formData.required_equipment
        })
      });

      if (response.ok) {
        setShowRequestForm(false);
        setFormData({
          course_code: '',
          requested_date: '',
          start_time: '',
          end_time: '',
          expected_strength: '',
          required_equipment: {},
          purpose: '',
          priority: 'medium'
        });
        fetchRequests();
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  const handleEquipmentChange = (equipment, checked) => {
    setFormData({
      ...formData,
      required_equipment: {
        ...formData.required_equipment,
        [equipment]: checked
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading classroom requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                🏫 Classroom Requests
              </h1>
              <p className="text-slate-600">
                Request classroom allocations through our AI-powered system
              </p>
            </div>
            <button
              onClick={() => setShowRequestForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* AI Suggestions Section */}
        {aiSuggestions.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="p-6 border-b border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a9 9 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 21H9.154a3.374 3.374 0 00-2.322-1.1l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-900">🤖 AI Suggestions Available</h2>
                  <p className="text-blue-700">
                    Our AI has found {aiSuggestions.length} alternative solution{aiSuggestions.length !== 1 ? 's' : ''} for your classroom requests
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={suggestion.request_id} className="bg-white rounded-lg border border-blue-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{suggestion.course_code}</h3>
                      <p className="text-sm text-slate-600">{suggestion.purpose}</p>
                      <p className="text-sm text-slate-500">
                        {suggestion.requested_date} • {suggestion.requested_time} • {suggestion.expected_strength} students
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {suggestion.suggestions.length} option{suggestion.suggestions.length !== 1 ? 's' : ''}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {Math.round(suggestion.confidence_score * 100)}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-blue-800">
                      <strong>AI Analysis:</strong> {suggestion.ai_reasoning}
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setSelectedSuggestion(suggestion);
                        setShowSuggestionModal(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Review Options</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Section */}
        <NotificationBanner requests={requests} />

        {/* Request Form Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">New Classroom Request</h2>
                <p className="text-slate-600">Fill in the details for your classroom allocation request</p>
                {courses.length > 0 && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      📚 Showing {courses.length} course{courses.length !== 1 ? 's' : ''} that you have created
                    </p>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSubmitRequest} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Course Code
                    </label>
                    <select
                      value={formData.course_code}
                      onChange={(e) => {
                        const selectedCourse = courses.find(c => c.course_code === e.target.value);
                        setFormData({ 
                          ...formData, 
                          course_code: e.target.value,
                          expected_strength: selectedCourse ? selectedCourse.current_enrolled || selectedCourse.max_capacity : ''
                        });
                      }}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
                      required
                    >
                      <option value="" className="text-slate-500">Select Course</option>
                      {courses.length === 0 ? (
                        <option value="" disabled className="text-slate-400">No courses created yet</option>
                      ) : (
                        courses.map((course) => (
                          <option key={course.course_code} value={course.course_code} className="text-slate-900">
                            {course.course_code} - {course.course_name}
                          </option>
                        ))
                      )}
                    </select>
                    {courses.length === 0 && (
                      <p className="mt-1 text-sm text-slate-500">
                        You haven't created any courses yet. 
                        <a href="/dashboard/faculty/course/create" className="text-blue-600 hover:text-blue-700 ml-1">
                          Create a course first
                        </a>
                      </p>
                    )}
                    {formData.course_code && (
                      <div className="mt-2 p-2 bg-slate-50 rounded text-sm">
                        {(() => {
                          const selectedCourse = courses.find(c => c.course_code === formData.course_code);
                          return selectedCourse ? (
                            <div className="text-slate-700">
                              <p><strong>Course:</strong> {selectedCourse.course_name}</p>
                              <p><strong>Enrolled:</strong> {selectedCourse.current_enrolled || 0} / {selectedCourse.max_capacity} students</p>
                              {selectedCourse.slot && <p><strong>Slot:</strong> {selectedCourse.slot}</p>}
                            </div>
                          ) : null;
                        })()}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
                    >
                      <option value="low" className="text-slate-900">Low</option>
                      <option value="medium" className="text-slate-900">Medium</option>
                      <option value="high" className="text-slate-900">High</option>
                      <option value="urgent" className="text-slate-900">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.requested_date}
                      onChange={(e) => setFormData({ ...formData, requested_date: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Expected Strength
                    </label>
                    <input
                      type="number"
                      value={formData.expected_strength}
                      onChange={(e) => setFormData({ ...formData, expected_strength: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white placeholder-slate-500"
                      placeholder="Number of students"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={formData.end_time}
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Purpose
                  </label>
                  <textarea
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white placeholder-slate-500"
                    rows="3"
                    placeholder="Describe the purpose of this classroom request"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Required Equipment
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'projector', 'audio_system', 'whiteboard', 'ac', 'wifi',
                      'computers', 'lab_equipment', 'video_conferencing'
                    ].map((equipment) => (
                      <label key={equipment} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.required_equipment[equipment] || false}
                          onChange={(e) => handleEquipmentChange(equipment, e.target.checked)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-700 capitalize">
                          {equipment.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Submit Request</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Requests List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">My Requests</h2>
            <p className="text-slate-600">Track the status of your classroom allocation requests</p>
          </div>
          
          <div className="p-6">
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <svg className="h-12 w-12 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No requests yet</h3>
                <p className="text-slate-600 mb-4">Start by creating your first classroom request</p>
                <button
                  onClick={() => setShowRequestForm(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Request
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request, index) => (
                  <RequestCard key={`${request.request_id}_${index}`} request={request} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Available Rooms Preview */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Available Rooms</h2>
            <p className="text-slate-600">Browse available classrooms and their facilities</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.slice(0, 6).map((room) => (
                <RoomCard key={room.room_id} room={room} />
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestion Modal */}
        {showSuggestionModal && selectedSuggestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">🤖 AI Suggestions</h2>
                    <p className="text-slate-600 mt-1">
                      {selectedSuggestion.course_code} • {selectedSuggestion.requested_date} • {selectedSuggestion.requested_time}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowSuggestionModal(false);
                      setSelectedSuggestion(null);
                    }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">AI Analysis</h3>
                  <p className="text-blue-800">{selectedSuggestion.approval_message}</p>
                  <p className="text-sm text-blue-600 mt-2">
                    <strong>Conflict Type:</strong> {selectedSuggestion.conflict_type.replace('_', ' ')} • 
                    <strong> Confidence:</strong> {Math.round(selectedSuggestion.confidence_score * 100)}%
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Available Options</h3>
                  
                  {selectedSuggestion.suggestions.map((option, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-slate-100 rounded-lg">
                            {option.type === 'alternative_room' && (
                              <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            )}
                            {option.type === 'time_adjustment' && (
                              <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {option.type === 'equipment_alternative' && (
                              <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 capitalize">
                              {option.type.replace('_', ' ')}
                            </h4>
                            {option.room_name && (
                              <p className="text-sm text-slate-600">{option.room_name}</p>
                            )}
                            {option.suggested_start_time && (
                              <p className="text-sm text-slate-600">
                                {option.suggested_start_time} - {option.suggested_end_time}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleApproveSuggestion(selectedSuggestion.request_id, option)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Select This Option
                        </button>
                      </div>
                      
                      <p className="text-slate-700 mb-3">{option.reason}</p>
                      
                      {option.benefits && option.benefits.length > 0 && (
                        <div className="mb-3">
                          <h5 className="text-sm font-semibold text-green-800 mb-1">✅ Benefits:</h5>
                          <ul className="text-sm text-green-700 list-disc list-inside">
                            {option.benefits.map((benefit, i) => (
                              <li key={i}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {option.compromises && option.compromises.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-orange-800 mb-1">⚠️ Considerations:</h5>
                          <ul className="text-sm text-orange-700 list-disc list-inside">
                            {option.compromises.map((compromise, i) => (
                              <li key={i}>{compromise}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {option.impact && (
                        <div className="mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            option.impact === 'minimal' ? 'bg-green-100 text-green-800' :
                            option.impact === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {option.impact} impact
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-200">
                  <button
                    onClick={() => handleRejectSuggestion(selectedSuggestion.request_id, 'Faculty rejected all AI suggestions')}
                    className="px-6 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Reject All Suggestions
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowSuggestionModal(false);
                        setSelectedSuggestion(null);
                      }}
                      className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Request manual review
                        fetch('/api/classroom-agent/suggestions', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            request_id: selectedSuggestion.request_id,
                            faculty_id: 'FAC2024001',
                            action: 'request_manual',
                            notes: 'Faculty requested manual review'
                          })
                        }).then(() => {
                          alert('✅ Request forwarded for manual review');
                          fetchRequests();
                          fetchAiSuggestions();
                          setShowSuggestionModal(false);
                          setSelectedSuggestion(null);
                        });
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Request Manual Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RequestCard({ request }) {
  const getStatusIcon = (status, decisionType) => {
    if (status === 'approved') return (
      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
    if (status === 'rejected') return (
      <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
    if (decisionType === 'conflict_detected') return (
      <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    );
    if (decisionType === 'suggest_alternative') return (
      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
    return (
      <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  const getStatusColor = (status, decisionType) => {
    if (status === 'approved') return 'bg-green-100 text-green-800';
    if (status === 'rejected') return 'bg-red-100 text-red-800';
    if (decisionType === 'conflict_detected') return 'bg-red-100 text-red-800';
    if (decisionType === 'suggest_alternative') return 'bg-blue-100 text-blue-800';
    return 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{request.purpose}</h3>
          <p className="text-sm text-slate-600">{request.course_name}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(request.status, request.decision_type)}
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(request.status, request.decision_type)}`}>
            {request.status === 'pending' && request.decision_type ? 
              request.decision_type.replace('_', ' ') : 
              request.status
            }
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-slate-600">{request.requested_date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-slate-600">{request.start_time} - {request.end_time}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <span className="text-sm text-slate-600">{request.expected_strength} students</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            request.priority === 'urgent' ? 'bg-red-100 text-red-800' :
            request.priority === 'high' ? 'bg-orange-100 text-orange-800' :
            request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {request.priority} priority
          </span>
        </div>
      </div>

      {request.reasoning && (
        <div className="bg-slate-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-slate-700">
            <strong>AI Analysis:</strong> {request.reasoning}
          </p>
          {request.confidence_score && (
            <p className="text-xs text-slate-600 mt-1">
              Confidence: {(request.confidence_score * 100).toFixed(1)}%
            </p>
          )}
        </div>
      )}

      {request.suggested_room_id && (
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Suggested Room:</strong> {request.suggested_room_id}
          </p>
          {request.suggested_time_start !== request.start_time && (
            <p className="text-sm text-blue-800">
              <strong>Suggested Time:</strong> {request.suggested_time_start} - {request.suggested_time_end}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationBanner({ requests }) {
  const conflictRequests = requests.filter(req => 
    req.decision_type === 'manual_review' || 
    req.decision_type === 'conflict_detected' || 
    req.decision_type === 'suggest_alternative'
  );

  if (conflictRequests.length === 0) return null;

  return (
    <div className="mb-6">
      {conflictRequests.map((request) => (
        <div key={request.request_id} className="mb-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-amber-800">
                {request.decision_type === 'manual_review' && '📋 Manual Review Required'}
                {request.decision_type === 'conflict_detected' && '⚠️ Conflicts Detected'}
                {request.decision_type === 'suggest_alternative' && '🔄 Alternative Suggested'}
              </h3>
              <div className="mt-2 text-sm text-amber-700">
                <p><strong>Request:</strong> {request.purpose}</p>
                <p><strong>Date & Time:</strong> {request.requested_date}, {request.start_time}-{request.end_time}</p>
                {request.reasoning && (
                  <p className="mt-2"><strong>Status:</strong> {request.reasoning}</p>
                )}
                {request.suggested_room_id && (
                  <p className="mt-2 text-blue-700">
                    <strong>💡 Suggested Alternative:</strong> Room {request.suggested_room_id}
                    {request.suggested_time_start !== request.start_time && 
                      ` at ${request.suggested_time_start}-${request.suggested_time_end}`
                    }
                  </p>
                )}
                <div className="mt-3 p-3 bg-amber-100 rounded-lg">
                  <p className="text-sm font-medium text-amber-800">⏳ What happens next:</p>
                  <ul className="mt-1 text-sm text-amber-700 list-disc list-inside">
                    <li>Administration will review your request within 1-2 business days</li>
                    <li>You'll receive a notification once a decision is made</li>
                    <li>They may approve, suggest alternatives, or contact you for details</li>
                  </ul>
                  <p className="mt-2 text-xs text-amber-600">
                    Please wait for manual approval. Contact administration if urgent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RoomCard({ room }) {
  const equipment = JSON.parse(room.equipment || '{}');
  
  return (
    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-900">{room.room_name}</h3>
          <p className="text-sm text-slate-600">{room.building}, Floor {room.floor}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          room.availability_status === 'available' ? 'bg-green-100 text-green-800' :
          room.availability_status === 'occupied' ? 'bg-red-100 text-red-800' :
          'bg-orange-100 text-orange-800'
        }`}>
          {room.availability_status}
        </span>
      </div>

      <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center space-x-1">
          <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <span className="text-sm text-slate-600">{room.capacity}</span>
        </div>
        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
          {room.room_type.replace('_', ' ')}
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        {Object.entries(equipment).map(([key, value]) => (
          value && (
            <span key={key} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {key.replace('_', ' ')}
            </span>
          )
        ))}
      </div>
    </div>
  );
}