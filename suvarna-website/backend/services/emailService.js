import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.warn('Email service not configured properly:', error.message);
    console.log('Email notifications will be disabled until SMTP is configured');
  } else {
    console.log('✅ Email service is ready to send messages');
  }
});

export const sendNewLeadNotification = async (leadData) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('Skipping email notification - SMTP not configured');
    return null;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@suvarnacapital.com',
      to: process.env.ADMIN_EMAIL || 'admin@suvarnacapital.com',
      subject: `New Lead: ${leadData.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">New Lead Received</h2>
          <p>A new lead has been submitted from the website.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Company Information</h3>
            <p><strong>Company:</strong> ${leadData.companyName}</p>
            <p><strong>Location:</strong> ${leadData.location}, ${leadData.state}</p>
            ${leadData.creditRating ? `<p><strong>Credit Rating:</strong> ${leadData.creditRating}</p>` : ''}
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Contact Information</h3>
            <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
            ${leadData.designation ? `<p><strong>Designation:</strong> ${leadData.designation}</p>` : ''}
            <p><strong>Email:</strong> ${leadData.email1}</p>
            ${leadData.email2 ? `<p><strong>Secondary Email:</strong> ${leadData.email2}</p>` : ''}
            <p><strong>Phone:</strong> ${leadData.mobile1}</p>
            ${leadData.mobile2 ? `<p><strong>Mobile 2:</strong> ${leadData.mobile2}</p>` : ''}
          </div>

          ${leadData.remarks ? `
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="margin-top: 0; color: #92400e;">Remarks</h3>
            <p style="color: #78350f;">${leadData.remarks}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Action Required:</strong> Please review this lead in the CRM system and assign it to the appropriate team member.
            </p>
          </div>

          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            This is an automated notification from Suvarna Capital CRM System.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Lead notification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending lead notification email:', error);
    return null;
  }
};

export const sendActivityNotification = async (activityData, leadData, employeeName) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('Skipping email notification - SMTP not configured');
    return null;
  }

  try {
    const activityTypeMap = {
      call: 'Phone Call',
      email: 'Email',
      meeting: 'Meeting',
      note: 'Note',
      status_change: 'Status Change',
    };

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@suvarnacapital.com',
      to: process.env.ADMIN_EMAIL || 'admin@suvarnacapital.com',
      subject: `Activity Update: ${leadData.companyName} - ${activityTypeMap[activityData.type] || activityData.type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">Activity Update</h2>
          <p>A new activity has been logged for a lead.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Lead Information</h3>
            <p><strong>Company:</strong> ${leadData.companyName}</p>
            <p><strong>Contact:</strong> ${leadData.firstName} ${leadData.lastName}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Activity Details</h3>
            <p><strong>Type:</strong> ${activityTypeMap[activityData.type] || activityData.type}</p>
            ${activityData.subject ? `<p><strong>Subject:</strong> ${activityData.subject}</p>` : ''}
            ${activityData.description ? `<p><strong>Description:</strong> ${activityData.description}</p>` : ''}
            ${activityData.outcome ? `<p><strong>Outcome:</strong> ${activityData.outcome}</p>` : ''}
            ${activityData.duration ? `<p><strong>Duration:</strong> ${activityData.duration} minutes</p>` : ''}
            <p><strong>Logged by:</strong> ${employeeName}</p>
          </div>

          <div style="margin-top: 30px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af;">
              View this activity and more details in the CRM system.
            </p>
          </div>

          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            This is an automated notification from Suvarna Capital CRM System.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Activity notification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending activity notification email:', error);
    return null;
  }
};

export const sendTaskAssignmentNotification = async (taskData, employeeEmail, employeeName) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('Skipping email notification - SMTP not configured');
    return null;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@suvarnacapital.com',
      to: employeeEmail,
      subject: `New Task Assigned: ${taskData.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">New Task Assigned</h2>
          <p>Hello ${employeeName},</p>
          <p>You have been assigned a new task.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Task Details</h3>
            <p><strong>Title:</strong> ${taskData.title}</p>
            ${taskData.description ? `<p><strong>Description:</strong> ${taskData.description}</p>` : ''}
            <p><strong>Priority:</strong> ${taskData.priority.toUpperCase()}</p>
            ${taskData.dueDate ? `<p><strong>Due Date:</strong> ${new Date(taskData.dueDate).toLocaleDateString()}</p>` : ''}
            ${taskData.lead ? `<p><strong>Related Lead:</strong> ${taskData.lead.companyName}</p>` : ''}
          </div>

          <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action Required:</strong> Please review this task and update its status in the CRM system.
            </p>
          </div>

          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            This is an automated notification from Suvarna Capital CRM System.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Task assignment email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending task assignment email:', error);
    return null;
  }
};

