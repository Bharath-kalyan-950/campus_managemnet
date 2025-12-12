const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 12);
  console.log(`Password: ${password}`);
  console.log(`Hashed: ${hash}`);
  console.log('');
  return hash;
}

async function generateHashes() {
  console.log('=== Password Hash Generator ===\n');
  
  // Generate hashes for default passwords
  await hashPassword('password');
  await hashPassword('admin123');
  await hashPassword('faculty123');
  await hashPassword('student123');
  
  console.log('Copy these hashes to your SQL INSERT statements');
  console.log('Example:');
  console.log("INSERT INTO users (email, password, ...) VALUES ('user@email.com', 'PASTE_HASH_HERE', ...)");
}

// If password provided as argument
if (process.argv[2]) {
  hashPassword(process.argv[2]);
} else {
  generateHashes();
}

// Usage: node scripts/hash-password.js [password]
// Example: node scripts/hash-password.js mypassword123