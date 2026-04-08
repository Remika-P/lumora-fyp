// Shared Design System for Auth Pages
export const authColors = {
  primary: '#D9CCBD',
  primaryDark: '#C8BDAA',
  primaryLight: '#E8DDD0',
  text: '#5A4A3F',
  textSecondary: '#9B8B7F',
  textMuted: '#8B7B6F',
  textLight: '#D9CCBD',
  iconColor: '#C8BDAA',
  border: '#E8DDD0',
  background: '#F5F1ED',
  backgroundSecondary: '#EAE0D5',
  white: '#FFFFFF',
  error: '#8B3A3A',
  errorLight: '#E8B4AF',
  errorBg: 'rgba(232, 224, 208, 0.3)',
  errorBorder: 'rgba(217, 204, 189, 0.4)',
  success: '#2E5D4F',
  successLight: '#E8F5E9',
  successBorder: 'rgba(200, 230, 201, 0.8)',
};

export const createBaseStyles = () => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${authColors.background} 0%, ${authColors.backgroundSecondary} 100%)`,
    fontFamily: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '20px',
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
    maxWidth: '480px',
    animation: 'fadeIn 0.9s ease-out',
    position: 'relative',
    zIndex: 10,
  },
  card: {
    width: '100%',
    padding: '80px 52px 56px 52px',
    backgroundColor: '#FFFFFF',
    borderRadius: '32px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
    border: 'none',
    animation: 'slideUp 0.9s ease-out',
    position: 'relative',
  },
  cardTitle: {
    textAlign: 'center',
    margin: '0 0 32px 0',
    fontSize: '40px',
    fontWeight: '600',
    color: authColors.text,
    letterSpacing: '-1.2px',
    fontFamily: '"Playfair Display", serif',
    lineHeight: '1.2',
  },
  cardSubtitle: {
    textAlign: 'center',
    margin: '0 0 48px 0',
    fontSize: '15px',
    color: authColors.textSecondary,
    fontWeight: '400',
    lineHeight: '1.65',
    letterSpacing: '0.4px',
    opacity: 0.85,
  },
  errorMessage: {
    padding: '0',
    marginBottom: '28px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0',
    color: authColors.error,
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'slideDown 0.4s ease-out',
  },
  successMessage: {
    padding: '0',
    marginBottom: '28px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0',
    color: authColors.success,
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
    color: authColors.text,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    fontSize: '15px',
    border: `2px solid ${authColors.border}`,
    borderRadius: '16px',
    boxSizing: 'border-box',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    fontFamily: 'inherit',
    backgroundColor: authColors.white,
    color: authColors.text,
    fontWeight: '500',
    letterSpacing: '0.2px',
    boxShadow: 'none',
  },
  inputPassword: {
    paddingRight: '48px',
  },
  inputFocus: {
    borderColor: authColors.primary,
    backgroundColor: authColors.white,
  },
  inputError: {
    borderColor: authColors.errorLight,
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: authColors.textLight,
    transition: 'color 0.3s ease',
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
    color: authColors.textLight,
    transition: 'color 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '16px 18px',
    marginTop: '12px',
    fontSize: '16px',
    fontWeight: '700',
    color: authColors.white,
    backgroundColor: authColors.primary,
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
    boxShadow: `0 8px 20px rgba(217, 204, 189, 0.25)`,
    position: 'relative',
    overflow: 'hidden',
  },
  buttonHover: {
    backgroundColor: authColors.primaryDark,
    transform: 'translateY(-3px)',
    boxShadow: `0 12px 32px rgba(217, 204, 189, 0.35)`,
  },
  buttonActive: {
    transform: 'translateY(-2px)',
  },
  buttonDisabled: {
    backgroundColor: authColors.primaryLight,
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
    color: authColors.textMuted,
  },
  customCheckbox: {
    position: 'relative',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${authColors.primary}`,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    backgroundColor: authColors.white,
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  customCheckboxChecked: {
    backgroundColor: authColors.primary,
    borderColor: authColors.primary,
    boxShadow: `0 4px 12px rgba(217, 204, 189, 0.3), inset 0 1px 3px rgba(0, 0, 0, 0.05)`,
  },
  nativeCheckbox: {
    display: 'none',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '40px 0 32px 0',
    color: authColors.primary,
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: `linear-gradient(to right, transparent 0%, ${authColors.border} 50%, transparent 100%)`,
  },
  dividerText: {
    padding: '0 16px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: authColors.primaryDark,
  },
  authText: {
    textAlign: 'center',
    marginTop: '32px',
    fontSize: '14px',
    color: authColors.textSecondary,
    lineHeight: '1.7',
    fontWeight: '500',
  },
  link: {
    color: authColors.primaryDark,
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderBottom: '1.5px solid transparent',
    paddingBottom: '1px',
  },
  linkHover: {
    color: '#D9CCBD',
  },
});

export const animationStyles = `
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

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
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

  /* OTP Input Animations */
  @keyframes otpFocus {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .otp-input:focus {
    animation: otpFocus 0.3s ease-out;
  }

  /* Text Selection */
  input::selection {
    background-color: rgba(217, 204, 189, 0.3);
    color: #5A4A3F;
  }

  /* Hide scrollbar for Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Hide scrollbar for Chrome/Safari/Edge */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
  }
`;
