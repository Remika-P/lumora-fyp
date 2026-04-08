import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBaseStyles, authColors } from './authStyles';
import { CheckIcon } from './icons';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const VerifyOTP = () => {
  const baseStyles = createBaseStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpExpirySeconds, setOtpExpirySeconds] = useState(600);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [resendHover, setResendHover] = useState(false);
  const [backLinkHover, setBackLinkHover] = useState(false);

  const styles = {
    ...baseStyles,
    container: {
      ...baseStyles.container,
      minHeight: '100vh',
      padding: '20px',
    },
    wrapper: {
      ...baseStyles.wrapper,
      maxWidth: '680px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '0',
    },
    logo: {
      width: '90px',
      height: '90px',
      margin: '-22px auto 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
      boxShadow: '0 12px 36px rgba(217, 204, 189, 0.25)',
      animation: 'slideDown 0.6s ease-out',
      overflow: 'hidden',
      position: 'relative',
    },
    logoImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '24px',
    },
    card: {
      ...baseStyles.card,
      padding: 'clamp(60px, 8.3vh, 78px) clamp(52px, 5.4vw, 64px) clamp(62px, 7.5vh, 76px) clamp(52px, 5.4vw, 64px)',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
      border: 'none',
      overflow: 'hidden',
    },
    cardGlow: {
      display: 'none',
    },
    cardInner: {
      position: 'relative',
      zIndex: 1,
    },
    cardTitle: {
      ...baseStyles.cardTitle,
      margin: '0 0 12px 0',
      fontSize: '40px',
      lineHeight: '1.2',
      textShadow: '0 1px 0 rgba(255, 255, 255, 0.7)',
    },
    cardSubtitle: {
      ...baseStyles.cardSubtitle,
      margin: '0 0 12px 0',
      fontSize: '15px',
      fontWeight: '400',
      letterSpacing: '0.4px',
      lineHeight: '1.65',
      opacity: 0.85,
    },
    email: {
      textAlign: 'center',
      margin: '0 0 30px 0',
      fontSize: '15px',
      color: authColors.text,
      fontWeight: '600',
      lineHeight: '1.5',
      letterSpacing: '0.15px',
    },
    otpTimerBox: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '12px 20px',
      borderRadius: '14px',
      background: 'linear-gradient(135deg, rgba(217, 204, 189, 0.25) 0%, rgba(200, 189, 170, 0.15) 100%)',
      border: '2px solid rgba(217, 204, 189, 0.4)',
      boxShadow: '0 8px 20px rgba(217, 204, 189, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(10px)',
    },
    otpTimerLabel: {
      color: authColors.textSecondary,
      fontWeight: '600',
      fontSize: '13px',
      letterSpacing: '0.3px',
    },
    otpTimerValue: {
      color: authColors.primaryDark,
      fontWeight: '800',
      fontSize: '18px',
      minWidth: '50px',
      textAlign: 'center',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '1.2px',
      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    otpGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '14px',
      marginBottom: '32px',
    },
    otpInput: {
      width: '100%',
      minHeight: '76px',
      padding: '18px 8px',
      fontSize: '24px',
      fontWeight: '700',
      border: `2px solid ${authColors.border}`,
      borderRadius: '18px',
      textAlign: 'center',
      backgroundColor: authColors.white,
      color: authColors.text,
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      outline: 'none',
      boxShadow: 'none',
    },
    divider: {
      ...baseStyles.divider,
      margin: '28px 0 20px 0',
    },
    authText: {
      ...baseStyles.authText,
      marginTop: '22px',
    },
  };

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [resendCountdown]);

  useEffect(() => {
    if (otpExpirySeconds > 0) {
      const timer = setTimeout(() => setOtpExpirySeconds(otpExpirySeconds - 1), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [otpExpirySeconds]);

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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

    if (otpExpirySeconds <= 0) {
      setError('OTP expired. Please resend a new code.');
      return;
    }

    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        setSuccess('Email verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
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
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
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
        setOtpExpirySeconds(600);
      } else {
        setError(data.message || 'Failed to resend code. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const buttonDisabled = loading || otpExpirySeconds <= 0;
  const otpCode = otp.join('');

  const buttonStyle = {
    ...styles.button,
    opacity: buttonDisabled ? 0.6 : 1,
    cursor: buttonDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: buttonActive ? authColors.primaryDark : buttonHover && !buttonDisabled ? 'rgba(139, 125, 107, 0.9)' : authColors.primary,
    transform: buttonActive ? 'scale(0.98)' : 'scale(1)',
    boxShadow: buttonHover && !buttonDisabled ? '0 16px 40px rgba(139, 125, 107, 0.3)' : '0 8px 20px rgba(139, 125, 107, 0.2)',
  };

  const resendDisabled = resendCountdown > 0 || loading;
  const resendStyle = {
    ...styles.authText,
    color: resendDisabled ? authColors.textSecondary : authColors.primary,
    cursor: resendDisabled ? 'not-allowed' : 'pointer',
    opacity: resendDisabled ? 0.6 : 1,
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontSize: '14px',
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .otp-input:focus {
          border-color: ${authColors.primary} !important;
          box-shadow: 0 0 0 3px rgba(217, 204, 189, 0.1) !important;
        }

        .otp-input.filled {
          box-shadow: none;
        }
      `}</style>

      <div style={styles.blurElement1}></div>
      <div style={styles.blurElement2}></div>
      <div style={styles.blurElement3}></div>

      <div style={styles.wrapper} className="scrollbar-hide">
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          zIndex: 10,
        }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: authColors.primary,
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.3px',
              transition: 'all 0.3s ease',
              padding: '8px 12px',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(217, 204, 189, 0.1)';
              e.currentTarget.style.color = authColors.primaryDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = authColors.primary;
            }}
          >
            <span style={{ fontSize: '18px' }}>←</span>
            Back to Sign Up
          </a>
        </div>

        <div style={styles.card}>
          <div style={styles.cardInner}>
            <div style={styles.logo}>
              <img
                src="/Lumora.jpg"
                alt="Lumora"
                style={styles.logoImg}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.textContent = 'L';
                }}
              />
            </div>

            <h1 style={styles.cardTitle}>Verify Code</h1>
            <p style={styles.cardSubtitle}>Enter the 6-digit code we sent to</p>
            <p style={styles.email}>{email}</p>

            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 24px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(217, 204, 189, 0.25) 0%, rgba(200, 189, 170, 0.15) 100%)',
              border: '2px solid rgba(217, 204, 189, 0.4)',
              boxShadow: '0 8px 20px rgba(217, 204, 189, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
            }}>
              <span style={{
                color: authColors.textSecondary,
                fontWeight: '600',
                fontSize: '14px',
                letterSpacing: '0.3px',
              }}>Expires in</span>
              <span style={{
                color: authColors.primaryDark,
                fontWeight: '800',
                fontSize: '24px',
                minWidth: '60px',
                textAlign: 'center',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '1.5px',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}>{formatCountdown(otpExpirySeconds)}</span>
            </div>
            </div>

            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                marginBottom: '24px',
                backgroundColor: '#FDE8E8',
                border: '1px solid #F5C6C0',
                borderRadius: '10px',
                color: '#C85555',
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '0.3px',
              }}>
                <span style={{ fontSize: '18px', fontWeight: '600', flexShrink: 0 }}>✕</span>
                <span style={{ lineHeight: '1.4' }}>{error}</span>
              </div>
            )}
            {success && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                marginBottom: '24px',
                backgroundColor: '#E8F5E9',
                border: '1px solid #C8E6C9',
                borderRadius: '10px',
                color: '#2E7D32',
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '0.3px',
              }}>
                <CheckIcon size={18} color="#2E7D32" style={{ flexShrink: 0 }} />
                <span style={{ lineHeight: '1.4' }}>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={styles.otpGrid}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    style={{
                      ...styles.otpInput,
                      borderColor: error ? authColors.errorLight : (digit ? authColors.primary : authColors.border),
                      backgroundColor: digit ? 'rgba(217, 204, 189, 0.05)' : authColors.white,
                    }}
                    disabled={loading}
                    className={`otp-input ${digit ? 'filled' : ''}`}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={buttonDisabled}
                style={buttonStyle}
                onMouseEnter={() => !buttonDisabled && setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
                onMouseDown={() => !buttonDisabled && setButtonActive(true)}
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

            <p style={{ ...styles.authText, marginTop: '12px' }}>
              Didn't receive the code?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (!resendDisabled) {
                    handleResend();
                  }
                }}
                style={resendStyle}
                onMouseEnter={() => !resendDisabled && setResendHover(true)}
                onMouseLeave={() => setResendHover(false)}
              >
                {resendCountdown > 0 ? `Resend Code (${resendCountdown}s)` : 'Resend Code'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
