import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { executeQuery } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(email, password) {
  try {
    const users = await executeQuery(
      'SELECT u.*, s.student_id, f.faculty_id FROM users u LEFT JOIN students s ON u.id = s.user_id LEFT JOIN faculty f ON u.id = f.user_id WHERE u.email = ?',
      [email]
    );

    if (users.length === 0) {
      return { success: false, message: 'User not found' };
    }

    const user = users[0];
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return { success: false, message: 'Invalid password' };
    }

    // Use registration number as primary identifier for easier data retrieval
    const registrationNumber = user.role === 'student' ? user.student_id : 
                              user.role === 'faculty' ? user.faculty_id : 
                              user.user_id;

    const token = generateToken({
      id: user.id,
      user_id: user.user_id,
      registration_number: registrationNumber,
      email: user.email,
      role: user.role,
      student_id: user.student_id,
      faculty_id: user.faculty_id
    });

    return {
      success: true,
      token,
      user: {
        id: user.id,
        user_id: user.user_id,
        registration_number: registrationNumber,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        student_id: user.student_id,
        faculty_id: user.faculty_id
      }
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'Authentication failed' };
  }
}