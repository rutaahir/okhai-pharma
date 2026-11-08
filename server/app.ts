import express from 'express';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth';
import inquiriesRouter from './routes/inquiries';

export const app = express();

const DJANGO_PORT = parseInt(process.env.DJANGO_PORT || '8000', 10);
const DJANGO_HOST = process.env.DJANGO_HOST || '127.0.0.1';

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));

// Forwarding helper for Django Lead & SuperAdmin Endpoints
function forwardToDjango(req: express.Request, res: express.Response, next: express.NextFunction) {
  const options: http.RequestOptions = {
    hostname: DJANGO_HOST,
    port: DJANGO_PORT,
    path: req.originalUrl || req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: `${DJANGO_HOST}:${DJANGO_PORT}`,
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error(`[Django Proxy Error] Failed to forward ${req.method} ${req.originalUrl}:`, err.message);
    res.status(502).json({
      error: 'Lead processing backend (Django) is unreachable. Ensure python manage.py runserver 8000 is running.',
      details: err.message
    });
  });

  // If request has a parsed body from json/urlencoded
  if (req.body && Object.keys(req.body).length > 0 && req.headers['content-type']?.includes('application/json')) {
    const bodyData = JSON.stringify(req.body);
    proxyReq.setHeader('content-length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
    proxyReq.end();
  } else {
    // Pipe raw stream (e.g. multipart/form-data for uploads)
    req.pipe(proxyReq);
  }
}

// Route lead & superadmin requests directly to Django
app.use('/api/lead', forwardToDjango);
app.use('/api/superadmin', forwardToDjango);

// Parse JSON for local Express routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Okhai Pharma Commercial API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/admin/inquiries', inquiriesRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Server Error]', err);
  res.status(500).json({ error: err?.message || 'Internal Server Error' });
});

export default app;
