'use client';

import { useState, useEffect } from 'react';

export default function FacultyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock faculty data - in real app, this would come from API
  const mockProfile = {
    faculty_id: 'FAC2024001',
    first_name: 'Daniel',
    last_name: '',
    email: 'daniel@simats.edu',
    phone: '+91 9876543210',
    date_of_birth: '1985-06-15',
    address: 'Chennai, Tamil Nadu, India',
    department: 'Computer Science Engineering',
    designation: 'Assistant Professor',
    qualification: 'Ph.D in Computer Science',
    experience: '8 years',
    specialization: 'Machine Learning, Data Science',
    joining_date: '2020-07-15',
    employee_id: 'EMP001',
    blood_group: 'B+',
    emergency_contact: '+91 9876543211',
    office_room: 'Room 205, CS Block',
    subjects_taught: ['Data Structures', 'Machine Learning', 'Database Management', 'Software Engineering'],
    research_interests: ['Artificial Intelligence', 'Deep Learning', 'Natural Language Processing'],
    publications: 15,
    projects: 8
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile(mockProfile);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Profile not found'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                D
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{profile.first_name} {profile.last_name}</h1>
              <p className="text-slate-600">{profile.faculty_id}</p>
              <p className="text-sm text-slate-500">{profile.designation} • {profile.department}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold">
              🔒 Admin Only Editing
            </div>
            <p className="text-xs text-slate-500 mt-1">Contact admin to update profile</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">👤</span>
            Personal Information
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={profile.first_name}
                  disabled
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={profile.last_name || 'Not provided'}
                  disabled
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={profile.date_of_birth ? new Date(profile.date_of_birth).toISOString().split('T')[0] : ''}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Group</label>
              <input
                type="text"
                value={profile.blood_group}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
              <textarea
                value={profile.address}
                disabled
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Emergency Contact</label>
              <input
                type="tel"
                value={profile.emergency_contact}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              Professional Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Faculty ID</label>
                  <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                    {profile.faculty_id}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Employee ID</label>
                  <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                    {profile.employee_id}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                  <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                    {profile.department}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Designation</label>
                  <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                    {profile.designation}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Qualification</label>
                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                  {profile.qualification}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Experience</label>
                  <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-blue-600">
                    {profile.experience}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Office Room</label>
                  <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                    {profile.office_room}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Joining Date</label>
                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                  {profile.joining_date ? new Date(profile.joining_date).toLocaleDateString() : 'Not available'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Specialization</label>
                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                  {profile.specialization}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Statistics */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Academic Statistics
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{profile.publications}</div>
                <div className="text-sm text-blue-700">Publications</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{profile.projects}</div>
                <div className="text-sm text-green-700">Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects & Research */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subjects Taught */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            Subjects Taught
          </h2>
          <div className="space-y-2">
            {profile.subjects_taught.map((subject, index) => (
              <div key={index} className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                {subject}
              </div>
            ))}
          </div>
        </div>

        {/* Research Interests */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">🔬</span>
            Research Interests
          </h2>
          <div className="space-y-2">
            {profile.research_interests.map((interest, index) => (
              <div key={index} className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                {interest}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}