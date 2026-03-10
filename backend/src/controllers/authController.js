import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../services/userService.js';

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // TEMP: plain-text password compare (matches existing DB values)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const payload = {
      id: user.customer_id || user.staff_id,
      email: user.email,
      name: user.name,
      role: user.role || 'user',
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    res.json({
      token,
      user: payload,
    });
  } catch (error) {
    // In production you might log this with a logging service
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
}

export function loginInfo(req, res) {
  res.json({ message: 'Use POST /api/auth/login with email and password.' });
}

