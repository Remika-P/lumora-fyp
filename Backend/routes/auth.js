import express from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { sendOTPEmail, sendPasswordResetEmail } from '../utils/emailService.js';

const router = express.Router();

const googleOAuthClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'postmessage'
);

const getGoogleUserFromAuthCode = async (code) => {
  if (!code) {
    throw new Error('Please provide Google authorization code');
  }

  const { tokens } = await googleOAuthClient.getToken(code);

  if (!tokens?.id_token && !tokens?.access_token) {
    throw new Error('Failed to exchange Google authorization code');
  }

  // Prefer verified identity from ID token.
  if (tokens.id_token) {
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload.email_verified) {
      throw new Error('Google account email is not verified');
    }

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  }

  // Fallback: use access token userinfo if ID token is unavailable.
  const googleResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });

  if (!googleResponse.ok) {
    throw new Error('Invalid Google authorization code');
  }

  const googleUser = await googleResponse.json();

  if (!googleUser?.email) {
    throw new Error('Google profile did not return an email');
  }

  return {
    email: googleUser.email,
    name: googleUser.name,
    picture: googleUser.picture,
  };
};

// Helper function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Sign up - Send OTP
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Send OTP via email
    await sendOTPEmail(email, otp);

    // Create temporary user (not verified)
    const tempUser = new User({
      name,
      email,
      password,
      otp,
      otpExpiry,
      isVerified: false,
    });
    await tempUser.save();

    res.status(200).json({
      message: 'OTP sent to your email. Please verify to complete signup.',
      email,
      userId: tempUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify OTP and complete signup
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ message: 'Please provide email and OTP' });
    }

    // Find user with OTP
    const user = await User.findOne({ email }).select('+otp +otpExpiry');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    // Check if OTP is correct
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP has expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Mark user as verified and remove OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Email verified successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide email' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Send OTP via email
    await sendOTPEmail(email, otp);

    // Update user with new OTP
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    res.status(200).json({ message: 'OTP resent to your email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email first. Check your inbox for the OTP.' });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Google Login
router.post('/google-login', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Please provide Google authorization code' });
    }

    const { email, name, picture } = await getGoogleUserFromAuthCode(code);

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        name: name || email.split('@')[0],
        email,
        password: Math.random().toString(36).slice(-16), // Random password for Google users
        isVerified: true, // Google users are verified by default
        profilePicture: picture,
        loginMethod: 'google',
      });
      await user.save();
    } else {
      // Update profile picture if not set
      if (!user.profilePicture && picture) {
        user.profilePicture = picture;
        user.loginMethod = 'google';
        await user.save();
      }
    }

    // Create JWT token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Google login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(400).json({ message: error.message || 'Google login failed. Please try again.' });
  }
});

// Google Signup
router.post('/google-signup', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Please provide Google authorization code' });
    }

    const { email, name, picture } = await getGoogleUserFromAuthCode(code);

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists, just log them in
      const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.json({
        message: 'User already exists. Logged in successfully.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: jwtToken,
      });
    }

    // Create new user
    user = new User({
      name: name || email.split('@')[0],
      email,
      password: Math.random().toString(36).slice(-16), // Random password for Google users
      isVerified: true, // Google users are verified by default
      profilePicture: picture,
      loginMethod: 'google',
    });
    await user.save();

    // Create JWT token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'Google signup successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error('Google signup error:', error);
    res.status(400).json({ message: error.message || 'Google signup failed. Please try again.' });
  }
});

// Forgot Password - Send reset code
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email address' });
    }

    // Generate reset code (6 digits)
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetCode;
    user.resetPasswordTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    // Send reset code via email
    await sendPasswordResetEmail(email, resetCode);

    res.status(200).json({ message: 'Reset code sent successfully. Please check your email.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Failed to send reset code. Please try again later.' });
  }
});

// Verify reset code
router.post('/verify-reset-code', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email and code are required' });
    }

    const user = await User.findOne({ email }).select('+resetPasswordToken +resetPasswordTokenExpiry');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.resetPasswordToken !== code) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    if (new Date() > user.resetPasswordTokenExpiry) {
      return res.status(400).json({ message: 'Reset code has expired' });
    }

    res.status(200).json({ message: 'Reset code verified successfully' });
  } catch (error) {
    console.error('Verify reset code error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully. You can now login with your new password.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Verify reset OTP (alias for verify-reset-code to support forgot password flow)
router.post('/verify-reset-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email }).select('+resetPasswordToken +resetPasswordTokenExpiry');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.resetPasswordToken !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > user.resetPasswordTokenExpiry) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify reset OTP error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Resend reset OTP for forgot password
router.post('/resend-reset-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate new reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetCode;
    user.resetPasswordTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    // Send reset code via email
    await sendPasswordResetEmail(email, resetCode);

    res.status(200).json({ message: 'Reset code resent to your email' });
  } catch (error) {
    console.error('Resend reset OTP error:', error);
    res.status(500).json({ message: error.message || 'Failed to resend reset code' });
  }
});

export default router;
