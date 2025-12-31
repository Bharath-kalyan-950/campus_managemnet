const mysql = require('mysql2/promise');

async function checkCourses() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db'
    });

    console.log('🔍 Checking Daniel\'s courses...\n');

    // Check courses created by Daniel
    const [courses] = await connection.execute(`
      SELECT course_code, course_name, faculty_id, max_capacity, current_enrolled 
      FROM courses 
      WHERE faculty_id = ?
    `, ['FAC2024001']);
    
    console.log('Daniel\'s courses:', courses);

    // Check enrollments
    const [enrollments] = await connection.execute(`
      SELECT course_code, student_id, status 
      FROM enrollment_requests 
      WHERE status = 'enrolled'
    `);
    
    console.log('\nEnrollments:', enrollments);

    // Check if faculty exists
    const [faculty] = await connection.execute(`
      SELECT f.faculty_id, CONCAT(u.first_name, ' ', u.last_name) as name
      FROM faculty f
      JOIN users u ON f.user_id = u.id
      WHERE f.faculty_id = ?
    `, ['FAC2024001']);
    
    console.log('\nFaculty info:', faculty);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkCourses();