import { useState, useEffect } from "react";

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
    padding: '0',
    margin: '0',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: 'calc(-50vw)',
    marginRight: 'calc(-50vw)',
  },
  header: {
    position: 'absolute',
    top: '0',
    width: '100%',
    padding: '24px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#5A4A3F',
    letterSpacing: '-0.5px',
  },
  logoutButton: {
    padding: '10px 24px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#9B8B7E',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 12px rgba(155, 139, 126, 0.2)',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '100px 40px 40px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  },
  mainCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.99)',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(107, 93, 80, 0.15), 0 4px 12px rgba(107, 93, 80, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(217, 204, 189, 0.5)',
    overflow: 'hidden',
    animation: 'slideUp 0.7s ease-out',
  },
  cardHeader: {
    padding: '40px 48px',
    borderBottom: '1px solid #E8DDD0',
  },
  cardBody: {
    padding: '40px 48px',
  },
  greeting: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#5A4A3F',
    marginBottom: '8px',
    letterSpacing: '-0.4px',
  },
  userEmail: {
    fontSize: '14px',
    color: '#9B8B7E',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#5A4A3F',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '20px',
  },
  styleShowcase: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    alignItems: 'center',
  },
  styleName: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#C8BDAA',
    marginBottom: '16px',
    lineHeight: '1',
  },
  styleDescription: {
    fontSize: '15px',
    color: '#5A4A3F',
    lineHeight: '1.8',
    marginBottom: '24px',
  },
  styleCharacteristics: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '20px',
  },
  characteristic: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    color: '#5A4A3F',
  },
  characteristicIcon: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    backgroundColor: '#C8BDAA',
    borderRadius: '50%',
    marginRight: '12px',
    flexShrink: 0,
    textAlign: 'center',
    lineHeight: '20px',
    color: '#FFFFFF',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  styleBox: {
    backgroundColor: '#F5F1ED',
    padding: '32px',
    borderRadius: '14px',
    border: '2px solid #E8DDD0',
    textAlign: 'center',
  },
  styleLabel: {
    fontSize: '12px',
    color: '#9B8B7E',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    marginBottom: '16px',
    fontWeight: '600',
  },
  noStyleBox: {
    backgroundColor: '#F5F1ED',
    padding: '40px 32px',
    borderRadius: '14px',
    border: '2px dashed #E8DDD0',
    textAlign: 'center',
  },
  noStyleText: {
    fontSize: '16px',
    color: '#9B8B7E',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  cardFooter: {
    padding: '24px 48px',
    borderTop: '1px solid #E8DDD0',
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  button: {
    padding: '12px 32px',
    fontSize: '12px',
    fontWeight: '650',
    border: '2px solid #C8BDAA',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },
  primaryButton: {
    backgroundColor: '#C8BDAA',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#C8BDAA',
  },
  tipBox: {
    marginTop: '32px',
    padding: '16px 20px',
    backgroundColor: '#FAFAF9',
    borderLeft: '4px solid #C8BDAA',
    borderRadius: '4px',
  },
  tipLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#9B8B7E',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '6px',
  },
  tipText: {
    fontSize: '13px',
    color: '#5A4A3F',
    lineHeight: '1.6',
  },
};

const styleCharacteristicsMap = {
  minimalist: ["Uncluttered spaces", "Essential items only", "Clean lines", "Peaceful ambiance"],
  japandi: ["Functional beauty", "Calm aesthetics", "Natural textures", "Balanced design"],
  scandinavian: ["Light & airy", "Cozy comfort", "Natural materials", "Functional elegance"],
  farmhouse: ["Rustic charm", "Vintage appeal", "Warm textures", "Welcoming vibe"],
  bohemian: ["Creative expression", "Vibrant colors", "Eclectic mix", "Artistic flair"],
  traditional: ["Classic elegance", "Rich details", "Timeless appeal", "Sophisticated style"],
  industrial: ["Bold statement", "Raw materials", "Urban edge", "Authentic character"],
  coastal: ["Light & breezy", "Seaside vibes", "Relaxed mood", "Refreshing energy"],
  midcentury: ["Iconic design", "Retro-modern vibes", "Distinctive shapes", "Stylish appeal"],
  modern: ["Sleek & clean", "Contemporary feel", "Impressive look", "Cutting-edge design"],
};

