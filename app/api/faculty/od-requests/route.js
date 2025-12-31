import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/db.js';

// GET - Get faculty's OD requests
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get('faculty_id') || 'FAC2024001'; // Default for development

    // Get all OD requests for the faculty
    const odRequests = await executeQuery(`
      SELECT 
        odr.*,
        c.course_name,
        CONCAT(u.first_name, ' ', u.last_name) as student_name
      FROM od_requests odr
      LEFT JOIN courses c ON odr.course_code = c.course_code
      LEFT JOIN students s ON odr.student_id = s.student_id
      LEFT JOIN users u ON s.user_id = u.id
      WHERE odr.faculty_id = ?
      ORDER BY odr.requested_at DESC
    `, [facultyId]);

    return NextResponse.json({
      success: true,
      data: {
        requests: odRequests,
        total_requests: odRequests.length
      }
    });

  } catch (error) {
    console.error('Error fetching OD requests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch OD requests' },
      { status: 500 }
    );
  }
}

// POST - Create new OD request
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const courseCode = formData.get('course_code');
    const odDate = formData.get('od_date');
    const odReason = formData.get('od_reason');
    const odType = formData.get('od_type');
    const supportingDocument = formData.get('supporting_document');

    // Default values for development
    const facultyId = 'FAC2024001';
    const studentId = 'STU2024002'; // This would normally come from session

    if (!courseCode || !odDate || !odReason) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

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
    console.error('Error creating OD request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create OD request' },
      { status: 500 }
    );
  }
}

// PUT - Update OD request status (for approval/rejection)
export async function PUT(request) {
  try {
    const { request_id, status, faculty_remarks } = await request.json();

    if (!request_id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update OD request status
    await executeQuery(`
      UPDATE od_requests 
      SET status = ?, faculty_remarks = ?, updated_at = CURRENT_TIMESTAMP
      WHERE request_id = ?
    `, [status, faculty_remarks || null, request_id]);

    return NextResponse.json({
      success: true,
      data: {
        message: `OD request ${status} successfully`
      }
    });

  } catch (error) {
    console.error('Error updating OD request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update OD request' },
      { status: 500 }
    );
  }
}