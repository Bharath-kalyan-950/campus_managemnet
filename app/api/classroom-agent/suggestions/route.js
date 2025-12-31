import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

// GET - Get AI suggestions for faculty approval
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get('faculty_id');
    const requestId = searchParams.get('request_id');

    if (!facultyId) {
      return NextResponse.json(
        { success: false, error: 'Faculty ID is required' },
        { status: 400 }
      );
    }

    // Call Python AI agent to get suggestions
    const result = await callPythonAgent('get_suggestions', { faculty_id: facultyId, request_id: requestId });
    
    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error fetching AI suggestions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch AI suggestions' },
      { status: 500 }
    );
  }
}

// POST - Process faculty approval/rejection of AI suggestions
export async function POST(request) {
  try {
    const { request_id, faculty_id, action, selected_option, rejection_reason, feedback, notes } = await request.json();

    if (!request_id || !faculty_id || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const approvalData = {
      action, // 'approve', 'reject', 'request_manual'
      selected_option,
      rejection_reason,
      feedback,
      notes
    };

    // Call Python AI agent to process approval
    const result = await callPythonAgent('process_approval', { 
      request_id, 
      faculty_id, 
      approval_data: approvalData 
    });
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to process approval' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing faculty approval:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process approval' },
      { status: 500 }
    );
  }
}

async function callPythonAgent(action, data) {
  return new Promise((resolve, reject) => {
    const pythonPath = 'python';
    const scriptPath = path.join(process.cwd(), 'agents', 'api_server_simple.py');
    const args = [scriptPath, action, JSON.stringify(data)];

    console.log(`🐍 Calling Python AI agent: ${action}`);
    
    const pythonProcess = spawn(pythonPath, args);
    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output.trim());
          console.log(`✅ Python AI agent completed: ${action}`);
          resolve(result);
        } catch (parseError) {
          console.error('Failed to parse Python output:', parseError);
          console.error('Raw output:', output);
          reject(new Error('Failed to parse AI agent response'));
        }
      } else {
        console.error(`Python AI agent failed with code ${code}`);
        console.error('Error output:', errorOutput);
        reject(new Error(`AI agent process failed: ${errorOutput}`));
      }
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      reject(new Error('Failed to start AI agent process'));
    });
  });
}