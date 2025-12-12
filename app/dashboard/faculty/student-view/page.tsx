'use client';

import { useState } from 'react';

export default function Student360View() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 'STU001', name: 'Arjun Kumar', regNo: '2021CSE001', department: 'Computer Science' },
    { id: 'STU002', name: 'Priya Sharma', regNo: '2021CSE002', department: 'Computer Science' },
    { id: 'STU003', name: 'Rahul Patel', regNo: '2021ECE001', department: 'Electronics' },
    { id: 'STU004', name: 'Sneha Reddy', regNo: '2021ME001', department: 'Mechanical' },
    { id: 'STU005', name: 'Vikram Singh', regNo: '2021EEE001', department: 'Electrical' },
    { id: 'STU006', name: 'Ananya Das', regNo: '2021CSE003', department: 'Computer Science' },
    { id: 'STU007', name: 'Karthik Raj', regNo: '2021IT001', department: 'Information Technology' },
    { id: 'STU008', name: 'Meera Nair', regNo: '2021BT001', department: 'Biotechnology' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const studentDetails = {
    personalInfo: {
      name: 'Arjun Kumar',
      regNo: '2021CSE001',
      department: 'Computer Science Engineering',
      year: '3rd Year',
      email: 'arjun.kumar@simats.edu',
      phone: '+91 9876543210',
      address: 'Chennai, Tamil Nadu',
      cgpa: '8.75'
    },
    academicPerformance: [
      { semester: 'Semester 1', cgpa: '8.2', credits: 24, status: 'Passed' },
      { semester: 'Semester 2', cgpa: '8.5', credits: 24, status: 'Passed' },
      { semester: 'Semester 3', cgpa: '8.8', credits: 26, status: 'Passed' },
      { semester: 'Semester 4', cgpa: '8.9', credits: 26, status: 'Passed' },
      { semester: 'Semester 5', cgpa: '9.1', credits: 24, status: 'Ongoing' },
    ],
    attendance: {
      overall: '92%',
      subjects: [
        { name: 'Data Structures', attendance: '95%', status: 'Good' },
        { name: 'Database Management', attendance: '88%', status: 'Average' },
        { name: 'Computer Networks', attendance: '96%', status: 'Excellent' },
        { name: 'Software Engineering', attendance: '85%', status: 'Average' },
      ]
    },
    disciplinary: [
      { date: '15/02/2024', type: 'Warning', reason: 'Late submission', status: 'Resolved' },
      { date: '10/01/2024', type: 'Appreciation', reason: 'Outstanding project', status: 'Closed' },
    ],
    placements: {
      status: 'Placed',
      company: 'TCS',
      package: '₹6.5 LPA',
      offerDate: '20/03/2024'
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Student 360° View</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Student Selection */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-red-500 whitespace-nowrap">
                Select Student
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or registration number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent min-w-[300px]"
                />
                {searchTerm && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto z-10 shadow-lg">
                    {filteredStudents.map((student) => (
                      <button
                        key={student.id}
                        onClick={() => {
                          setSelectedStudent(student.regNo);
                          setSearchTerm(student.name + ' (' + student.regNo + ')');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-600">{student.regNo} - {student.department}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => setSelectedStudent(searchTerm.includes('(') ? searchTerm.split('(')[1].replace(')', '') : '')}
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md"
            >
              View Student
            </button>
          </div>

          {/* Student Details */}
          {selectedStudent ? (
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Name</p>
                    <p className="font-semibold text-slate-900">{studentDetails.personalInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Registration No</p>
                    <p className="font-semibold text-slate-900">{studentDetails.personalInfo.regNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Department</p>
                    <p className="font-semibold text-slate-900">{studentDetails.personalInfo.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Current CGPA</p>
                    <p className="font-semibold text-green-600">{studentDetails.personalInfo.cgpa}</p>
                  </div>
                </div>
              </div>

              {/* Academic Performance */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  Academic Performance
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left p-3 font-semibold">Semester</th>
                        <th className="text-left p-3 font-semibold">CGPA</th>
                        <th className="text-left p-3 font-semibold">Credits</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentDetails.academicPerformance.map((sem, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="p-3">{sem.semester}</td>
                          <td className="p-3 font-semibold text-blue-600">{sem.cgpa}</td>
                          <td className="p-3">{sem.credits}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              sem.status === 'Passed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                            }`}>
                              {sem.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attendance Overview */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  Attendance Overview
                </h2>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Overall Attendance: <span className="text-green-600">{studentDetails.attendance.overall}</span></p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {studentDetails.attendance.subjects.map((subject, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-900">{subject.name}</p>
                          <p className="text-sm text-slate-600">{subject.attendance}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          subject.status === 'Excellent' ? 'bg-green-100 text-green-600' :
                          subject.status === 'Good' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {subject.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disciplinary Records */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚖️</span>
                  Disciplinary Records
                </h2>
                <div className="space-y-3">
                  {studentDetails.disciplinary.map((record, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-slate-900">{record.type}</p>
                        <p className="text-sm text-slate-600">{record.reason}</p>
                        <p className="text-xs text-slate-500">{record.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        record.status === 'Resolved' || record.status === 'Closed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Placement Status */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Placement Status
                </h2>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Status</p>
                    <p className="font-semibold text-green-600">{studentDetails.placements.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Company</p>
                    <p className="font-semibold text-slate-900">{studentDetails.placements.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Package</p>
                    <p className="font-semibold text-slate-900">{studentDetails.placements.package}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Offer Date</p>
                    <p className="font-semibold text-slate-900">{studentDetails.placements.offerDate}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-[400px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Select Student to View Details</h3>
                <p className="text-slate-600">Search and select a student to view their comprehensive 360° profile.</p>
              </div>
            </div>
          )}
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