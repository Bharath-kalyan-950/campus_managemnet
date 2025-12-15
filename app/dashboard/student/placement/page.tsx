'use client';

import { useState, useEffect } from 'react';

export default function PlacementPage() {
  const [selectedDrive, setSelectedDrive] = useState<number | null>(null);
  const [placementData, setPlacementData] = useState({ offers: [], applications: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlacementData();
  }, []);

  const fetchPlacementData = async () => {
    try {
      const response = await fetch('/api/student/placement');
      const data = await response.json();
      
      if (data.success) {
        setPlacementData(data.data);
      }
    } catch (error) {
      console.error('Error fetching placement data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (offerId: number) => {
    try {
      const response = await fetch('/api/student/placement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offer_id: offerId }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Application submitted successfully!');
        fetchPlacementData(); // Refresh data
      } else {
        alert(data.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error applying for position:', error);
      alert('Failed to submit application');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const trainingAnnouncements = [
    { id: 1, title: 'Resume Building Workshop', date: 'Mar 10, 2024', time: '02:00 PM', venue: 'Auditorium', type: 'Workshop' },
    { id: 2, title: 'Mock Interview Session', date: 'Mar 12, 2024', time: '10:00 AM', venue: 'Placement Cell', type: 'Training' },
    { id: 3, title: 'Aptitude Test Preparation', date: 'Mar 15, 2024', time: '03:00 PM', venue: 'Lab 1', type: 'Training' },
    { id: 4, title: 'Group Discussion Practice', date: 'Mar 18, 2024', time: '11:00 AM', venue: 'Conference Room', type: 'Workshop' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading placement information...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status === 'Shortlisted') return 'bg-emerald-100 text-emerald-600';
    if (status === 'Interview Scheduled') return 'bg-blue-100 text-blue-600';
    if (status === 'Under Review') return 'bg-orange-100 text-orange-600';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              🎯
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Drives</p>
              <p className="text-2xl font-bold text-slate-900">{placementData.offers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
              📝
            </div>
            <div>
              <p className="text-sm text-slate-600">Applied</p>
              <p className="text-2xl font-bold text-slate-900">{placementData.applications.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-600">Shortlisted</p>
              <p className="text-2xl font-bold text-slate-900">
                {placementData.applications.filter(app => app.status === 'shortlisted').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              📚
            </div>
            <div>
              <p className="text-sm text-slate-600">Trainings</p>
              <p className="text-2xl font-bold text-slate-900">{trainingAnnouncements.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Job Drives */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Latest Job Drives</h2>
            <div className="grid gap-4">
              {placementData.offers.map((drive) => (
                <div key={drive.offer_id} className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">🏢</div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{drive.company_name}</h3>
                        <p className="text-slate-600">{drive.job_title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold">
                            {drive.job_type}
                          </span>
                          <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full font-semibold">
                            ₹{parseFloat(drive.package_amount || 0).toLocaleString()}/year
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold">
                      ⏰ {getDaysLeft(drive.application_deadline)}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-slate-600">📍 {drive.job_location}</p>
                    <p className="text-sm text-slate-600">📅 Deadline: {formatDate(drive.application_deadline)}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedDrive(drive.offer_id)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
                    >
                      View Details
                    </button>
                    {drive.application_status === 'not_applied' ? (
                      <button 
                        onClick={() => handleApply(drive.offer_id)}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
                      >
                        Apply Now
                      </button>
                    ) : (
                      <span className="px-6 py-3 bg-slate-300 text-slate-600 rounded-xl font-semibold">
                        {drive.application_status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {placementData.offers.length === 0 && (
                <p className="text-center text-slate-500 py-8">No active placement drives available</p>
              )}
            </div>
          </div>

          {/* My Applications */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">My Applications</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Company</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Role</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Applied Date</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {placementData.applications.map((app, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900">{app.company_name}</td>
                      <td className="py-3 px-4 text-slate-600">{app.job_title}</td>
                      <td className="py-3 px-4 text-slate-600">{formatDate(app.application_date)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {placementData.applications.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">
                        No applications submitted yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Training & Announcements */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Training & Workshops</h2>
            <div className="space-y-3">
              {trainingAnnouncements.map((training) => (
                <div key={training.id} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📚</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-sm">{training.title}</h3>
                      <p className="text-xs text-slate-600 mt-1">📅 {training.date}</p>
                      <p className="text-xs text-slate-600">🕐 {training.time}</p>
                      <p className="text-xs text-slate-600">📍 {training.venue}</p>
                      <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-semibold">
                        {training.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-lg font-bold mb-4">Placement Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <span className="text-sm text-blue-100">Students Placed</span>
                <span className="text-2xl font-bold">145</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <span className="text-sm text-blue-100">Avg Package</span>
                <span className="text-2xl font-bold">$95K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">Highest Package</span>
                <span className="text-2xl font-bold">$150K</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Details Modal */}
      {selectedDrive && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {placementData.offers.find(d => d.offer_id === selectedDrive)?.company_name} - Job Details
              </h2>
              <button
                onClick={() => setSelectedDrive(null)}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {placementData.offers.filter(d => d.offer_id === selectedDrive).map(drive => (
                <div key={drive.offer_id} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">🏢</div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{drive.job_title}</h3>
                      <p className="text-slate-600">{drive.company_name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600">Package</p>
                      <p className="font-bold text-slate-900">₹{parseFloat(drive.package_amount || 0).toLocaleString()}/year</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600">Location</p>
                      <p className="font-bold text-slate-900">{drive.job_location}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600">Type</p>
                      <p className="font-bold text-slate-900">{drive.job_type}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600">Deadline</p>
                      <p className="font-bold text-slate-900">{formatDate(drive.application_deadline)}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Requirements</h4>
                    <p className="text-slate-600">{drive.requirements || 'No specific requirements listed'}</p>
                  </div>
                  {drive.application_status === 'not_applied' ? (
                    <button 
                      onClick={() => {
                        handleApply(drive.offer_id);
                        setSelectedDrive(null);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                    >
                      Apply for this Position
                    </button>
                  ) : (
                    <div className="w-full bg-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg text-center">
                      Status: {drive.application_status}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
