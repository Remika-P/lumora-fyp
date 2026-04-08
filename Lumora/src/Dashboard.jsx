import { useState, useEffect } from "react";

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
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    boxShadow: '0 8px 24px rgba(217, 204, 189, 0.2)',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  logoutButton: {
    padding: '12px 28px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#D9CCBD',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    boxShadow: '0 8px 24px rgba(217, 204, 189, 0.3)',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '70px 40px 40px',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'fadeIn 0.9s ease-out',
    position: 'relative',
    zIndex: 10,
  },
  content: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    animation: 'slideUp 0.9s ease-out',
  },
  mainCard: {
    width: '100%',
    maxWidth: '820px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '28px',
    boxShadow: '0 60px 100px rgba(107, 93, 80, 0.18), 0 20px 40px rgba(107, 93, 80, 0.1), 0 4px 12px rgba(107, 93, 80, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(0, 0, 0, 0.02)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(217, 204, 189, 0.5)',
    overflow: 'hidden',
    animation: 'slideUp 0.9s ease-out',
  },
  cardHeader: {
    padding: '48px 48px 28px',
    borderBottom: '1px solid rgba(232, 221, 208, 0.3)',
    background: 'linear-gradient(180deg, rgba(250, 248, 245, 0.3) 0%, rgba(248, 244, 240, 0) 100%)',
  },
  cardBody: {
    padding: '44px 48px',
  },
  greeting: {
    fontSize: '36px',
    fontWeight: '600',
    color: '#5A4A3F',
    marginBottom: '6px',
    letterSpacing: '-1.2px',
    fontFamily: '"Playfair Display", serif',
    lineHeight: '1.2',
  },
  userEmail: {
    fontSize: '14px',
    color: '#9B8B7F',
    fontWeight: '400',
    letterSpacing: '0.4px',
    opacity: 0.85,
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#5A4A3F',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '24px',
    opacity: 0.9,
  },
  styleShowcase: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'center',
    marginBottom: '40px',
  },
  styleName: {
    fontSize: '48px',
    fontWeight: '600',
    color: '#5A4A3F',
    marginBottom: '18px',
    lineHeight: '1.2',
    fontFamily: '"Playfair Display", serif',
    letterSpacing: '-0.8px',
  },
  styleDescription: {
    fontSize: '14px',
    color: '#5A4A3F',
    lineHeight: '1.8',
    marginBottom: '24px',
    letterSpacing: '0.2px',
    fontWeight: '400',
  },
  styleCharacteristics: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    marginTop: '0',
  },
  characteristic: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#5A4A3F',
    padding: '12px 0',
    borderBottom: '1px solid rgba(232, 221, 208, 0.3)',
    fontWeight: '400',
    letterSpacing: '0.2px',
  },
  characteristicIcon: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    backgroundColor: '#D9CCBD',
    borderRadius: '50%',
    marginRight: '12px',
    flexShrink: 0,
    textAlign: 'center',
    lineHeight: '20px',
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(217, 204, 189, 0.25)',
    transition: 'all 0.3s ease',
  },
  styleBox: {
    backgroundColor: 'rgba(245, 241, 237, 0.6)',
    padding: '40px 32px',
    borderRadius: '20px',
    border: '1.5px solid rgba(232, 221, 208, 0.5)',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(107, 93, 80, 0.08)',
  },
  styleLabel: {
    fontSize: '11px',
    color: '#9B8B7F',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '12px',
    fontWeight: '600',
    opacity: 0.8,
  },
  noStyleBox: {
    backgroundColor: 'rgba(245, 241, 237, 0.6)',
    padding: '48px 40px',
    borderRadius: '20px',
    border: '1.5px solid rgba(232, 221, 208, 0.5)',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(107, 93, 80, 0.08)',
  },
  noStyleText: {
    fontSize: '15px',
    color: '#5A4A3F',
    marginBottom: '28px',
    lineHeight: '1.7',
    fontWeight: '400',
  },
  cardFooter: {
    padding: '36px 48px',
    borderTop: '1px solid rgba(232, 221, 208, 0.3)',
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, rgba(250, 248, 245, 0) 0%, rgba(248, 244, 240, 0.2) 100%)',
  },
  button: {
    padding: '13px 36px',
    fontSize: '12px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },
  primaryButton: {
    backgroundColor: '#D9CCBD',
    color: '#5A4A3F',
    boxShadow: '0 12px 32px rgba(217, 204, 189, 0.3)',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#C8BDAA',
  },
  tipBox: {
    marginTop: '40px',
    padding: '24px 28px',
    backgroundColor: 'rgba(245, 241, 237, 0.5)',
    borderLeft: '4px solid #D9CCBD',
    borderRadius: '16px',
    border: '1px solid rgba(232, 221, 208, 0.3)',
    boxShadow: '0 4px 12px rgba(107, 93, 80, 0.06)',
  },
  tipLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#9B8B7F',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    marginBottom: '8px',
  },
  tipText: {
    fontSize: '14px',
    color: '#5A4A3F',
    lineHeight: '1.7',
    fontWeight: '400',
    letterSpacing: '0.2px',
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
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
        @keyframes softPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>

      <div style={styles.blurElement1}></div>
      <div style={styles.blurElement2}></div>

      <div style={styles.header}>
        <div style={styles.logo}>
          <img src="/Lumora.jpg" alt="Lumora Logo" style={styles.logoImg} />
        </div>
        <button
          style={styles.logoutButton}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#C8BDAA';
            e.target.style.boxShadow = '0 16px 40px rgba(217, 204, 189, 0.4)';
            e.target.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#D9CCBD';
            e.target.style.boxShadow = '0 8px 24px rgba(217, 204, 189, 0.3)';
            e.target.style.transform = 'translateY(0)';
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
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#C8BDAA';
                      e.target.style.boxShadow = '0 16px 40px rgba(217, 204, 189, 0.4)';
                      e.target.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#D9CCBD';
                      e.target.style.boxShadow = '0 12px 32px rgba(217, 204, 189, 0.3)';
                      e.target.style.transform = 'translateY(0)';
                    }}
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
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#C8BDAA';
                    e.target.style.boxShadow = '0 16px 40px rgba(217, 204, 189, 0.4)';
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#D9CCBD';
                    e.target.style.boxShadow = '0 12px 32px rgba(217, 204, 189, 0.3)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Retake Quiz
                </button>

                {onViewRecommendations && (
                <button
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={onViewRecommendations}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#C8BDAA';
                    e.target.style.boxShadow = '0 16px 40px rgba(217, 204, 189, 0.4)';
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#D9CCBD';
                    e.target.style.boxShadow = '0 12px 32px rgba(217, 204, 189, 0.3)';
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
