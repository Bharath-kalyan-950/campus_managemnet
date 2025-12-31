// Create a helper function file for attendance summary updates
const helperContent = `
// Helper function to update attendance summary
async function updateAttendanceSummary(executeQuery, studentId, courseCode) {
  try {
    // Calculate correct attendance statistics
    const [stats] = await executeQuery(\`
      SELECT 
        COUNT(DISTINCT asess.session_id) as total_sessions,
        COUNT(CASE WHEN ar.attendance_status IN ('present', 'late') THEN 1 END) as attended_sessions,
        COUNT(CASE WHEN ar.attendance_status = 'late' THEN 1 END) as late_sessions,
        COUNT(CASE WHEN ar.attendance_status = 'excused' THEN 1 END) as excused_sessions
      FROM attendance_sessions asess
      LEFT JOIN attendance_records ar ON asess.session_id = ar.session_id AND ar.student_id = ?
      WHERE asess.course_code = ? AND asess.status = 'completed'
    \`, [studentId, courseCode]);

    const totalSessions = (stats[0] && stats[0].total_sessions) || 0;
    const attendedSessions = (stats[0] && stats[0].attended_sessions) || 0;
    const lateSessions = (stats[0] && stats[0].late_sessions) || 0;
    const excusedSessions = (stats[0] && stats[0].excused_sessions) || 0;
    const attendancePercentage = totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0;

    const summaryId = \`SUM_\${studentId}_\${courseCode}\`;

    // Delete existing record and insert new one to ensure clean update
    await executeQuery(\`
      DELETE FROM attendance_summary 
      WHERE student_id = ? AND course_code = ?
    \`, [studentId, courseCode]);

    await executeQuery(\`
      INSERT INTO attendance_summary 
      (summary_id, student_id, course_code, total_sessions, attended_sessions, late_sessions, excused_sessions, attendance_percentage, last_updated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    \`, [summaryId, studentId, courseCode, totalSessions, attendedSessions, lateSessions, excusedSessions, attendancePercentage]);

    return {
      success: true,
      data: {
        totalSessions,
        attendedSessions,
        attendancePercentage: attendancePercentage.toFixed(2)
      }
    };
  } catch (error) {
    console.error(\`Failed to update attendance summary for \${studentId} in \${courseCode}:\`, error);
    return { success: false, error: error.message };
  }
}

module.exports = { updateAttendanceSummary };
`;

require('fs').writeFileSync('lib/attendance-helper.js', helperContent);
console.log('✅ Created attendance helper function at lib/attendance-helper.js');
console.log('This helper ensures reliable attendance summary updates.');