'use client';

import { useState } from 'react';

export default function PublishAssignmentPage() {
  const [formData, setFormData] = useState({
    course: '',
    assignmentName: '',
    publishOn: '',
    dueDate: '',
    content: '',
    smsText: '',
    file: null
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Publish Assignment</h1>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="space-y-6">
          {/* Course */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Course
            </label>
            <select
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
            >
              <option value="">--Select--</option>
              <option value="CS301">CS301 - Data Structures</option>
              <option value="CS302">CS302 - Database Management</option>
            </select>
          </div>

          {/* Assignment Name */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Assignment Name
            </label>
            <input
              type="text"
              value={formData.assignmentName}
              onChange={(e) => setFormData({...formData, assignmentName: e.target.value})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-red-500 mb-2">
                Publish On
              </label>
              <input
                type="date"
                value={formData.publishOn}
                onChange={(e) => setFormData({...formData, publishOn: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-red-500 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={6}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* SMS Text */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              SMS Text
            </label>
            <input
              type="text"
              value={formData.smsText}
              onChange={(e) => setFormData({...formData, smsText: e.target.value})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              File Upload
            </label>
            <input
              type="file"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
            <p className="text-sm text-red-500 mt-2">Note: Upload only pdf or doc file</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
              Publish Assignment
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}