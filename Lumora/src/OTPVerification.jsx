import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBaseStyles, animationStyles, authColors } from './authStyles';
import { CheckIcon } from './icons';

const OTPVerification = () => {
  const styles = createBaseStyles();
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email || '';
  const isForgotPassword = location.state?.isForgotPassword || false;
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    if (pastedData.length === 6) {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isForgotPassword 
        ? 'http://localhost:5000/api/auth/verify-reset-otp'
        : 'http://localhost:5000/api/auth/verify-otp';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP verified successfully!');
        setTimeout(() => {
          if (isForgotPassword) {
            navigate('/reset-password', { state: { email } });
          } else {
            navigate('/login');
          }
        }, 1500);
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    setResendCountdown(60);

    try {
      const endpoint = isForgotPassword
        ? 'http://localhost:5000/api/auth/resend-reset-otp'
        : 'http://localhost:5000/api/auth/resend-otp';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('New code sent to your email!');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        setError(data.message || 'Failed to resend code');
        setResendCountdown(0);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setResendCountdown(0);
    }
  };

  const buttonStyle = {
    ...styles.button,
    ...(buttonHover && !loading && styles.buttonHover),
    ...(buttonActive && !loading && styles.buttonActive),
    ...(loading && styles.buttonDisabled),
  };

  const otpInputStyle = {
    width: '100%',
    padding: '16px 8px',
    fontSize: '24px',
    fontWeight: '700',
    border: `2px solid ${error ? authColors.errorLight : authColors.border}`,
    borderRadius: '12px',
    textAlign: 'center',
    backgroundColor: authColors.white,
    color: authColors.text,
    transition: 'all 0.3s ease',
    outline: 'none',
    boxShadow: error 
      ? 'inset 0 2px 4px rgba(0, 0, 0, 0.02)' 
      : 'inset 0 2px 4px rgba(0, 0, 0, 0.02)',
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
          {/* Header */}
          <h1 style={styles.cardTitle}>Verify Code</h1>
          <p style={styles.cardSubtitle}>
            Enter the 6-digit code we sent to<br />
            <span style={{ fontWeight: '600', color: authColors.text }}>{email}</span>
          </p>

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

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit}>
            {/* OTP Inputs Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '12px',
              marginBottom: '32px',
            }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  style={{
                    ...otpInputStyle,
                    borderColor: error ? authColors.errorLight : (digit ? authColors.primary : authColors.border),
                    backgroundColor: digit ? 'rgba(217, 204, 189, 0.05)' : authColors.white,
                  }}
                  disabled={loading}
                  className="otp-input"
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.some(d => !d)}
              style={{
                ...buttonStyle,
                opacity: otp.some(d => !d) && !loading ? 0.5 : 1,
              }}
              onMouseEnter={() => !loading && !otp.some(d => !d) && setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              onMouseDown={() => !loading && !otp.some(d => !d) && setButtonActive(true)}
              onMouseUp={() => setButtonActive(false)}
            >
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                  Verifying...
                </span>
              ) : (
                'Verify Code'
              )}
            </button>
          </form>

          {/* Resend Code */}
          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '14px',
            color: authColors.textSecondary,
          }}>
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCountdown > 0 || loading}
              style={{
                background: 'none',
                border: 'none',
                color: resendCountdown > 0 ? authColors.textMuted : authColors.primaryDark,
                cursor: resendCountdown > 0 ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                fontSize: '14px',
                padding: '0',
              }}
              onMouseEnter={resendCountdown === 0 ? () => setLinkHovered(true) : undefined}
              onMouseLeave={() => setLinkHovered(false)}
            >
              {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend Code'}
            </button>
          </p>

          {/* Divider */}
          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <div style={styles.dividerText}>or</div>
            <div style={styles.dividerLine}></div>
          </div>

          {/* Back to Login */}
          <p style={styles.authText}>
            <a
              href="/login"
              style={{
                ...styles.link,
                ...(linkHovered ? styles.linkHover : {}),
              }}
              onMouseEnter={() => setLinkHovered(true)}
              onMouseLeave={() => setLinkHovered(false)}
            >
              Back to Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
