const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

// Student data with unique registration numbers and details
const studentsData = [
  {
    regNo: 'SIMATS2021001',
    email: 'rajesh.kumar@simats.edu',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    phone: '9876543210',
    department: 'Computer Science',
    year: 3,
    semester: 6,
    batch: '2021-25',
    cgpa: 8.5,
    bloodGroup: 'B+',
    dob: '2003-05-15',
    guardianName: 'Suresh Kumar',
    guardianPhone: '9876543211',
    address: '123 Anna Nagar, Chennai, Tamil Nadu'
  },
  {
    regNo: 'SIMATS2021002',
    email: 'priya.sharma@simats.edu',
    firstName: 'Priya',
    lastName: 'Sharma',
    phone: '9876543212',
    department: 'Computer Science',
    year: 3,
    semester: 6,
    batch: '2021-25',
    cgpa: 9.2,
    bloodGroup: 'A+',
    dob: '2003-08-22',
    guardianName: 'Vikram Sharma',
    guardianPhone: '9876543213',
    address: '456 T Nagar, Chennai, Tamil Nadu'
  },
  {
    regNo: 'SIMATS2021003',
    email: 'arjun.reddy@simats.edu',
    firstName: 'Arjun',
    lastName: 'Reddy',
    phone: '9876543214',
    department: 'Information Technology',
    year: 3,
    semester: 6,
    batch: '2021-25',
    cgpa: 7.8,
    bloodGroup: 'O+',
    dob: '2003-03-10',
    guardianName: 'Ramesh Reddy',
    guardianPhone: '9876543215',
    address: '789 Velachery, Chennai, Tamil Nadu'
  },
  {
    regNo: 'SIMATS2021004',
    email: 'sneha.patel@simats.edu',
    firstName: 'Sneha',
    lastName: 'Patel',
    phone: '9876543216',
    department: 'Electronics',
    year: 3,
    semester: 6,
    batch: '2021-25',
    cgpa: 8.9,
    bloodGroup: 'AB+',
    dob: '2003-11-05',
    guardianName: 'Mahesh Patel',
    guardianPhone: '9876543217',
    address: '321 Adyar, Chennai, Tamil Nadu'
  },
  {
    regNo: 'SIMATS2021005',
    email: 'karthik.nair@simats.edu',
    firstName: 'Karthik',
    lastName: 'Nair',
    phone: '9876543218',
    department: 'Mechanical',
    year: 3,
    semester: 6,
    batch: '2021-25',
    cgpa: 7.5,
    bloodGroup: 'B-',
    dob: '2003-07-18',
    guardianName: 'Sunil Nair',
    guardianPhone: '9876543219',
    address: '654 Mylapore, Chennai, Tamil Nadu'
  },
  {
    regNo: 'SIMATS2021006',
    email: 'divya.singh@simats.edu',
    firstName: 'Divya',
    lastName: 'Singh',
    phone: '9876543220',
    department: 'Computer Science',
    year: 3,
    semester: 6,
    batch: '2021-25',
    cgpa: 8.7,
    bloodGroup: 'A-',
    dob: '2003-09-12',
    guardianName: 'Rajesh Singh',
    guardianPhone: '9876543221',
    address: '987 Tambaram, Chennai, Tamil Nadu'
  },
  {
    regNo: 'SIMATS2021007',
    email: 'rohit.gupta@simats.edu',
    firstName: 'Rohit',
    lastName: 'Gupta',
    phone: '9876543222',
    department: 'Civil',
    year: 3,
    semester: 6,
    batch: '2021-25',
    cgpa: 8.1,
    bloodGroup: 'O-',
    dob: '2003-04-25',
    guardianName: 'Anil Gupta',
    guardianPhone: '9876543223',
    address: '147 Porur, Chennai, Tamil Nadu'
  },
  {
    regNo: 'SIMATS2021008',
    email: 'ananya.iyer@simats.edu',
    firstName: 'Ananya',
    lastName: 'Iyer',
    phone: '9876543224',
    department: 'Information Technology',
    year: 3,
    semester: 6,
    batch: '2021-25',
    cgpa: 9.0,
    bloodGroup: 'AB-',
    dob: '2003-12-08',
    guardianName: 'Krishnan Iyer',
    guardianPhone: '9876543225',
    address: '258 Guindy, Chennai, Tamil Nadu'
  },
  {
    regNo: 'SIMATS2021009',
    email: 'vikram.joshi@simats.edu',
    firstName: 'Vikram',
    lastName: 'Joshi',
    phone: '9876543226',
    department: 'Electronics',
    year: 3,
    semester: 6,
    batch: '2021-25',
    cgpa: 7.9,
    bloodGroup: 'B+',
    dob: '2003-06-30',
    guardianName: 'Deepak Joshi',
    guardianPhone: '9876543227',
    address: '369 Chrompet, Chennai, Tamil Nadu'
  },
  {
    regNo: 'SIMATS2021010',
    email: 'meera.krishnan@simats.edu',
    firstName: 'Meera',
    lastName: 'Krishnan',
    phone: '9876543228',
    department: 'Mechanical',
    year: 3,
    semester: 6,
    batch: '2021-25',
    cgpa: 8.3,
    bloodGroup: 'A+',
    dob: '2003-01-14',
    guardianName: 'Venkat Krishnan',
    guardianPhone: '9876543229',
    address: '741 Pallavaram, Chennai, Tamil Nadu'
  }
];

// Course data by department
const coursesByDepartment = {
  'Computer Science': [
    { code: 'CS301', name: 'Data Structures and Algorithms', credits: 4, type: 'core' },
    { code: 'CS302', name: 'Database Management Systems', credits: 4, type: 'core' },
    { code: 'CS303', name: 'Web Development', credits: 3, type: 'core' },
    { code: 'CS304', name: 'Operating Systems', credits: 4, type: 'core' },
    { code: 'CS305', name: 'Computer Networks', credits: 3, type: 'core' },
    { code: 'CS306', name: 'Software Engineering', credits: 3, type: 'core' }
  ],
  'Information Technology': [
    { code: 'IT301', name: 'System Analysis and Design', credits: 4, type: 'core' },
    { code: 'IT302', name: 'Network Security', credits: 4, type: 'core' },
    { code: 'IT303', name: 'Mobile Application Development', credits: 3, type: 'core' },
    { code: 'IT304', name: 'Cloud Computing', credits: 4, type: 'core' },
    { code: 'IT305', name: 'Data Mining', credits: 3, type: 'core' },
    { code: 'IT306', name: 'Internet of Things', credits: 3, type: 'core' }
  ],
  'Electronics': [
    { code: 'EC301', name: 'Digital Signal Processing', credits: 4, type: 'core' },
    { code: 'EC302', name: 'Microprocessors', credits: 4, type: 'core' },
    { code: 'EC303', name: 'Communication Systems', credits: 3, type: 'core' },
    { code: 'EC304', name: 'VLSI Design', credits: 4, type: 'core' },
    { code: 'EC305', name: 'Embedded Systems', credits: 3, type: 'core' },
    { code: 'EC306', name: 'Control Systems', credits: 3, type: 'core' }
  ],
  'Mechanical': [
    { code: 'ME301', name: 'Thermodynamics', credits: 4, type: 'core' },
    { code: 'ME302', name: 'Fluid Mechanics', credits: 4, type: 'core' },
    { code: 'ME303', name: 'Machine Design', credits: 3, type: 'core' },
    { code: 'ME304', name: 'Manufacturing Processes', credits: 4, type: 'core' },
    { code: 'ME305', name: 'Heat Transfer', credits: 3, type: 'core' },
    { code: 'ME306', name: 'Automobile Engineering', credits: 3, type: 'core' }
  ],
  'Civil': [
    { code: 'CE301', name: 'Structural Analysis', credits: 4, type: 'core' },
    { code: 'CE302', name: 'Concrete Technology', credits: 4, type: 'core' },
    { code: 'CE303', name: 'Geotechnical Engineering', credits: 3, type: 'core' },
    { code: 'CE304', name: 'Transportation Engineering', credits: 4, type: 'core' },
    { code: 'CE305', name: 'Environmental Engineering', credits: 3, type: 'core' },
    { code: 'CE306', name: 'Construction Management', credits: 3, type: 'core' }
  ]
};

