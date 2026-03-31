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
      subject: 'Lumora - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
            <h1>Lumora</h1>
            <p>Email Verification</p>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #333;">Hello,</p>
            <p style="font-size: 14px; color: #555;">Thank you for signing up to Lumora! To complete your registration, please verify your email address using the OTP below.</p>
            
            <div style="background-color: #fff; border: 2px solid #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
              <p style="margin: 0; font-size: 12px; color: #999; text-transform: uppercase;">Your Verification Code</p>
              <p style="margin: 10px 0; font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${otp}</p>
            </div>
            
            <p style="font-size: 12px; color: #999;">This OTP will expire in 10 minutes.</p>
            <p style="font-size: 14px; color: #555;">If you did not sign up for this account, please ignore this email.</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #999; text-align: center;">© 2024 Lumora. All rights reserved.</p>
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
