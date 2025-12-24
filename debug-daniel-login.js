// Test Daniel login and check what gets stored
const http = require('http');

function loginDaniel() {
  console.log('🔍 Testing Daniel login...');
  
  const postData = JSON.stringify({
    email: 'daniel@simats.edu',
    password: 'password'
  });
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`📊 Login Status: ${res.statusCode}`);
      try {
        const jsonData = JSON.parse(data);
        console.log(`📊 Login Response:`, JSON.stringify(jsonData, null, 2));
        
        if (jsonData.success && jsonData.user) {
          console.log('\n✅ LOGIN SUCCESSFUL');
          console.log('👤 User data that should be stored in localStorage:');
          console.log('   - ID:', jsonData.user.id);
          console.log('   - User ID:', jsonData.user.user_id);
          console.log('   - Registration Number:', jsonData.user.registration_number);
          console.log('   - Email:', jsonData.user.email);
          console.log('   - Role:', jsonData.user.role);
          console.log('   - Faculty ID:', jsonData.user.faculty_id);
          console.log('   - First Name:', jsonData.user.first_name);
          console.log('   - Last Name:', jsonData.user.last_name);
        }
      } catch (e) {
        console.log(`📊 Raw Response:`, data);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`❌ Error: ${error.message}`);
  });

  req.write(postData);
  req.end();
}

loginDaniel();