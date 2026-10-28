import nodemailer from 'nodemailer';
import { db } from '../db';

interface InquiryData {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
  product: string;
  entity_type: string;
  message?: string;
  created_at?: string;
}

// Create Nodemailer Transporter with user-provided Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: (process.env.SMTP_SECURE || 'true') === 'true',
  auth: {
    user: process.env.SMTP_USER || 'socialbuzz31@gmail.com',
    pass: process.env.SMTP_PASS || 'obufeaczftxdsfve',
  },
});

/**
 * Sends a notification email to Superadmin (rutvikaahir30@gmail.com)
 * when a new inquiry is submitted on the website.
 */
export async function sendSuperadminInquiryAlert(inquiry: InquiryData): Promise<{ success: boolean; error?: string }> {
  const superadminEmail = process.env.SUPERADMIN_EMAIL || 'rutvikaahir30@gmail.com';
  const senderEmail = process.env.SMTP_USER || 'socialbuzz31@gmail.com';

  // Professional transactional subject without spam-triggering emojis
  const subject = `New Quotation Request #OKHAI-${inquiry.id}: ${inquiry.product} (${inquiry.quantity}) - ${inquiry.company}`;

  const submissionTime = inquiry.created_at
    ? new Date(inquiry.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

  // Plain Text Version (Essential for passing Gmail anti-spam heuristics & RFC multipart/alternative)
  const textContent = `
NEW B2B LEAD INQUIRY (Reference #OKHAI-${inquiry.id})
======================================================================
A new commercial quotation request has been submitted through the Okhai Pharma website.

LEAD DETAILS:
- Reference ID:      #OKHAI-${inquiry.id}
- Product Requested: ${inquiry.product}
- Estimated Quantity: ${inquiry.quantity}
- Contact Person:    ${inquiry.first_name} ${inquiry.last_name}
- Company Name:      ${inquiry.company}
- Entity Type:       ${inquiry.entity_type === 'business' ? 'Commercial / Laboratory' : 'Industrial Supply'}
- Corporate Email:   ${inquiry.email}
- Contact Phone:     ${inquiry.phone}
- Received On:       ${submissionTime}

TECHNICAL REQUIREMENTS / REMARKS:
${inquiry.message || 'No additional remarks provided.'}

======================================================================
ACTION REQUIRED:
1. To email buyer: ${inquiry.email}
2. To call buyer:  ${inquiry.phone}
3. Open Admin Dashboard: http://localhost:3000/admin/inquiries

Okhai Pharma Intermediates Pvt. Ltd.
Sr No. 538, Ashapuri-Changa Road, Vill-Kasor, Ta-Sojitra, Dist-Anand, Gujarat 388460, India
  `.trim();

  // Rich Responsive HTML Version
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quotation Request #OKHAI-${inquiry.id}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F9F4; margin: 0; padding: 20px; color: #1E3D2A; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E6EEDF; box-shadow: 0 4px 20px rgba(30,61,42,0.06); }
    .header { background: linear-gradient(135deg, #1E3D2A 0%, #2A543A 100%); padding: 32px 28px; text-align: left; }
    .logo-badge { display: inline-block; background: #8CC63F; color: #1E3D2A; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px; }
    .header h1 { margin: 0; font-size: 22px; color: #ffffff; font-weight: 600; letter-spacing: -0.01em; }
    .header p { margin: 6px 0 0 0; color: #BBD3C2; font-size: 13px; font-weight: 300; }
    .content { padding: 30px 28px; }
    .alert-chip { background: #EAF2E5; border: 1px solid #C8DEC0; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; font-size: 13px; color: #2D5A3C; font-weight: 500; }
    .data-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 24px; }
    .data-table td { padding: 12px 14px; border-bottom: 1px solid #F0F4EC; font-size: 13px; }
    .data-table tr:last-child td { border-bottom: none; }
    .label { color: #6F8274; font-weight: 600; width: 38%; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
    .val { color: #1E3D2A; font-weight: 600; }
    .val-highlight { color: #2E683A; font-weight: 700; font-size: 15px; }
    .message-box { background: #F8FAF6; border-left: 3px solid #5B9A3C; padding: 14px 18px; border-radius: 6px; font-size: 13px; color: #2C3E30; line-height: 1.5; margin: 20px 0; }
    .actions { padding: 20px 0 10px 0; }
    .btn { display: inline-block; padding: 12px 22px; border-radius: 24px; font-size: 12px; font-weight: 700; text-decoration: none; text-align: center; margin-right: 8px; margin-bottom: 8px; }
    .btn-primary { background: #1E3D2A; color: #ffffff !important; }
    .btn-secondary { background: #EAF2E5; color: #2D5A3C !important; border: 1px solid #C8DEC0; }
    .footer { background: #FAFBF8; padding: 20px 28px; text-align: center; border-top: 1px solid #EFF3EC; font-size: 11px; color: #8A9A8E; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-badge">OKHAI PHARMA · B2B COMMERCIAL DESK</div>
      <h1>New Lead Inquiry Received</h1>
      <p>Direct submission from Website Contact &amp; Quotation form (Ref #OKHAI-${inquiry.id})</p>
    </div>
    
    <div class="content">
      <div class="alert-chip">
        Action Required: Commercial requirement for <strong>${inquiry.product}</strong> (${inquiry.quantity}) from <strong>${inquiry.company}</strong> requires quota calculation &amp; CoA preparation.
      </div>

      <table class="data-table">
        <tr>
          <td class="label">Product Formulation</td>
          <td class="val val-highlight">${inquiry.product}</td>
        </tr>
        <tr>
          <td class="label">Estimated Volume</td>
          <td class="val">${inquiry.quantity}</td>
        </tr>
        <tr>
          <td class="label">Contact Name</td>
          <td class="val">${inquiry.first_name} ${inquiry.last_name}</td>
        </tr>
        <tr>
          <td class="label">Company / Entity</td>
          <td class="val">${inquiry.company} (${inquiry.entity_type === 'business' ? 'Commercial / Laboratory' : 'Industrial Supply'})</td>
        </tr>
        <tr>
          <td class="label">Corporate Email</td>
          <td class="val"><a href="mailto:${inquiry.email}" style="color: #2E683A; font-weight: 700;">${inquiry.email}</a></td>
        </tr>
        <tr>
          <td class="label">Direct Phone</td>
          <td class="val"><a href="tel:${inquiry.phone}" style="color: #2E683A; font-weight: 700;">${inquiry.phone}</a></td>
        </tr>
        <tr>
          <td class="label">Submission Date</td>
          <td class="val">${submissionTime}</td>
        </tr>
      </table>

      ${inquiry.message ? `
        <div style="font-size: 11px; font-weight: 700; color: #6F8274; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
          Technical Remarks / Client Notes:
        </div>
        <div class="message-box">
          "${inquiry.message}"
        </div>
      ` : ''}

      <div class="actions">
        <a href="mailto:${inquiry.email}?subject=Formal%20Quotation%20for%20${encodeURIComponent(inquiry.product)}%20-%20Okhai%20Pharma" class="btn btn-primary">
          Reply to Buyer (${inquiry.email})
        </a>
        <a href="tel:${inquiry.phone}" class="btn btn-secondary">
          Call ${inquiry.phone}
        </a>
      </div>
    </div>

    <div class="footer">
      Okhai Pharma Intermediates Pvt. Ltd. · Anand, Gujarat, India<br>
      Notification dispatched to Superadmin <strong>${superadminEmail}</strong>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Okhai Pharma Commercial Desk" <${senderEmail}>`,
      to: superadminEmail,
      subject,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Priority': '1',
        'Importance': 'high',
        'X-Mailer': 'Okhai-Pharma-Portal',
      },
    });

    console.log(`[Email Service] Notification sent successfully to Superadmin (${superadminEmail}). Message ID: ${info.messageId}`);

    // Log success into database
    db.prepare(`
      INSERT INTO email_logs (inquiry_id, recipient, subject, status)
      VALUES (?, ?, ?, 'sent')
    `).run(inquiry.id, superadminEmail, subject);

    db.prepare('UPDATE inquiries SET email_sent = 1, email_error = NULL WHERE id = ?').run(inquiry.id);

    return { success: true };
  } catch (err: any) {
    const errMsg = err?.message || 'Failed to dispatch email';
    console.error(`[Email Service] Failed to send email to Superadmin:`, errMsg);

    // Log failure into database
    db.prepare(`
      INSERT INTO email_logs (inquiry_id, recipient, subject, status, error_message)
      VALUES (?, ?, ?, 'failed', ?)
    `).run(inquiry.id, superadminEmail, subject, errMsg);

    db.prepare('UPDATE inquiries SET email_sent = 0, email_error = ? WHERE id = ?').run(errMsg, inquiry.id);

    return { success: false, error: errMsg };
  }
}

/**
 * Sends a polite automated B2B confirmation to the customer
 */
export async function sendCustomerAcknowledgment(inquiry: InquiryData): Promise<void> {
  const senderEmail = process.env.SMTP_USER || 'socialbuzz31@gmail.com';

  const textContent = `
Dear ${inquiry.first_name} ${inquiry.last_name},

Thank you for contacting Okhai Pharma Intermediates Pvt. Ltd. We have received your commercial inquiry for:
- Product: ${inquiry.product}
- Quantity: ${inquiry.quantity}
- Reference ID: #OKHAI-${inquiry.id}

Our commercial sales desk in Gujarat, India is reviewing your requirements and batch availability. A dedicated technical sales representative will respond to you within 24 business hours with formal pricing, specifications, and shipment schedules.

For immediate assistance or urgent air dispatch, feel free to call our plant office at +91 87583 23513.

Warm regards,
Commercial Sales Desk
Okhai Pharma Intermediates Pvt. Ltd.
Anand, Gujarat, India
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAFBF8; margin: 0; padding: 24px; color: #1E3D2A; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E6EEDF; }
    .header { background: #1E3D2A; padding: 28px; text-align: left; }
    .header h2 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; }
    .content { padding: 28px; font-size: 13.5px; line-height: 1.6; color: #2D3D32; }
    .highlight-card { background: #F3F8F0; border-radius: 10px; padding: 16px; margin: 18px 0; border: 1px solid #D8E8D2; }
    .footer { background: #FAFBF8; padding: 18px 28px; font-size: 11px; color: #8A9A8E; border-top: 1px solid #EFF3EC; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Okhai Pharma Intermediates Pvt. Ltd.</h2>
    </div>
    <div class="content">
      <p>Dear ${inquiry.first_name} ${inquiry.last_name},</p>
      <p>Thank you for contacting <strong>Okhai Pharma Intermediates</strong>. We have received your commercial inquiry for:</p>
      
      <div class="highlight-card">
        <strong>Product:</strong> ${inquiry.product}<br>
        <strong>Requested Quantity:</strong> ${inquiry.quantity}<br>
        <strong>Reference ID:</strong> #OKHAI-${inquiry.id}
      </div>

      <p>Our commercial desk in Gujarat, India is currently reviewing your requirements and batch availability. A dedicated technical sales representative will respond to you within 24 business hours with formal pricing, specifications, and shipment schedules.</p>

      <p>If you require immediate assistance or urgent air dispatch, feel free to call our plant office at <strong>+91 87583 23513</strong>.</p>

      <p>Warm regards,<br>
      <strong>Commercial Sales Desk</strong><br>
      Okhai Pharma Intermediates Pvt. Ltd.<br>
      Anand, Gujarat, India</p>
    </div>
    <div class="footer">
      This is an automated confirmation of your request.
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `"Okhai Pharma Commercial Desk" <${senderEmail}>`,
      to: inquiry.email,
      subject: `Quotation Request Received [Ref #OKHAI-${inquiry.id}] - Okhai Pharma`,
      text: textContent,
      html: htmlContent,
    });
    console.log(`[Email Service] Acknowledgment email sent to customer (${inquiry.email})`);
  } catch (err) {
    console.warn(`[Email Service] Could not send customer acknowledgment:`, err);
  }
}
