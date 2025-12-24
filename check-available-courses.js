const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function checkAvailableCourses() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    // Check available courses
    const courses = await connection.execute(`
      SELECT course_code, course_name, slot, faculty_id, max_capacity, current_enrolled
      FROM courses 
      ORDER BY course_code
    `);
    
    console.log('\n📚 Available Courses:');
    console.log('='.repeat(80));
    courses[0].forEach(course => {
      console.log(`${course.course_code} - ${course.course_name} (Slot ${course.slot}) - Faculty: ${course.faculty_id}`);
      console.log(`   Capacity: ${course.current_enrolled}/${course.max_capacity}`);
    });
    
    // Check students
    const students = await connection.execute(`
      SELECT student_id, CONCAT(u.first_name, ' ', u.last_name) as name
      FROM students s
      JOIN users u ON s.user_id = u.id
      LIMIT 5
    `);
    
    console.log('\n👥 Available Students:');
    console.log('='.repeat(50));
    students[0].forEach(student => {
      console.log(`${student.student_id} - ${student.name}`);
    });
    
    // Check faculty
    const faculty = await connection.execute(`
      SELECT faculty_id, CONCAT(u.first_name, ' ', u.last_name) as name
      FROM faculty f
      JOIN users u ON f.user_id = u.id
      LIMIT 5
    `);
    
    console.log('\n👨‍🏫 Available Faculty:');
    console.log('='.repeat(50));
    faculty[0].forEach(fac => {
      console.log(`${fac.faculty_id} - ${fac.name}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkAvailableCourses();