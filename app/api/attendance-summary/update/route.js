import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/db.js';

// POST - Update attendance summary for a student and course
export async function POST(request) {
  try {
    const { student_id, course_code } = await request.json();

    if (!student_id || !course_code) {
      return NextResponse.json(
        { success: false, error: 'Student ID and course code are required' },
        { status: 400 }
      );
    }

    console.log(`Updating attendance summary for ${student_id} in ${course_code}...`);

    // Calculate correct attendance statistics
    const stats = await executeQuery(`
      SELECT 
        COUNT(DISTINCT asess.session_id) as total_sessions,
        COUNT(CASE WHEN ar.attendance_status IN ('present', 'late') THEN 1 END) as attended_sessions,
        COUNT(CASE WHEN ar.attendance_status = 'late' THEN 1 END) as late_sessions,
        COUNT(CASE WHEN ar.attendance_status = 'excused' THEN 1 END) as excused_sessions
      FROM attendance_sessions asess
      LEFT JOIN attendance_records ar ON asess.session_id = ar.session_id AND ar.student_id = ?
      WHERE asess.course_code = ? AND asess.status = 'completed'
    `, [student_id, course_code]);

    console.log('Raw query result:', stats);
    console.log('First row:', stats[0]);

    const totalSessions = parseInt(stats[0]?.total_sessions) || 0;
    const attendedSessions = parseInt(stats[0]?.attended_sessions) || 0;
    const lateSessions = parseInt(stats[0]?.late_sessions) || 0;
    const excusedSessions = parseInt(stats[0]?.excused_sessions) || 0;
    const attendancePercentage = totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0;

    console.log(`Calculated stats: ${attendedSessions}/${totalSessions} (${attendancePercentage.toFixed(2)}%)`);

    // Delete existing record first
    await executeQuery(`
      DELETE FROM attendance_summary 
      WHERE student_id = ? AND course_code = ?
    `, [student_id, course_code]);

    // Insert new record
    const summaryId = `SUM_${student_id}_${course_code}`;
    await executeQuery(`
      INSERT INTO attendance_summary 
      (summary_id, student_id, course_code, total_sessions, attended_sessions, late_sessions, excused_sessions, attendance_percentage, last_updated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [summaryId, student_id, course_code, totalSessions, attendedSessions, lateSessions, excusedSessions, attendancePercentage]);

    console.log(`✅ Successfully updated attendance summary for ${student_id} in ${course_code}`);

    return NextResponse.json({
      success: true,
      data: {
        student_id,
        course_code,
        total_sessions: totalSessions,
        attended_sessions: attendedSessions,
        attendance_percentage: attendancePercentage.toFixed(2)
      }
    });

  } catch (error) {
    console.error('Error updating attendance summary:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update attendance summary' },
      { status: 500 }
    );
  }
}