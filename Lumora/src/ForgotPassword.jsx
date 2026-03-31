import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBaseStyles, animationStyles, authColors } from './authStyles';
import { MailIcon, CheckIcon, ArrowLeftIcon } from './icons';

const ForgotPassword = () => {
  const styles = createBaseStyles();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Reset code sent! Check your email.');
        setTimeout(() => {
          navigate('/verify-otp', { state: { email, isForgotPassword: true } });
        }, 1500);
      } else {
        setError(data.message || 'Failed to send reset code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const emailInputStyle = {
    ...styles.input,
    ...(emailFocus && styles.inputFocus),
    ...(error && styles.inputError),
  };

  const buttonStyle = {
    ...styles.button,
    ...(buttonHover && !loading && styles.buttonHover),
    ...(buttonActive && !loading && styles.buttonActive),
    ...(loading && styles.buttonDisabled),
  };

  return (
    <div style={styles.container}>
      <style>{animationStyles}</style>

      {/* Decorative blur elements */}
      <div style={styles.blurElement1}></div>
      <div style={styles.blurElement2}></div>
      <div style={styles.blurElement3}></div>

      <div style={styles.wrapper}>
        <div style={styles.card}>
          {/* Back to Sign In Link */}
          <div style={{ marginBottom: '32px' }}>
            <a
              href="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                ...styles.link,
                ...(linkHovered ? styles.linkHover : {}),
                fontSize: '13px',
              }}
              onMouseEnter={() => setLinkHovered(true)}
              onMouseLeave={() => setLinkHovered(false)}
            >
              <ArrowLeftIcon size={16} color={authColors.primaryDark} />
              Back to Sign In
            </a>
          </div>

          {/* Header */}
          <h1 style={styles.cardTitle}>Reset Password</h1>
          <p style={styles.cardSubtitle}>Enter your email address and we'll send you a code to reset your password</p>

          {/* Messages */}
          {error && (
            <div style={styles.errorMessage}>
              <span style={{ flexShrink: 0 }}>✕</span>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div style={styles.successMessage}>
              <CheckIcon size={18} color={authColors.success} />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <MailIcon size={20} color={authColors.textLight} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  placeholder="you@example.com"
                  style={emailInputStyle}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Send Reset Code Button */}
            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
              onMouseEnter={() => !loading && setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              onMouseDown={() => !loading && setButtonActive(true)}
              onMouseUp={() => setButtonActive(false)}
            >
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                  Sending...
                </span>
              ) : (
                'Send Reset Code'
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <div style={styles.dividerText}>or</div>
            <div style={styles.dividerLine}></div>
          </div>

          {/* Sign Up Link */}
          <p style={styles.authText}>
            Don't have an account?{' '}
            <a
              href="/signup"
              style={{
                ...styles.link,
              }}
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
