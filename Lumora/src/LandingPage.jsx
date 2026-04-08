import { useNavigate } from 'react-router-dom';

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    fontFamily: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#5A4A3F',
    position: 'relative',
    overflow: 'hidden',
  },
  blurElement1: {
    position: 'absolute',
    width: '780px',
    height: '780px',
    background: 'radial-gradient(circle, rgba(200, 189, 170, 0.16) 0%, rgba(200, 189, 170, 0.05) 38%, rgba(200, 189, 170, 0) 70%)',
    borderRadius: '50%',
    top: '-290px',
    left: '-290px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
    animation: 'softPulse 8s ease-in-out infinite',
  },
  blurElement2: {
    position: 'absolute',
    width: '620px',
    height: '620px',
    background: 'radial-gradient(circle, rgba(200, 189, 170, 0.12) 0%, rgba(200, 189, 170, 0.04) 48%, rgba(200, 189, 170, 0) 72%)',
    borderRadius: '50%',
    bottom: '-220px',
    right: '-220px',
    filter: 'blur(50px)',
    pointerEvents: 'none',
    animation: 'softPulse 10s ease-in-out infinite 1s',
  },
  topBar: {
    width: 'min(1160px, calc(100% - 48px))',
    margin: '22px auto 0',
    padding: '12px 18px',
    borderRadius: '18px',
    backgroundColor: 'rgba(255, 255, 255, 0.74)',
    border: '1px solid rgba(217, 204, 189, 0.45)',
    backdropFilter: 'blur(14px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 10,
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoBadge: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    border: '1px solid rgba(217, 204, 189, 0.55)',
    boxShadow: '0 6px 14px rgba(107, 93, 80, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700',
    color: '#7A685A',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#5A4A3F',
    letterSpacing: '-0.5px',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  ghostBtn: {
    padding: '10px 18px',
    borderRadius: '12px',
    border: '2px solid #D9CCBD',
    backgroundColor: 'transparent',
    color: '#7A685A',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  solidBtn: {
    padding: '10px 18px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#C8BDAA',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.3px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 18px rgba(200, 189, 170, 0.25)',
  },
  hero: {
    width: 'min(1160px, calc(100% - 48px))',
    margin: '34px auto 0',
    paddingBottom: '44px',
    position: 'relative',
    zIndex: 5,
  },
  heroCard: {
    borderRadius: '34px',
    border: '1px solid rgba(217, 204, 189, 0.5)',
    boxShadow: '0 60px 100px rgba(107, 93, 80, 0.18), 0 20px 40px rgba(107, 93, 80, 0.1), 0 4px 12px rgba(107, 93, 80, 0.06), inset 0 1px 0 rgba(255,255,255,1)',
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    backdropFilter: 'blur(30px)',
    padding: '50px 46px',
    display: 'grid',
    gridTemplateColumns: '1.15fr 0.85fr',
    gap: '36px',
  },
  heroTitle: {
    margin: '0 0 16px 0',
    fontFamily: '"Playfair Display", serif',
    fontSize: 'clamp(40px, 5.2vw, 64px)',
    lineHeight: '1.04',
    color: '#5A4A3F',
    letterSpacing: '-1.3px',
  },
  heroText: {
    margin: '0 0 26px 0',
    fontSize: '16px',
    lineHeight: '1.75',
    color: '#7E7063',
    maxWidth: '560px',
  },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '28px',
  },
  primaryCta: {
    padding: '15px 24px',
    borderRadius: '14px',
    border: 'none',
    backgroundColor: '#C8BDAA',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    boxShadow: '0 12px 24px rgba(200, 189, 170, 0.32)',
    transition: 'all 0.3s ease',
  },
  secondaryCta: {
    padding: '15px 24px',
    borderRadius: '14px',
    border: '2px solid #D9CCBD',
    backgroundColor: '#FFFFFF',
    color: '#7A685A',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  trustRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    color: '#9B8B7F',
    fontSize: '13px',
    fontWeight: '600',
  },
  trustItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#C8BDAA',
    boxShadow: '0 0 0 4px rgba(200, 189, 170, 0.2)',
  },
  previewCard: {
    borderRadius: '24px',
    border: '1px solid rgba(217, 204, 189, 0.5)',
    background: 'linear-gradient(145deg, #FAF7F3 0%, #F4EEE7 100%)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    boxShadow: '0 24px 40px rgba(107, 93, 80, 0.12)',
  },
  previewTitle: {
    margin: 0,
    fontFamily: '"Playfair Display", serif',
    fontSize: '30px',
    color: '#5A4A3F',
    letterSpacing: '-0.7px',
  },
  previewSub: {
    margin: 0,
    color: '#8C7E72',
    fontSize: '14px',
    lineHeight: '1.7',
  },
  miniStatGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginTop: '4px',
  },
  miniStat: {
    borderRadius: '14px',
    padding: '14px 12px',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(217, 204, 189, 0.45)',
  },
  miniLabel: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: '#9B8B7F',
    fontWeight: '700',
    marginBottom: '4px',
  },
  miniValue: {
    fontSize: '15px',
    color: '#5A4A3F',
    fontWeight: '700',
  },
  section: {
    width: 'min(1160px, calc(100% - 48px))',
    margin: '0 auto',
    paddingBottom: '54px',
    position: 'relative',
    zIndex: 5,
  },
  sectionTitle: {
    margin: '0 0 10px',
    fontFamily: '"Playfair Display", serif',
    fontSize: '42px',
    color: '#5A4A3F',
    textAlign: 'center',
    letterSpacing: '-1px',
  },
  sectionText: {
    margin: '0 auto 28px',
    maxWidth: '740px',
    textAlign: 'center',
    fontSize: '15px',
    lineHeight: '1.75',
    color: '#8B7C70',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '16px',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    border: '1px solid rgba(217, 204, 189, 0.5)',
    borderRadius: '20px',
    padding: '22px',
    boxShadow: '0 16px 30px rgba(107, 93, 80, 0.1)',
  },
  featureKicker: {
    margin: '0 0 8px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.7px',
    color: '#A08F80',
  },
  featureName: {
    margin: '0 0 8px',
    fontSize: '20px',
    fontWeight: '700',
    color: '#5A4A3F',
    letterSpacing: '-0.4px',
  },
  featureDesc: {
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#7F7266',
  },
  bottomCta: {
    width: 'min(1160px, calc(100% - 48px))',
    margin: '0 auto 40px',
    borderRadius: '26px',
    backgroundColor: 'rgba(255,255,255,0.96)',
    border: '1px solid rgba(217, 204, 189, 0.5)',
    padding: '30px 26px',
    textAlign: 'center',
    boxShadow: '0 20px 38px rgba(107, 93, 80, 0.11)',
    position: 'relative',
    zIndex: 5,
  },
  bottomTitle: {
    margin: '0 0 10px',
    fontFamily: '"Playfair Display", serif',
    fontSize: '34px',
    color: '#5A4A3F',
    letterSpacing: '-0.8px',
  },
  bottomText: {
    margin: '0 auto 18px',
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#8B7C70',
    maxWidth: '680px',
  },
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        @keyframes softPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @media (max-width: 980px) {
          .landing-hero-card {
            grid-template-columns: 1fr !important;
            gap: 22px !important;
            padding: 36px 24px !important;
          }

          .landing-feature-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .landing-topbar {
            width: calc(100% - 24px) !important;
            margin-top: 12px !important;
            padding: 10px 12px !important;
          }

          .landing-hero,
          .landing-section,
          .landing-bottom-cta {
            width: calc(100% - 24px) !important;
          }

          .landing-nav-actions {
            gap: 8px !important;
          }

          .landing-ghost-btn,
          .landing-solid-btn {
            padding: 9px 12px !important;
            font-size: 12px !important;
          }

          .landing-bottom-title {
            font-size: 28px !important;
          }
        }
      `}</style>

      <div style={styles.blurElement1}></div>
      <div style={styles.blurElement2}></div>

      <div style={styles.topBar} className="landing-topbar">
        <div style={styles.logoWrap}>
          <div style={styles.logoBadge}>L</div>
          <div style={styles.logoText}>Lumora</div>
        </div>
        <div style={styles.navActions} className="landing-nav-actions">
          <button style={styles.ghostBtn} className="landing-ghost-btn" onClick={() => navigate('/login')}>Sign In</button>
          <button style={styles.solidBtn} className="landing-solid-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>

      <section style={styles.hero} className="landing-hero">
        <div style={styles.heroCard} className="landing-hero-card">
          <div>
            <h1 style={styles.heroTitle}>Design Your Space With Confidence</h1>
            <p style={styles.heroText}>
              Lumora helps you discover your personal interior style through a guided quiz, then translates your results into curated decor recommendations you can actually use.
            </p>

            <div style={styles.heroActions}>
              <button style={styles.primaryCta} onClick={() => navigate('/signup')}>Get Started</button>
              <button style={styles.secondaryCta} onClick={() => navigate('/login')}>I Already Have an Account</button>
            </div>

            <div style={styles.trustRow}>
              <span style={styles.trustItem}><span style={styles.dot}></span>Style discovery quiz</span>
              <span style={styles.trustItem}><span style={styles.dot}></span>Personalized recommendations</span>
              <span style={styles.trustItem}><span style={styles.dot}></span>Clean, guided experience</span>
            </div>
          </div>

          <aside style={styles.previewCard}>
            <h3 style={styles.previewTitle}>Your Decor Profile</h3>
            <p style={styles.previewSub}>Answer a short set of questions and get style-focused suggestions tailored to your preferences.</p>

            <div style={styles.miniStatGrid}>
              <div style={styles.miniStat}>
                <div style={styles.miniLabel}>Step 1</div>
                <div style={styles.miniValue}>Take Quiz</div>
              </div>
              <div style={styles.miniStat}>
                <div style={styles.miniLabel}>Step 2</div>
                <div style={styles.miniValue}>View Results</div>
              </div>
              <div style={styles.miniStat}>
                <div style={styles.miniLabel}>Step 3</div>
                <div style={styles.miniValue}>Get Recommendations</div>
              </div>
              <div style={styles.miniStat}>
                <div style={styles.miniLabel}>Outcome</div>
                <div style={styles.miniValue}>Design Clarity</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section style={styles.section} className="landing-section">
        <h2 style={styles.sectionTitle}>What Lumora Helps You Do</h2>
        <p style={styles.sectionText}>
          Every flow in Lumora is built to keep decision-making simple: identify your style, understand your results, and move toward decor choices that fit your taste.
        </p>

        <div style={styles.featureGrid} className="landing-feature-grid">
          <article style={styles.featureCard}>
            <p style={styles.featureKicker}>Guided Start</p>
            <h3 style={styles.featureName}>Style Quiz</h3>
            <p style={styles.featureDesc}>Walk through a focused questionnaire designed to map your design preferences.</p>
          </article>

          <article style={styles.featureCard}>
            <p style={styles.featureKicker}>Personal Insight</p>
            <h3 style={styles.featureName}>Result Analysis</h3>
            <p style={styles.featureDesc}>See your dominant decor style and supporting characteristics in a clear dashboard.</p>
          </article>

          <article style={styles.featureCard}>
            <p style={styles.featureKicker}>Actionable Next Step</p>
            <h3 style={styles.featureName}>Recommendations</h3>
            <p style={styles.featureDesc}>Receive curated decor suggestions aligned with your quiz profile and preferences.</p>
          </article>
        </div>
      </section>

      <section style={styles.bottomCta} className="landing-bottom-cta">
        <h2 style={styles.bottomTitle} className="landing-bottom-title">Start Building Your Signature Space</h2>
        <p style={styles.bottomText}>Join Lumora to turn style uncertainty into a confident, beautifully guided decor journey.</p>
        <div style={styles.heroActions}>
          <button style={styles.primaryCta} onClick={() => navigate('/signup')}>Create Your Lumora Account</button>
          <button style={styles.secondaryCta} onClick={() => navigate('/login')}>Sign In</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
