import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
    padding: '0',
  },
  wrapper: {
    width: '100%',
    maxWidth: '440px',
    animation: 'fadeIn 0.6s ease-out',
  },
  header: {
    textAlign: 'center',
    marginBottom: '0',
  },
  card: {
    width: '100%',
    padding: '40px 40px 48px 40px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    boxShadow: '0 24px 48px rgba(107, 93, 80, 0.12), 0 8px 16px rgba(107, 93, 80, 0.06)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(217, 204, 189, 0.4)',
  },
  logo: {
    width: '100px',
    height: '100px',
    margin: '0 auto 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    boxShadow: '0 8px 24px rgba(217, 204, 189, 0.2)',
    animation: 'slideDown 0.6s ease-out',
    overflow: 'hidden',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  cardTitle: {
    textAlign: 'center',
    margin: '0 0 12px 0',
    fontSize: '24px',
    fontWeight: '700',
    color: '#5A4A3F',
    letterSpacing: '-0.3px',
  },
  cardSubtitle: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#9B8B7E',
    fontWeight: '400',
    margin: '0 0 8px 0',
  },
  email: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#D9CCBD',
    margin: '0 0 32px 0',
    textAlign: 'center',
  },
  errorMessage: {
    padding: '14px 18px',
    marginBottom: '24px',
    backgroundColor: '#FCE8E6',
    border: '1px solid #EFCCC1',
    borderRadius: '12px',
    color: '#B71C1C',
    fontSize: '13px',
    fontWeight: '500',
  },
  successMessage: {
    padding: '14px 18px',
    marginBottom: '24px',
    backgroundColor: '#E8F5E9',
    border: '1px solid #C8E6C9',
    borderRadius: '12px',
    color: '#2E7D32',
    fontSize: '13px',
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#5A4A3F',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    padding: '16px',
    fontSize: '24px',
    letterSpacing: '8px',
    textAlign: 'center',
    border: '2px solid #E8DDD0',
    borderRadius: '14px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontWeight: '700',
    fontFamily: 'monospace',
    backgroundColor: '#FAFAF9',
    color: '#5A4A3F',
  },
  inputFocus: {
    borderColor: '#D9CCBD',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 0 5px rgba(217, 204, 189, 0.12)',
  },
  button: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#D9CCBD',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    boxShadow: '0 8px 20px rgba(217, 204, 189, 0.25)',
  },
  buttonHover: {
    backgroundColor: '#C8BDAA',
    boxShadow: '0 12px 32px rgba(217, 204, 189, 0.35)',
    transform: 'translateY(-3px)',
  },
  buttonDisabled: {
    backgroundColor: '#E8DDD0',
    cursor: 'not-allowed',
    opacity: 0.6,
    boxShadow: 'none',
  },
  timerBox: {
    marginTop: '32px',
    padding: '24px',
    backgroundColor: '#F9F7F5',
    borderRadius: '14px',
    border: '1px solid #E8DDD0',
  },
  timerText: {
    fontSize: '14px',
    color: '#9B8B7E',
    margin: '0 0 16px 0',
    fontWeight: '500',
  },
  timerValue: {
    fontWeight: '700',
    fontSize: '18px',
    color: '#D9CCBD',
  },
  resendButton: {
    backgroundColor: 'transparent',
    border: '2px solid #D9CCBD',
    color: '#D9CCBD',
    padding: '12px 16px',
    borderRadius: '14px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    width: '100%',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  resendButtonHover: {
    backgroundColor: '#D9CCBD',
    color: 'white',
    boxShadow: '0 8px 20px rgba(217, 204, 189, 0.25)',
  },
  resendButtonDisabled: {
    borderColor: '#E8DDD0',
    color: '#C8BDAA',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  footerText: {
    textAlign: 'center',
    marginTop: '28px',
    fontSize: '14px',
    color: '#9B8B7E',
  },
  link: {
    color: '#D9CCBD',
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
};

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [resendButtonHover, setResendButtonHover] = useState(false);
  const [otpFocus, setOtpFocus] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    // Redirect if no email provided
    if (!email) {
      navigate('/signup');
    }

    // Timer for OTP expiry
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [email, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Email verified successfully! Redirecting...');
        // Store token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('New OTP sent to your email!');
        setTimeLeft(600);
        setOtp('');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const buttonStyle = {
    ...styles.button,
    ...(buttonHover && !loading && styles.buttonHover),
    ...(loading && styles.buttonDisabled),
  };

  const otpInputStyle = {
    ...styles.input,
    ...(otpFocus && styles.inputFocus),
  };

  const resendButtonStyle = {
    ...styles.resendButton,
    ...(resendButtonHover && !resendLoading && !(timeLeft > 300 || resendLoading) && styles.resendButtonHover),
    ...((resendLoading || timeLeft > 300) && styles.resendButtonDisabled),
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
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
      `}</style>

      <div style={styles.wrapper}>
        <div style={styles.header}>
        </div>

        <div style={styles.card}>
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

          <h2 style={styles.cardTitle}>Verify Your Email</h2>
          <p style={styles.cardSubtitle}>We sent a 6-digit code to</p>
          <p style={styles.email}>{email}</p>

          {error && <div style={styles.errorMessage}>✕ {error}</div>}
          {success && <div style={styles.successMessage}>✓ {success}</div>}

          <form onSubmit={handleVerifyOTP}>
            <div style={styles.formGroup}>
              <label htmlFor="otp" style={styles.label}>Enter OTP Code</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => {
                  // Only allow digits and max 6 characters
                  const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                  setOtp(value);
                }}
                onFocus={() => setOtpFocus(true)}
                onBlur={() => setOtpFocus(false)}
                placeholder="000000"
                maxLength="6"
                required
                style={otpInputStyle}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || timeLeft === 0}
              style={buttonStyle}
              onMouseEnter={() => !loading && timeLeft !== 0 && setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              {loading ? '⟳ Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <div style={styles.timerBox}>
            <p style={styles.timerText}>
              OTP expires in:{' '}
              <span style={{
                ...styles.timerValue,
                color: timeLeft > 120 ? '#D9CCBD' : '#E57373'
              }}>
                {formatTime(timeLeft)}
              </span>
            </p>
            <button
              onClick={handleResendOTP}
              disabled={resendLoading || timeLeft > 300}
              style={resendButtonStyle}
              onMouseEnter={() => !(resendLoading || timeLeft > 300) && setResendButtonHover(true)}
              onMouseLeave={() => setResendButtonHover(false)}
            >
              {resendLoading ? '⟳ Resending...' : timeLeft > 300 ? 'Resend in ' + Math.floor((600 - timeLeft) / 60) + ' min' : 'Resend OTP'}
            </button>
          </div>

          <p style={styles.footerText}>
            <a href="/signup" style={styles.link}>
              ← Back to Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
