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

    const { searchParams } = new URL(request.url);
    const courseCode = searchParams.get('course_code');

    let query = `
      SELECT DISTINCT
        s.student_id, 
        CONCAT(u.first_name, ' ', u.last_name) as student_name,
        u.email, u.phone,
        s.department, s.year, s.semester, s.cgpa,
        c.course_code, c.course_name
      FROM students s
      JOIN users u ON s.user_id = u.id
      JOIN enrollments e ON s.student_id = e.student_id
      JOIN courses c ON e.course_code = c.course_code
      WHERE e.faculty_id = ?
    `;
    
    const params = [decoded.faculty_id];
    
    if (courseCode) {
      query += ' AND c.course_code = ?';
      params.push(courseCode);
    }
    
    query += ' ORDER BY s.student_id';

    const students = await executeQuery(query, params);

    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    console.error('Faculty students fetch error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}