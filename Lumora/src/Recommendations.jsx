import { useState, useEffect } from "react";

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
    padding: '0',
    margin: '0',
  },
  header: {
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(217, 204, 189, 0.4)',
    padding: '20px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  backBtn: {
    padding: '8px 18px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#9B8B7E',
    backgroundColor: 'transparent',
    border: '2px solid #D9CCBD',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  logo: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#5C4A3A',
    letterSpacing: '1px',
  },
  heroSection: {
    textAlign: 'center',
    padding: '60px 20px 40px',
  },
  styleBadge: {
    display: 'inline-block',
    padding: '6px 20px',
    background: 'linear-gradient(135deg, #D9CCBD, #C4B5A5)',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#5C4A3A',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#3D2F25',
    marginBottom: '12px',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '16px',
    color: '#9B8B7E',
    maxWidth: '500px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    padding: '20px 40px 60px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(92, 74, 58, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  cardTop: {
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    padding: '32px 24px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  categoryIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #D9CCBD, #C4B5A5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    flexShrink: 0,
  },
  cardMeta: {
    flex: 1,
  },
  cardCategory: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#9B8B7E',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  cardName: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#3D2F25',
    lineHeight: '1.3',
  },
  cardBrand: {
    fontSize: '13px',
    color: '#9B8B7E',
    marginTop: '2px',
  },
  cardBody: {
    padding: '20px 24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  reason: {
    fontSize: '14px',
    color: '#6B5B4E',
    lineHeight: '1.6',
    fontStyle: 'italic',
    borderLeft: '3px solid #D9CCBD',
    paddingLeft: '12px',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#5C4A3A',
  },
  siteBadge: {
    padding: '4px 12px',
    background: '#F5F1ED',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#9B8B7E',
  },
  buyBtn: {
    display: 'block',
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #9B8B7E, #7A6A59)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    letterSpacing: '0.5px',
    marginTop: 'auto',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '20px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #EAE0D5',
    borderTop: '4px solid #9B8B7E',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '18px',
    color: '#9B8B7E',
    fontWeight: '500',
  },
  loadingSubtext: {
    fontSize: '14px',
    color: '#C4B5A5',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  errorText: {
    fontSize: '18px',
    color: '#9B8B7E',
    marginBottom: '20px',
  },
  retryBtn: {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #9B8B7E, #7A6A59)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
  },
};

const categoryEmojis = {
  sofa: '🛋️', couch: '🛋️',
  bed: '🛏️',
  desk: '🖥️', table: '🪑',
  chair: '🪑',
  shelf: '📚', bookshelf: '📚', bookcase: '📚',
  lamp: '💡', light: '💡',
  rug: '🏠', carpet: '🏠',
  wardrobe: '🚪', dresser: '🚪',
  default: '🪑',
};

const getCategoryEmoji = (category = '') => {
  const lower = category.toLowerCase();
  for (const key in categoryEmojis) {
    if (lower.includes(key)) return categoryEmojis[key];
  }
  return categoryEmojis.default;
};

export default function Recommendations({ quizAnswers, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quizAnswers }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizAnswers) fetchRecommendations();
  }, [quizAnswers]);

  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rec-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 40px rgba(92, 74, 58, 0.15) !important;
        }
        .buy-btn:hover {
          background: linear-gradient(135deg, #7A6A59, #5C4A3A) !important;
          transform: translateY(-1px);
        }
        .back-btn:hover {
          background: #F5F1ED !important;
          border-color: #9B8B7E !important;
          color: #5C4A3A !important;
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button className="back-btn" style={styles.backBtn} onClick={onBack}>
            ← Back
          </button>
          <span style={styles.logo}>LUMORA</span>
        </div>
        {data && (
          <span style={{ fontSize: '13px', color: '#9B8B7E' }}>
            {data.recommendations?.length} products curated for you
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner} />
          <div style={styles.loadingText}>Curating your recommendations...</div>
          <div style={styles.loadingSubtext}>Our AI is analysing your style profile</div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={styles.errorContainer}>
          <div style={styles.errorText}>Could not load recommendations. Please try again.</div>
          <button style={styles.retryBtn} onClick={fetchRecommendations}>Retry</button>
        </div>
      )}

      {/* Results */}
      {data && !loading && (
        <>
          <div style={styles.heroSection}>
            <div style={styles.styleBadge}>{capitalize(data.dominantStyle)} Style</div>
            <h1 style={styles.heroTitle}>Your Perfect Furniture Picks</h1>
            <p style={styles.heroSubtitle}>
              Handpicked by AI based on your quiz — click any product to shop on Amazon.
            </p>
          </div>

          <div style={styles.grid}>
            {data.recommendations.map((product, index) => (
              <div
                key={index}
                className="rec-card"
                style={{ ...styles.card, animationDelay: `${index * 0.08}s`, animation: 'fadeInUp 0.5s ease forwards' }}
              >
                <div style={styles.cardTop}>
                  <div style={styles.categoryIcon}>
                    {getCategoryEmoji(product.category)}
                  </div>
                  <div style={styles.cardMeta}>
                    <div style={styles.cardCategory}>{product.category}</div>
                    <div style={styles.cardName}>{product.name}</div>
                    <div style={styles.cardBrand}>{product.brand}</div>
                  </div>
                </div>

                <div style={styles.cardBody}>
                  <div style={styles.reason}>"{product.reason}"</div>

                  <div style={styles.priceRow}>
                    <span style={styles.price}>{product.priceRange}</span>
                    <span style={styles.siteBadge}>{product.site}</span>
                  </div>

                  <a
                    className="buy-btn"
                    style={styles.buyBtn}
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shop on {product.site} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}