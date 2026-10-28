import { Router, Request, Response } from 'express';
import { db } from '../db';
import { requireAdminAuth } from '../middleware/auth';
import { sendSuperadminInquiryAlert, sendCustomerAcknowledgment } from '../services/emailService';

const router = Router();

// ============================================================================
// PUBLIC ENDPOINTS
// ============================================================================

/**
 * POST /api/inquiries
 * Public submission from website contact form
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      company,
      email,
      phone,
      quantity,
      product,
      entityType = 'business',
      message = '',
    } = req.body;

    // Validation
    if (!firstName || !lastName || !company || !email || !phone || !quantity || !product) {
      return res.status(400).json({
        error: 'Please complete all required fields (Name, Company, Corporate Email, Phone, Product, and Quantity).',
      });
    }

    if (!String(email).includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid corporate email address.' });
    }

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

    // Insert into database
    const insertStmt = db.prepare(`
      INSERT INTO inquiries (
        first_name, last_name, company, email, phone, quantity, product, entity_type, message, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertStmt.run(
      firstName.trim(),
      lastName.trim(),
      company.trim(),
      email.trim().toLowerCase(),
      phone.trim(),
      quantity.trim(),
      product.trim(),
      entityType,
      message ? message.trim() : '',
      ipAddress
    );

    const inquiryId = Number(result.lastInsertRowid);

    const createdInquiry = {
      id: inquiryId,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      company: company.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      quantity: quantity.trim(),
      product: product.trim(),
      entity_type: entityType,
      message: message ? message.trim() : '',
      created_at: new Date().toISOString(),
    };

    // Dispatch email alert to Superadmin
    const emailResult = await sendSuperadminInquiryAlert(createdInquiry);
    if (!emailResult.success) {
      console.warn('[Inquiry API] Superadmin email alert warning:', emailResult.error);
    }

    // Customer acknowledgment
    sendCustomerAcknowledgment(createdInquiry).catch((err) => {
      console.warn('[Inquiry API] Customer ack error:', err);
    });

    return res.status(201).json({
      success: true,
      inquiryId,
      message: 'Quotation request received successfully. Our Gujarat commercial desk has been alerted.',
    });
  } catch (err: any) {
    console.error('Inquiry submission error:', err);
    return res.status(500).json({ error: 'Database error while saving inquiry. Please try again.' });
  }
});

// ============================================================================
// PROTECTED ADMIN ENDPOINTS
// ============================================================================

/**
 * GET /api/admin/inquiries/stats
 * Dashboard overview metrics & counts
 */
router.get('/stats', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const totalRow = db.prepare('SELECT COUNT(*) as count FROM inquiries').get() as any;
    const newRow = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'").get() as any;
    const inProgressRow = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'in_progress'").get() as any;
    const quotedRow = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'quoted'").get() as any;
    const closedRow = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'closed'").get() as any;
    const todayRow = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE DATE(created_at) = DATE('now')").get() as any;

    const productStats = db.prepare(`
      SELECT product, COUNT(*) as count
      FROM inquiries
      GROUP BY product
      ORDER BY count DESC
    `).all();

    const recentInquiries = db.prepare(`
      SELECT id, first_name, last_name, company, product, quantity, status, created_at
      FROM inquiries
      ORDER BY id DESC
      LIMIT 5
    `).all();

    return res.json({
      total: totalRow.count,
      new: newRow.count,
      inProgress: inProgressRow.count,
      quoted: quotedRow.count,
      closed: closedRow.count,
      today: todayRow.count,
      productBreakdown: productStats,
      recent: recentInquiries,
    });
  } catch (err: any) {
    console.error('Stats error:', err);
    return res.status(500).json({ error: 'Failed to fetch inquiry statistics.' });
  }
});

/**
 * GET /api/admin/inquiries
 * List inquiries with search, status filter, product filter, pagination
 */
