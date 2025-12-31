import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/db.js';

// GET - Get enrolled students for a specific course
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseCode = searchParams.get('course_code');
    const facultyId = searchParams.get('faculty_id');

    if (!courseCode || !facultyId) {
      return NextResponse.json(
        { success: false, error: 'Course code and faculty ID are required' },
        { status: 400 }
      );
    }

    // Verify that the course belongs to the faculty
    const courseCheck = await executeQuery(`
      SELECT course_code FROM courses 
      WHERE course_code = ? AND faculty_id = ?
    `, [courseCode, facultyId]);

    if (courseCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Course not found or access denied' },
        { status: 403 }
      );
    }

    // Get enrolled students for the course
    const enrolledStudents = await executeQuery(`
      SELECT 
        s.student_id,
        CONCAT(u.first_name, ' ', u.last_name) as student_name,
        u.email,
        er.request_date,
        er.slot,
        COALESCE(CAST(assum.attendance_percentage AS DECIMAL(5,2)), 0.00) as attendance_percentage,
        COALESCE(assum.total_sessions, 0) as total_sessions,
        COALESCE(assum.attended_sessions, 0) as attended_sessions
      FROM enrollment_requests er
      JOIN students s ON er.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      LEFT JOIN attendance_summary assum ON s.student_id = assum.student_id AND assum.course_code = er.course_code
      WHERE er.course_code = ? AND er.status IN ('enrolled', 'approved')
      ORDER BY u.first_name, u.last_name
    `, [courseCode]);

    return NextResponse.json({
      success: true,
      data: enrolledStudents,
      total_students: enrolledStudents.length
    });

  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch enrolled students' },
      { status: 500 }
    );
  }
}