import { useState, useEffect } from "react";

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    fontFamily: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '0',
    margin: '0',
  },
  header: {
    background: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(217, 204, 189, 0.25)',
    padding: '10px 36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
  backBtn: {
    padding: '8px 15px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#D9CCBD',
    backgroundColor: 'transparent',
    border: '2px solid #D9CCBD',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: '0.2px',
  },
  logo: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    boxShadow: '0 12px 40px rgba(139, 125, 107, 0.25)',
    flexShrink: 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  headerRight: {
    fontSize: '12px',
    color: '#9B8B7E',
    fontWeight: '500',
    letterSpacing: '0.2px',
  },
  heroSection: {
    textAlign: 'center',
    padding: '60px 20px 45px',
  },
  styleBadge: {
    display: 'inline-block',
    padding: '14px 48px',
    background: 'linear-gradient(135deg, #D9CCBD 0%, #E8DCCF 50%, #D9CCBD 100%)',
    border: '2.5px dashed #8B7D6B',
    borderRadius: '50px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#3D2F25',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    marginBottom: '36px',
    boxShadow: '0 12px 40px rgba(139, 125, 107, 0.2), inset 0 1px 4px rgba(255, 255, 255, 0.6)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    position: 'relative',
  },
  heroTitle: {
    fontSize: 'clamp(32px, 5.5vw, 48px)',
    fontWeight: '700',
    fontFamily: '"Playfair Display", serif',
    color: '#3D2F25',
    marginBottom: '14px',
    lineHeight: '1.25',
    letterSpacing: '-0.4px',
  },
  heroSubtitle: {
    fontSize: '15px',
    color: '#9B8B7E',
    maxWidth: '580px',
    margin: '0 auto',
    lineHeight: '1.65',
    letterSpacing: '0.15px',
    fontWeight: '400',
  },
  filterSection: {
    maxWidth: '1500px',
    margin: '0 auto 48px',
    padding: '20px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(217, 204, 189, 0.08), rgba(200, 189, 170, 0.05))',
    borderRadius: '36px',
    border: '2px solid rgba(217, 204, 189, 0.3)',
    boxShadow: '0 8px 32px rgba(139, 125, 107, 0.1)',
  },
  filterLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#3D2F25',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    marginBottom: '12px',
    background: 'linear-gradient(135deg, #8B7D6B, #6B5D52)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  filterDropdown: {
    padding: '14px 48px',
    background: 'linear-gradient(135deg, #D9CCBD 0%, #E8DCCF 50%, #D9CCBD 100%)',
    border: '2.5px dashed #8B7D6B',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '700',
    color: '#3D2F25',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    boxShadow: '0 12px 40px rgba(139, 125, 107, 0.2), inset 0 1px 4px rgba(255, 255, 255, 0.6)',
    minWidth: 'auto',
    appearance: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9'%3E%3Cpath fill='%233D2F25' d='M1 1l6 6 6-6' stroke='%233D2F25' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 20px center',
    paddingRight: '45px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
    gap: '24px',
    padding: '40px 36px 80px',
    maxWidth: '1500px',
    margin: '0 auto',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '22px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(92, 74, 58, 0.1)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(217, 204, 189, 0.2)',
  },
  cardTop: {
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    padding: '24px 20px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  categoryIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #D9CCBD, #C4B5A5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    flexShrink: 0,
    boxShadow: '0 3px 10px rgba(217, 204, 189, 0.2)',
  },
  cardMeta: {
    flex: 1,
  },
  cardCategory: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#8B7D6B',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '4px',
  },
  cardName: {
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: '"Playfair Display", serif',
    color: '#3D2F25',
    lineHeight: '1.3',
    marginBottom: '2px',
  },
  cardBrand: {
    fontSize: '12px',
    color: '#9B8B7E',
    fontWeight: '500',
  },
  cardBody: {
    padding: '18px 20px 20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  reason: {
    fontSize: '13px',
    color: '#6B5B4E',
    lineHeight: '1.6',
    borderLeft: '3px solid #D9CCBD',
    paddingLeft: '12px',
    letterSpacing: '0.2px',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  price: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#8B7D6B',
  },
  siteBadge: {
    padding: '5px 12px',
    background: '#F5F1ED',
    borderRadius: '18px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#9B8B7E',
    border: '1px solid rgba(217, 204, 189, 0.3)',
    letterSpacing: '0.2px',
    whiteSpace: 'nowrap',
  },
  buyBtn: {
    display: 'block',
    width: '100%',
    padding: '12px 14px',
    background: 'linear-gradient(135deg, #D9CCBD 0%, #C4B5A5 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: '0.4px',
    marginTop: 'auto',
    boxShadow: '0 4px 12px rgba(217, 204, 189, 0.2)',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    gap: '20px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '3px solid #EAE0D5',
    borderTop: '3px solid #D9CCBD',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '17px',
    color: '#5A4A3F',
    fontWeight: '600',
    letterSpacing: '0.2px',
  },
  loadingSubtext: {
    fontSize: '13px',
    color: '#9B8B7E',
    letterSpacing: '0.15px',
    fontWeight: '400',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '70px 20px',
  },
  errorText: {
    fontSize: '17px',
    color: '#8B7D6B',
    marginBottom: '24px',
    fontWeight: '500',
    letterSpacing: '0.2px',
  },
  retryBtn: {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #D9CCBD 0%, #C4B5A5 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: '0.4px',
    boxShadow: '0 4px 12px rgba(217, 204, 189, 0.2)',
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
  const [selectedWebsite, setSelectedWebsite] = useState('All Websites');

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

  const getWebsiteName = (website) => {
    switch(website) {
      case 'All Websites':
        return 'your perfect matches';
      case 'Amazon':
        return 'Amazon';
      case 'Wayfair':
        return 'Wayfair';
      case 'AliExpress':
        return 'AliExpress';
      case 'Pepperfry':
        return 'Pepperfry';
      case 'Daraz':
        return 'Daraz';
      default:
        return 'your perfect matches';
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: "Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rec-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 14px 40px rgba(92, 74, 58, 0.16) !important;
        }
        .buy-btn:hover {
          background: linear-gradient(135deg, #C4B5A5, #B5A696) !important;
          transform: translateY(-1px);
          box-shadow: 0 5px 14px rgba(217, 204, 189, 0.28) !important;
        }
        .back-btn:hover {
          background: rgba(217, 204, 189, 0.08) !important;
          border-color: #8B7D6B !important;
          color: #8B7D6B !important;
        }
        .filter-dropdown option {
          text-align: center;
          text-transform: uppercase;
          padding: 10px 15px;
          color: #3D2F25;
          background: #FFFFFF;
        }
        
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .style-badge {
          animation: badgeFloat 3s ease-in-out infinite;
        }
        
        .filter-section {
          animation: slideUp 0.6s ease-out;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        select {
          cursor: pointer;
        }
        
        select:hover {
          border-color: #D9CCBD !important;
          box-shadow: 0 8px 28px rgba(139, 125, 107, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.5) !important;
          transform: translateY(-2px);
        }
        
        select:focus {
          outline: none;
          border-color: #8B7D6B !important;
          background: linear-gradient(135deg, #FFFFFF, #F5F3F0) !important;
          box-shadow: 0 10px 36px rgba(139, 125, 107, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.8) !important;
          transform: translateY(-2px);
        }
        
        select option {
          background: #FFFFFF;
          color: #3D2F25;
          padding: 10px;
          font-weight: 500;
        }
        
        select option:hover {
          background: linear-gradient(#D9CCBD, #D9CCBD);
          color: #FFFFFF;
        }
        
        @media (max-width: 1200px) {
          .grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .filter-section {
            flex-direction: column;
            padding: 0 20px !important;
            gap: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
          
          .filter-section {
            flex-direction: column;
            padding: 0 16px !important;
            align-items: stretch !important;
          }
          
          .filter-dropdown {
            width: 100% !important;
            min-width: unset !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button className="back-btn" style={styles.backBtn} onClick={onBack}>
            ← Back
          </button>
        </div>
        {data && (
          <span style={styles.headerRight}>
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
            <div style={styles.styleBadge} className="style-badge">{capitalize(data.dominantStyle)} Style</div>
            <h1 style={styles.heroTitle}>Your Perfect Furniture Picks</h1>
            <p style={styles.heroSubtitle}>
              AI curated for your style - click any piece to explore on {getWebsiteName(selectedWebsite)}
            </p>
          </div>

          {/* Filter Section */}
          <div style={styles.filterSection} className="filter-section">
            <span style={styles.filterLabel}>Shop From</span>
            <select 
              value={selectedWebsite}
              onChange={(e) => setSelectedWebsite(e.target.value)}
              style={styles.filterDropdown}
              className="filter-dropdown"
            >
              <option value="All Websites">ALL WEBSITES</option>
              <option value="Amazon">AMAZON - EXTENSIVE RANGE</option>
              <option value="Wayfair">WAYFAIR - FURNITURE SPECIALIST</option>
              <option value="AliExpress">ALIEXPRESS - VALUE MARKETPLACE</option>
              <option value="Pepperfry">PEPPERFRY - FURNITURE RETAILER</option>
              <option value="Daraz">DARAZ - REGIONAL OPTION</option>
            </select>
          </div>

          <div style={styles.grid} className="grid">
            {data.recommendations
              .filter(product => selectedWebsite === 'All Websites' || product.site === selectedWebsite)
              .map((product, index) => (
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