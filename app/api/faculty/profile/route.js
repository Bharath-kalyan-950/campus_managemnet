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



    // Use registration number for direct lookup - simpler and faster
    const registrationNumber = decoded.registration_number || decoded.faculty_id;
    
    const profile = await executeQuery(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        f.faculty_id, f.department, f.designation, f.qualification,
        f.experience_years, f.specialization, f.office_room, f.joining_date
      FROM faculty f
      JOIN users u ON f.faculty_id = u.user_id
      WHERE f.faculty_id = ?
    `, [registrationNumber]);

    if (profile.length === 0) {
      return NextResponse.json({ success: false, message: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: profile[0] });
  } catch (error) {
    console.error('Faculty profile fetch error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}