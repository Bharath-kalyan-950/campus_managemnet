const { executeQuery } = require('./lib/db.js');
const fs = require('fs');
const path = require('path');

async function setupODRequests() {
  console.log('🔧 Setting up OD Requests system...');
  
  try {
    // Read and execute the schema
    const schemaPath = path.join(__dirname, 'database', 'od-requests-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await executeQuery(statement.trim());
        console.log('✅ Executed SQL statement');
      }
    }
    
    console.log('🎉 OD Requests system setup completed successfully!');
    
    // Verify the setup
    const testQuery = await executeQuery('SELECT COUNT(*) as count FROM od_requests');
    console.log(`📊 Total OD requests in database: ${testQuery[0].count}`);
    
    // Show sample data
    const sampleRequests = await executeQuery(`
      SELECT request_id, course_code, od_date, od_type, status 
      FROM od_requests 
      ORDER BY requested_at DESC 
      LIMIT 5
    `);
    
    console.log('\n📋 Sample OD Requests:');
    sampleRequests.forEach(req => {
      console.log(`  - ${req.request_id}: ${req.course_code} on ${req.od_date} (${req.status})`);
    });
    
  } catch (error) {
    console.error('❌ Error setting up OD Requests:', error);
  }
}

setupODRequests();