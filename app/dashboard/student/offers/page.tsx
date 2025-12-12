'use client';

import { useState } from 'react';

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState<'add' | 'view'>('add');
  const [formData, setFormData] = useState({
    companyName: '',
    salary: '',
    offerDate: '',
    file: null as File | null,
  });

  const existingOffers = [
    {
      id: 1,
      companyName: 'Google Inc.',
      salary: '$120,000',
      offerDate: '15/03/2024',
      status: 'Accepted',
      fileName: 'google_offer.pdf',
    },
    {
      id: 2,
      companyName: 'Microsoft Corporation',
      salary: '$110,000',
      offerDate: '10/03/2024',
      status: 'Pending',
      fileName: 'microsoft_offer.pdf',
    },
    {
      id: 3,
      companyName: 'Amazon',
      salary: '$115,000',
      offerDate: '05/03/2024',
      status: 'Accepted',
      fileName: 'amazon_offer.pdf',
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Offer details saved successfully!');
    setFormData({ companyName: '', salary: '', offerDate: '', file: null });
  };

  const handleClear = () => {
    setFormData({ companyName: '', salary: '', offerDate: '', file: null });
  };

  const getStatusColor = (status: string) => {
    if (status === 'Accepted') return 'bg-emerald-100 text-emerald-600';
    if (status === 'Pending') return 'bg-orange-100 text-orange-600';
    if (status === 'Rejected') return 'bg-red-100 text-red-600';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Offer Details
        </h1>
        <p className="text-slate-600 mt-2">Manage your job offers and placement details</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'add'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>📝</span>
            Add Offer Details
          </button>
          <button
            onClick={() => setActiveTab('view')}
            className={`flex-1 px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'view'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>👁️</span>
            View Offer Details
          </button>
        </div>

        {/* Add Offer Details Tab */}
        {activeTab === 'add' && (
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900"
                  placeholder="Enter company name"
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900"
                  placeholder="Enter salary package"
                  required
                />
              </div>

              {/* Offer Date */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Offer Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.offerDate}
                  onChange={(e) => setFormData({ ...formData, offerDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900"
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  File Upload
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-all">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                    id="offer-file-upload"
                  />
                  <label htmlFor="offer-file-upload" className="cursor-pointer">
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
                        <p className="text-xs text-red-500 mt-1">
                          Note: Upload only pdf file
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

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Save Offer
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        )}

        {/* View Offer Details Tab */}
        {activeTab === 'view' && (
          <div className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Your Offer Letters</h2>
            
            {existingOffers.length > 0 ? (
              <div className="space-y-4">
                {existingOffers.map((offer) => (
                  <div key={offer.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-bold text-slate-900">{offer.companyName}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(offer.status)}`}>
                            {offer.status}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">Salary Package</p>
                            <p className="font-bold text-slate-900">{offer.salary}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Offer Date</p>
                            <p className="font-bold text-slate-900">{offer.offerDate}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Document</p>
                            <p className="font-bold text-blue-600">{offer.fileName}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                          📄 View
                        </button>
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition text-sm">
                          📥 Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-slate-600 font-semibold">No offer letters uploaded yet</p>
                <p className="text-sm text-slate-500 mt-2">Add your first offer using the "Add Offer Details" tab</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Offers</p>
              <p className="text-2xl font-bold text-slate-900">{existingOffers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-600">Accepted</p>
              <p className="text-2xl font-bold text-slate-900">
                {existingOffers.filter(o => o.status === 'Accepted').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              ⏳
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-slate-900">
                {existingOffers.filter(o => o.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
