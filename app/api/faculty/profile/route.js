import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/db.js';

// GET - Get faculty profile information
export async function GET(request) {
  try {
    // For now, use Daniel Wilson as default faculty
    // In a real app, this would come from session/JWT token
    const facultyId = 'FAC2024001';

    const facultyProfile = await executeQuery(`
      SELECT 
        f.faculty_id,
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        f.department,
        f.designation,
        f.office_room as office_location,
        f.specialization
      FROM faculty f
      JOIN users u ON f.user_id = u.id
      WHERE f.faculty_id = ?
    `, [facultyId]);

    if (facultyProfile.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Faculty profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: facultyProfile[0]
    });

  } catch (error) {
    console.error('Error fetching faculty profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch faculty profile' },
      { status: 500 }
    );
  }
}