export const sendLeadStatusChangeNotification = async (leadData, oldStatus, newStatus, employeeName) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('Skipping email notification - SMTP not configured');
    return null;
  }

  const statusChanges = ['won', 'lost'];
  if (!statusChanges.includes(newStatus)) {
    return null; // Only notify on win/loss
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@suvarnacapital.com',
      to: process.env.ADMIN_EMAIL || 'admin@suvarnacapital.com',
      subject: `Lead Status Changed: ${leadData.companyName} - ${newStatus.toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${newStatus === 'won' ? '#059669' : '#dc2626'};">
            Lead Status Changed: ${newStatus.toUpperCase()}
          </h2>
          <p>A lead has been marked as <strong>${newStatus.toUpperCase()}</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Lead Information</h3>
            <p><strong>Company:</strong> ${leadData.companyName}</p>
            <p><strong>Contact:</strong> ${leadData.firstName} ${leadData.lastName}</p>
            <p><strong>Email:</strong> ${leadData.email1}</p>
            <p><strong>Phone:</strong> ${leadData.mobile1}</p>
          </div>

          <div style="background-color: ${newStatus === 'won' ? '#d1fae5' : '#fee2e2'}; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${newStatus === 'won' ? '#059669' : '#dc2626'};">
            <p style="margin: 0; color: ${newStatus === 'won' ? '#065f46' : '#991b1b'};">
              <strong>Status Changed:</strong> ${oldStatus.toUpperCase()} → ${newStatus.toUpperCase()}
            </p>
            <p style="margin: 10px 0 0 0; color: ${newStatus === 'won' ? '#065f46' : '#991b1b'};">
              <strong>Updated by:</strong> ${employeeName}
            </p>
          </div>

          ${leadData.estimatedValue ? `
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Estimated Value:</strong> ₹${leadData.estimatedValue.toLocaleString('en-IN')}</p>
          </div>
          ` : ''}

          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            This is an automated notification from Suvarna Capital CRM System.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Lead status change email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending lead status change email:', error);
    return null;
  }
};

export const sendTermsAgreementNotificationEmail = async (buyerUser, seller) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('Skipping email notification - SMTP not configured');
    return null;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@suvarnacapital.com',
      to: process.env.ADMIN_EMAIL || 'admin@suvarnacapital.com',
      subject: `Terms Agreed by Buyer for Seller ${seller.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">Buyer Agreed to Terms</h2>
          <p>A buyer has agreed to terms for viewing seller details.</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Buyer</h3>
            <p><strong>Name:</strong> ${buyerUser?.name || buyerUser?.email || buyerUser?.id}</p>
            <p><strong>Email:</strong> ${buyerUser?.email || 'N/A'}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Seller</h3>
            <p><strong>Company:</strong> ${seller?.companyName}</p>
            <p><strong>Contact:</strong> ${seller?.contactPerson || 'N/A'}</p>
            <p><strong>Email:</strong> ${seller?.contactEmail || 'N/A'}</p>
            <p><strong>Phone:</strong> ${seller?.contactPhone || 'N/A'}</p>
          </div>

          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">This is an automated notification from Suvarna Capital CRM System.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Terms agreement email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending terms agreement email:', error);
    return null;
  }
};

export const sendMatchNotificationEmail = async (buyerEmail, buyerName, seller) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('Skipping email notification - SMTP not configured');
    return null;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@suvarnacapital.com',
      to: buyerEmail,
      subject: `You have a new seller match: ${seller.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">New Match</h2>
          <p>Hello ${buyerName || 'Buyer'},</p>
          <p>You've been matched with a seller.</p>

          <div style=\"background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;\">
            <h3 style=\"margin-top: 0; color: #1f2937;\">Seller</h3>
            <p><strong>Company:</strong> ${seller?.companyName}</p>
            <p><strong>Project Type:</strong> ${seller?.projectType}</p>
            <p><strong>Capacity:</strong> ${seller?.capacity} MW</p>
            <p><strong>Location:</strong> ${seller?.location}, ${seller?.state}</p>
            <p><strong>Asking Price:</strong> ₹${seller?.askingPrice?.toLocaleString('en-IN')}</p>
          </div>

          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">This is an automated notification from Suvarna Capital CRM System.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Match notification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending match notification email:', error);
    return null;
  }
};
