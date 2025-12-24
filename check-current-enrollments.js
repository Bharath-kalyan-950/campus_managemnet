const mysql = require('mysql2/promise');

async function checkCurrentEnrollments() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_campus_db'
  });

  console.log('📊 Current Enrollment Status Check\n');

  try {
    // 1. Check all pending requests by slot
    console.log('1️⃣ All Pending Requests by Slot:');
    const slots = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    for (const slot of slots) {
      const [requests] = await connection.execute(`
        SELECT 
          er.student_id,
          CONCAT(us.first_name, ' ', us.last_name) as student_name,
          er.course_code,
          c.course_name,
          er.status,
          er.request_date
        FROM enrollment_requests er
        JOIN courses c ON er.course_code = c.course_code
        JOIN students s ON er.student_id = s.student_id
        JOIN users us ON s.user_id = us.id
        WHERE er.slot = ? AND er.faculty_id = 'FAC2024001'
        ORDER BY er.request_date DESC
      `, [slot]);

      if (requests.length > 0) {
        console.log(`\n   📍 Slot ${slot}: ${requests.length} requests`);
        requests.forEach(req => {
          const statusIcon = req.status === 'pending' ? '⏳' : req.status === 'approved' ? '✅' : '❌';
          console.log(`     ${statusIcon} ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.course_name}`);
          console.log(`        Status: ${req.status.toUpperCase()}, Date: ${new Date(req.request_date).toLocaleString()}`);
        });
      } else {
        console.log(`\n   📍 Slot ${slot}: No requests`);
      }
    }

    // 2. Check what Rajesh specifically enrolled in
    console.log('\n\n2️⃣ Rajesh (STU2024002) Enrollment History:');
    const [rajeshHistory] = await connection.execute(`
      SELECT 
        er.course_code,
        c.course_name,
        er.slot,
        er.status,
        er.request_date,
        er.processed_at
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      WHERE er.student_id = 'STU2024002'
      ORDER BY er.request_date DESC
    `);

    if (rajeshHistory.length === 0) {
      console.log('   ❌ No enrollment history found for Rajesh');
    } else {
      console.log(`   Found ${rajeshHistory.length} enrollment records for Rajesh:`);
      rajeshHistory.forEach((record, index) => {
        const statusIcon = record.status === 'pending' ? '⏳' : record.status === 'approved' ? '✅' : '❌';
        console.log(`   ${index + 1}. ${statusIcon} ${record.course_code} - ${record.course_name} [Slot ${record.slot}]`);
        console.log(`      Status: ${record.status.toUpperCase()}`);
        console.log(`      Requested: ${new Date(record.request_date).toLocaleString()}`);
        if (record.processed_at) {
          console.log(`      Processed: ${new Date(record.processed_at).toLocaleString()}`);
        }
        console.log('');
      });
    }

    // 3. Check what Daniel should see in each slot filter
    console.log('3️⃣ Faculty Portal View by Slot Filter:');
    
    for (const slot of ['A', 'B', 'C']) {
      const [slotRequests] = await connection.execute(`
        SELECT 
          er.request_id,
          er.student_id,
          CONCAT(us.first_name, ' ', us.last_name) as student_name,
          er.course_code,
          c.course_name,
          er.status
        FROM enrollment_requests er
        JOIN courses c ON er.course_code = c.course_code
        JOIN students s ON er.student_id = s.student_id
        JOIN users us ON s.user_id = us.id
        WHERE er.faculty_id = 'FAC2024001' AND er.slot = ? AND er.status = 'pending'
        ORDER BY er.request_date DESC
      `, [slot]);

      console.log(`\n   🎯 When Daniel filters by "Slot ${slot}":`);
      if (slotRequests.length === 0) {
        console.log('     ❌ No pending requests (shows "No data available in table")');
      } else {
        console.log(`     ✅ Should show ${slotRequests.length} pending requests:`);
        slotRequests.forEach(req => {
          console.log(`       📝 ${req.student_name} (${req.student_id}) → ${req.course_code} - ${req.course_name}`);
        });
      }
    }

    console.log('\n\n🎯 SUMMARY:');
    console.log('   📍 Rajesh enrolled in: Check the enrollment history above');
    console.log('   👀 Daniel should look in: The slot where Rajesh actually enrolled');
    console.log('   🔍 To find Rajesh\'s request: Use "All Courses" filter or the correct slot filter');

  } catch (error) {
    console.error('❌ Check failed:', error);
  } finally {
    await connection.end();
  }
}

checkCurrentEnrollments();