// Faculty data
const facultyData = [
  { id: 'FAC001', name: 'Dr. Rajesh Kumar', dept: 'Computer Science' },
  { id: 'FAC002', name: 'Dr. Priya Sharma', dept: 'Computer Science' },
  { id: 'FAC003', name: 'Dr. Arjun Reddy', dept: 'Information Technology' },
  { id: 'FAC004', name: 'Dr. Sneha Patel', dept: 'Electronics' },
  { id: 'FAC005', name: 'Dr. Karthik Nair', dept: 'Mechanical' },
  { id: 'FAC006', name: 'Dr. Divya Singh', dept: 'Civil' }
];

// Placement offers
const placementOffers = [
  {
    id: 'PO001',
    company: 'TCS',
    title: 'Software Developer',
    package: 350000,
    location: 'Chennai',
    type: 'full_time',
    deadline: '2024-04-15'
  },
  {
    id: 'PO002',
    company: 'Infosys',
    title: 'System Engineer',
    package: 380000,
    location: 'Bangalore',
    type: 'full_time',
    deadline: '2024-04-20'
  },
  {
    id: 'PO003',
    company: 'Wipro',
    title: 'Software Engineer',
    package: 360000,
    location: 'Hyderabad',
    type: 'full_time',
    deadline: '2024-04-25'
  },
  {
    id: 'PO004',
    company: 'Cognizant',
    title: 'Associate Developer',
    package: 340000,
    location: 'Chennai',
    type: 'full_time',
    deadline: '2024-05-01'
  },
  {
    id: 'PO005',
    company: 'Accenture',
    title: 'Technology Analyst',
    package: 420000,
    location: 'Mumbai',
    type: 'full_time',
    deadline: '2024-05-10'
  }
];

