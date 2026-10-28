import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { requireAdminAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'okhai_pharma_secret_jwt_key_2026_super_secure';

// POST /api/auth/login
router.post('/login', (req, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username/Email and Password are required.' });
    }

    const cleanUsername = String(username).trim();
    const admin = db.prepare(`
      SELECT id, username, email, password_hash, full_name, role
      FROM admins
      WHERE username = ? OR email = ?
    `).get(cleanUsername, cleanUsername) as any;

    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const isMatch = bcrypt.compareSync(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Update last login
    db.prepare(`UPDATE admins SET last_login = datetime('now') WHERE id = ?`).run(admin.id);

    // Create JWT
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

// GET /api/auth/me
router.get('/me', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const adminId = req.admin?.id;
    const admin = db.prepare(`
      SELECT id, username, email, full_name, role, created_at, last_login
      FROM admins
      WHERE id = ?
    `).get(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin account not found.' });
    }

    return res.json({ admin });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve profile.' });
  }
});

// POST /api/auth/change-password
router.post('/change-password', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const adminId = req.admin?.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters.' });
    }

    const admin = db.prepare('SELECT password_hash FROM admins WHERE id = ?').get(adminId) as any;
    if (!admin || !bcrypt.compareSync(currentPassword, admin.password_hash)) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);
    db.prepare('UPDATE admins SET password_hash = ? WHERE id = ?').run(newHash, adminId);

    return res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update password.' });
  }
});

export default router;
