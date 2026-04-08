import { useState, useEffect } from "react";

const Settings = ({ onNavigate }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    privacy: 'public',
    language: 'en',
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        // Use default settings
      }
    }
  }, []);

  const handleToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  const handleSelectChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value,
    };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  return (
    <div style={styles.container}>
      <div style={styles.blurElement1} />
      <div style={styles.blurElement2} />
      
      <div style={styles.header}>
        <div style={styles.logo}>Lumora</div>
      </div>

      <div style={styles.wrapper}>
        <div style={styles.content}>
          <div style={styles.mainCard}>
            <div style={styles.cardHeader}>
              <h1 style={styles.title}>Settings</h1>
              <p style={styles.subtitle}>Manage your preferences and account settings</p>
            </div>
            
            <div style={styles.cardBody}>
              <div style={styles.settingsSection}>
                <h2 style={styles.sectionTitle}>Notifications</h2>
                
                <div style={styles.settingItem}>
                  <div style={styles.settingLabel}>
                    <span style={styles.labelText}>Email Notifications</span>
                    <p style={styles.labelDescription}>Receive email updates about your activity</p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={() => handleToggle('emailNotifications')}
                      style={styles.switchInput}
                    />
                    <span style={styles.switchSlider}></span>
                  </label>
                </div>
              </div>

              <div style={styles.divider} />

              <div style={styles.settingsSection}>
                <h2 style={styles.sectionTitle}>Appearance</h2>
                
                <div style={styles.settingItem}>
                  <div style={styles.settingLabel}>
                    <span style={styles.labelText}>Dark Mode</span>
                    <p style={styles.labelDescription}>Use dark theme for the interface</p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={() => handleToggle('darkMode')}
                      style={styles.switchInput}
                    />
                    <span style={styles.switchSlider}></span>
                  </label>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingLabel}>
                    <span style={styles.labelText}>Language</span>
                    <p style={styles.labelDescription}>Choose your preferred language</p>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSelectChange('language', e.target.value)}
                    style={styles.select}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="hi">हिन्दी</option>
                  </select>
                </div>
              </div>

              <div style={styles.divider} />

              <div style={styles.settingsSection}>
                <h2 style={styles.sectionTitle}>Privacy</h2>
                
                <div style={styles.settingItem}>
                  <div style={styles.settingLabel}>
                    <span style={styles.labelText}>Profile Privacy</span>
                    <p style={styles.labelDescription}>Control who can see your profile</p>
                  </div>
                  <select
                    value={settings.privacy}
                    onChange={(e) => handleSelectChange('privacy', e.target.value)}
                    style={styles.select}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>
              </div>

              <div style={styles.divider} />

              <div style={styles.settingsSection}>
                <h2 style={styles.sectionTitle}>Danger Zone</h2>
                
                <div style={styles.dangerCard}>
                  <div>
                    <h3 style={styles.dangerTitle}>Clear All Data</h3>
                    <p style={styles.dangerDesc}>Delete all your saved data and quiz results</p>
                  </div>
                  <button style={styles.dangerButton}>Clear Data</button>
                </div>
              </div>

              <div style={styles.successMessage}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                    stroke="#4CAF50"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 10L9 12L13 8"
                    stroke="#4CAF50"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Settings saved successfully</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    fontFamily: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '0',
    margin: '0',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: 'calc(-50vw)',
    marginRight: 'calc(-50vw)',
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
  },
  header: {
    position: 'absolute',
    top: '0',
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
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#5A4A3F',
    letterSpacing: '-0.5px',
    fontFamily: '"Playfair Display", serif',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '70px 40px 40px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  content: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  },
  mainCard: {
    width: '100%',
    maxWidth: '820px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '28px',
    boxShadow: '0 60px 100px rgba(107, 93, 80, 0.18), 0 20px 40px rgba(107, 93, 80, 0.1), 0 4px 12px rgba(107, 93, 80, 0.06)',
    border: '1px solid rgba(217, 204, 189, 0.5)',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: '48px 48px 28px',
    borderBottom: '1px solid rgba(232, 221, 208, 0.3)',
    background: 'linear-gradient(180deg, rgba(250, 248, 245, 0.3) 0%, rgba(248, 244, 240, 0) 100%)',
  },
  title: {
    fontSize: '36px',
    fontWeight: '600',
    color: '#5A4A3F',
    margin: '0 0 8px 0',
    letterSpacing: '-1.2px',
    fontFamily: '"Playfair Display", serif',
  },
  subtitle: {
    fontSize: '14px',
    color: '#9B8B7F',
    margin: '0',
    fontWeight: '400',
  },
  cardBody: {
    padding: '44px 48px',
  },
  settingsSection: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#5A4A3F',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    margin: '0 0 20px 0',
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
  },
  settingLabel: {
    flex: 1,
  },
  labelText: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '500',
    color: '#5A4A3F',
    marginBottom: '4px',
  },
  labelDescription: {
    fontSize: '13px',
    color: '#9B8B7F',
    margin: '0',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '48px',
    height: '28px',
  },
  switchInput: {
    opacity: '0',
    width: '0',
    height: '0',
  },
  switchSlider: {
    position: 'absolute',
    cursor: 'pointer',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: '#ccc',
    transition: '.4s',
    borderRadius: '28px',
  },
  select: {
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid rgba(217, 204, 189, 0.3)',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    color: '#5A4A3F',
    cursor: 'pointer',
    fontFamily: '"Poppins", sans-serif',
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(217, 204, 189, 0.2)',
    margin: '24px 0',
  },
  dangerCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'rgba(217, 83, 79, 0.08)',
    border: '1px solid rgba(217, 83, 79, 0.2)',
    borderRadius: '12px',
  },
  dangerTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#D9534F',
    margin: '0 0 4px 0',
  },
  dangerDesc: {
    fontSize: '13px',
    color: '#9B8B7F',
    margin: '0',
  },
  dangerButton: {
    padding: '8px 20px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#D9534F',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  successMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    border: '1px solid rgba(76, 175, 80, 0.3)',
    borderRadius: '8px',
    marginTop: '24px',
    fontSize: '14px',
    color: '#4CAF50',
    fontWeight: '500',
  },
};

export default Settings;
