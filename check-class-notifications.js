const { executeQuery } = require('./lib/db.js');

async function checkClassNotifications() {
  try {
    const notifications = await executeQuery(`
      SELECT notification_id, recipient_id, title, created_at 
      FROM agent_notifications 
      WHERE title = '🏫 Class Schedule Update' 
      ORDER BY created_at DESC
    `);

    console.log('🏫 Class Schedule Update notifications:');
    notifications.forEach((n, i) => {
      console.log(`${i+1}. ID: ${n.notification_id} | Student: ${n.recipient_id} | Created: ${n.created_at}`);
    });

    // Check if they're for the same student
    const studentIds = [...new Set(notifications.map(n => n.recipient_id))];
    console.log(`\n📊 Unique students: ${studentIds.length}`);
    console.log(`📊 Total notifications: ${notifications.length}`);
    
    if (studentIds.length < notifications.length) {
      console.log('❌ DUPLICATES FOUND - Same student has multiple notifications');
      
      // Group by student
      const byStudent = {};
      notifications.forEach(n => {
        if (!byStudent[n.recipient_id]) byStudent[n.recipient_id] = [];
        byStudent[n.recipient_id].push(n);
      });
      
      Object.keys(byStudent).forEach(studentId => {
        const studentNotifs = byStudent[studentId];
        if (studentNotifs.length > 1) {
          console.log(`\n👨‍🎓 Student ${studentId} has ${studentNotifs.length} notifications:`);
          studentNotifs.forEach((n, i) => {
            console.log(`   ${i+1}. ${n.notification_id} - ${n.created_at}`);
          });
        }
      });
    } else {
      console.log('✅ No duplicates - Each notification is for a different student');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkClassNotifications();