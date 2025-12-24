const { executeQuery } = require('./lib/db.js');

async function checkCourses() {
  try {
    const courses = await executeQuery('SELECT course_code, course_name FROM courses LIMIT 10');
    console.log('Available courses:');
    courses.forEach(c => console.log(`${c.course_code} - ${c.course_name}`));
    
    const faculty = await executeQuery('SELECT faculty_id, CONCAT(u.first_name, " ", u.last_name) as name FROM faculty f JOIN users u ON f.user_id = u.id LIMIT 5');
    console.log('\nAvailable faculty:');
    faculty.forEach(f => console.log(`${f.faculty_id} - ${f.name}`));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCourses();