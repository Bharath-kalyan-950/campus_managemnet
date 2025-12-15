const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function checkUserFacultyMapping() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    console.log('\n🔍 CHECKING USER-FACULTY MAPPING');
    console.log('=' .repeat(60));

    // Check users with faculty role
    const [facultyUsers] = await connection.execute(`
      SELECT id, user_id, email, first_name, last_name, role 
      FROM users 
      WHERE role = 'faculty'
      ORDER BY user_id
    `);

    console.log(`📊 Found ${facultyUsers.length} users with 'faculty' role:`);
    facultyUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.first_name} ${user.last_name} (${user.email}) - User ID: ${user.user_id}`);
    });

    // Check faculty table
    const [facultyTable] = await connection.execute(`
      SELECT faculty_id, user_id, department, designation, qualification, experience_years
      FROM faculty
      ORDER BY faculty_id
    `);

    console.log(`\n👨‍🏫 Found ${facultyTable.length} entries in faculty table:`);
    facultyTable.forEach((faculty, index) => {
      console.log(`${index + 1}. Faculty ID: ${faculty.faculty_id} - User ID: ${faculty.user_id} - ${faculty.department} - ${faculty.designation}`);
    });

    // Check for missing mappings
    console.log('\n🔗 CHECKING MAPPING CONSISTENCY');
    console.log('=' .repeat(60));

    // Find faculty users without faculty table entries
    const [unmappedUsers] = await connection.execute(`
      SELECT u.id, u.user_id, u.email, u.first_name, u.last_name
      FROM users u
      LEFT JOIN faculty f ON u.id = f.user_id
      WHERE u.role = 'faculty' AND f.user_id IS NULL
    `);

    if (unmappedUsers.length > 0) {
      console.log(`❌ Found ${unmappedUsers.length} faculty users WITHOUT entries in faculty table:`);
      unmappedUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.first_name} ${user.last_name} (${user.email}) - Missing faculty record!`);
      });
    } else {
      console.log('✅ All faculty users have corresponding entries in faculty table');
    }

    // Find faculty table entries without user records
    const [orphanedFaculty] = await connection.execute(`
      SELECT f.faculty_id, f.user_id, f.department
      FROM faculty f
      LEFT JOIN users u ON f.user_id = u.id
      WHERE u.id IS NULL
    `);

    if (orphanedFaculty.length > 0) {
      console.log(`❌ Found ${orphanedFaculty.length} faculty records WITHOUT user accounts:`);
      orphanedFaculty.forEach((faculty, index) => {
        console.log(`${index + 1}. Faculty ID: ${faculty.faculty_id} - Missing user account!`);
      });
    } else {
      console.log('✅ All faculty records have corresponding user accounts');
    }

    // Show complete mapping
    console.log('\n📋 COMPLETE USER-FACULTY MAPPING');
    console.log('=' .repeat(60));
    const [completeMapping] = await connection.execute(`
      SELECT u.user_id, u.email, u.first_name, u.last_name, u.role,
             f.faculty_id, f.department, f.designation, f.qualification, f.experience_years
      FROM users u
      LEFT JOIN faculty f ON u.id = f.user_id
      WHERE u.role = 'faculty'
      ORDER BY u.user_id
    `);

    completeMapping.forEach((mapping, index) => {
      const status = mapping.faculty_id ? '✅' : '❌';
      console.log(`${index + 1}. ${status} ${mapping.first_name} ${mapping.last_name}`);
      console.log(`   📧 Email: ${mapping.email}`);
      console.log(`   🆔 User ID: ${mapping.user_id}`);
      if (mapping.faculty_id) {
        console.log(`   👨‍🏫 Faculty ID: ${mapping.faculty_id}`);
        console.log(`   🏫 Department: ${mapping.department}`);
        console.log(`   🎓 Designation: ${mapping.designation}`);
        console.log(`   📜 Qualification: ${mapping.qualification}`);
        console.log(`   📅 Experience: ${mapping.experience_years} years`);
      } else {
        console.log(`   ❌ NO FACULTY RECORD FOUND!`);
      }
      console.log('');
    });

    // Check if we can login and retrieve faculty data
    console.log('\n🔐 FACULTY LOGIN DATA RETRIEVAL TEST');
    console.log('=' .repeat(60));
    
    const testEmail = 'daniel@simats.edu';
    const [loginTest] = await connection.execute(`
      SELECT u.first_name, u.last_name, u.email, u.phone,
             f.faculty_id, f.department, f.designation, f.qualification, 
             f.experience_years, f.specialization, f.office_room
      FROM users u
      JOIN faculty f ON u.id = f.user_id
      WHERE u.email = ? AND u.role = 'faculty'
    `, [testEmail]);

    if (loginTest.length > 0) {
      const faculty = loginTest[0];
      console.log(`✅ Faculty login test successful for ${testEmail}:`);
      console.log(`   Name: ${faculty.first_name} ${faculty.last_name}`);
      console.log(`   Faculty ID: ${faculty.faculty_id}`);
      console.log(`   Department: ${faculty.department}`);
      console.log(`   Designation: ${faculty.designation}`);
      console.log(`   Qualification: ${faculty.qualification}`);
      console.log(`   Experience: ${faculty.experience_years} years`);
      console.log(`   Office: ${faculty.office_room}`);
    } else {
      console.log(`❌ Faculty login test failed for ${testEmail} - No data found!`);
    }

    // Check faculty course assignments
    console.log('\n📚 FACULTY COURSE ASSIGNMENTS');
    console.log('=' .repeat(60));
    const [courseAssignments] = await connection.execute(`
      SELECT f.faculty_id, f.department, 
             COUNT(DISTINCT e.course_code) as courses_assigned,
             COUNT(DISTINCT e.student_id) as students_taught
      FROM faculty f
      LEFT JOIN enrollments e ON f.faculty_id = e.faculty_id
      GROUP BY f.faculty_id, f.department
      ORDER BY f.faculty_id
    `);

    courseAssignments.forEach((assignment, index) => {
      console.log(`${index + 1}. Faculty ID: ${assignment.faculty_id}`);
      console.log(`   🏫 Department: ${assignment.department}`);
      console.log(`   📚 Courses Assigned: ${assignment.courses_assigned}`);
      console.log(`   👨‍🎓 Students Taught: ${assignment.students_taught}`);
      console.log('');
    });

    console.log('\n✅ User-Faculty mapping verification completed!');

  } catch (error) {
    console.error('❌ Error checking user-faculty mapping:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkUserFacultyMapping();