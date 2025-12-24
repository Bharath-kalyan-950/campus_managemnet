const { executeQuery } = require('./lib/db.js');

async function simpleDuplicateCleanup() {
  try {
    console.log('🧹 Simple duplicate cleanup...\n');

    // Find notifications with same title and recipient created within 1 minute of each other
    console.log('1. 🔍 Finding recent duplicates...');
    
    const duplicates = await executeQuery(`
      SELECT 
        title,
        recipient_id,
        recipient_type,
        COUNT(*) as count,
        GROUP_CONCAT(notification_id ORDER BY created_at DESC) as notification_ids,
        MIN(created_at) as first_created,
        MAX(created_at) as last_created
      FROM agent_notifications 
      WHERE title = '🏫 Class Schedule Update'
      AND recipient_type = 'student'
      GROUP BY title, recipient_id, recipient_type
      HAVING COUNT(*) > 1
    `);

    console.log(`   Found ${duplicates.length} duplicate groups\n`);

    let totalDeleted = 0;

    for (const duplicate of duplicates) {
      const notificationIds = duplicate.notification_ids.split(',');
      
      console.log(`📋 Duplicate: ${duplicate.title} for student ${duplicate.recipient_id}`);
      console.log(`   Count: ${duplicate.count}`);
      console.log(`   IDs: ${duplicate.notification_ids}`);
      
      // Keep the first (latest) notification, delete the rest
      const toDelete = notificationIds.slice(1);
      
      if (toDelete.length > 0) {
        console.log(`   Keeping: ${notificationIds[0]}`);
        console.log(`   Deleting: ${toDelete.join(', ')}`);
        
        // Delete duplicate notifications
        for (const id of toDelete) {
          await executeQuery('DELETE FROM agent_notifications WHERE notification_id = ?', [id]);
        }
        
        totalDeleted += toDelete.length;
      }
      console.log('');
    }

    console.log(`✅ Deleted ${totalDeleted} duplicate notifications.\n`);

    // Show current counts
    console.log('📊 Current notification counts:');
    const counts = await executeQuery(`
      SELECT 
        recipient_type,
        title,
        COUNT(*) as count
      FROM agent_notifications 
      GROUP BY recipient_type, title
      ORDER BY recipient_type, count DESC
    `);

    counts.forEach(count => {
      console.log(`   ${count.recipient_type}: "${count.title}" - ${count.count}`);
    });

    console.log('\n🎉 Cleanup completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

simpleDuplicateCleanup();