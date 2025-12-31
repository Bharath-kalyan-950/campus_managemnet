import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/db.js';

// GET - Get student's course-wise attendance
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('student_id');
    const courseCode = searchParams.get('course_code');

    if (!studentId) {
      return NextResponse.json(
        { success: false, error: 'Student ID is required' },
        { status: 400 }
      );
    }

    if (courseCode) {
      // Get detailed attendance for a specific course
      const courseAttendance = await executeQuery(`
        SELECT 
          c.course_code,
          c.course_name,
          c.credits,
          COALESCE(CAST(assum.total_sessions AS SIGNED), 0) as total_sessions,
          COALESCE(CAST(assum.attended_sessions AS SIGNED), 0) as attended_sessions,
          COALESCE(CAST(assum.late_sessions AS SIGNED), 0) as late_sessions,
          COALESCE(CAST(assum.excused_sessions AS SIGNED), 0) as excused_sessions,
          COALESCE(CAST(assum.attendance_percentage AS DECIMAL(5,2)), 0.00) as attendance_percentage,
          CASE 
            WHEN COALESCE(assum.attendance_percentage, 0) >= 90 THEN 'Excellent'
            WHEN COALESCE(assum.attendance_percentage, 0) >= 80 THEN 'Good'
            WHEN COALESCE(assum.attendance_percentage, 0) >= 70 THEN 'Average'
            WHEN COALESCE(assum.attendance_percentage, 0) >= 60 THEN 'Below Average'
            ELSE 'Poor'
          END as attendance_grade,
          CASE 
            WHEN COALESCE(assum.attendance_percentage, 0) >= 75 THEN 'Eligible'
            ELSE 'Not Eligible'
          END as exam_eligibility
        FROM courses c
        LEFT JOIN attendance_summary assum ON c.course_code = assum.course_code AND assum.student_id = ?
        WHERE c.course_code = ?
      `, [studentId, courseCode]);

      // Get detailed session records for the course
      const sessionRecords = await executeQuery(`
        SELECT 
          asess.session_id,
          asess.session_date,
          asess.session_time,
          asess.session_topic,
          asess.session_type,
          asess.session_duration,
          ar.attendance_status,
          ar.marked_at,
          ar.notes
        FROM attendance_sessions asess
        LEFT JOIN attendance_records ar ON asess.session_id = ar.session_id AND ar.student_id = ?
        WHERE asess.course_code = ?
        ORDER BY asess.session_date DESC, asess.session_time DESC
      `, [studentId, courseCode]);

      return NextResponse.json({
        success: true,
        data: {
          course_details: courseAttendance[0] || null,
          session_records: sessionRecords,
          total_records: sessionRecords.length
        }
      });
    } else {
      // Get attendance summary for all enrolled courses
      const attendanceSummary = await executeQuery(`
        SELECT 
          c.course_code,
          c.course_name,
          c.credits,
          c.slot,
          COALESCE(CAST(assum.total_sessions AS SIGNED), 0) as total_sessions,
          COALESCE(CAST(assum.attended_sessions AS SIGNED), 0) as attended_sessions,
          COALESCE(CAST(assum.late_sessions AS SIGNED), 0) as late_sessions,
          COALESCE(CAST(assum.excused_sessions AS SIGNED), 0) as excused_sessions,
          COALESCE(CAST(assum.attendance_percentage AS DECIMAL(5,2)), 0.00) as attendance_percentage,
          CASE 
            WHEN COALESCE(assum.attendance_percentage, 0) >= 90 THEN 'Excellent'
            WHEN COALESCE(assum.attendance_percentage, 0) >= 80 THEN 'Good'
            WHEN COALESCE(assum.attendance_percentage, 0) >= 70 THEN 'Average'
            WHEN COALESCE(assum.attendance_percentage, 0) >= 60 THEN 'Below Average'
            ELSE 'Poor'
          END as attendance_grade,
          CASE 
            WHEN COALESCE(assum.attendance_percentage, 0) >= 75 THEN 'Eligible'
            ELSE 'Not Eligible'
          END as exam_eligibility,
          CONCAT(u.first_name, ' ', u.last_name) as faculty_name
        FROM enrollment_requests er
        JOIN courses c ON er.course_code = c.course_code
        LEFT JOIN attendance_summary assum ON er.student_id = assum.student_id AND assum.course_code = er.course_code
        LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
        LEFT JOIN users u ON f.user_id = u.id
        WHERE er.student_id = ? AND er.status IN ('enrolled', 'approved')
        ORDER BY c.course_code
      `, [studentId]);

      // Get overall attendance statistics
      const overallStats = await executeQuery(`
        SELECT 
          COUNT(DISTINCT er.course_code) as total_courses,
          COALESCE(SUM(CAST(assum.total_sessions AS SIGNED)), 0) as total_sessions,
          COALESCE(SUM(CAST(assum.attended_sessions AS SIGNED)), 0) as total_attended,
          COALESCE(AVG(CAST(assum.attendance_percentage AS DECIMAL(5,2))), 0) as overall_percentage,
          COUNT(CASE WHEN COALESCE(assum.attendance_percentage, 0) >= 75 THEN 1 END) as eligible_courses,
          COUNT(CASE WHEN COALESCE(assum.attendance_percentage, 0) < 75 THEN 1 END) as ineligible_courses
        FROM enrollment_requests er
        LEFT JOIN attendance_summary assum ON er.student_id = assum.student_id AND er.course_code = assum.course_code
        WHERE er.student_id = ? AND er.status IN ('enrolled', 'approved')
      `, [studentId]);

      return NextResponse.json({
        success: true,
        data: {
          courses: attendanceSummary,
          overall_stats: overallStats[0] || {
            total_courses: 0,
            total_sessions: 0,
            total_attended: 0,
            overall_percentage: 0,
            eligible_courses: 0,
            ineligible_courses: 0
          }
        }
      });
    }

  } catch (error) {
    console.error('Error fetching student attendance:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attendance data' },
      { status: 500 }
    );
  }
}