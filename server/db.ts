import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

// Ensure data directory exists
const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'okhai_pharma.db');
export const db = new Database(dbPath);

// Enable WAL mode for high concurrency & reliability
db.pragma('journal_mode = WAL');

// Initialize database tables
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT DEFAULT 'superadmin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      quantity TEXT NOT NULL,
      product TEXT NOT NULL,
      entity_type TEXT DEFAULT 'business',
      message TEXT,
      status TEXT DEFAULT 'new',
      priority TEXT DEFAULT 'normal',
      notes TEXT,
      email_sent INTEGER DEFAULT 0,
      email_error TEXT,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS email_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      inquiry_id INTEGER,
      recipient TEXT NOT NULL,
      subject TEXT NOT NULL,
      status TEXT NOT NULL,
      error_message TEXT,
      sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (inquiry_id) REFERENCES inquiries(id) ON DELETE SET NULL
    );

    CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
    CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
  `);

  // Create initial admin only if the admins table is empty and credentials are provided via environment variables
  const adminCount = (db.prepare('SELECT count(*) as count FROM admins').get() as any)?.count || 0;
  if (adminCount === 0 && process.env.ADMIN_INITIAL_USERNAME && process.env.ADMIN_INITIAL_PASSWORD) {
    const adminUsername = process.env.ADMIN_INITIAL_USERNAME;
    const adminEmail = process.env.ADMIN_INITIAL_EMAIL || process.env.SUPERADMIN_EMAIL || '';
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(adminPassword, salt);
    
    db.prepare(`
      INSERT INTO admins (username, email, password_hash, full_name, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(adminUsername, adminEmail, passwordHash, 'Administrator', 'superadmin');
  }
}

// Automatically initialize when db module is loaded
initDatabase();