router.get('/', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const {
      search = '',
      status = 'all',
      product = 'all',
      page = '1',
      limit = '20',
      sortBy = 'id',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
    const offset = (pageNum - 1) * limitNum;

    let whereClauses: string[] = [];
    let params: any[] = [];

    // Search filter
    if (search && String(search).trim()) {
      const q = `%${String(search).trim()}%`;
      whereClauses.push(`(
        first_name LIKE ? OR 
        last_name LIKE ? OR 
        company LIKE ? OR 
        email LIKE ? OR 
        phone LIKE ? OR 
        product LIKE ? OR
        message LIKE ?
      )`);
      params.push(q, q, q, q, q, q, q);
    }

    // Status filter
    if (status && status !== 'all') {
      whereClauses.push('status = ?');
      params.push(status);
    }

    // Product filter
    if (product && product !== 'all') {
      whereClauses.push('product = ?');
      params.push(product);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const validSortCols = ['id', 'created_at', 'company', 'product', 'status', 'priority'];
    const sortCol = validSortCols.includes(sortBy as string) ? sortBy : 'id';
    const direction = String(sortOrder).toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    // Total matching records
    const countQuery = `SELECT COUNT(*) as count FROM inquiries ${whereSql}`;
    const totalRow = db.prepare(countQuery).get(...params) as any;
    const total = totalRow.count;

    // Paginated list
    const listQuery = `
      SELECT id, first_name, last_name, company, email, phone, quantity, product,
             entity_type, message, status, priority, notes, email_sent, email_error,
             ip_address, created_at, updated_at
      FROM inquiries
      ${whereSql}
      ORDER BY ${sortCol} ${direction}
      LIMIT ? OFFSET ?
    `;

    const inquiries = db.prepare(listQuery).all(...params, limitNum, offset);

    return res.json({
      inquiries,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (err: any) {
    console.error('List inquiries error:', err);
    return res.status(500).json({ error: 'Failed to retrieve inquiries.' });
  }
});

/**
 * GET /api/admin/inquiries/export/csv
 * Export inquiries as CSV
 */
router.get('/export/csv', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const inquiries = db.prepare(`
      SELECT id, first_name, last_name, company, email, phone, product, quantity,
             entity_type, status, priority, notes, email_sent, created_at
      FROM inquiries
      ORDER BY id DESC
    `).all() as any[];

    // Build CSV
    const headers = [
      'Inquiry ID',
      'First Name',
      'Last Name',
      'Company',
      'Corporate Email',
      'Phone Number',
      'Product Formulation',
      'Estimated Quantity',
      'Entity Type',
      'Status',
      'Priority',
      'Superadmin Email Sent',
      'Created Date (UTC)',
    ];

    const escapeCsv = (str: any) => {
      if (str === null || str === undefined) return '""';
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = inquiries.map((i) => [
      i.id,
      escapeCsv(i.first_name),
      escapeCsv(i.last_name),
      escapeCsv(i.company),
      escapeCsv(i.email),
      escapeCsv(i.phone),
      escapeCsv(i.product),
      escapeCsv(i.quantity),
      escapeCsv(i.entity_type),
      escapeCsv(i.status),
      escapeCsv(i.priority),
      i.email_sent ? 'YES' : 'NO',
      escapeCsv(i.created_at),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="okhai_pharma_inquiries_${new Date().toISOString().slice(0, 10)}.csv"`);
    return res.send(csvContent);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate CSV export.' });
  }
});

/**
 * GET /api/admin/inquiries/:id
 * Retrieve details for one inquiry with email history
 */
router.get('/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const inquiry = db.prepare('SELECT * FROM inquiries WHERE id = ?').get(id) as any;
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    const emailLogs = db.prepare(`
      SELECT id, recipient, subject, status, error_message, sent_at
      FROM email_logs
      WHERE inquiry_id = ?
      ORDER BY id DESC
    `).all(id);

    return res.json({ inquiry, emailLogs });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve inquiry details.' });
  }
});

/**
 * PATCH /api/admin/inquiries/:id
 * Update status, priority, or internal notes
 */
router.patch('/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status, priority, notes } = req.body;

    const existing = db.prepare('SELECT id FROM inquiries WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (status !== undefined) {
      const validStatuses = ['new', 'in_progress', 'quoted', 'closed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      }
      updates.push('status = ?');
      params.push(status);
    }

    if (priority !== undefined) {
      const validPriorities = ['normal', 'high', 'urgent'];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}` });
      }
      updates.push('priority = ?');
      params.push(priority);
    }

    if (notes !== undefined) {
      updates.push('notes = ?');
      params.push(notes);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields provided for update.' });
    }

    updates.push("updated_at = datetime('now')");
    params.push(id);

    db.prepare(`UPDATE inquiries SET ${updates.join(', ')} WHERE id = ?`).run(...params);

    const updated = db.prepare('SELECT * FROM inquiries WHERE id = ?').get(id);
    return res.json({ success: true, inquiry: updated });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update inquiry.' });
  }
});

/**
 * DELETE /api/admin/inquiries/:id
 * Delete inquiry
 */
router.delete('/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = db.prepare('SELECT id FROM inquiries WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    db.prepare('DELETE FROM email_logs WHERE inquiry_id = ?').run(id);
    db.prepare('DELETE FROM inquiries WHERE id = ?').run(id);

    return res.json({ success: true, message: `Inquiry #${id} deleted.` });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

/**
 * POST /api/admin/inquiries/:id/resend-email
 * Re-dispatch superadmin email alert
 */
router.post('/:id/resend-email', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const inquiry = db.prepare('SELECT * FROM inquiries WHERE id = ?').get(id) as any;
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    const result = await sendSuperadminInquiryAlert(inquiry);
    if (result.success) {
      return res.json({ success: true, message: 'Notification email successfully resent to superadmin.' });
    } else {
      return res.status(500).json({ error: result.error || 'Failed to dispatch email.' });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Failed to resend email alert.' });
  }
});

export default router;
