import path from 'path';
import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

import { app } from './app';

const PORT = parseInt(process.env.PORT || '5000', 10);

// In production, serve frontend build from dist/
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🌿 OKHAI PHARMA BACKEND SERVER RUNNING`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🔐 Admin Auth: /api/auth/login`);
  console.log(`📧 Inquiries Email Alerts: Active (Configured in Database)`);
  console.log(`=======================================================`);
});

export default server;