export default function Dashboard({ selectedStyle, onRetakeQuiz, onLogout, onViewRecommendations }) {
  const [userName, setUserName] = useState('');
  const [topStyle, setTopStyle] = useState('');

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        setUserName(user.email || user.name || 'User');
      } catch (e) {
        setUserName('User');
      }
    }

    if (selectedStyle && typeof selectedStyle === 'object') {
      const scores = Object.entries(selectedStyle)
        .map(([style, score]) => ({ style, score }))
        .sort((a, b) => b.score - a.score);
      
      if (scores.length > 0) {
        setTopStyle(scores[0].style);
      }
    }
  }, [selectedStyle]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onLogout();
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={styles.header}>
        <div style={styles.logo}>Lumora</div>
        <button
          style={styles.logoutButton}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#7A6A59';
            e.target.style.boxShadow = '0 6px 16px rgba(155, 139, 126, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#9B8B7E';
            e.target.style.boxShadow = '0 4px 12px rgba(155, 139, 126, 0.2)';
          }}
        >
          Logout
        </button>
      </div>

      <div style={styles.wrapper}>
        <div style={styles.content}>
          <div style={styles.mainCard}>
            <div style={styles.cardHeader}>
              <h1 style={styles.greeting}>Welcome Back 👋</h1>
              <p style={styles.userEmail}>{userName}</p>
            </div>

            <div style={styles.cardBody}>
              {topStyle ? (
                <>
                  <div style={{ marginBottom: '32px' }}>
                    <div style={styles.sectionTitle}>Your Interior Style</div>
                    <div style={styles.styleShowcase}>
                      <div>
                        <div style={styles.styleName}>
                          {topStyle.charAt(0).toUpperCase() + topStyle.slice(1)}
                        </div>
                        <p style={styles.styleDescription}>
                          {styleDescriptions[topStyle]}
                        </p>
                      </div>
                      <div style={styles.styleBox}>
                        <div style={styles.styleLabel}>Your Matched Style</div>
                        <div style={{
                          fontSize: '28px',
                          fontWeight: '700',
                          color: '#5A4A3F',
                          textTransform: 'capitalize'
                        }}>
                          {topStyle}
                        </div>
                        <div style={{
                          marginTop: '12px',
                          fontSize: '13px',
                          color: '#9B8B7E',
                        }}>
                          Based on your quiz responses
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.styleCharacteristics}>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={styles.sectionTitle}>Key Characteristics</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {styleCharacteristicsMap[topStyle]?.map((char, idx) => (
                        <div key={idx} style={styles.characteristic}>
                          <span style={styles.characteristicIcon}>✓</span>
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={styles.tipBox}>
                    <div style={styles.tipLabel}>💡 Pro Tip</div>
                    <div style={styles.tipText}>
                      Use this style profile to browse furniture and decor that matches your aesthetic. Check back if you'd like to retake the quiz and explore other styles!
                    </div>
                  </div>
                </>
              ) : (
                <div style={styles.noStyleBox}>
                  <div style={styles.noStyleText}>
                    You haven't taken the style quiz yet! Discover your perfect interior style by completing the quiz.
                  </div>
                  <button
                    style={{ ...styles.button, ...styles.primaryButton }}
                    onClick={onRetakeQuiz}
                    onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 20px rgba(200, 189, 170, 0.3)'}
                    onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                  >
                    Start Quiz
                  </button>
                </div>
              )}
            </div>

            {topStyle && (
              <div style={styles.cardFooter}>
                <button
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={onRetakeQuiz}
                  onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 20px rgba(200, 189, 170, 0.3)'}
                  onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                >
                  Retake Quiz
                </button>

                {onViewRecommendations && (
                <button
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={onViewRecommendations}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = '0 6px 20px rgba(200, 189, 170, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  View Recommendations
                </button>
              )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styleDescriptions = {
  minimalist: "Clean lines, uncluttered spaces, and essential items only. Embrace simplicity and create a peaceful, serene environment.",
  japandi: "A blend of Japanese and Scandinavian design. Calm, functional, and elegant with a focus on natural beauty.",
  scandinavian: "Light, airy, and functional. Warm neutrals with cozy textures create a comfortable, welcoming atmosphere.",
  farmhouse: "Rustic charm with a homey, welcoming feel. Vintage elements mixed with comfort create warmth.",
  bohemian: "Eclectic, creative, and vibrant. Express your individuality through bold colors and artistic arrangements.",
  traditional: "Classic elegance with rich textures and timeless appeal. Sophisticated and refined design.",
  industrial: "Bold, edgy, and urban. Raw materials and exposed elements create authentic character.",
  coastal: "Light, breezy, and relaxed. Inspired by seaside living with refreshing, calming vibes.",
  midcentury: "Stylish and distinctive. Iconic furniture and retro-modern vibes with cutting-edge appeal.",
  modern: "Sleek, minimalist, and contemporary. Clean lines and impressive design for a sophisticated look.",
};
