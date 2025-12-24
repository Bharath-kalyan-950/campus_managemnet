'use client';

import { useState, useEffect } from 'react';
// Using inline SVG icons to match existing codebase style

export default function ClassroomAgentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, [selectedDate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/classroom-agent/dashboard?date=${selectedDate}`);
      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminAction = async (action, requestId, allocationId, roomId, notes) => {
    try {
      const response = await fetch('/api/classroom-agent/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          request_id: requestId,
          allocation_id: allocationId,
          room_id: roomId,
          admin_notes: notes
        })
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error processing admin action:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Classroom Agent Dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const agentMetrics = dashboardData?.agent_metrics || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                🤖 Classroom Allocation Agent
              </h1>
              <p className="text-slate-600">
                AI-powered classroom management and allocation system
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
              />
              <button
                onClick={fetchDashboardData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Rooms</p>
                <p className="text-2xl font-bold text-slate-900">{stats.total_rooms}</p>
              </div>
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Requests</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending_requests}</p>
              </div>
              <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Today's Allocations</p>
                <p className="text-2xl font-bold text-green-600">{stats.todays_allocations}</p>
              </div>
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Unresolved Conflicts</p>
                <p className="text-2xl font-bold text-red-600">{stats.unresolved_conflicts}</p>
              </div>
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Agent Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <svg className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Agent Performance Today
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{agentMetrics.auto_approvals}</p>
              <p className="text-sm text-slate-600">Auto Approvals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{agentMetrics.alternatives_suggested}</p>
              <p className="text-sm text-slate-600">Alternatives</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{agentMetrics.conflicts_detected}</p>
              <p className="text-sm text-slate-600">Conflicts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{agentMetrics.manual_reviews}</p>
              <p className="text-sm text-slate-600">Manual Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {(agentMetrics.avg_confidence_score * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-slate-600">Avg Confidence</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'requests', name: 'Pending Requests' },
                { id: 'conflicts', name: 'Conflicts' },
                { id: 'schedule', name: 'Today\'s Schedule' },
                { id: 'utilization', name: 'Room Utilization' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.id === 'overview' && (
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                  {tab.id === 'requests' && (
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {tab.id === 'conflicts' && (
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  )}
                  {tab.id === 'schedule' && (
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {tab.id === 'utilization' && (
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  )}
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'requests' && (
          <PendingRequestsTab 
            requests={dashboardData?.pending_requests || []} 
            onAction={handleAdminAction}
          />
        )}

        {activeTab === 'conflicts' && (
          <ConflictsTab 
            conflicts={dashboardData?.conflicts || []} 
            onAction={handleAdminAction}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTab 
            schedule={dashboardData?.todays_schedule || []}
            maintenance={dashboardData?.maintenance_schedule || []}
          />
        )}

        {activeTab === 'utilization' && (
          <UtilizationTab 
            utilization={dashboardData?.room_utilization || []}
          />
        )}

        {activeTab === 'overview' && (
          <OverviewTab 
            recentDecisions={dashboardData?.recent_decisions || []}
            schedule={dashboardData?.todays_schedule || []}
          />
        )}
      </div>
    </div>
  );
}

function PendingRequestsTab({ requests, onAction }) {
  const [selectedRoom, setSelectedRoom] = useState({});
  const [notes, setNotes] = useState({});

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Pending Allocation Requests</h2>
        <p className="text-slate-600">Review and process classroom allocation requests</p>
      </div>
      <div className="p-6">
        {requests.length === 0 ? (
          <div className="text-center py-8">
            <svg className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-slate-600">No pending requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.request_id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        request.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        request.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.priority}
                      </span>
                      {request.decision_type && (
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          request.decision_type === 'auto_approve' ? 'bg-green-100 text-green-800' :
                          request.decision_type === 'suggest_alternative' ? 'bg-blue-100 text-blue-800' :
                          request.decision_type === 'conflict_detected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {request.decision_type.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900">{request.purpose}</h3>
                    <p className="text-sm text-slate-700">
                      Faculty: {request.faculty_name} | Course: {request.course_name}
                    </p>
                    <p className="text-sm text-slate-700">
                      Date: {request.requested_date} | Time: {request.start_time} - {request.end_time}
                    </p>
                    <p className="text-sm text-slate-700">
                      Expected Strength: {request.expected_strength}
                    </p>
                    {request.reasoning && (
                      <div className="mt-2 p-2 bg-slate-50 rounded text-sm text-slate-900">
                        <strong>Agent Analysis:</strong> {request.reasoning}
                      </div>
                    )}
                  </div>
                  <div className="ml-4 space-y-2">
                    <input
                      type="text"
                      placeholder="Room ID"
                      value={selectedRoom[request.request_id] || ''}
                      onChange={(e) => setSelectedRoom({
                        ...selectedRoom,
                        [request.request_id]: e.target.value
                      })}
                      className="w-24 px-2 py-1 text-sm border border-slate-300 rounded text-slate-900 bg-white"
                    />
                    <textarea
                      placeholder="Admin notes..."
                      value={notes[request.request_id] || ''}
                      onChange={(e) => setNotes({
                        ...notes,
                        [request.request_id]: e.target.value
                      })}
                      className="w-full px-2 py-1 text-sm border border-slate-300 rounded text-slate-900 bg-white placeholder-slate-500"
                      rows="2"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onAction('approve_request', request.request_id, null, 
                          selectedRoom[request.request_id], notes[request.request_id])}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        disabled={!selectedRoom[request.request_id]}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onAction('reject_request', request.request_id, null, 
                          null, notes[request.request_id])}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ConflictsTab({ conflicts, onAction }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Allocation Conflicts</h2>
        <p className="text-slate-600">Resolve scheduling conflicts and issues</p>
      </div>
      <div className="p-6">
        {conflicts.length === 0 ? (
          <div className="text-center py-8">
            <svg className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-slate-600">No unresolved conflicts</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conflicts.map((conflict) => (
              <div key={conflict.conflict_id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        conflict.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        conflict.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        conflict.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {conflict.severity}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        {conflict.conflict_type.replace('_', ' ')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900">{conflict.purpose}</h3>
                    <p className="text-sm text-slate-700">
                      Faculty: {conflict.faculty_name}
                    </p>
                    <p className="text-sm text-slate-700">
                      Date: {conflict.requested_date} | Time: {conflict.start_time} - {conflict.end_time}
                    </p>
                    <p className="text-sm text-slate-700 mt-2">{conflict.description}</p>
                  </div>
                  <button
                    onClick={() => onAction('resolve_conflict', conflict.request_id, null, null, 'Resolved by admin')}
                    className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ScheduleTab({ schedule, maintenance }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Today's Allocations */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Today's Schedule</h2>
        </div>
        <div className="p-6">
          {schedule.length === 0 ? (
            <p className="text-slate-600 text-center py-4">No allocations for today</p>
          ) : (
            <div className="space-y-3">
              {schedule.map((item) => (
                <div key={item.allocation_id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">{item.course_name}</p>
                    <p className="text-sm text-slate-700">{item.faculty_name}</p>
                    <p className="text-sm text-slate-700">{item.room_name} ({item.building})</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{item.start_time} - {item.end_time}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      item.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Maintenance Schedule</h2>
        </div>
        <div className="p-6">
          {maintenance.length === 0 ? (
            <p className="text-slate-600 text-center py-4">No maintenance scheduled</p>
          ) : (
            <div className="space-y-3">
              {maintenance.map((item) => (
                <div key={item.maintenance_id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">{item.maintenance_type}</p>
                    <p className="text-sm text-slate-700">{item.room_name} ({item.building})</p>
                    <p className="text-sm text-slate-700">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{item.start_time} - {item.end_time}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'scheduled' ? 'bg-orange-100 text-orange-800' :
                      item.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UtilizationTab({ utilization }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Room Utilization</h2>
        <p className="text-slate-600">Track how efficiently rooms are being used</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {utilization.map((room) => (
            <div key={room.room_id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-900">{room.room_name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  room.utilization_percentage >= 80 ? 'bg-red-100 text-red-800' :
                  room.utilization_percentage >= 60 ? 'bg-orange-100 text-orange-800' :
                  room.utilization_percentage >= 40 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {room.utilization_percentage}%
                </span>
              </div>
              <p className="text-sm text-slate-700 mb-2">{room.building} | Capacity: {room.capacity}</p>
              <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${
                    room.utilization_percentage >= 80 ? 'bg-red-500' :
                    room.utilization_percentage >= 60 ? 'bg-orange-500' :
                    room.utilization_percentage >= 40 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${room.utilization_percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-600">
                {room.allocations_count} allocations | {Math.round(room.total_minutes_allocated / 60)} hours
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ recentDecisions, schedule }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Agent Decisions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Recent Agent Decisions</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {recentDecisions.slice(0, 5).map((decision) => (
              <div key={decision.decision_id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  decision.decision_type === 'auto_approve' ? 'bg-green-500' :
                  decision.decision_type === 'suggest_alternative' ? 'bg-blue-500' :
                  decision.decision_type === 'conflict_detected' ? 'bg-red-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{decision.purpose}</p>
                  <p className="text-sm text-slate-700">{decision.faculty_name}</p>
                  <p className="text-xs text-slate-600">{decision.reasoning}</p>
                  <p className="text-xs text-slate-600">
                    Confidence: {(decision.confidence_score * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <svg className="h-6 w-6 text-slate-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm font-medium text-slate-700">Add Room</p>
            </button>
            <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <svg className="h-6 w-6 text-slate-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm font-medium text-slate-700">Agent Settings</p>
            </button>
            <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <svg className="h-6 w-6 text-slate-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium text-slate-700">Schedule Maintenance</p>
            </button>
            <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <svg className="h-6 w-6 text-slate-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm font-medium text-slate-700">View Reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}