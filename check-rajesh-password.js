const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db'
};

async function checkRajeshPassword() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database');

    // Check Rajesh's user record
    const [users] = await connection.execute(`
      SELECT id, user_id, email, password, first_name, last_name, role 
      FROM users 
      WHERE email = 'rajesh.kumar@simats.edu'
    `);

    if (users.length === 0) {
      console.log('❌ Rajesh Kumar not found in users table');
      return;
    }

    const rajesh = users[0];
    console.log('👤 Rajesh Kumar found:');
    console.log(`   ID: ${rajesh.id}`);
    console.log(`   User ID: ${rajesh.user_id}`);
    console.log(`   Email: ${rajesh.email}`);
    console.log(`   Name: ${rajesh.first_name} ${rajesh.last_name}`);
    console.log(`   Role: ${rajesh.role}`);
    console.log(`   Password Hash: ${rajesh.password}`);

    // Test password verification
    const testPassword = 'password';
    const isValid = await bcrypt.compare(testPassword, rajesh.password);
    console.log(`\n🔐 Password Test:`);
    console.log(`   Testing password: "${testPassword}"`);
    console.log(`   Is valid: ${isValid}`);

    if (!isValid) {
      console.log('\n🔧 Fixing password...');
      const newHashedPassword = await bcrypt.hash('password', 12);
      
      await connection.execute(`
        UPDATE users 
        SET password = ? 
        WHERE email = 'rajesh.kumar@simats.edu'
      `, [newHashedPassword]);
      
      console.log('✅ Password updated successfully');
      console.log(`   New hash: ${newHashedPassword}`);
      
      // Verify the fix
      const isValidNow = await bcrypt.compare('password', newHashedPassword);
      console.log(`   Verification: ${isValidNow}`);
    }

    // Also check John Doe for comparison
    const [johnUsers] = await connection.execute(`
      SELECT email, password, first_name, last_name 
      FROM users 
      WHERE email = 'john.doe@simats.edu'
    `);

    if (johnUsers.length > 0) {
      const john = johnUsers[0];
      const johnPasswordValid = await bcrypt.compare('password', john.password);
      console.log(`\n👤 John Doe password test: ${johnPasswordValid}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

checkRajeshPassword();