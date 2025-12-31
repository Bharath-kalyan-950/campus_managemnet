import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/db.js';

// GET - Get student's enrolled courses
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('student_id') || 'STU2024002'; // Default for development

    // Get all enrolled courses for the student
    const courses = await executeQuery(`
      SELECT 
        c.course_code,
        c.course_name,
        c.credits,
        c.slot,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name,
        er.status as enrollment_status,
        er.request_date as enrolled_date
      FROM enrollment_requests er
      JOIN courses c ON er.course_code = c.course_code
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      WHERE er.student_id = ? AND er.status IN ('enrolled', 'approved')
      ORDER BY c.course_code
    `, [studentId]);

    return NextResponse.json({
      success: true,
      data: {
        courses: courses,
        total_courses: courses.length
      }
    });

  } catch (error) {
    console.error('Error fetching student courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}