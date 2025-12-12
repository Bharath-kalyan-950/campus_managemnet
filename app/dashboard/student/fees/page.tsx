'use client';

export default function FeesPage() {
  const feeBreakdown = [
    { category: 'Tuition Fee', amount: 15000, status: 'Paid', dueDate: 'Jan 15, 2024' },
    { category: 'Lab Fee', amount: 3000, status: 'Paid', dueDate: 'Jan 15, 2024' },
    { category: 'Library Fee', amount: 1000, status: 'Paid', dueDate: 'Jan 15, 2024' },
    { category: 'Sports Fee', amount: 500, status: 'Paid', dueDate: 'Jan 15, 2024' },
    { category: 'Exam Fee', amount: 2000, status: 'Pending', dueDate: 'Mar 15, 2024' },
    { category: 'Hostel Fee', amount: 5000, status: 'Pending', dueDate: 'Mar 15, 2024' },
  ];

  const paymentHistory = [
    { id: 'PAY001', date: 'Jan 15, 2024', amount: 19500, method: 'Online', status: 'Success', receipt: 'REC001' },
    { id: 'PAY002', date: 'Dec 10, 2023', amount: 20000, method: 'Bank Transfer', status: 'Success', receipt: 'REC002' },
    { id: 'PAY003', date: 'Sep 5, 2023', amount: 25000, method: 'Online', status: 'Success', receipt: 'REC003' },
  ];

  const totalFees = feeBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const paidFees = feeBreakdown.filter(item => item.status === 'Paid').reduce((sum, item) => sum + item.amount, 0);
  const pendingFees = totalFees - paidFees;
  const paidPercentage = (paidFees / totalFees) * 100;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              💰
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Fees</p>
              <p className="text-2xl font-bold text-slate-900">${totalFees.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-600">Paid</p>
              <p className="text-2xl font-bold text-emerald-600">${paidFees.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              ⏳
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">${pendingFees.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              📅
            </div>
            <div>
              <p className="text-sm text-slate-600">Due Date</p>
              <p className="text-lg font-bold text-slate-900">Mar 15, 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Fee Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Fee Breakdown</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Pay Now
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 px-4 font-bold text-slate-700">Category</th>
                    <th className="text-right py-4 px-4 font-bold text-slate-700">Amount</th>
                    <th className="text-center py-4 px-4 font-bold text-slate-700">Due Date</th>
                    <th className="text-center py-4 px-4 font-bold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feeBreakdown.map((fee, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-semibold text-slate-900">{fee.category}</td>
                      <td className="py-4 px-4 text-right font-bold text-slate-900">${fee.amount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-center text-slate-600">{fee.dueDate}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          fee.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {fee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-200 bg-slate-50">
                    <td className="py-4 px-4 font-bold text-slate-900">Total</td>
                    <td className="py-4 px-4 text-right font-bold text-blue-600 text-lg">${totalFees.toLocaleString()}</td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment History</h2>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">${payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-slate-600">{payment.date} • {payment.method}</p>
                      <p className="text-xs text-slate-500">Transaction ID: {payment.id}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                    Download Receipt
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Summary & Chart */}
        <div className="space-y-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Payment Status</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="20"
                  />
                  {/* Paid portion */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    strokeDasharray={`${paidPercentage * 2.51} ${(100 - paidPercentage) * 2.51}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <p className="text-3xl font-bold text-slate-900">{paidPercentage.toFixed(0)}%</p>
                  <p className="text-sm text-slate-600">Paid</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-slate-700">Paid</span>
                </div>
                <span className="font-bold text-emerald-600">${paidFees.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-slate-700">Pending</span>
                </div>
                <span className="font-bold text-orange-600">${pendingFees.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-semibold transition-all">
                💳 Pay Pending Fees
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-semibold transition-all">
                📄 Download Fee Receipt
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-semibold transition-all">
                📊 View Fee Structure
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-semibold transition-all">
                💬 Contact Finance Office
              </button>
            </div>
          </div>

          {/* Payment Reminder */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                ⚠️
              </div>
              <div>
                <h3 className="font-bold text-orange-900 mb-1">Payment Reminder</h3>
                <p className="text-sm text-orange-700">
                  You have ${pendingFees.toLocaleString()} pending. Please pay before Mar 15, 2024 to avoid late fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
