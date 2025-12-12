'use client';

import { useState } from 'react';

export default function RaiseIssuePage() {
  const [formData, setFormData] = useState({
    content: '',
    file: null as File | null,
    location: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Issue submitted successfully!');
    setFormData({ content: '', file: null, location: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Raise Issue
        </h1>
        <p className="text-slate-600 mt-2">Report infrastructure issues and concerns</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          {/* Content Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 resize-none"
              placeholder="Describe the infrastructure issue in detail..."
              required
            />
            <p className="text-xs text-slate-500 mt-2">Please provide detailed information about the issue</p>
          </div>

          {/* Upload File */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Upload File
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-all">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".gif,.jpg,.jpeg"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {formData.file ? formData.file.name : 'Choose File'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Note: Upload only gif,jpg,jpeg file
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all text-sm"
                  >
                    Browse Files
                  </button>
                </div>
              </label>
            </div>
          </div>

          {/* Location Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900"
              placeholder="Enter the location of the issue (e.g., Building A, Room 301)"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all"
            >
              Submit your Issue
            </button>
            <button
              type="button"
              onClick={() => setFormData({ content: '', file: null, location: '' })}
              className="px-8 py-4 bg-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-300 transition-all"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Tips for Reporting</h3>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• Be specific about the location</li>
                <li>• Describe the issue clearly</li>
                <li>• Attach photos if possible</li>
                <li>• Include any safety concerns</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">⏱️</span>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Response Time</h3>
              <p className="text-sm text-emerald-100">
                Most issues are reviewed within 24-48 hours. 
                Urgent safety concerns are prioritized and addressed immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Your Recent Issues</h2>
        <div className="space-y-3">
          {[
            { id: 1, issue: 'Broken AC in Classroom 301', status: 'In Progress', date: '2 days ago' },
            { id: 2, issue: 'Damaged desk in Library', status: 'Resolved', date: '1 week ago' },
            { id: 3, issue: 'Faulty projector in Lab 2', status: 'Under Review', date: '3 days ago' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
              <div>
                <h3 className="font-semibold text-slate-900">{item.issue}</h3>
                <p className="text-sm text-slate-600">{item.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-600' :
                item.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
