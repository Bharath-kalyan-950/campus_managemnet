const { executeQuery } = require('./lib/db.js');

async function checkDuplicateNotifications() {
  try {
    console.log('🔍 Checking for duplicate notifications...\n');

    // Get all notifications
    const notifications = await executeQuery(`
      SELECT notification_id, title, message, created_at, recipient_type, recipient_id
      FROM agent_notifications 
      ORDER BY created_at DESC 
      LIMIT 20
    `);

    console.log(`📊 Total recent notifications: ${notifications.length}\n`);

    // Group by title and message to find duplicates
    const grouped = {};
    notifications.forEach(notif => {
      const key = `${notif.title}|${notif.message.substring(0, 50)}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(notif);
    });

    // Find duplicates
    console.log('🔍 Duplicate Analysis:');
    Object.keys(grouped).forEach(key => {
      const group = grouped[key];
      if (group.length > 1) {
        console.log(`\n❌ DUPLICATE FOUND (${group.length} copies):`);
        console.log(`   Title: ${group[0].title}`);
        console.log(`   Type: ${group[0].recipient_type}`);
        console.log(`   Copies:`);
        group.forEach((notif, i) => {
          console.log(`      ${i+1}. ID: ${notif.notification_id} | Created: ${notif.created_at}`);
        });
      }
    });

    // Check for student notifications specifically
    console.log('\n👨‍🎓 Student Notifications:');
    const studentNotifs = notifications.filter(n => n.recipient_type === 'student');
    console.log(`   Count: ${studentNotifs.length}`);
    studentNotifs.forEach((notif, i) => {
      console.log(`   ${i+1}. ${notif.title} - ${notif.created_at}`);
    });

    // Check for faculty notifications specifically
    console.log('\n👨‍🏫 Faculty Notifications:');
    const facultyNotifs = notifications.filter(n => n.recipient_type === 'faculty');
    console.log(`   Count: ${facultyNotifs.length}`);
    facultyNotifs.forEach((notif, i) => {
      console.log(`   ${i+1}. ${notif.title} - ${notif.created_at}`);
    });

    // Check for same course notifications
    console.log('\n🏫 Classroom Notifications by Course:');
    const classroomNotifs = notifications.filter(n => 
      n.title.includes('Class Schedule') || 
      n.title.includes('Classroom') ||
      n.message.includes('CS301') ||
      n.message.includes('CS302')
    );
    
    const courseGroups = {};
    classroomNotifs.forEach(notif => {
      const courseMatch = notif.message.match(/CS\d+/);
      const course = courseMatch ? courseMatch[0] : 'Unknown';
      if (!courseGroups[course]) courseGroups[course] = [];
      courseGroups[course].push(notif);
    });

    Object.keys(courseGroups).forEach(course => {
      console.log(`   ${course}: ${courseGroups[course].length} notifications`);
      courseGroups[course].forEach((notif, i) => {
        console.log(`      ${i+1}. ${notif.recipient_type} - ${notif.created_at}`);
      });
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkDuplicateNotifications();