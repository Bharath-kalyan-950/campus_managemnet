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
    if (!decoded || decoded.role !== 'student') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const profile = await executeQuery(`
      SELECT 
        u.first_name, u.last_name, u.email, u.phone,
        s.student_id, s.department, s.year, s.semester, s.batch,
        s.cgpa, s.total_credits, s.hostel_resident, s.guardian_name,
        s.guardian_phone, s.address, s.blood_group, s.date_of_birth,
        s.admission_date
      FROM users u
      JOIN students s ON u.id = s.user_id
      WHERE s.student_id = ?
    `, [decoded.student_id]);

    if (profile.length === 0) {
      return NextResponse.json({ success: false, message: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: profile[0] });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'student') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const updates = await request.json();
    const { phone, guardian_name, guardian_phone, address, blood_group } = updates;

    await executeQuery(`
      UPDATE users u
      JOIN students s ON u.id = s.user_id
      SET u.phone = ?, s.guardian_name = ?, s.guardian_phone = ?, s.address = ?, s.blood_group = ?
      WHERE s.student_id = ?
    `, [phone, guardian_name, guardian_phone, address, blood_group, decoded.student_id]);

    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}