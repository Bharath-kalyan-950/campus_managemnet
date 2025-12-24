const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupSlotEnrollment() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'smart_campus_db',
      multipleStatements: true
    });

    console.log('✓ Connected to MySQL database');

    // Read and execute the SQL file
    const sqlFile = path.join(__dirname, '..', 'database', 'slot-based-enrollment-schema.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    
    // Split SQL content by semicolons and execute each statement
    const statements = sqlContent.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      const trimmedStatement = statement.trim();
      if (trimmedStatement) {
        try {
          await connection.execute(trimmedStatement);
          console.log('✓ Executed SQL statement');
        } catch (error) {
          // Skip errors for statements that might already exist
          if (!error.message.includes('Duplicate column') && 
              !error.message.includes('already exists') &&
              !error.message.includes('Duplicate entry')) {
            console.log('⚠️ SQL Warning:', error.message);
          }
        }
      }
    }

    console.log('✅ Slot-based enrollment system setup completed!');
    
    // Verify the setup
    const [courses] = await connection.execute('SELECT course_code, course_name, slot, max_capacity, current_enrolled, faculty_id FROM courses WHERE slot IS NOT NULL LIMIT 5');
    console.log('\n📚 Sample courses with slots:');
    courses.forEach(course => {
      console.log(`- ${course.course_code}: ${course.course_name} (Slot ${course.slot}, ${course.current_enrolled}/${course.max_capacity})`);
    });

    const [requests] = await connection.execute('SELECT COUNT(*) as count FROM enrollment_requests');
    console.log(`\n📝 Enrollment requests table created with ${requests[0].count} sample requests`);

  } catch (error) {
    console.error('❌ Error setting up slot enrollment:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupSlotEnrollment();