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
  cardFooter: {
    padding: '24px 48px',
    borderTop: '1px solid #E8DDD0',
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#5A4A3F',
    marginBottom: '8px',
    letterSpacing: '-0.4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#9B8B7E',
    lineHeight: '1.6',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#5A4A3F',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '24px',
  },
  topStyleSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    alignItems: 'center',
    marginBottom: '40px',
    paddingBottom: '40px',
    borderBottom: '1px solid #E8DDD0',
  },
  topStyleName: {
    fontSize: '56px',
    fontWeight: '700',
    color: '#C8BDAA',
    marginBottom: '16px',
    lineHeight: '1',
  },
  topStyleDescription: {
    fontSize: '15px',
    color: '#5A4A3F',
    lineHeight: '1.8',
    marginBottom: '24px',
  },
  topStyleBox: {
    backgroundColor: '#F5F1ED',
    padding: '32px',
    borderRadius: '14px',
    border: '2px solid #E8DDD0',
    textAlign: 'center',
  },
  topStyleLabel: {
    fontSize: '12px',
    color: '#9B8B7E',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    marginBottom: '12px',
    fontWeight: '600',
  },
  topStyleValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#5A4A3F',
    marginBottom: '8px',
    textTransform: 'capitalize',
  },
  topStyleSubtext: {
    fontSize: '13px',
    color: '#9B8B7E',
    fontWeight: '500',
  },
  allScoresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  scoreCard: {
    backgroundColor: '#FAFAF9',
    padding: '20px 16px',
    borderRadius: '12px',
    border: '2px solid #E0D5C7',
    transition: 'all 0.3s ease',
  },
  scoreCardName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#5A4A3F',
    marginBottom: '8px',
    textTransform: 'capitalize',
  },
  scoreCardValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#C8BDAA',
  },
  infoBox: {
    backgroundColor: '#FAFAF9',
    padding: '20px',
    borderLeft: '4px solid #C8BDAA',
    borderRadius: '4px',
    marginBottom: '32px',
  },
  infoTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#9B8B7E',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  },
  infoText: {
    fontSize: '13px',
    color: '#5A4A3F',
    lineHeight: '1.6',
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
};

export default function QuizResults({ answers, onRetake, onLogout, onBackDashboard, onViewRecommendations }) {
  const [topStyle, setTopStyle] = useState('');
  const [allScores, setAllScores] = useState([]);

  useEffect(() => {
    if (answers && typeof answers === 'object') {
      const scores = Object.entries(answers)
        .map(([style, score]) => ({ style, score }))
        .sort((a, b) => b.score - a.score);
      
      setAllScores(scores);
      if (scores.length > 0) {
        setTopStyle(scores[0].style);
      }
    }
  }, [answers]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onLogout();
    }
  };

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
              <h1 style={styles.title}>🎨 Your Interior Style</h1>
              <p style={styles.subtitle}>
                Congratulations! Based on your answers, here's your ideal interior style:
              </p>
            </div>

            <div style={styles.cardBody}>
              {topStyle && (
                <>
                  <div style={styles.topStyleSection}>
                    <div>
                      <div style={styles.topStyleName}>
                        {topStyle.charAt(0).toUpperCase() + topStyle.slice(1)}
                      </div>
                      <p style={styles.topStyleDescription}>
                        {styleDescriptions[topStyle]}
                      </p>
                    </div>
                    <div style={styles.topStyleBox}>
                      <div style={styles.topStyleLabel}>Primary Style Match</div>
                      <div style={styles.topStyleValue}>
                        {topStyle}
                      </div>
                      <div style={styles.topStyleSubtext}>
                        {Math.round((allScores[0]?.score / 100) * 100)}% match based on quiz
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={styles.sectionTitle}>All Style Scores</div>
                    <div style={styles.allScoresGrid}>
                      {allScores.map((item) => (
                        <div key={item.style} style={styles.scoreCard}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#C8BDAA';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(200, 189, 170, 0.15)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#E0D5C7';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <div style={styles.scoreCardName}>
                            {item.style.charAt(0).toUpperCase() + item.style.slice(1)}
                          </div>
                          <div style={styles.scoreCardValue}>{item.score}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={styles.infoBox}>
                    <div style={styles.infoTitle}>💡 Next Steps</div>
                    <div style={styles.infoText}>
                      Save your style profile and explore furniture collections that match your aesthetic. You can update your preferences anytime by retaking the quiz.
                    </div>
                  </div>
                </>
              )}
            </div>

            <div style={styles.cardFooter}>
              <button
                style={{ ...styles.button, ...styles.primaryButton }}
                onClick={onRetake}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 6px 20px rgba(200, 189, 170, 0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Retake Quiz
              </button>
              {onBackDashboard && (
                <button
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  onClick={onBackDashboard}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#C8BDAA';
                    e.target.style.color = '#FFFFFF';
                    e.target.style.boxShadow = '0 4px 12px rgba(200, 189, 170, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#C8BDAA';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Dashboard
                </button>
              )}

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
          </div>
        </div>
      </div>
    </div>
  );
}
