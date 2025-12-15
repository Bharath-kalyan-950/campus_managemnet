// Simple test script to verify API endpoints
const testAPIs = async () => {
  const baseUrl = 'http://localhost:3000';
  
  // Test endpoints
  const endpoints = [
    '/api/student/examinations',
    '/api/student/fees',
    '/api/student/placement',
    '/api/student/disciplinary',
    '/api/student/feedback'
  ];

  console.log('Testing API endpoints...\n');

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint}...`);
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          'Cookie': 'token=test-token' // This would need a real token
        }
      });
      
      const data = await response.json();
      console.log(`Status: ${response.status}`);
      console.log(`Response: ${JSON.stringify(data, null, 2)}\n`);
    } catch (error) {
      console.error(`Error testing ${endpoint}:`, error.message);
    }
  }
};

// Run if this file is executed directly
if (require.main === module) {
  testAPIs();
}

module.exports = { testAPIs };