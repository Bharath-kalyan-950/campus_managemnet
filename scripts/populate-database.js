const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'smart_campus_db'
};

async function populateDatabase() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database');

    // Hash password for all users
    const hashedPassword = await bcrypt.hash('password', 12);

    // Insert additional students
    const additionalStudents = [
      ['STU2024004', 'priya.reddy@simats.edu', hashedPassword, 'student', 'Priya', 'Reddy', '9876543216'],
      ['STU2024005', 'vikram.singh@simats.edu', hashedPassword, 'student', 'Vikram', 'Singh', '9876543217'],
      ['STU2024006', 'ananya.das@simats.edu', hashedPassword, 'student', 'Ananya', 'Das', '9876543218'],
      ['STU2024007', 'karthik.raj@simats.edu', hashedPassword, 'student', 'Karthik', 'Raj', '9876543219'],
      ['STU2024008', 'meera.nair@simats.edu', hashedPassword, 'student', 'Meera', 'Nair', '9876543220']
    ];

    for (const student of additionalStudents) {
      await connection.execute(
        'INSERT IGNORE INTO users (user_id, email, password, role, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
        student
      );
    }

    // Insert student details
    const studentDetails = [
      ['STU2024004', 4, 'Mechanical Engineering', 2, 3, 'ME-A', 8.2, '2022-07-15', 'Ramesh Reddy', '9876543230', 'Hyderabad, Telangana', 'AB+', '2003-01-25'],
      ['STU2024005', 5, 'Electrical Engineering', 3, 5, 'EE-B', 8.9, '2021-07-15', 'Harpreet Singh', '9876543231', 'Chandigarh, Punjab', 'O-', '2002-11-30'],
      ['STU2024006', 6, 'Computer Science Engineering', 2, 4, 'CSE-B', 9.2, '2022-07-15', 'Subhash Das', '9876543232', 'Kolkata, West Bengal', 'A-', '2003-07-18'],
      ['STU2024007', 7, 'Information Technology', 3, 6, 'IT-A', 8.7, '2021-07-15', 'Mohan Raj', '9876543233', 'Bangalore, Karnataka', 'B-', '2002-04-12'],
      ['STU2024008', 8, 'Biotechnology', 1, 2, 'BT-A', 8.4, '2023-07-15', 'Suresh Nair', '9876543234', 'Kochi, Kerala', 'AB-', '2004-09-05']
    ];

    for (const student of studentDetails) {
      await connection.execute(
        'INSERT IGNORE INTO students (student_id, user_id, department, year, semester, batch, cgpa, admission_date, guardian_name, guardian_phone, address, blood_group, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        student
      );
    }

    // Insert more courses
    const additionalCourses = [
      // Mechanical Engineering
      ['ME201', 'Thermodynamics', 'Mechanical Engineering', 4, 3, 2, 'core', 'Laws of thermodynamics, heat engines, refrigeration'],
      ['ME202', 'Fluid Mechanics', 'Mechanical Engineering', 4, 4, 2, 'core', 'Fluid statics, dynamics, flow measurement'],
      ['ME301', 'Heat Transfer', 'Mechanical Engineering', 3, 5, 3, 'core', 'Conduction, convection, radiation heat transfer'],
      
      // Electrical Engineering
      ['EE201', 'Circuit Analysis', 'Electrical Engineering', 4, 3, 2, 'core', 'AC/DC circuits, network theorems'],
      ['EE202', 'Electromagnetic Fields', 'Electrical Engineering', 4, 4, 2, 'core', 'Electric and magnetic fields, Maxwell equations'],
      ['EE301', 'Power Systems', 'Electrical Engineering', 4, 5, 3, 'core', 'Generation, transmission, distribution of power'],
      
      // Information Technology
      ['IT201', 'Programming Fundamentals', 'Information Technology', 4, 3, 2, 'core', 'Programming concepts using Python'],
      ['IT301', 'System Administration', 'Information Technology', 3, 5, 3, 'core', 'Linux/Windows server administration'],
      
      // Biotechnology
      ['BT101', 'Cell Biology', 'Biotechnology', 4, 1, 1, 'core', 'Cell structure, function, and processes'],
      ['BT201', 'Genetics', 'Biotechnology', 4, 3, 2, 'core', 'Heredity, gene expression, genetic engineering']
    ];

    for (const course of additionalCourses) {
      await connection.execute(
        'INSERT IGNORE INTO courses (course_code, course_name, department, credits, semester, year, course_type, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        course
      );
    }

    // Insert more enrollments
    const additionalEnrollments = [
      ['STU2024004', 'ME201', 'FAC2024001', 'enrolled'],
      ['STU2024004', 'ME202', 'FAC2024001', 'enrolled'],
      ['STU2024005', 'EE201', 'FAC2024002', 'completed', 'A', 9.0],
      ['STU2024005', 'EE301', 'FAC2024002', 'enrolled'],
      ['STU2024006', 'CS301', 'FAC2024001', 'enrolled'],
      ['STU2024006', 'CS302', 'FAC2024001', 'enrolled'],
      ['STU2024007', 'IT201', 'FAC2024001', 'completed', 'A+', 10.0],
      ['STU2024007', 'IT301', 'FAC2024001', 'enrolled'],
      ['STU2024008', 'BT101', 'FAC2024002', 'completed', 'B+', 8.0],
      ['STU2024008', 'BT201', 'FAC2024002', 'enrolled']
    ];

    for (const enrollment of additionalEnrollments) {
      await connection.execute(
        'INSERT IGNORE INTO enrollments (student_id, course_code, faculty_id, status, grade, grade_points) VALUES (?, ?, ?, ?, ?, ?)',
        enrollment
      );
    }

    // Generate attendance data for the last 30 days
    const students = ['STU2024001', 'STU2024002', 'STU2024003', 'STU2024004', 'STU2024005', 'STU2024006'];
    const courses = ['CS301', 'CS302', 'ME201', 'EE301'];
    const statuses = ['present', 'absent', 'late'];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      for (const student of students) {
        for (const course of courses) {
          // 85% attendance rate
          const status = Math.random() < 0.85 ? 'present' : (Math.random() < 0.1 ? 'late' : 'absent');
          
          try {
            await connection.execute(
              'INSERT IGNORE INTO attendance (student_id, course_code, faculty_id, date, status, session_type) VALUES (?, ?, ?, ?, ?, ?)',
              [student, course, 'FAC2024001', dateStr, status, 'lecture']
            );
          } catch (err) {
            // Ignore duplicate entries
          }
        }
      }
    }

    console.log('Database populated successfully with comprehensive data!');
    
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