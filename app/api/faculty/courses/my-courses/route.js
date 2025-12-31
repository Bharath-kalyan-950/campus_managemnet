import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../../lib/db.js';

// GET - Fetch courses created by the current faculty member
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get('faculty_id');

    if (!facultyId) {
      return NextResponse.json(
        { success: false, error: 'Faculty ID is required' },
        { status: 400 }
      );
    }

    // Get courses created by this faculty member
    const courses = await executeQuery(`
      SELECT 
        c.course_code,
        c.course_name,
        c.description,
        c.credits,
        c.slot,
        c.max_capacity,
        c.current_enrolled,
        c.created_at,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name
      FROM courses c
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      WHERE c.faculty_id = ?
      ORDER BY c.created_at DESC
    `, [facultyId]);

    return NextResponse.json({
      success: true,
      data: {
        courses: courses,
        total_courses: courses.length
      }
    });

  } catch (error) {
    console.error('Error fetching faculty courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}