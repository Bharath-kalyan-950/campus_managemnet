import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/db.js';

// GET - Get student's OD requests
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('student_id') || 'STU2024002'; // Default for development

    // Get all OD requests for the student
    const odRequests = await executeQuery(`
      SELECT 
        odr.*,
        c.course_name,
        CONCAT(u.first_name, ' ', u.last_name) as faculty_name
      FROM od_requests odr
      LEFT JOIN courses c ON odr.course_code = c.course_code
      LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
      LEFT JOIN users u ON f.user_id = u.id
      WHERE odr.student_id = ?
      ORDER BY odr.requested_at DESC
    `, [studentId]);

    return NextResponse.json({
      success: true,
      data: {
        requests: odRequests,
        total_requests: odRequests.length
      }
    });

  } catch (error) {
    console.error('Error fetching student OD requests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch OD requests' },
      { status: 500 }
    );
  }
}

// POST - Create new OD request (student submits)
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const courseCode = formData.get('course_code');
    const odDate = formData.get('od_date');
    const odReason = formData.get('od_reason');
    const odType = formData.get('od_type');
    const supportingDocument = formData.get('supporting_document');

    // Default values for development
    const studentId = 'STU2024002'; // This would normally come from session

    if (!courseCode || !odDate || !odReason) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get faculty ID for the course
    const courseInfo = await executeQuery(`
      SELECT faculty_id FROM courses WHERE course_code = ?
    `, [courseCode]);

    if (courseInfo.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    const facultyId = courseInfo[0].faculty_id;

    // Generate request ID
    const requestId = `OD_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Handle file upload (simplified for now)
    let documentPath = null;
    if (supportingDocument && supportingDocument.size > 0) {
      // In a real application, you would save the file to a storage service
      // For now, we'll just store the filename
      documentPath = `uploads/od_documents/${requestId}_${supportingDocument.name}`;
    }

    // Insert OD request
    await executeQuery(`
      INSERT INTO od_requests 
      (request_id, faculty_id, student_id, course_code, od_date, od_reason, od_type, supporting_document, status, requested_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', CURRENT_TIMESTAMP)
    `, [requestId, facultyId, studentId, courseCode, odDate, odReason, odType, documentPath]);

    return NextResponse.json({
      success: true,
      data: {
        request_id: requestId,
        message: 'OD request submitted successfully'
      }
    });

  } catch (error) {
    console.error('Error creating student OD request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create OD request' },
      { status: 500 }
    );
  }
}