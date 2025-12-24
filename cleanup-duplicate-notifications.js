const { executeQuery } = require('./lib/db.js');

async function cleanupDuplicateNotifications() {
  try {
    console.log('🧹 Cleaning up duplicate notifications...\n');

    // Find and remove duplicate notifications
    // Keep the latest notification for each unique combination of recipient, type, and title
    
    console.log('1. 🔍 Finding duplicates...');
    
    // Get all notifications grouped by recipient, type, title, and message (first 100 chars)
    const duplicates = await executeQuery(`
      SELECT 
        recipient_id, 
        recipient_type, 
        notification_type, 
        title,
        LEFT(message, 100) as message_prefix,
        COUNT(*) as count,
        GROUP_CONCAT(notification_id ORDER BY created_at DESC) as notification_ids,
        GROUP_CONCAT(created_at ORDER BY created_at DESC) as created_dates
      FROM agent_notifications 
      WHERE created_at > DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY recipient_id, recipient_type, notification_type, title, LEFT(message, 100)
      HAVING COUNT(*) > 1
    `);

    console.log(`   Found ${duplicates.length} groups of duplicates\n`);

    let totalDeleted = 0;

    for (const duplicate of duplicates) {
      const notificationIds = duplicate.notification_ids.split(',');
      const createdDates = duplicate.created_dates.split(',');
      
      console.log(`📋 Duplicate group: ${duplicate.title} (${duplicate.recipient_type})`);
      console.log(`   Count: ${duplicate.count}`);
      console.log(`   Keeping latest: ${notificationIds[0]} (${createdDates[0]})`);
      
      // Keep the first (latest) notification, delete the rest
      const toDelete = notificationIds.slice(1);
      
      if (toDelete.length > 0) {
        console.log(`   Deleting ${toDelete.length} duplicates: ${toDelete.join(', ')}`);
        
        // Delete duplicate notifications
        const placeholders = toDelete.map(() => '?').join(',');
        await executeQuery(
          `DELETE FROM agent_notifications WHERE notification_id IN (${placeholders})`,
          toDelete
        );
        
        totalDeleted += toDelete.length;
      }
      console.log('');
    }

    console.log(`✅ Cleanup complete! Deleted ${totalDeleted} duplicate notifications.\n`);

    // Show remaining notification counts
    console.log('📊 Remaining notification counts:');
    const counts = await executeQuery(`
      SELECT 
        recipient_type,
        notification_type,
        COUNT(*) as count
      FROM agent_notifications 
      WHERE created_at > DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY recipient_type, notification_type
      ORDER BY recipient_type, notification_type
    `);

    counts.forEach(count => {
      console.log(`   ${count.recipient_type} - ${count.notification_type || 'null'}: ${count.count}`);
    });

    console.log('\n🎉 Duplicate cleanup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupDuplicateNotifications();