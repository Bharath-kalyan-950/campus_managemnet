'use client';

import { useState } from 'react';

export default function DisciplinaryEntry() {
  const [formData, setFormData] = useState({
    studentRegNo: '',
    issueDetails: '',
    complainant: '',
    file: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting disciplinary entry:', formData);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Disciplinary Entry</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Select Student */}
            <div className="flex items-start gap-4">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap w-40 pt-2">
                Select Student
              </label>
              <input
                type="text"
                placeholder="Search by RegNo"
                value={formData.studentRegNo}
                onChange={(e) => setFormData({...formData, studentRegNo: e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Issue Details */}
            <div className="flex items-start gap-4">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap w-40 pt-2">
                Issue Details
              </label>
              <textarea
                rows={4}
                value={formData.issueDetails}
                onChange={(e) => setFormData({...formData, issueDetails: e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Complainant */}
            <div className="flex items-start gap-4">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap w-40 pt-2">
                Complainant
              </label>
              <input
                type="text"
                value={formData.complainant}
                onChange={(e) => setFormData({...formData, complainant: e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Upload File */}
            <div className="flex items-start gap-4">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap w-40 pt-2">
                Upload File
              </label>
              <div className="flex-1">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <p className="text-xs text-red-400 mt-1 italic">Note: Upload only "pdf" file</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-8 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Decorative Image */}
        <div className="mt-8 flex justify-end">
          <img 
            src="https://i.imgur.com/9FLlMSu.png" 
            alt="Mascot" 
            className="w-48 h-auto opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
