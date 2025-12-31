import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/db.js';

// GET - Get faculty's courses and attendance sessions
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get('faculty_id');
    const courseCode = searchParams.get('course_code');
    const sessionId = searchParams.get('session_id');

    if (!facultyId) {
      return NextResponse.json(
        { success: false, error: 'Faculty ID is required' },
        { status: 400 }
      );
    }

    if (sessionId) {
      // Get specific session details with student attendance
      const sessionDetails = await executeQuery(`
        SELECT 
          asess.*,
          c.course_name,
          CONCAT(u.first_name, ' ', u.last_name) as faculty_name
        FROM attendance_sessions asess
        JOIN courses c ON asess.course_code = c.course_code
        JOIN faculty f ON asess.faculty_id = f.faculty_id
        JOIN users u ON f.user_id = u.id
        WHERE asess.session_id = ? AND asess.faculty_id = ?
      `, [sessionId, facultyId]);

      if (sessionDetails.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Session not found or access denied' },
          { status: 404 }
        );
      }

      // Get enrolled students with their attendance status for this session
      const studentsAttendance = await executeQuery(`
        SELECT 
          s.student_id,
          CONCAT(u.first_name, ' ', u.last_name) as student_name,
          u.email,
          er.request_date,
          COALESCE(ar.attendance_status, 'absent') as attendance_status,
          ar.marked_at,
          ar.notes,
          ar.record_id
        FROM enrollment_requests er
        JOIN students s ON er.student_id = s.student_id
        JOIN users u ON s.user_id = u.id
        LEFT JOIN attendance_records ar ON s.student_id = ar.student_id AND ar.session_id = ?
        WHERE er.course_code = ? AND er.status IN ('enrolled', 'approved')
        ORDER BY u.first_name, u.last_name
      `, [sessionId, sessionDetails[0].course_code]);

      return NextResponse.json({
        success: true,
        data: {
          session: sessionDetails[0],
          students: studentsAttendance,
          total_students: studentsAttendance.length,
          present_count: studentsAttendance.filter(s => s.attendance_status === 'present').length,
          absent_count: studentsAttendance.filter(s => s.attendance_status === 'absent').length,
          late_count: studentsAttendance.filter(s => s.attendance_status === 'late').length
        }
      });
    } else if (courseCode) {
      // Get sessions for a specific course
      const sessions = await executeQuery(`
        SELECT 
          asess.*,
          c.course_name,
          COUNT(DISTINCT er.student_id) as enrolled_students
        FROM attendance_sessions asess
        JOIN courses c ON asess.course_code = c.course_code
        LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.status = 'enrolled'
        WHERE asess.course_code = ? AND asess.faculty_id = ?
        GROUP BY asess.session_id
        ORDER BY asess.session_date DESC, asess.session_time DESC
      `, [courseCode, facultyId]);

      return NextResponse.json({
        success: true,
        data: {
          sessions: sessions,
          total_sessions: sessions.length
        }
      });
    } else {
      // Get all courses taught by faculty with attendance summary
      const courses = await executeQuery(`
        SELECT 
          c.course_code,
          c.course_name,
          c.credits,
          c.slot,
          c.max_capacity,
          c.current_enrolled,
          COUNT(DISTINCT asess.session_id) as total_sessions,
          COUNT(DISTINCT CASE WHEN asess.status = 'completed' THEN asess.session_id END) as completed_sessions,
          AVG(asess.attendance_percentage) as avg_attendance_percentage,
          COUNT(DISTINCT er.student_id) as enrolled_students
        FROM courses c
        LEFT JOIN attendance_sessions asess ON c.course_code = asess.course_code
        LEFT JOIN enrollment_requests er ON c.course_code = er.course_code AND er.status IN ('enrolled', 'approved')
        WHERE c.faculty_id = ?
        GROUP BY c.course_code
        ORDER BY c.course_code
      `, [facultyId]);

      return NextResponse.json({
        success: true,
        data: {
          courses: courses,
          total_courses: courses.length
        }
      });
    }

  } catch (error) {
    console.error('Error fetching faculty attendance data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attendance data' },
      { status: 500 }
    );
  }
}

