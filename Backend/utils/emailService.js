import nodemailer from 'nodemailer';

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lumora217@gmail.com',
    pass: 'eopm smkq tenn lvec', // App password
  },
});

// Function to send OTP email
export const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: 'lumora217@gmail.com',
      to: email,
      subject: 'Email Verification Required – Lumora',
      html: `
        <div style="font-family: 'Poppins', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f1ed;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #D9CCBD 0%, #C8BDAA 100%); padding: 45px 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 34px; font-weight: 700; letter-spacing: -0.5px; font-family: 'Playfair Display', serif;">Lumora</h1>
            <p style="margin: 10px 0 0 0; font-size: 13px; font-weight: 500; opacity: 0.95; letter-spacing: 0.5px; text-transform: uppercase;">Email Verification</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 45px 35px; background-color: #ffffff; margin: 0; border-radius: 0;">
            <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #5A4A3F;">Hello,</p>
            
            <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.7; color: #6b5d52; font-weight: 500;">Thank you for joining Lumora. To complete your account setup and begin exploring our curated décor collection, please verify your email address using the verification code below.</p>
            
            <!-- OTP Box -->
            <div style="background: linear-gradient(135deg, #D9CCBD 0%, #C8BDAA 100%); padding: 35px; text-align: center; margin: 36px 0; border-radius: 12px; box-shadow: 0 8px 24px rgba(217, 204, 189, 0.15);">
              <p style="margin: 0 0 16px 0; font-size: 11px; color: #ffffff; font-weight: 600; text-transform: uppercase; letter-spacing: 1.2px; opacity: 0.95;">Enter This Verification Code</p>
              <p style="margin: 0; font-size: 40px; font-weight: 700; color: #ffffff; letter-spacing: 6px; font-family: 'Courier New', 'Courier', monospace; line-height: 1.2;">${otp}</p>
            </div>
            
            <div style="background-color: #f9f7f5; border-left: 4px solid #D9CCBD; padding: 14px 16px; margin: 0 0 24px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 13px; color: #5A4A3F; font-weight: 600;">⏱ This code expires in 10 minutes</p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #9B8B7F;">Do not share this code with anyone. Lumora staff will never ask for it.</p>
            </div>
            
            <p style="margin: 0 0 0 0; font-size: 14px; line-height: 1.7; color: #6b5d52;">Didn't create a Lumora account? If this wasn't you, please disregard this email. Your account security is our priority.</p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9f7f5; text-align: center; padding: 28px 20px; border-top: 1px solid #e8ddd0;">
            <p style="margin: 0 0 8px 0; color: #9B8B7F; font-size: 12px; font-weight: 500;">© 2026 Lumora, Inc. All rights reserved.</p>
            <p style="margin: 0; font-size: 11px; color: #b5a399; font-style: italic;">This is an automated message—please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Function to send password reset email
export const sendPasswordResetEmail = async (email, resetCode) => {
  try {
    const mailOptions = {
      from: 'lumora217@gmail.com',
      to: email,
      subject: 'Password Reset Request – Lumora',
      html: `
        <div style="font-family: 'Poppins', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f1ed;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #D9CCBD 0%, #C8BDAA 100%); padding: 45px 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 34px; font-weight: 700; letter-spacing: -0.5px; font-family: 'Playfair Display', serif;">Lumora</h1>
            <p style="margin: 10px 0 0 0; font-size: 13px; font-weight: 500; opacity: 0.95; letter-spacing: 0.5px; text-transform: uppercase;">Password Reset</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 45px 35px; background-color: #ffffff; margin: 0; border-radius: 0;">
            <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #5A4A3F;">Hello,</p>
            
            <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.7; color: #6b5d52; font-weight: 500;">We received a request to reset your Lumora account password. To create a new password and restore access to your account, please use the reset code provided below.</p>
            
            <!-- Reset Code Box -->
            <div style="background: linear-gradient(135deg, #D9CCBD 0%, #C8BDAA 100%); padding: 35px; text-align: center; margin: 36px 0; border-radius: 12px; box-shadow: 0 8px 24px rgba(217, 204, 189, 0.15);">
              <p style="margin: 0 0 16px 0; font-size: 11px; color: #ffffff; font-weight: 600; text-transform: uppercase; letter-spacing: 1.2px; opacity: 0.95;">Enter This Reset Code</p>
              <p style="margin: 0; font-size: 40px; font-weight: 700; color: #ffffff; letter-spacing: 6px; font-family: 'Courier New', 'Courier', monospace; line-height: 1.2;">${resetCode}</p>
            </div>
            
            <div style="background-color: #f9f7f5; border-left: 4px solid #D9CCBD; padding: 14px 16px; margin: 0 0 24px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 13px; color: #5A4A3F; font-weight: 600;">⏱ This code expires in 10 minutes</p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #9B8B7F;">For your security, never share this code with anyone. Lumora staff will never request it.</p>
            </div>
            
            <p style="margin: 0 0 0 0; font-size: 14px; line-height: 1.7; color: #6b5d52;">Didn't request a password reset? Your account remains secure. If this wasn't you, please disregard this email.</p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9f7f5; text-align: center; padding: 28px 20px; border-top: 1px solid #e8ddd0;">
            <p style="margin: 0 0 8px 0; color: #9B8B7F; font-size: 12px; font-weight: 500;">© 2026 Lumora, Inc. All rights reserved.</p>
            <p style="margin: 0; font-size: 11px; color: #b5a399; font-style: italic;">This is an automated message—please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent successfully to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};
