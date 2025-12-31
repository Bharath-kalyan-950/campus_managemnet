import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

// POST - Process pending requests with Python AI Agent
export async function POST(request) {
  try {
    const { action, date } = await request.json();
    const processDate = date || new Date().toISOString().split('T')[0];

    // Call Python AI agent
    const result = await callPythonAgent(action, processDate);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'AI processing failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('AI processing error:', error);
    return NextResponse.json(
      { success: false, error: 'AI processing failed' },
      { status: 500 }
    );
  }
}

// GET - Get AI processing status
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    // Call Python AI agent for status
    const result = await callPythonAgent('get_status', date);
    
    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('AI status error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get AI status' },
      { status: 500 }
    );
  }
}

async function callPythonAgent(action, date) {
  return new Promise((resolve, reject) => {
    const pythonPath = 'python'; // or 'python3' depending on system
    const scriptPath = path.join(process.cwd(), 'agents', 'api_server_simple.py');
    const args = [scriptPath, action];
    
    if (date) {
      args.push(date);
    }

    console.log(`🐍 Calling Python AI agent: ${action} ${date || ''}`);
    
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