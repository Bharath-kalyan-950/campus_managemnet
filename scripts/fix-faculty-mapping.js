const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function fixFacultyMapping() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    console.log('\n🔧 FIXING FACULTY MAPPING');
    console.log('=' .repeat(50));

    // Check if Daniel's faculty record exists
    const [existingRecord] = await connection.execute(`
      SELECT * FROM faculty WHERE user_id = 2
    `);

    if (existingRecord.length > 0) {
      console.log('✅ Daniel already has a faculty record');
      return;
    }

    // Add Daniel's faculty record
    console.log('📝 Adding faculty record for Daniel (daniel@simats.edu)...');
    
    await connection.execute(`
      INSERT INTO faculty (
        faculty_id, user_id, department, designation, qualification, 
        experience_years, specialization, office_room, joining_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'FAC2024001',  // faculty_id (matching user_id)
      2,             // user_id (Daniel's user ID)
      'Computer Science',  // department
      'Professor',   // designation
      'Ph.D in Computer Science',  // qualification
      10,            // experience_years
      'Database Systems, Software Engineering',  // specialization
      'Room 101, CS Block',  // office_room
      '2020-01-15'   // joining_date
    ]);

    console.log('✅ Successfully added faculty record for Daniel');

    // Verify the addition
    const [verifyRecord] = await connection.execute(`
      SELECT u.user_id, u.email, u.first_name, u.last_name,
             f.faculty_id, f.department, f.designation, f.qualification
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE u.email = 'daniel@simats.edu'
    `);

    if (verifyRecord.length > 0) {
      const faculty = verifyRecord[0];
      console.log('\n📋 VERIFICATION - Daniel\'s Complete Record:');
      console.log(`   👤 Name: ${faculty.first_name} ${faculty.last_name}`);
      console.log(`   📧 Email: ${faculty.email}`);
      console.log(`   🆔 User ID: ${faculty.user_id}`);
      console.log(`   👨‍🏫 Faculty ID: ${faculty.faculty_id}`);
      console.log(`   🏫 Department: ${faculty.department}`);
      console.log(`   🎓 Designation: ${faculty.designation}`);
      console.log(`   📜 Qualification: ${faculty.qualification}`);
    }

    // Test login data retrieval
    console.log('\n🔐 TESTING FACULTY LOGIN DATA RETRIEVAL');
    console.log('=' .repeat(50));
    
    const [loginTest] = await connection.execute(`
      SELECT u.first_name, u.last_name, u.email, u.phone,
             f.faculty_id, f.department, f.designation, f.qualification, 
             f.experience_years, f.specialization, f.office_room
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE u.email = ? AND u.role = 'faculty'
    `, ['daniel@simats.edu']);

    if (loginTest.length > 0) {
      const faculty = loginTest[0];
      console.log(`✅ Faculty login test successful for daniel@simats.edu:`);
      console.log(`   Name: ${faculty.first_name} ${faculty.last_name}`);
      console.log(`   Faculty ID: ${faculty.faculty_id}`);
      console.log(`   Department: ${faculty.department}`);
      console.log(`   Designation: ${faculty.designation}`);
      console.log(`   Qualification: ${faculty.qualification}`);
      console.log(`   Experience: ${faculty.experience_years} years`);
      console.log(`   Specialization: ${faculty.specialization}`);
      console.log(`   Office: ${faculty.office_room}`);
    } else {
      console.log(`❌ Faculty login test still failing!`);
    }

    console.log('\n✅ Faculty mapping fix completed successfully!');

  } catch (error) {
    console.error('❌ Error fixing faculty mapping:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixFacultyMapping();