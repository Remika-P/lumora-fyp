import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const UserIcon = ({ size = 20, color = '#9B8B7E' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21a8 8 0 0 0-16 0"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MailIcon = ({ size = 20, color = '#9B8B7E' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const LockIcon = ({ size = 20, color = '#9B8B7E' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const CheckIcon = ({ size = 20, color = '#2E7D32' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const EyeIcon = ({ size = 20, color = '#D9CCBD' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = ({ size = 20, color = '#D9CCBD' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    fontFamily: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '0',
    position: 'relative',
    overflow: 'hidden',
  },
  blurElement1: {
    position: 'absolute',
    width: '800px',
    height: '800px',
    background: 'radial-gradient(circle, rgba(200, 189, 170, 0.15) 0%, rgba(200, 189, 170, 0.05) 40%, rgba(200, 189, 170, 0) 70%)',
    borderRadius: '50%',
    top: '-300px',
    left: '-300px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
    animation: 'softPulse 8s ease-in-out infinite',
  },
  blurElement2: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(200, 189, 170, 0.12) 0%, rgba(200, 189, 170, 0.04) 50%, rgba(200, 189, 170, 0) 70%)',
    borderRadius: '50%',
    bottom: '-200px',
    right: '-200px',
    filter: 'blur(50px)',
    pointerEvents: 'none',
    animation: 'softPulse 10s ease-in-out infinite 1s',
  },
  blurElement3: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(232, 224, 208, 0.1) 0%, rgba(232, 224, 208, 0) 70%)',
    borderRadius: '50%',
    top: '20%',
    right: '5%',
    filter: 'blur(45px)',
    pointerEvents: 'none',
  },
  wrapper: {
    width: '100%',
    height: '100vh',
    padding: 'clamp(16px, 3vw, 32px)',
    animation: 'fadeIn 0.9s ease-out',
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
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
    width: '100%',
    maxWidth: '620px',
    padding: 'clamp(30px, 3.7vh, 42px) clamp(30px, 3.8vw, 44px) clamp(26px, 3.2vh, 36px)',
    backgroundColor: '#FFFFFF',
    borderRadius: '32px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
    border: 'none',
    animation: 'slideUp 0.9s ease-out',
    position: 'relative',
  },
  cardTitle: {
    textAlign: 'center',
    margin: '0 0 8px 0',
    fontSize: '38px',
    fontWeight: '600',
    color: '#5A4A3F',
    letterSpacing: '-1.2px',
    fontFamily: '"Playfair Display", serif',
    lineHeight: '1.2',
  },
  cardSubtitle: {
    textAlign: 'center',
    margin: '0 0 32px 0',
    fontSize: '14.5px',
    color: '#9B8B7F',
    fontWeight: '500',
    lineHeight: '1.38',
    letterSpacing: '0.2px',
    opacity: 0.85,
    fontFamily: '"Poppins", "Segoe UI", sans-serif',
    fontStyle: 'normal',
  },
  errorMessage: {
    padding: '14px 18px 14px 16px',
    marginBottom: '28px',
    backgroundColor: 'rgba(242, 220, 219, 0.65)',
    border: '1px solid rgba(239, 204, 193, 0.85)',
    borderRadius: '12px',
    color: '#8B3A3A',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'slideDown 0.4s ease-out',
  },
  successMessage: {
    padding: '14px 18px 14px 16px',
    marginBottom: '28px',
    backgroundColor: 'rgba(232, 245, 233, 0.75)',
    border: '1px solid rgba(200, 230, 201, 0.85)',
    borderRadius: '12px',
    color: '#2E5D4F',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'slideDown 0.4s ease-out',
  },
  formGroup: {
    marginBottom: '17px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    marginBottom: '9px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#5A4A3F',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  passwordToggleButton: {
    position: 'absolute',
    right: '14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    color: '#D9CCBD',
    transition: 'color 0.3s ease',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: '#D9CCBD',
    transition: 'color 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    fontSize: '15px',
    border: '2px solid #E8DDD0',
    borderRadius: '16px',
    boxSizing: 'border-box',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    fontFamily: 'inherit',
    backgroundColor: '#FFFFFF',
    color: '#5A4A3F',
    fontWeight: '500',
    letterSpacing: '0.2px',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.01)',
  },
  inputPassword: {
    paddingRight: '48px',
  },
  inputFocus: {
    borderColor: '#D9CCBD',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 0 5px rgba(217, 204, 189, 0.12)',
  },
  inputError: {
    borderColor: '#E8B4AF',
  },
  button: {
    width: '100%',
    padding: '15px 18px',
    marginTop: '8px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#FFFFFF',
    backgroundColor: '#D9CCBD',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
    boxShadow: '0 8px 20px rgba(217, 204, 189, 0.25)',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonHover: {
    backgroundColor: '#C8BDAA',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 32px rgba(217, 204, 189, 0.35)',
  },
  buttonActive: {
    transform: 'translateY(-2px)',
  },
  buttonDisabled: {
    backgroundColor: '#E8DDD0',
    cursor: 'not-allowed',
    opacity: 0.6,
    boxShadow: 'none',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '18px 0 15px 0',
    color: '#D9CCBD',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'linear-gradient(to right, transparent 0%, #E8DDD0 50%, transparent 100%)',
  },
  dividerText: {
    padding: '0 16px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: '#C8BDAA',
  },
  authText: {
    textAlign: 'center',
    marginTop: '14px',
    fontSize: '14px',
    color: '#9B8B7E',
    lineHeight: '1.7',
    fontWeight: '500',
  },
  link: {
    color: '#C8BDAA',
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderBottom: '1.5px solid transparent',
    paddingBottom: '1px',
  },
  linkHover: {
    color: '#9B8B7E',
    borderBottomColor: '#9B8B7E',
  },
};

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [linkHovered, setLinkHovered] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Fill all fields');
      return false;
    }
    if (form.password.length < 8) {
      setError('Password must be 8+ chars');
      return false;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const authCode = credentialResponse.code;

      if (!authCode) {
        setError('Failed to get Google authorization code');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/google-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: authCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Account created! Logging you in...');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } else {
        setError(data.message || 'Google signup failed');
      }
    } catch (err) {
      console.error('Google signup error:', err);
      setError('Cannot connect to server');
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (authError) => {
      console.error('Google signup error:', authError);
      setError('Google signup failed. Please try again.');
      setLoading(false);
    },
    flow: 'auth-code',
    ux_mode: 'popup',
    scope: 'openid email profile',
  });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'OTP sent!');
        setTimeout(() => {
          navigate('/verify-otp', { state: { email: form.email } });
        }, 1200);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      setError('Cannot connect to server');
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle = {
    ...styles.button,
    ...(buttonHover && !loading && styles.buttonHover),
    ...(buttonActive && !loading && styles.buttonActive),
    ...(loading && styles.buttonDisabled),
  };

  const nameInputStyle = {
    ...styles.input,
    ...(nameFocus && styles.inputFocus),
    ...(error && styles.inputError),
  };

  const emailInputStyle = {
    ...styles.input,
    ...(emailFocus && styles.inputFocus),
    ...(error && styles.inputError),
  };

  const passwordInputStyle = {
    ...styles.input,
    ...(passwordFocus && styles.inputFocus),
    ...(error && styles.inputError),
  };

  const confirmInputStyle = {
    ...styles.input,
    ...(confirmFocus && styles.inputFocus),
    ...(error && styles.inputError),
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Playfair+Display:wght@500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,400;0,500;1,400&display=swap');

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes softPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes buttonPulse {
          0%, 100% {
            box-shadow: 0 16px 32px rgba(217, 204, 189, 0.3), 0 0 0 1px rgba(217, 204, 189, 0.2);
          }
          50% {
            box-shadow: 0 16px 32px rgba(217, 204, 189, 0.4), 0 0 0 1px rgba(217, 204, 189, 0.3);
          }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          height: 100%;
          overflow: hidden;
        }

        button:not(:disabled) {
          cursor: pointer;
        }

        button:focus,
        button:focus-visible,
        a:focus,
        a:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }

        a {
          position: relative;
        }

        a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background-color: #D9CCBD;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        a:hover::after {
          width: 100%;
        }

        button[type='button'] {
          transition: all 0.3s ease;
        }

        button[type='button']:not(:disabled):hover {
          opacity: 0.8;
          transform: scale(1.05);
        }

        input::placeholder {
          color: #D9CCBD;
          opacity: 0.6;
        }

        input:autofill,
        input:autofill:hover,
        input:autofill:focus,
        input:autofill:active {
          -webkit-box-shadow: 0 0 0 30px #FFFFFF inset !important;
          box-shadow: 0 0 0 30px #FFFFFF inset !important;
        }

        input:autofill {
          -webkit-text-fill-color: #5A4A3F !important;
        }

        @keyframes shimmer {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }

        /* Hide scrollbar for Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Hide scrollbar for Chrome/Safari/Edge */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        /* Alternative: Hide scrollbar by positioning off-screen */
        div[style*="overflow"]::-webkit-scrollbar {
          display: none;
          width: 0 !important;
          height: 0 !important;
        }
      `}</style>

      <div style={styles.wrapper} className="scrollbar-hide">
        <div style={styles.header}></div>

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

          <h1 style={styles.cardTitle}>Create Account</h1>
          <p style={styles.cardSubtitle}>Join us to start planning your décor</p>

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

          <form onSubmit={submit}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <UserIcon size={20} />
                </div>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                  style={nameInputStyle}
                  disabled={loading}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <MailIcon size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  style={emailInputStyle}
                  disabled={loading}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <LockIcon size={20} />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={form.password}
                  placeholder="••••••••••"
                  onChange={handleChange}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  style={{ ...passwordInputStyle, ...styles.inputPassword }}
                  disabled={loading}
                />
                <button
                  type="button"
                  style={styles.passwordToggleButton}
                  onClick={() => setShowPass(!showPass)}
                  tabIndex="-1"
                  disabled={loading}
                >
                  {showPass ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="confirm" style={styles.label}>Confirm Password</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <LockIcon size={20} />
                </div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirm"
                  name="confirm"
                  value={form.confirm}
                  placeholder="••••••••••"
                  onChange={handleChange}
                  onFocus={() => setConfirmFocus(true)}
                  onBlur={() => setConfirmFocus(false)}
                  style={{ ...confirmInputStyle, ...styles.inputPassword }}
                  disabled={loading}
                />
                <button
                  type="button"
                  style={styles.passwordToggleButton}
                  onClick={() => setShowConfirm(!showConfirm)}
                  tabIndex="-1"
                  disabled={loading}
                >
                  {showConfirm ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

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
                  Creating...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <div style={styles.dividerText}>or</div>
            <div style={styles.dividerLine}></div>
          </div>

          <button
            type="button"
            onClick={() => googleSignup()}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px 18px',
              marginBottom: '32px',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: '"Poppins", sans-serif',
              color: '#5A4A3F',
              backgroundColor: '#FFFFFF',
              border: '2px solid #E8DDD0',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              letterSpacing: '0.2px',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(217, 204, 189, 0.15)',
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#F5F1ED')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#FFFFFF')}
          >
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.3 0 6.2 1.1 8.5 3.2l6.3-6.3C34.9 2.8 29.8.5 24 .5 14.8.5 6.8 5.8 2.8 13.5l7.7 6C12.3 13.5 17.7 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-2.8-.4-4.1H24v8h12.9c-.3 2-1.8 5-5.1 7l7.8 6c4.6-4.3 7.3-10.6 7.3-16.9z"/>
              <path fill="#FBBC05" d="M10.5 28.5c-.5-1.5-.8-3-.8-4.5s.3-3 .8-4.5l-7.7-6C1 17.1 0 20.5 0 24s1 6.9 2.8 10.5l7.7-6z"/>
              <path fill="#34A853" d="M24 47.5c6.3 0 11.6-2.1 15.5-5.7l-7.8-6c-2 1.4-4.6 2.2-7.7 2.2-6.3 0-11.7-4-13.5-9.5l-7.7 6C6.8 42.2 14.8 47.5 24 47.5z"/>
            </svg>
            Sign up with Google
          </button>

          <p style={styles.authText}>
            Already have an account?{' '}
            <a
              href="/login"
              style={{
                ...styles.link,
                ...(linkHovered === 'signin' ? styles.linkHover : {}),
              }}
              onMouseEnter={() => setLinkHovered('signin')}
              onMouseLeave={() => setLinkHovered(null)}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;