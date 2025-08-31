const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Email templates
const templates = {
  emailVerification: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .button { 
          display: inline-block; 
          background: #007bff; 
          color: white; 
          padding: 12px 30px; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 20px 0;
        }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ShopMERN</h1>
        </div>
        <div class="content">
          <h2>Verify Your Email Address</h2>
          <p>Hi ${data.name},</p>
          <p>Thank you for registering with ShopMERN! Please click the button below to verify your email address:</p>
          <a href="${data.verificationUrl}" class="button">Verify Email</a>
          <p>If you didn't create an account, please ignore this email.</p>
          <p>This link will expire in 24 hours.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ShopMERN. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  passwordReset: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .button { 
          display: inline-block; 
          background: #dc3545; 
          color: white; 
          padding: 12px 30px; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 20px 0;
        }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ShopMERN</h1>
        </div>
        <div class="content">
          <h2>Password Reset Request</h2>
          <p>Hi ${data.name},</p>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          <a href="${data.resetUrl}" class="button">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>This link will expire in 10 minutes.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ShopMERN. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  orderConfirmation: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #28a745; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .order-details { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .item { border-bottom: 1px solid #dee2e6; padding: 10px 0; }
        .total { font-weight: bold; font-size: 18px; }
        .button { 
          display: inline-block; 
          background: #007bff; 
          color: white; 
          padding: 12px 30px; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 20px 0;
        }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmed!</h1>
        </div>
        <div class="content">
          <h2>Thank you for your order!</h2>
          <p>Hi ${data.user},</p>
          <p>Your order has been confirmed and is being processed.</p>
          
          <div class="order-details">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${data.order.orderNumber}</p>
            <p><strong>Order Date:</strong> ${new Date(data.order.createdAt).toLocaleDateString()}</p>
            
            <h4>Items:</h4>
            ${data.order.items.map(item => `
              <div class="item">
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            `).join('')}
            
            <div class="total">
              <p>Total: $${data.order.totalPrice.toFixed(2)}</p>
            </div>
          </div>
          
          <a href="${data.orderUrl}" class="button">View Order Details</a>
          
          <p>We'll send you another email when your order ships.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ShopMERN. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  orderStatusUpdate: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .status-update { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .button { 
          display: inline-block; 
          background: #007bff; 
          color: white; 
          padding: 12px 30px; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 20px 0;
        }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Update</h1>
        </div>
        <div class="content">
          <h2>Your order status has been updated</h2>
          <p>Hi ${data.user},</p>
          
          <div class="status-update">
            <p><strong>Order Number:</strong> ${data.order.orderNumber}</p>
            <p><strong>Status:</strong> ${data.status.charAt(0).toUpperCase() + data.status.slice(1)}</p>
            ${data.trackingNumber ? `<p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>` : ''}
          </div>
          
          <a href="${data.orderUrl}" class="button">Track Your Order</a>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ShopMERN. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const { to, subject, template, data } = options;

    const htmlContent = templates[template] ? templates[template](data) : data.html;

    const mailOptions = {
      from: `ShopMERN <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = sendEmail;
