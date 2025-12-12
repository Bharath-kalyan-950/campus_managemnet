const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('=== Testing Database Connection ===\n');
  
  try {
    // Test connection to MySQL server
    console.log('1. Connecting to MySQL server...');
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // Change if you have a password
    });
    console.log('✓ Connected to MySQL server successfully!\n');

    // Test if database exists
    console.log('2. Checking if smart_campus_db exists...');
    const [databases] = await connection.execute(
      "SHOW DATABASES LIKE 'smart_campus_db'"
    );
    
    if (databases.length === 0) {
      console.log('✗ Database smart_campus_db does not exist');
      console.log('   Run: node scripts/setup-database.js\n');
      await connection.end();
      return;
    }
    console.log('✓ Database smart_campus_db exists!\n');

    // Connect to the database
    console.log('3. Connecting to smart_campus_db...');
    await connection.changeUser({ database: 'smart_campus_db' });
    console.log('✓ Connected to smart_campus_db successfully!\n');

    // Check tables
    console.log('4. Checking tables...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`✓ Found ${tables.length} tables:\n`);
    
    tables.forEach((table, index) => {
      const tableName = Object.values(table)[0];
      console.log(`   ${index + 1}. ${tableName}`);
    });
    console.log('');

    // Check sample data
    console.log('5. Checking sample data...');
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
    const [students] = await connection.execute('SELECT COUNT(*) as count FROM students');
    const [faculty] = await connection.execute('SELECT COUNT(*) as count FROM faculty');
    const [courses] = await connection.execute('SELECT COUNT(*) as count FROM courses');
    
    console.log(`   Users: ${users[0].count}`);
    console.log(`   Students: ${students[0].count}`);
    console.log(`   Faculty: ${faculty[0].count}`);
    console.log(`   Courses: ${courses[0].count}`);
    console.log('');

    // Test a sample user
    console.log('6. Testing sample user...');
    const [sampleUser] = await connection.execute(
      'SELECT user_id, email, role, first_name, last_name FROM users WHERE email = ?',
      ['john.doe@simats.edu']
    );
    
    if (sampleUser.length > 0) {
      console.log('✓ Sample user found:');
      console.log(`   Email: ${sampleUser[0].email}`);
      console.log(`   Role: ${sampleUser[0].role}`);
      console.log(`   Name: ${sampleUser[0].first_name} ${sampleUser[0].last_name}`);
      console.log('   Password: password');
    } else {
      console.log('✗ Sample user not found');
    }
    console.log('');

    await connection.end();
    
    console.log('=== All Tests Passed! ===');
    console.log('\nYou can now:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Open browser: http://localhost:3000');
    console.log('3. Login with: john.doe@simats.edu / password');
    console.log('4. Access phpMyAdmin: http://localhost/phpmyadmin\n');
    
  } catch (error) {
    console.error('✗ Connection test failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure MySQL is running');
    console.error('2. Check your MySQL credentials');
    console.error('3. Verify MySQL is on port 3306');
    console.error('4. Run setup script: node scripts/setup-database.js\n');
  }
}

testConnection();