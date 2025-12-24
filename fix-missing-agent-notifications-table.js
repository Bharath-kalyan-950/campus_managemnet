const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smart_campus_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

async function executeQuery(query, params = []) {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [results] = await connection.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

async function createAgentNotificationsTable() {
  console.log('🔧 CREATING MISSING AGENT_NOTIFICATIONS TABLE');
  console.log('==============================================\n');

  try {
    // Create the agent_notifications table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS agent_notifications (
          id INT PRIMARY KEY AUTO_INCREMENT,
          notification_id VARCHAR(20) UNIQUE NOT NULL,
          recipient_id VARCHAR(20) NOT NULL,
          recipient_type ENUM('admin', 'faculty', 'student') NOT NULL,
          notification_type ENUM('allocation_approved', 'allocation_rejected', 'room_changed', 'conflict_detected', 'maintenance_alert') NOT NULL,
          title VARCHAR(200) NOT NULL,
          message TEXT NOT NULL,
          related_allocation_id VARCHAR(20),
          related_request_id VARCHAR(20),
          priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
          is_read BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          read_at TIMESTAMP NULL
      )
    `;

    await executeQuery(createTableSQL);
    console.log('✅ agent_notifications table created successfully');

    // Insert some sample notifications for testing
    const sampleNotifications = [
      {
        notification_id: 'NOT_' + Date.now() + '_1',
        recipient_id: 'FAC2024001',
        recipient_type: 'faculty',
        notification_type: 'allocation_approved',
        title: 'Classroom Allocation Approved',
        message: 'Your classroom request for CS301 has been approved for Room LH001',
        priority: 'medium'
      },
      {
        notification_id: 'NOT_' + Date.now() + '_2',
        recipient_id: 'FAC2024001',
        recipient_type: 'faculty',
        notification_type: 'conflict_detected',
        title: 'Schedule Conflict Detected',
        message: 'There is a potential conflict with your CS302 class timing',
        priority: 'high'
      }
    ];

    for (const notification of sampleNotifications) {
      await executeQuery(`
        INSERT INTO agent_notifications 
        (notification_id, recipient_id, recipient_type, notification_type, title, message, priority)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        notification.notification_id,
        notification.recipient_id,
        notification.recipient_type,
        notification.notification_type,
        notification.title,
        notification.message,
        notification.priority
      ]);
    }

    console.log('✅ Sample notifications inserted');

    // Verify the table was created and populated
    const count = await executeQuery('SELECT COUNT(*) as count FROM agent_notifications');
    console.log(`📊 agent_notifications table now has ${count[0].count} records`);

    console.log('\n✅ AGENT_NOTIFICATIONS TABLE SETUP COMPLETE');

  } catch (error) {
    console.error('❌ Error creating agent_notifications table:', error);
  }
}

createAgentNotificationsTable();