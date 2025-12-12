   // Client-side API utility functions

export async function apiRequest(endpoint, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies
  };

  const config = { ...defaultOptions, ...options };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Authentication APIs
export const authAPI = {
  login: (email, password) => 
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    }),
  
  logout: () => 
    apiRequest('/api/auth/logout', { method: 'POST' })
};

// Student APIs
export const studentAPI = {
  getProfile: () => apiRequest('/api/student/profile'),
  
  updateProfile: (data) => 
    apiRequest('/api/student/profile', {
      method: 'PUT',
      body: data
    }),
  
  getCourses: () => apiRequest('/api/student/courses'),
  
  getAttendance: () => apiRequest('/api/student/attendance'),
  
  getAssignments: () => apiRequest('/api/student/assignments'),
  
  submitAssignment: (assignmentId, submissionText) => 
    apiRequest('/api/student/assignments', {
      method: 'POST',
      body: { assignment_id: assignmentId, submission_text: submissionText }
    }),
  
  getExaminations: () => apiRequest('/api/student/examinations'),
  
  getFees: () => apiRequest('/api/student/fees'),
  
  getPlacement: () => apiRequest('/api/student/placement'),
  
  applyPlacement: (offerId) => 
    apiRequest('/api/student/placement', {
      method: 'POST',
      body: { offer_id: offerId }
    }),
  
  getDisciplinary: () => apiRequest('/api/student/disciplinary'),
  
  getFeedback: () => apiRequest('/api/student/feedback'),
  
  submitFeedback: (data) => 
    apiRequest('/api/student/feedback', {
      method: 'POST',
      body: data
    }),
  
  getEnrollment: () => apiRequest('/api/student/enrollment'),
  
  enrollCourse: (courseCode) => 
    apiRequest('/api/student/enrollment', {
      method: 'POST',
      body: { course_code: courseCode }
    })
};

// Faculty APIs
export const facultyAPI = {
  getProfile: () => apiRequest('/api/faculty/profile'),
  
  getCourses: () => apiRequest('/api/faculty/courses'),
  
  getStudents: (courseCode) => {
    const url = courseCode 
      ? `/api/faculty/students?course_code=${courseCode}`
      : '/api/faculty/students';
    return apiRequest(url);
  },

  getAttendance: (courseCode, date) => {
    const params = new URLSearchParams();
    if (courseCode) params.append('courseCode', courseCode);
    if (date) params.append('date', date);
    return apiRequest(`/api/faculty/attendance?${params.toString()}`);
  },

  markAttendance: (attendanceData) => 
    apiRequest('/api/faculty/attendance', {
      method: 'POST',
      body: attendanceData
    }),

  getResults: (month, year, courseCode) => {
    const params = new URLSearchParams();
    if (month) params.append('month', month);
    if (year) params.append('year', year);
    if (courseCode) params.append('courseCode', courseCode);
    return apiRequest(`/api/faculty/results?${params.toString()}`);
  },

  getStudent360: (studentId) => 
    apiRequest(`/api/faculty/student360?studentId=${studentId}`),

  getAssignments: (courseCode) => {
    const url = courseCode 
      ? `/api/faculty/assignments?course_code=${courseCode}`
      : '/api/faculty/assignments';
    return apiRequest(url);
  },

  createAssignment: (assignmentData) => 
    apiRequest('/api/faculty/assignments', {
      method: 'POST',
      body: assignmentData
    }),

  gradeAssignment: (submissionId, marks, feedback) => 
    apiRequest('/api/faculty/assignments/grade', {
      method: 'PUT',
      body: { submission_id: submissionId, marks, feedback }
    }),

  getInternalMarks: (courseCode, testType) => {
    const params = new URLSearchParams();
    if (courseCode) params.append('courseCode', courseCode);
    if (testType) params.append('testType', testType);
    return apiRequest(`/api/faculty/internal-marks?${params.toString()}`);
  },

  updateInternalMarks: (marksData) => 
    apiRequest('/api/faculty/internal-marks', {
      method: 'POST',
      body: marksData
    })
};

// Common APIs
export const commonAPI = {
  getNotifications: () => apiRequest('/api/notifications'),
  
  markNotificationRead: (notificationId) => 
    apiRequest('/api/notifications', {
      method: 'PUT',
      body: { notification_id: notificationId }
    }),
  
  getIssues: () => apiRequest('/api/issues'),
  
  reportIssue: (data) => 
    apiRequest('/api/issues', {
      method: 'POST',
      body: data
    }),
  
  getCalendar: (month, year) => {
    const params = new URLSearchParams();
    if (month) params.append('month', month);
    if (year) params.append('year', year);
    return apiRequest(`/api/calendar?${params.toString()}`);
  }
};

// Error handling helper
export function handleAPIError(error) {
  if (error.message.includes('Unauthorized')) {
    // Redirect to login
    window.location.href = '/';
    return;
  }
  
  // Show error message to user
  console.error('API Error:', error.message);
  return error.message;
}