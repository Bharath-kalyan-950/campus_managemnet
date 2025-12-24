const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function setupClassroomAgent() {
  let connection;
  
  try {
    // Create database connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'smart_campus_db',
      multipleStatements: true
    });

    console.log('🔗 Connected to database');

    // Read and execute the classroom allocation schema
    const schemaPath = path.join(__dirname, '..', 'database', 'classroom-allocation-schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf8');
    
    console.log('📋 Executing classroom allocation schema...');
    
    // Split the schema into individual statements and execute them one by one
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.execute(statement.trim());
        } catch (error) {
          // Skip errors for INSERT statements if data already exists
          if (!error.message.includes('Duplicate entry') && !statement.trim().startsWith('INSERT')) {
            throw error;
          }
        }
      }
    }
    
    console.log('✅ Classroom allocation tables created successfully');

    // Verify tables were created
    const [tables] = await connection.execute(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME IN ('classrooms', 'allocation_requests', 'classroom_allocations', 'agent_decisions', 'allocation_conflicts', 'agent_notifications', 'maintenance_schedule')
    `, [process.env.DB_NAME || 'smart_campus_db']);

    console.log('📊 Created tables:');
    tables.forEach(table => {
      console.log(`   ✓ ${table.TABLE_NAME}`);
    });

    // Check sample data
    const [roomCount] = await connection.execute('SELECT COUNT(*) as count FROM classrooms');
    console.log(`📍 Sample rooms created: ${roomCount[0].count}`);

    const [requestCount] = await connection.execute('SELECT COUNT(*) as count FROM allocation_requests');
    console.log(`📝 Sample requests created: ${requestCount[0].count}`);

    // Create some additional sample data for testing
    console.log('🎯 Creating additional test data...');
    
    // Add more sample requests (check if they don't exist first)
    try {
      await connection.execute(`
        INSERT IGNORE INTO allocation_requests (request_id, faculty_id, course_code, requested_date, start_time, end_time, expected_strength, required_equipment, purpose, priority, status) VALUES
        ('REQ004', 'FAC2024001', 'CS303', '2024-12-21', '09:00:00', '12:00:00', 25, '{"projector": true, "computers": 25}', 'Software Engineering Lab Session', 'high', 'pending'),
        ('REQ005', 'FAC2024001', 'CS305', '2024-12-22', '14:00:00', '16:00:00', 60, '{"projector": true, "audio_system": true, "computers": 60}', 'Machine Learning Workshop', 'medium', 'pending'),
        ('REQ006', 'FAC2024001', 'CS306', '2024-12-23', '10:00:00', '11:30:00', 40, '{"projector": true, "whiteboard": true}', 'Algorithms and Data Structures Lecture', 'medium', 'pending')
      `);
    } catch (error) {
      console.log('Sample requests may already exist, skipping...');
    }

    // Add some sample allocations (check if they don't exist first)
    try {
      await connection.execute(`
        INSERT IGNORE INTO classroom_allocations (allocation_id, room_id, faculty_id, course_code, allocated_date, start_time, end_time, status, allocation_type) VALUES
        ('ALLOC001', 'LH001', 'FAC2024001', 'CS301', '2024-12-18', '09:00:00', '10:30:00', 'scheduled', 'regular'),
        ('ALLOC002', 'LAB001', 'FAC2024001', 'CS302', '2024-12-18', '11:00:00', '12:30:00', 'scheduled', 'regular'),
        ('ALLOC003', 'LAB003', 'FAC2024001', 'CS303', '2024-12-18', '14:00:00', '17:00:00', 'scheduled', 'regular')
      `);
    } catch (error) {
      console.log('Sample allocations may already exist, skipping...');
    }

    // Add some sample notifications (check if they don't exist first)
    try {
      await connection.execute(`
        INSERT IGNORE INTO agent_notifications (notification_id, recipient_id, recipient_type, notification_type, title, message, related_allocation_id, priority) VALUES
        ('NOT001', 'FAC2024001', 'faculty', 'allocation_approved', 'Classroom Allocated', 'Your request for CS301 Database Management has been approved and allocated to LH001', 'ALLOC001', 'medium'),
        ('NOT002', 'FAC2024001', 'faculty', 'allocation_approved', 'Lab Allocated', 'Your request for CS302 Computer Networks has been approved and allocated to LAB001', 'ALLOC002', 'medium'),
        ('NOT003', 'STU2024001', 'student', 'room_changed', 'Room Update', 'Your CS301 class location has been confirmed: LH001 (Academic Block A)', 'ALLOC001', 'low')
      `);
    } catch (error) {
      console.log('Sample notifications may already exist, skipping...');
    }

    console.log('✅ Additional test data created');

    // Create indexes (ignore errors if they already exist)
    console.log('📊 Creating database indexes...');
    const indexes = [
      'CREATE INDEX idx_allocations_date_time ON classroom_allocations(allocated_date, start_time, end_time)',
      'CREATE INDEX idx_requests_date_time ON allocation_requests(requested_date, start_time, end_time)',
      'CREATE INDEX idx_classrooms_capacity ON classrooms(capacity)',
      'CREATE INDEX idx_classrooms_type ON classrooms(room_type)',
      'CREATE INDEX idx_maintenance_date ON maintenance_schedule(scheduled_date, start_time, end_time)'
    ];

    for (const indexSql of indexes) {
      try {
        await connection.execute(indexSql);
      } catch (error) {
        // Ignore duplicate key errors
        if (!error.message.includes('Duplicate key name')) {
          console.warn(`Warning creating index: ${error.message}`);
        }
      }
    }

    // Display summary
    console.log('\n🎉 Classroom Allocation Agent Setup Complete!');
    console.log('\n📋 System Components:');
    console.log('   🤖 AI Agent for automatic allocation');
    console.log('   👨‍💼 Admin dashboard for oversight');
    console.log('   👩‍🏫 Faculty request interface');
    console.log('   👨‍🎓 Student schedule viewer');
    console.log('   🔔 Real-time notifications');
    console.log('   📊 Utilization analytics');
    console.log('   ⚡ Conflict detection & resolution');

    console.log('\n🚀 Next Steps:');
    console.log('   1. Access Admin Dashboard: /dashboard/admin/classroom-agent');
    console.log('   2. Faculty Requests: /dashboard/faculty/classroom-request');
    console.log('   3. Student Schedule: /dashboard/student/classroom-schedule');
    console.log('   4. Test the AI agent with sample requests');

    console.log('\n🔧 API Endpoints Available:');
    console.log('   • GET/POST /api/classroom-agent/requests');
    console.log('   • GET/POST/PUT/DELETE /api/classroom-agent/allocations');
    console.log('   • GET/POST/PUT /api/classroom-agent/rooms');
    console.log('   • GET/POST /api/classroom-agent/dashboard');
    console.log('   • GET/POST/PUT /api/classroom-agent/notifications');

  } catch (error) {
    console.error('❌ Error setting up classroom agent:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the setup
if (require.main === module) {
  setupClassroomAgent()
    .then(() => {
      console.log('\n✨ Setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Setup failed:', error.message);
      process.exit(1);
    });
}

module.exports = { setupClassroomAgent };