import { useState, useEffect } from "react";

const Saved = ({ onNavigate }) => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('selectedStyle');
    if (saved) {
      try {
        setSavedItems([JSON.parse(saved)]);
      } catch (e) {
        setSavedItems([]);
      }
    }
  }, []);

  const handleClearSaved = () => {
    if (window.confirm('Are you sure you want to clear all saved items?')) {
      localStorage.removeItem('selectedStyle');
      setSavedItems([]);
    }
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
              <h1 style={styles.title}>Saved Items</h1>
              <p style={styles.subtitle}>Your style preferences and saved quiz results</p>
            </div>
            
            <div style={styles.cardBody}>
              {savedItems.length > 0 ? (
                <>
                  <div style={styles.itemsGrid}>
                    {savedItems.map((item, index) => (
                      <div key={index} style={styles.savedCard}>
                        <div style={styles.cardContent}>
                          <h3 style={styles.itemTitle}>Quiz Result #{index + 1}</h3>
                          <div style={styles.answersList}>
                            {item && typeof item === 'object' && (
                              Object.entries(item).map(([key, value]) => (
                                <div key={key} style={styles.answerItem}>
                                  <span style={styles.answerKey}>{key}:</span>
                                  <span style={styles.answerValue}>{String(value)}</span>
                                </div>
                              ))
                            )}
                          </div>
                          <p style={styles.itemDate}>
                            Saved on {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    style={styles.clearButton}
                    onClick={handleClearSaved}
                  >
                    Clear Saved Items
                  </button>
                </>
              ) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📋</div>
                  <h2 style={styles.emptyTitle}>No Saved Items</h2>
                  <p style={styles.emptyText}>
                    Your saved quiz results will appear here. Complete a quiz to save your results!
                  </p>
                </div>
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
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
    marginBottom: '32px',
  },
  savedCard: {
    backgroundColor: 'rgba(217, 204, 189, 0.05)',
    border: '1px solid rgba(217, 204, 189, 0.2)',
    borderRadius: '16px',
    padding: '24px',
    transition: 'all 0.3s ease',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  itemTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#5A4A3F',
    margin: '0',
  },
  answersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  answerItem: {
    display: 'flex',
    gap: '12px',
    fontSize: '14px',
  },
  answerKey: {
    fontWeight: '600',
    color: '#5A4A3F',
    minWidth: '100px',
  },
  answerValue: {
    color: '#9B8B7F',
  },
  itemDate: {
    fontSize: '12px',
    color: '#9B8B7F',
    margin: '8px 0 0 0',
    fontStyle: 'italic',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 40px',
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  emptyTitle: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#5A4A3F',
    margin: '0 0 12px 0',
  },
  emptyText: {
    fontSize: '14px',
    color: '#9B8B7F',
    margin: '0',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  clearButton: {
    padding: '12px 32px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#D9534F',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default Saved;
