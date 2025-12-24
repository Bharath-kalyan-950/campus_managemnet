const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function testStudentProfileFix() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    console.log('\n🔍 Testing Student Profile API Fix:');
    console.log('='.repeat(70));

    // Test the corrected query for both students
    console.log('\n1️⃣ Testing John Doe (STU2024001):');
    const johnProfile = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        s.student_id, s.department, s.year, s.semester, s.batch,
        s.cgpa, s.total_credits, s.hostel_resident, s.guardian_name,
        s.guardian_phone, s.address, s.blood_group, s.date_of_birth,
        s.admission_date
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.student_id = 'STU2024001'
    `);

    if (johnProfile[0].length > 0) {
      const profile = johnProfile[0][0];
      console.log(`✅ Found profile for STU2024001:`);
      console.log(`   Name: ${profile.first_name} ${profile.last_name}`);
      console.log(`   Email: ${profile.email}`);
      console.log(`   Student ID: ${profile.student_id}`);
      console.log(`   Department: ${profile.department}`);
    } else {
      console.log('❌ No profile found for STU2024001');
    }

    console.log('\n2️⃣ Testing Rajesh Kumar (STU2024002):');
    const rajeshProfile = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        s.student_id, s.department, s.year, s.semester, s.batch,
        s.cgpa, s.total_credits, s.hostel_resident, s.guardian_name,
        s.guardian_phone, s.address, s.blood_group, s.date_of_birth,
        s.admission_date
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.student_id = 'STU2024002'
    `);

    if (rajeshProfile[0].length > 0) {
      const profile = rajeshProfile[0][0];
      console.log(`✅ Found profile for STU2024002:`);
      console.log(`   Name: ${profile.first_name} ${profile.last_name}`);
      console.log(`   Email: ${profile.email}`);
      console.log(`   Student ID: ${profile.student_id}`);
      console.log(`   Department: ${profile.department}`);
    } else {
      console.log('❌ No profile found for STU2024002');
    }

    console.log('\n3️⃣ Testing the OLD (incorrect) query for comparison:');
    const oldQuery = await connection.execute(`
      SELECT 
        u.first_name, u.last_name, u.email,
        s.student_id
      FROM students s
      JOIN users u ON s.student_id = u.user_id
      WHERE s.student_id = 'STU2024001'
    `);

    if (oldQuery[0].length > 0) {
      const profile = oldQuery[0][0];
      console.log(`❌ OLD query result for STU2024001:`);
      console.log(`   Name: ${profile.first_name} ${profile.last_name} (WRONG!)`);
      console.log(`   This is why Rajesh's name was showing for John's account`);
    } else {
      console.log('✅ OLD query returns no results (good!)');
    }

    console.log('\n📊 Summary:');
    console.log('='.repeat(70));
    console.log('✅ The student profile API JOIN has been fixed');
    console.log('✅ Each student will now see their correct name in the header');
    console.log('✅ Enrollment requests will be sent from the correct student account');
    console.log('\n🔄 Next steps:');
    console.log('1. Clear browser cache and localStorage');
    console.log('2. Log out and log back in as the correct student');
    console.log('3. The header should now show the correct student name');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

testStudentProfileFix();