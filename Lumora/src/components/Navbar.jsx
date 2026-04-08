import { useState, useRef, useEffect } from "react";

const Navbar = ({ onNavigate, currentView, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    onLogout();
  };

  const handleNavigate = (view) => {
    setDropdownOpen(false);
    onNavigate(view);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.logo}>Lumora</div>
        
        <div style={styles.profileContainer} ref={dropdownRef}>
          <button
            style={{
              ...styles.profileButton,
              ...(dropdownOpen && styles.profileButtonActive),
            }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div style={styles.profileAvatar}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span>{user?.name || 'User'}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                ...styles.chevron,
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#5A4A3F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div style={styles.dropdown}>
              <button
                style={{
                  ...styles.dropdownItem,
                  ...(currentView === 'profile' && styles.dropdownItemActive),
                }}
                onClick={() => handleNavigate('profile')}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="6" r="3" fill="#5A4A3F" />
                  <path
                    d="M3 14C3 11.7909 5.68629 10 9 10C12.3137 10 15 11.7909 15 14"
                    stroke="#5A4A3F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>My Profile</span>
              </button>

              <button
                style={{
                  ...styles.dropdownItem,
                  ...(currentView === 'saved' && styles.dropdownItemActive),
                }}
                onClick={() => handleNavigate('saved')}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3 3H15V15C15 15.5523 14.5523 16 14 16H4C3.44772 16 3 15.5523 3 15V3Z"
                    stroke="#5A4A3F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 3V2C6 1.44772 6.44772 1 7 1H11C11.5523 1 12 1.44772 12 2V3"
                    stroke="#5A4A3F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 7V13"
                    stroke="#5A4A3F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Saved Items</span>
              </button>

              <button
                style={{
                  ...styles.dropdownItem,
                  ...(currentView === 'settings' && styles.dropdownItemActive),
                }}
                onClick={() => handleNavigate('settings')}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="2.5" stroke="#5A4A3F" strokeWidth="1.5" />
                  <path
                    d="M9 2V1M9 17V16M15.5 9.5H16.5M1.5 9.5H2.5"
                    stroke="#5A4A3F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.5 4.5L14.2 3.8M4.5 13.5L3.8 14.2M13.5 13.5L14.2 14.2M4.5 4.5L3.8 3.8"
                    stroke="#5A4A3F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Settings</span>
              </button>

              <div style={styles.divider} />

              <button
                style={styles.dropdownItemLogout}
                onClick={handleLogout}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M2 9H12M12 9L9 6M12 9L9 12"
                    stroke="#D9534F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 2H15C15.5523 2 16 2.44772 16 3V15C16 15.5523 15.5523 16 15 16H13"
                    stroke="#D9534F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    padding: '16px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(217, 204, 189, 0.15)',
  },
  navContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#5A4A3F',
    letterSpacing: '-0.5px',
    fontFamily: '"Playfair Display", serif',
  },
  profileContainer: {
    position: 'relative',
  },
  profileButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 16px',
    paddingRight: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(217, 204, 189, 0.3)',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#5A4A3F',
    transition: 'all 0.3s ease',
  },
  profileButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'rgba(217, 204, 189, 0.6)',
  },
  profileAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#D9CCBD',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: '#5A4A3F',
  },
  chevron: {
    transition: 'transform 0.3s ease',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(107, 93, 80, 0.25), 0 4px 12px rgba(107, 93, 80, 0.1)',
    border: '1px solid rgba(217, 204, 189, 0.4)',
    overflow: 'hidden',
    minWidth: '220px',
    animation: 'slideDown 0.2s ease-out',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#5A4A3F',
    transition: 'all 0.2s ease',
    textAlign: 'left',
  },
  dropdownItemActive: {
    backgroundColor: 'rgba(217, 204, 189, 0.15)',
    color: '#5A4A3F',
  },
  dropdownItemLogout: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#D9534F',
    transition: 'all 0.2s ease',
    textAlign: 'left',
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(217, 204, 189, 0.2)',
    margin: '8px 0',
  },
};

export default Navbar;
