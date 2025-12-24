'use client';

import { useState } from 'react';

export default function CreateCoursePage() {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    type: 'Contact Course',
    subjectCategory: '',
    prerequisiteCourse: '',
    slot: '',
    maxSlotCount: '30',
    courseCategory: ''
  });

  const [showView, setShowView] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.courseCode || !formData.courseName || !formData.slot || !formData.maxSlotCount) {
        alert('Please fill in all required fields: Course Code, Course Name, Slot, and Max Slot Count');
        return;
      }

      // Get faculty ID from session
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      const facultyId = user?.faculty_id || 'FAC2024001';

      const courseData = {
        courseCode: formData.courseCode,
        courseName: formData.courseName,
        type: formData.type,
        subjectCategory: formData.subjectCategory,
        prerequisiteCourse: formData.prerequisiteCourse,
        slot: formData.slot,
        maxSlotCount: formData.maxSlotCount,
        courseCategory: formData.courseCategory,
        faculty_id: facultyId
      };

      console.log('Creating course:', courseData);

      // Make API call to create course
      const response = await fetch('/api/faculty/courses/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
      });

      const result = await response.json();

      if (result.success) {
        alert(`Course created successfully!\n\nCourse Code: ${result.course.course_code}\nSlot: ${result.course.slot}\nCapacity: ${result.course.max_capacity}\n\nStudents can now enroll in this course by selecting Slot ${result.course.slot}.`);
        
        // Clear form after successful save
        handleClear();
      } else {
        alert(`Failed to create course: ${result.error}`);
      }
      
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course. Please check the console for details.');
    }
  };

  const handleClear = () => {
    setFormData({
      courseCode: '',
      courseName: '',
      type: 'Contact Course',
      subjectCategory: '',
      prerequisiteCourse: '',
      slot: '',
      maxSlotCount: '30',
      courseCategory: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Create Course
          </h1>
          <p className="text-slate-600 mt-1">Add a new course to the system</p>
        </div>
        <button
          onClick={() => setShowView(!showView)}
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          + View Courses
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Course Code */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Code:
            </label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              placeholder="Course Code"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
            />
          </div>

          {/* Course Name */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Course Name:
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="Course Name"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Type:
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
            >
              <option value="Contact Course">Contact Course</option>
              <option value="Online Course">Online Course</option>
              <option value="Hybrid Course">Hybrid Course</option>
            </select>
          </div>

          {/* Subject Category */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Subject Category:
            </label>
            <div className="flex gap-2">
              <select
                name="subjectCategory"
                value={formData.subjectCategory}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
              >
                <option value="">--Select--</option>
                <option value="Theory">Theory</option>
                <option value="Practical">Practical</option>
                <option value="Project">Project</option>
                <option value="Seminar">Seminar</option>
              </select>
              <button
                onClick={() => setShowView(!showView)}
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                =View
              </button>
            </div>
          </div>

          {/* Prerequisite Course */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Prerequisite Course:
            </label>
            <select
              name="prerequisiteCourse"
              value={formData.prerequisiteCourse}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
            >
              <option value="">--Select--</option>
              <option value="None">None</option>
              <option value="CS101">CS101 - Programming Fundamentals</option>
              <option value="CS201">CS201 - Data Structures</option>
              <option value="CS301">CS301 - Algorithms</option>
            </select>
          </div>

          {/* Slot */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Slot:
            </label>
            <select
              name="slot"
              value={formData.slot}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
            >
              <option value="">--Select--</option>
              <option value="A">Slot A</option>
              <option value="B">Slot B</option>
              <option value="C">Slot C</option>
              <option value="D">Slot D</option>
              <option value="E">Slot E</option>
              <option value="F">Slot F</option>
              <option value="G">Slot G</option>
            </select>
          </div>

          {/* Course Category */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Course Category:
            </label>
            <select
              name="courseCategory"
              value={formData.courseCategory}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
            >
              <option value="">--Select--</option>
              <option value="Core">Core</option>
              <option value="Elective">Elective</option>
              <option value="Lab">Lab</option>
              <option value="Project">Project</option>
            </select>
          </div>

          {/* Max Slot Count */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-2">
              Max Slot Count:
            </label>
            <input
              type="number"
              name="maxSlotCount"
              value={formData.maxSlotCount}
              onChange={handleChange}
              placeholder="30"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition text-slate-900 font-medium"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className="px-8 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Courses</p>
              <h3 className="text-3xl font-bold mt-2">10</h3>
            </div>
            <div className="text-4xl opacity-80">📚</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active Courses</p>
              <h3 className="text-3xl font-bold mt-2">8</h3>
            </div>
            <div className="text-4xl opacity-80">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Pending Approval</p>
              <h3 className="text-3xl font-bold mt-2">2</h3>
            </div>
            <div className="text-4xl opacity-80">⏳</div>
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recently Created Courses</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Code</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Course Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Slot</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-slate-700">CS301</td>
                <td className="py-3 px-4 text-slate-700">Data Structures</td>
                <td className="py-3 px-4 text-slate-700">Contact Course</td>
                <td className="py-3 px-4 text-slate-700">Core</td>
                <td className="py-3 px-4 text-slate-700">A</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-slate-700">CS302</td>
                <td className="py-3 px-4 text-slate-700">Database Management</td>
                <td className="py-3 px-4 text-slate-700">Contact Course</td>
                <td className="py-3 px-4 text-slate-700">Core</td>
                <td className="py-3 px-4 text-slate-700">B</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-slate-700">CS307</td>
                <td className="py-3 px-4 text-slate-700">Machine Learning</td>
                <td className="py-3 px-4 text-slate-700">Contact Course</td>
                <td className="py-3 px-4 text-slate-700">Elective</td>
                <td className="py-3 px-4 text-slate-700">E</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}