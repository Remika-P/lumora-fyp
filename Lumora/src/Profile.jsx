import { useState, useEffect } from "react";

const Profile = ({ onNavigate }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setFormData(parsedUser);
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
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
              <h1 style={styles.title}>My Profile</h1>
            </div>
            
            <div style={styles.cardBody}>
              {user && (
                <>
                  <div style={styles.profileSection}>
                    <div style={styles.avatarLarge}>
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div style={styles.basicInfo}>
                      <h2 style={styles.userName}>{user.name || 'User'}</h2>
                      <p style={styles.userEmail}>{user.email || 'No email'}</p>
                    </div>
                  </div>

                  {!isEditing ? (
                    <>
                      <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                          <label style={styles.infoLabel}>Full Name</label>
                          <p style={styles.infoValue}>{user.name || 'Not provided'}</p>
                        </div>
                        <div style={styles.infoItem}>
                          <label style={styles.infoLabel}>Email</label>
                          <p style={styles.infoValue}>{user.email || 'Not provided'}</p>
                        </div>
                        <div style={styles.infoItem}>
                          <label style={styles.infoLabel}>Member Since</label>
                          <p style={styles.infoValue}>
                            {user.createdAt 
                              ? new Date(user.createdAt).toLocaleDateString() 
                              : 'Unknown'}
                          </p>
                        </div>
                        <div style={styles.infoItem}>
                          <label style={styles.infoLabel}>Account Status</label>
                          <p style={styles.infoValue}>Active</p>
                        </div>
                      </div>

                      <button
                        style={styles.editButton}
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ''}
                          onChange={handleChange}
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleChange}
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.buttonGroup}>
                        <button
                          style={styles.saveButton}
                          onClick={handleSave}
                        >
                          Save Changes
                        </button>
                        <button
                          style={styles.cancelButton}
                          onClick={() => {
                            setFormData(user);
                            setIsEditing(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
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
    margin: '0',
    letterSpacing: '-1.2px',
    fontFamily: '"Playfair Display", serif',
  },
  cardBody: {
    padding: '44px 48px',
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '40px',
    paddingBottom: '40px',
    borderBottom: '1px solid rgba(232, 221, 208, 0.3)',
  },
  avatarLarge: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#D9CCBD',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: '600',
    color: '#5A4A3F',
    flexShrink: 0,
  },
  basicInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#5A4A3F',
    margin: '0 0 8px 0',
  },
  userEmail: {
    fontSize: '14px',
    color: '#9B8B7F',
    margin: '0',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '32px',
  },
  infoItem: {
    padding: '16px',
    backgroundColor: 'rgba(217, 204, 189, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(217, 204, 189, 0.15)',
  },
  infoLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#9B8B7F',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '8px',
  },
  infoValue: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#5A4A3F',
    margin: '0',
  },
  formGroup: {
    marginBottom: '24px',
  },
  formLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#5A4A3F',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid rgba(217, 204, 189, 0.3)',
    borderRadius: '8px',
    fontFamily: '"Poppins", sans-serif',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
  },
  editButton: {
    padding: '12px 32px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#D9CCBD',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  saveButton: {
    padding: '12px 32px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  cancelButton: {
    padding: '12px 32px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#5A4A3F',
    backgroundColor: 'rgba(217, 204, 189, 0.2)',
    border: '1px solid rgba(217, 204, 189, 0.3)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
};

export default Profile;