// POST - Create new attendance session or mark attendance
export async function POST(request) {
  try {
    const { action, ...data } = await request.json();

    if (action === 'create_session') {
      // Create new attendance session
      const { faculty_id, course_code, session_date, session_time, session_topic, session_type, session_duration } = data;

      if (!faculty_id || !course_code || !session_date || !session_time) {
        return NextResponse.json(
          { success: false, error: 'Missing required fields for session creation' },
          { status: 400 }
        );
      }

      // Generate session ID
      const sessionId = `SESS_${course_code}_${Date.now()}`;

      // Get enrolled students count
      const [enrolledCount] = await executeQuery(`
        SELECT COUNT(*) as count 
        FROM enrollment_requests 
        WHERE course_code = ? AND status IN ('enrolled', 'approved')
      `, [course_code]);

      // Create session
      await executeQuery(`
        INSERT INTO attendance_sessions 
        (session_id, course_code, faculty_id, session_date, session_time, session_topic, session_type, session_duration, total_students, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'scheduled')
      `, [sessionId, course_code, faculty_id, session_date, session_time, session_topic || 'Class Session', session_type || 'lecture', session_duration || 60, enrolledCount.count]);

      return NextResponse.json({
        success: true,
        data: {
          session_id: sessionId,
          message: 'Attendance session created successfully'
        }
      });

    } else if (action === 'mark_attendance') {
      // Mark attendance for students
      const { session_id, faculty_id, attendance_data } = data;

      if (!session_id || !faculty_id || !attendance_data || !Array.isArray(attendance_data)) {
        return NextResponse.json(
          { success: false, error: 'Invalid attendance data' },
          { status: 400 }
        );
      }

      // Verify session belongs to faculty
      const session = await executeQuery(`
        SELECT course_code FROM attendance_sessions 
        WHERE session_id = ? AND faculty_id = ?
      `, [session_id, faculty_id]);

      if (session.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Session not found or access denied' },
          { status: 403 }
        );
      }

      const courseCode = session[0].course_code;
      let markedCount = 0;
      let presentCount = 0;

      // Process each student's attendance
      for (const studentAttendance of attendance_data) {
        const { student_id, attendance_status, notes } = studentAttendance;
        
        if (!student_id || !attendance_status) continue;

        const recordId = `REC_${session_id}_${student_id}`;
        const markedAt = attendance_status !== 'absent' ? new Date() : null;

        // Insert or update attendance record
        await executeQuery(`
          INSERT INTO attendance_records 
          (record_id, session_id, student_id, course_code, attendance_status, marked_at, marked_by, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
          attendance_status = VALUES(attendance_status),
          marked_at = VALUES(marked_at),
          marked_by = VALUES(marked_by),
          notes = VALUES(notes),
          updated_at = CURRENT_TIMESTAMP
        `, [recordId, session_id, student_id, courseCode, attendance_status, markedAt, faculty_id, notes || null]);

        markedCount++;
        if (attendance_status === 'present' || attendance_status === 'late') {
          presentCount++;
        }
      }

      // Update session statistics
      const attendancePercentage = attendance_data.length > 0 ? (presentCount / attendance_data.length) * 100 : 0;
      
      await executeQuery(`
        UPDATE attendance_sessions 
        SET present_students = ?, 
            attendance_percentage = ?, 
            status = 'completed',
            updated_at = CURRENT_TIMESTAMP
        WHERE session_id = ?
      `, [presentCount, attendancePercentage, session_id]);

      // Update attendance summary for each student using reliable logic
      for (const studentAttendance of attendance_data) {
        const { student_id } = studentAttendance;
        
        try {
          console.log(`Updating attendance summary for ${student_id} in ${courseCode}...`);
          
          // Calculate correct attendance statistics using the same query as the working dedicated API
          const stats = await executeQuery(`
            SELECT 
              COUNT(DISTINCT asess.session_id) as total_sessions,
              COUNT(CASE WHEN ar.attendance_status IN ('present', 'late') THEN 1 END) as attended_sessions,
              COUNT(CASE WHEN ar.attendance_status = 'late' THEN 1 END) as late_sessions,
              COUNT(CASE WHEN ar.attendance_status = 'excused' THEN 1 END) as excused_sessions
            FROM attendance_sessions asess
            LEFT JOIN attendance_records ar ON asess.session_id = ar.session_id AND ar.student_id = ?
            WHERE asess.course_code = ? AND asess.status = 'completed'
          `, [student_id, courseCode]);

          console.log('Raw query result:', stats);
          console.log('First row:', stats[0]);

          const totalSessions = parseInt(stats[0]?.total_sessions) || 0;
          const attendedSessions = parseInt(stats[0]?.attended_sessions) || 0;
          const lateSessions = parseInt(stats[0]?.late_sessions) || 0;
          const excusedSessions = parseInt(stats[0]?.excused_sessions) || 0;
          const attendancePercentage = totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0;

          console.log(`Calculated stats: ${attendedSessions}/${totalSessions} (${attendancePercentage.toFixed(2)}%)`);

          // Delete existing record first to ensure clean update
          await executeQuery(`
            DELETE FROM attendance_summary 
            WHERE student_id = ? AND course_code = ?
          `, [student_id, courseCode]);

          // Insert new record
          const summaryId = `SUM_${student_id}_${courseCode}`;
          await executeQuery(`
            INSERT INTO attendance_summary 
            (summary_id, student_id, course_code, total_sessions, attended_sessions, late_sessions, excused_sessions, attendance_percentage, last_updated)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
          `, [summaryId, student_id, courseCode, totalSessions, attendedSessions, lateSessions, excusedSessions, attendancePercentage]);

          console.log(`✅ Successfully updated attendance summary for ${student_id} in ${courseCode}: ${attendedSessions}/${totalSessions} (${attendancePercentage.toFixed(2)}%)`);
          
        } catch (summaryError) {
          console.error(`❌ Failed to update attendance summary for ${student_id} in ${courseCode}:`, summaryError);
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          marked_students: markedCount,
          present_students: presentCount,
          attendance_percentage: attendancePercentage.toFixed(2),
          message: 'Attendance marked successfully'
        }
      });

    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error processing attendance request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process attendance request' },
      { status: 500 }
    );
  }
}