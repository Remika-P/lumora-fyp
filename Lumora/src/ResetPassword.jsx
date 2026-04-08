import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBaseStyles, animationStyles, authColors } from './authStyles';
import { LockIcon, CheckIcon, ArrowLeftIcon, EyeIcon, EyeOffIcon } from './icons';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ResetPassword = () => {
  const baseStyles = createBaseStyles();
  const styles = {
    ...baseStyles,
    wrapper: {
      ...baseStyles.wrapper,
      maxWidth: '620px',
      maxHeight: 'calc(100vh - 20px)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
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
      minHeight: 'auto',
    },
    cardTitle: {
      ...baseStyles.cardTitle,
      margin: '0 0 12px 0',
      fontSize: '40px',
      lineHeight: '1.2',
    },
    cardSubtitle: {
      ...baseStyles.cardSubtitle,
      margin: '0 0 30px 0',
      fontSize: '15px',
      lineHeight: '1.65',
      letterSpacing: '0.4px',
      opacity: 0.85,
    },
    formGroup: {
      ...baseStyles.formGroup,
      marginBottom: '22px',
    },
    backLinkWrap: {
      marginBottom: '20px',
    },
    logo: {
      width: '96px',
      height: '96px',
      margin: '-8px auto 30px',
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
    button: {
      ...baseStyles.button,
      marginTop: '6px',
    },
    divider: {
      ...baseStyles.divider,
      margin: '30px 0 22px 0',
    },
    authText: {
      ...baseStyles.authText,
      marginTop: '20px',
    },
  };

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  if (!email) {
    return (
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.card}>
            <p style={{ color: authColors.error }}>Error: Email not found. Please start the password reset process again.</p>
            <a href="/forgot-password" style={styles.link}>Back to Forgot Password</a>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { newPassword, confirmPassword } = formData;

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordInputStyle = {
    ...styles.input,
    paddingRight: '48px',
  };

  const confirmInputStyle = {
    ...styles.input,
    paddingRight: '48px',
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

      <div style={styles.wrapper} className="scrollbar-hide">
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          zIndex: 10,
        }}>
          <a
            href="/forgot-password"
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
            Back
          </a>
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

          {/* Header */}
          <h1 style={styles.cardTitle}>Create New Password</h1>
          <p style={styles.cardSubtitle}>Enter a new password for your account. Make sure it's strong and secure.</p>

          {/* Messages */}
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

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div style={styles.formGroup}>
              <label htmlFor="newPassword" style={styles.label}>New Password</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <LockIcon size={20} color={authColors.textLight} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  style={passwordInputStyle}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggleButton}
                  disabled={loading}
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div style={styles.formGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <LockIcon size={20} color={authColors.textLight} />
                </div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  style={confirmInputStyle}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={styles.passwordToggleButton}
                  disabled={loading}
                >
                  {showConfirm ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
            </div>

            {/* Reset Password Button */}
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
                  Resetting...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
