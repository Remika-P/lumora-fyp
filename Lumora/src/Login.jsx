import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icon components (simple SVG icons)
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
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    fontFamily: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  // Premium decorative blur elements with glow
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
    maxWidth: '480px',
    animation: 'fadeIn 0.9s ease-out',
    position: 'relative',
    zIndex: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: '0',
  },
  logo: {
    width: '100px',
    height: '100px',
    margin: '0 auto 60px',
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
    padding: '80px 52px 56px 52px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '32px',
    boxShadow: '0 60px 100px rgba(107, 93, 80, 0.18), 0 20px 40px rgba(107, 93, 80, 0.1), 0 4px 12px rgba(107, 93, 80, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(0, 0, 0, 0.02)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(217, 204, 189, 0.5)',
    animation: 'slideUp 0.9s ease-out',
    position: 'relative',
  },
  cardTitle: {
    textAlign: 'center',
    margin: '0 0 32px 0',
    fontSize: '40px',
    fontWeight: '600',
    color: '#5A4A3F',
    letterSpacing: '-1.2px',
    fontFamily: '"Playfair Display", serif',
    lineHeight: '1.2',
  },
  cardSubtitle: {
    textAlign: 'center',
    margin: '0 0 48px 0',
    fontSize: '15px',
    color: '#9B8B7F',
    fontWeight: '400',
    lineHeight: '1.65',
    letterSpacing: '0.4px',
    opacity: 0.85,
  },
  errorMessage: {
    padding: '14px 18px 14px 16px',
    marginBottom: '28px',
    backgroundColor: 'rgba(242, 220, 219, 0.6)',
    border: '1px solid rgba(239, 204, 193, 0.8)',
    borderRadius: '16px',
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
    backgroundColor: 'rgba(232, 245, 233, 0.7)',
    border: '1px solid rgba(200, 230, 201, 0.8)',
    borderRadius: '16px',
    color: '#2E5D4F',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'slideDown 0.4s ease-out',
  },
  formGroup: {
    marginBottom: '28px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
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
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.02), inset 0 -1px 2px rgba(0, 0, 0, 0.01)',
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
    padding: '16px 18px',
    marginTop: '12px',
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
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    marginBottom: '28px',
    color: '#8B7B6F',
  },
  customCheckbox: {
    position: 'relative',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #D9CCBD',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    backgroundColor: '#FFFFFF',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  customCheckboxChecked: {
    backgroundColor: '#D9CCBD',
    borderColor: '#D9CCBD',
    boxShadow: '0 4px 12px rgba(217, 204, 189, 0.3), inset 0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  nativeCheckbox: {
    display: 'none',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '40px 0 32px 0',
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
    marginTop: '32px',
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [linkHovered, setLinkHovered] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful! Redirecting...');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
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

  const getIconColor = (isFocused, isError) => {
    if (isError) return '#E8B4AF';
    if (isFocused) return '#D9CCBD';
    return '#C8BDAA';
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

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

        button:not(:disabled) {
          cursor: pointer;
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
      `}</style>

      {/* Decorative blur elements */}
      <div style={styles.blurElement1}></div>
      <div style={styles.blurElement2}></div>
      <div style={styles.blurElement3}></div>

      <div style={styles.wrapper}>
        <div style={styles.header}></div>

        <div style={styles.card}>
          {/* Logo */}
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

          {/* Header */}
          <h1 style={styles.cardTitle}>Welcome Back</h1>
          
          {/* Messages */}
          {error && (
            <div style={styles.errorMessage}>
              <span style={{ flexShrink: 0 }}>✕</span>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div style={styles.successMessage}>
              <CheckIcon size={18} color="#2E5D4F" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <div style={{
                  ...styles.inputIcon,
                  color: '#D9CCBD',
                }}>
                  <MailIcon size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  style={emailInputStyle}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <div style={{
                  ...styles.inputIcon,
                  color: '#D9CCBD',
                }}>
                  <LockIcon size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  placeholder="••••••••••"
                  style={{...passwordInputStyle, ...styles.inputPassword}}
                  disabled={loading}
                />
                <button
                  type="button"
                  style={styles.passwordToggleButton}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                  disabled={loading}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div style={styles.checkboxContainer}>
              <label htmlFor="remember" style={{ ...styles.customCheckbox, ...(!loading ? {} : { opacity: 0.6 }) }}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.nativeCheckbox}
                  disabled={loading}
                />
                <div style={{
                  ...styles.customCheckbox,
                  ...(rememberMe ? styles.customCheckboxChecked : {}),
                }}>
                  {rememberMe && <CheckIcon size={14} color="#FFFFFF" />}
                </div>
              </label>
              <label htmlFor="remember" style={{ cursor: 'pointer', marginBottom: 0, fontWeight: '500' }}>
                Keep me signed in
              </label>
            </div>

            {/* Sign In Button */}
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
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Forgot Password Link */}
          <p style={{ ...styles.authText, marginBottom: '24px' }}>
            <a 
              href="/forgot-password"
              style={{
                ...styles.link,
                ...(linkHovered === 'forgot' ? styles.linkHover : {}),
              }}
              onMouseEnter={() => setLinkHovered('forgot')}
              onMouseLeave={() => setLinkHovered(null)}
            >
              Forgot your password?
            </a>
          </p>

          {/* Divider */}
          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <div style={styles.dividerText}>or</div>
            <div style={styles.dividerLine}></div>
          </div>

          {/* Create Account Link */}
          <p style={styles.authText}>
            Don't have an account?{' '}
            <a 
              href="/signup"
              style={{
                ...styles.link,
                ...(linkHovered === 'signup' ? styles.linkHover : {}),
              }}
              onMouseEnter={() => setLinkHovered('signup')}
              onMouseLeave={() => setLinkHovered(null)}
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;