async function populateDatabase() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    // Clear existing data
    console.log('Clearing existing data...');
    await connection.execute('DELETE FROM user_notifications');
    await connection.execute('DELETE FROM notifications');
    await connection.execute('DELETE FROM course_feedback');
    await connection.execute('DELETE FROM placement_applications');
    await connection.execute('DELETE FROM placement_offers');
    await connection.execute('DELETE FROM disciplinary_actions');
    await connection.execute('DELETE FROM fee_payments');
    await connection.execute('DELETE FROM fee_structure');
    await connection.execute('DELETE FROM exam_results');
    await connection.execute('DELETE FROM examinations');
    await connection.execute('DELETE FROM assignment_submissions');
    await connection.execute('DELETE FROM assignments');
    await connection.execute('DELETE FROM attendance');
    await connection.execute('DELETE FROM enrollments');
    await connection.execute('DELETE FROM courses');
    await connection.execute('DELETE FROM students');
    await connection.execute('DELETE FROM faculty');
    await connection.execute('DELETE FROM users WHERE role = "student"');

    // Insert courses for all departments
    console.log('Inserting courses...');
    for (const [dept, courses] of Object.entries(coursesByDepartment)) {
      for (const course of courses) {
        await connection.execute(
          'INSERT INTO courses (course_code, course_name, department, credits, semester, year, course_type) VALUES (?, ?, ?, ?, 6, 3, ?)',
          [course.code, course.name, dept, course.credits, course.type]
        );
      }
    }

    // Insert faculty
    console.log('Inserting faculty...');
    for (const faculty of facultyData) {
      // Insert user record for faculty
      const hashedPassword = await bcrypt.hash('password', 10);
      const [userResult] = await connection.execute(
        'INSERT INTO users (user_id, email, password, role, first_name, last_name, phone) VALUES (?, ?, ?, "faculty", ?, ?, ?)',
        [faculty.id, faculty.id.toLowerCase() + '@simats.edu', hashedPassword, faculty.name.split(' ')[1], faculty.name.split(' ')[2] || '', '9876543000']
      );
      
      // Insert faculty record
      await connection.execute(
        'INSERT INTO faculty (faculty_id, user_id, department, designation, qualification) VALUES (?, ?, ?, "Professor", "Ph.D")',
        [faculty.id, userResult.insertId, faculty.dept]
      );
    }

    // Insert placement offers
    console.log('Inserting placement offers...');
    for (const offer of placementOffers) {
      await connection.execute(
        'INSERT INTO placement_offers (offer_id, company_name, job_title, package_amount, job_location, job_type, application_deadline, status) VALUES (?, ?, ?, ?, ?, ?, ?, "open")',
        [offer.id, offer.company, offer.title, offer.package, offer.location, offer.type, offer.deadline]
      );
    }

    // Insert students and their data
    console.log('Inserting students and their data...');
    for (let i = 0; i < studentsData.length; i++) {
      const student = studentsData[i];
      console.log(`Processing student ${i + 1}: ${student.firstName} ${student.lastName}`);

      // Insert user record
      const hashedPassword = await bcrypt.hash('password', 10);
      const [userResult] = await connection.execute(
        'INSERT INTO users (user_id, email, password, role, first_name, last_name, phone) VALUES (?, ?, ?, "student", ?, ?, ?)',
        [student.regNo, student.email, hashedPassword, student.firstName, student.lastName, student.phone]
      );

      // Insert student record
      await connection.execute(
        'INSERT INTO students (student_id, user_id, department, year, semester, batch, cgpa, total_credits, guardian_name, guardian_phone, address, blood_group, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [student.regNo, userResult.insertId, student.department, student.year, student.semester, student.batch, student.cgpa, 20, student.guardianName, student.guardianPhone, student.address, student.bloodGroup, student.dob]
      );

      // Get courses for this student's department
      const departmentCourses = coursesByDepartment[student.department];
      const facultyForDept = facultyData.filter(f => f.dept === student.department);

      // Enroll student in courses
      for (let j = 0; j < departmentCourses.length; j++) {
        const course = departmentCourses[j];
        const faculty = facultyForDept[j % facultyForDept.length];
        
        await connection.execute(
          'INSERT INTO enrollments (student_id, course_code, faculty_id, status) VALUES (?, ?, ?, "enrolled")',
          [student.regNo, course.code, faculty.id]
        );

        // Generate attendance data (30 classes per course)
        const totalClasses = 30;
        const attendanceRate = 0.75 + (Math.random() * 0.2); // 75-95% attendance
        const presentClasses = Math.floor(totalClasses * attendanceRate);
        
        for (let day = 1; day <= totalClasses; day++) {
          const date = new Date(2024, 0, day); // January 2024
          const status = day <= presentClasses ? 'present' : 'absent';
          
          await connection.execute(
            'INSERT INTO attendance (student_id, course_code, faculty_id, date, status) VALUES (?, ?, ?, ?, ?)',
            [student.regNo, course.code, faculty.id, date.toISOString().split('T')[0], status]
          );
        }

        // Create assignments for each course
        const assignmentId = `${course.code}_ASG_${i + 1}`;
        await connection.execute(
          'INSERT INTO assignments (assignment_id, course_code, faculty_id, title, description, due_date, max_marks) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [assignmentId, course.code, faculty.id, `${course.name} Assignment`, `Assignment for ${course.name}`, '2024-03-15', 100]
        );

        // Submit assignment with random marks
        const marks = 60 + Math.floor(Math.random() * 35); // 60-95 marks
        await connection.execute(
          'INSERT INTO assignment_submissions (assignment_id, student_id, submission_text, marks_obtained, status) VALUES (?, ?, ?, ?, "graded")',
          [assignmentId, student.regNo, 'Assignment submitted successfully', marks]
        );

        // Create examinations
        const examId = `${course.code}_EXAM_${i + 1}`;
        await connection.execute(
          'INSERT INTO examinations (exam_id, course_code, exam_name, exam_type, exam_date, start_time, duration, max_marks, venue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [examId, course.code, `${course.name} Final Exam`, 'external', '2024-04-15', '09:00:00', 180, 100, 'Hall A']
        );

        // Add exam results
        const examMarks = 65 + Math.floor(Math.random() * 30); // 65-95 marks
        const grade = examMarks >= 90 ? 'A+' : examMarks >= 80 ? 'A' : examMarks >= 70 ? 'B+' : 'B';
        await connection.execute(
          'INSERT INTO exam_results (exam_id, student_id, marks_obtained, grade) VALUES (?, ?, ?, ?)',
          [examId, student.regNo, examMarks, grade]
        );
      }

      // Add fee structure for student
      const feeTypes = ['Tuition Fee', 'Lab Fee', 'Library Fee', 'Sports Fee', 'Exam Fee'];
      const feeAmounts = [50000, 10000, 2000, 1000, 3000];
      
      for (let k = 0; k < feeTypes.length; k++) {
        await connection.execute(
          'INSERT INTO fee_structure (department, year, semester, fee_type, amount, due_date, academic_year) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [student.department, student.year, student.semester, feeTypes[k], feeAmounts[k], '2024-03-31', '2023-24']
        );

        // Add some payments (pay 60-80% of fees)
        if (Math.random() > 0.3) {
          const paymentId = `PAY_${student.regNo}_${k + 1}`;
          await connection.execute(
            'INSERT INTO fee_payments (payment_id, student_id, fee_type, amount, payment_method, transaction_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [paymentId, student.regNo, feeTypes[k], feeAmounts[k], 'online', `TXN_${Date.now()}_${k}`, 'completed']
          );
        }
      }

      // Add placement applications (random applications)
      const numApplications = 1 + Math.floor(Math.random() * 3); // 1-3 applications
      for (let l = 0; l < numApplications; l++) {
        const offer = placementOffers[l % placementOffers.length];
        const statuses = ['applied', 'shortlisted', 'selected', 'rejected'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        await connection.execute(
          'INSERT INTO placement_applications (student_id, offer_id, status) VALUES (?, ?, ?)',
          [student.regNo, offer.id, status]
        );
      }

      // Add disciplinary records (only for some students)
      if (Math.random() > 0.7) { // 30% chance of having disciplinary record
        const violations = ['Late attendance', 'Improper conduct', 'Academic misconduct'];
        const violation = violations[Math.floor(Math.random() * violations.length)];
        const actionId = `DA_${student.regNo}_1`;
        
        await connection.execute(
          'INSERT INTO disciplinary_actions (action_id, student_id, faculty_id, violation_type, description, action_taken, severity, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [actionId, student.regNo, facultyForDept[0].id, violation, `Student involved in ${violation}`, 'Warning issued', 'minor', 'resolved']
        );
      }

      // Add course feedback
      for (const course of departmentCourses) {
        if (Math.random() > 0.4) { // 60% chance of giving feedback
          const faculty = facultyForDept[0];
          await connection.execute(
            'INSERT INTO course_feedback (student_id, course_code, faculty_id, rating, teaching_quality, course_content, assignments_quality, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [student.regNo, course.code, faculty.id, 4 + Math.floor(Math.random() * 2), 4 + Math.floor(Math.random() * 2), 4 + Math.floor(Math.random() * 2), 4 + Math.floor(Math.random() * 2), 'Good course content and teaching methodology']
          );
        }
      }
    }

    console.log('Database population completed successfully!');
    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('All students use password: "password"');
    console.log('\nStudent Login IDs:');
    studentsData.forEach((student, index) => {
      console.log(`${index + 1}. ${student.email} (${student.firstName} ${student.lastName} - ${student.regNo})`);
    });

  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the population script
populateDatabase();