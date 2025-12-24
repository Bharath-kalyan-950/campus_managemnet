const mysql = require('mysql2/promise');

async function quickCheck() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  console.log('📊 STUDENT DATA:');
  const [students] = await connection.execute(`
    SELECT s.student_id, u.first_name, u.last_name, u.email
    FROM students s
    JOIN users u ON s.user_id = u.id
    ORDER BY s.student_id
  `);

  students.forEach(student => {
    console.log(`${student.student_id}: ${student.first_name} ${student.last_name} (${student.email})`);
  });

  await connection.end();
}

quickCheck().catch(console.error);