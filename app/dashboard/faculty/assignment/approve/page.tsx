'use client';

export default function ApproveAssignmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Approve Assignment</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Pending Assignments</h3>
        <p className="text-slate-600">All assignments have been reviewed</p>
      </div>
    </div>
  );
}