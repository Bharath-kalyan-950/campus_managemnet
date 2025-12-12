import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/db.js';
import { verifyToken } from '../../../../lib/auth.js';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'faculty') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const courses = await executeQuery(`
      SELECT 
        c.course_code, c.course_name, c.credits, c.semester, c.year, c.course_type,
        COUNT(e.student_id) as enrolled_students
      FROM courses c
      LEFT JOIN enrollments e ON c.course_code = e.course_code AND e.faculty_id = ?
      WHERE EXISTS (
        SELECT 1 FROM enrollments e2 WHERE e2.course_code = c.course_code AND e2.faculty_id = ?
      )
      GROUP BY c.course_code, c.course_name, c.credits, c.semester, c.year, c.course_type
      ORDER BY c.course_code
    `, [decoded.faculty_id, decoded.faculty_id]);

    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error('Faculty courses fetch error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}