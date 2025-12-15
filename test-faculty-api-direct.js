// Test the faculty profile API directly
const fetch = require('node-fetch');

async function testFacultyAPI() {
  try {
    console.log('🔍 TESTING FACULTY API ENDPOINTS');
    console.log('=' .repeat(50));

    // Step 1: Test login
    console.log('\n1️⃣ TESTING LOGIN API');
    console.log('=' .repeat(30));
    
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'daniel@simats.edu',
        password: 'password'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    if (!loginData.success) {
      console.log('❌ Login failed');
      return;
    }

    // Extract token from response
    const token = loginData.token;
    console.log(`✅ Login successful, token: ${token.substring(0, 50)}...`);

    // Step 2: Test profile API with token
    console.log('\n2️⃣ TESTING FACULTY PROFILE API');
    console.log('=' .repeat(30));
    
    const profileResponse = await fetch('http://localhost:3000/api/faculty/profile', {
      method: 'GET',
      headers: {
        'Cookie': `token=${token}`,
        'Authorization': `Bearer ${token}`
      }
    });

    const profileData = await profileResponse.json();
    console.log('Profile response:', profileData);

    if (profileData.success) {
      console.log('✅ Profile API successful');
      console.log(`   Name: ${profileData.data.first_name} ${profileData.data.last_name}`);
      console.log(`   Faculty ID: ${profileData.data.faculty_id}`);
      console.log(`   Department: ${profileData.data.department}`);
    } else {
      console.log('❌ Profile API failed:', profileData.message);
    }

    console.log('\n✅ API testing completed!');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('\n💡 Make sure the Next.js server is running on localhost:3000');
    console.log('   Run: npm run dev');
  }
}

testFacultyAPI();