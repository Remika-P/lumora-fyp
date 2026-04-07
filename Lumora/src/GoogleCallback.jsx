import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GoogleCallback = ({ setIsAuthenticated }) => {
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState('Completing Google sign-in...');
  const navigate = useNavigate();

  useEffect(() => {
    const completeGoogleLogin = async () => {
      const token = searchParams.get('token');
      const encodedUser = searchParams.get('user');
      const oauthError = searchParams.get('error');
      const intent = searchParams.get('intent');
      const targetRoute = intent === 'signup' ? '/signup' : '/login';

      if (oauthError) {
        navigate(targetRoute, {
          replace: true,
          state: { errorMessage: oauthError },
        });
        return;
      }

      if (!token || !encodedUser) {
        navigate(targetRoute, {
          replace: true,
          state: { errorMessage: 'Google sign-in failed. Missing auth payload.' },
        });
        return;
      }

      try {
        const parsedUser = JSON.parse(encodedUser);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(parsedUser));
        setIsAuthenticated(true);
        setStatusMessage('Google sign-in successful. Redirecting...');

        setTimeout(() => {
          navigate('/', { replace: true });
        }, 500);
      } catch (error) {
        navigate(targetRoute, {
          replace: true,
          state: { errorMessage: 'Google sign-in failed. Invalid user payload.' },
        });
      }
    };

    completeGoogleLogin();
  }, [navigate, searchParams, setIsAuthenticated]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
        color: '#5A4A3F',
        fontFamily: '"Poppins", sans-serif',
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: '0.2px',
      }}
    >
      {statusMessage}
    </div>
  );
};

export default GoogleCallback;
