import { useState } from "react";
import { QUESTIONS } from "./questions";

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
  wrapper: {
    width: '100%',
    maxWidth: '100%',
    animation: 'fadeIn 0.8s ease-out',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '100vh',
    padding: '40px 20px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  logoutContainer: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    zIndex: 101,
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
  logoutButtonHover: {
    backgroundColor: '#C8BDAA',
    boxShadow: '0 16px 40px rgba(217, 204, 189, 0.4)',
    transform: 'translateY(-3px)',
  },
  logo: {
    width: '80px',
    height: '80px',
    margin: '0 auto 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    boxShadow: '0 12px 40px rgba(217, 204, 189, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    animation: 'slideDown 0.7s ease-out',
    overflow: 'hidden',
    border: '2px solid rgba(217, 204, 189, 0.3)',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px',
    animation: 'slideDown 0.7s ease-out',
  },
  title: {
    margin: '0 0 12px 0',
    fontSize: '52px',
    fontWeight: '700',
    color: '#5A4A3F',
    letterSpacing: '-1.2px',
    textAlign: 'center',
    fontFamily: '"Playfair Display", serif',
    lineHeight: '1.2',
  },
  subtitle: {
    margin: '0',
    fontSize: '16px',
    color: '#9B8B7F',
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: '0.4px',
    lineHeight: '1.6',
  },
  card: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
    padding: '48px 52px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '32px',
    boxShadow: '0 60px 100px rgba(107, 93, 80, 0.18), 0 20px 40px rgba(107, 93, 80, 0.1), 0 4px 12px rgba(107, 93, 80, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(0, 0, 0, 0.02)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(217, 204, 189, 0.5)',
    minHeight: 'auto',
    maxHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto',
    overflowX: 'hidden',
    animation: 'slideUp 0.9s ease-out',
    boxSizing: 'border-box',
  },
  progressSection: {
    marginBottom: '48px',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(232, 221, 208, 0.5)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '16px',
    boxShadow: 'inset 0 2px 4px rgba(107, 93, 80, 0.05)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'linear-gradient(90deg, #D9CCBD 0%, #C8BDAA 100%)',
    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '4px',
    boxShadow: '0 0 12px rgba(217, 204, 189, 0.5)',
  },
  progressText: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#9B8B7F',
    fontWeight: '600',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  questionSection: {
    marginBottom: '48px',
  },
  questionNumber: {
    fontSize: '11px',
    color: '#D9CCBD',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.6px',
    marginBottom: '22px',
    opacity: 0.95,
  },
  question: {
    fontSize: '36px',
    fontWeight: '600',
    color: '#5A4A3F',
    margin: '0 0 40px 0',
    lineHeight: '1.4',
    letterSpacing: '-0.8px',
    fontFamily: '"Playfair Display", serif',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  optionButton: {
    padding: '24px 28px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#5A4A3F',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '2px solid rgba(217, 204, 189, 0.5)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'left',
    lineHeight: '1.6',
    minHeight: '82px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    boxShadow: 'none',
  },
  optionButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#D9CCBD',
    boxShadow: '0 12px 32px rgba(217, 204, 189, 0.2)',
    transform: 'translateY(-3px)',
  },
  optionButtonActive: {
    backgroundColor: '#D9CCBD',
    borderColor: '#C8BDAA',
    color: '#FFFFFF',
    boxShadow: '0 12px 36px rgba(217, 204, 189, 0.35)',
  },
  optionButtonCentered: {
    gridColumn: '1 / -1',
    maxWidth: '100%',
    width: '100%',
  },
  navigationSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '48px',
    paddingTop: '36px',
    borderTop: '1px solid rgba(232, 221, 208, 0.3)',
    gap: '24px',
  },
  navigationButton: {
    padding: '13px 32px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#D9CCBD',
    backgroundColor: 'transparent',
    border: '2px solid #D9CCBD',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    flex: '0 0 auto',
    boxShadow: 'none',
  },
  navigationButtonHover: {
    backgroundColor: '#D9CCBD',
    color: '#FFFFFF',
    boxShadow: '0 8px 24px rgba(217, 204, 189, 0.25)',
  },
  navigationButtonDisabled: {
    opacity: 0.35,
    cursor: 'not-allowed',
  },
  stepIndicator: {
    fontSize: '14px',
    color: '#9B8B7F',
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    letterSpacing: '0.3px',
  },
  imageOptionsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    width: '100%',
  },
  styleCard: {
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '2px solid rgba(217, 204, 189, 0.4)',
    backgroundColor: '#FAFAF9',
    boxShadow: '0 8px 24px rgba(107, 93, 80, 0.09)',
    aspectRatio: '3/4',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  styleCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  styleCardLabel: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '20px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    backdropFilter: 'blur(8px)',
    borderTop: '1px solid rgba(217, 204, 189, 0.15)',
    fontSize: '13px',
    fontWeight: '600',
    color: '#5A4A3F',
    textAlign: 'center',
    letterSpacing: '0.2px',
    textTransform: 'capitalize',
    transition: 'all 0.3s ease',
    lineHeight: '1.45',
  },
  styleCardActive: {
    borderColor: '#D9CCBD',
    boxShadow: '0 16px 48px rgba(217, 204, 189, 0.4)',
    backgroundColor: '#D9CCBD',
  },
  styleCardActiveLabelText: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(217, 204, 189, 0.99)',
  },
};

export default function Quiz({ onFinish, onLogout }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hoveredOption, setHoveredOption] = useState(null);
  const [previousAnswers, setPreviousAnswers] = useState({});
  const [logoutHovered, setLogoutHovered] = useState(false);

  const handleLogout = () => {
    onLogout();
  };

  const handleOptionClick = (scores) => {
    const updatedAnswers = { ...answers };
    for (const style in scores) {
      updatedAnswers[style] = (updatedAnswers[style] || 0) + scores[style];
    }
    setAnswers(updatedAnswers);
    setPreviousAnswers({ ...previousAnswers, [currentQuestion]: scores });

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onFinish(updatedAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const isAnswered = previousAnswers[currentQuestion] !== undefined;

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
        
        /* Custom scrollbar - specifically for card */
        div[style*="maxHeight: '75vh'"]#card::-webkit-scrollbar,
        div:has(> div)::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        div[style*="maxHeight: '75vh'"]#card::-webkit-scrollbar-track,
        div:has(> div)::-webkit-scrollbar-track {
          background: transparent;
        }
        div[style*="maxHeight: '75vh'"]#card::-webkit-scrollbar-thumb,
        div:has(> div)::-webkit-scrollbar-thumb {
          background: rgba(217, 204, 189, 0.4);
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        div[style*="maxHeight: '75vh'"]#card::-webkit-scrollbar-thumb:hover,
        div:has(> div)::-webkit-scrollbar-thumb:hover {
          background: rgba(217, 204, 189, 0.6);
        }
        
        /* Firefox scrollbar styling */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(217, 204, 189, 0.4) transparent;
        }
      `}</style>

      <div style={styles.blurElement1}></div>
      <div style={styles.blurElement2}></div>

      <div style={styles.logoutContainer}>
        <button
          onClick={handleLogout}
          onMouseEnter={() => setLogoutHovered(true)}
          onMouseLeave={() => setLogoutHovered(false)}
          style={{
            ...styles.logoutButton,
            ...(logoutHovered && styles.logoutButtonHover),
          }}
        >
          Logout
        </button>
      </div>

      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <img 
              src="/Lumora.jpg" 
              alt="Lumora" 
              style={styles.logoImg}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.textContent = 'L';
              }}
            />
          </div>
          <h1 style={styles.title}>Find Your Style</h1>
          <p style={styles.subtitle}>Discover your perfect interior aesthetic</p>
        </div>

        <div key={currentQuestion} style={styles.card}>
          <div style={styles.progressSection}>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${progress}%`
                }}
              ></div>
            </div>
            <div style={styles.progressText}>
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </div>
          </div>

          <div style={styles.questionSection}>
            <div style={styles.questionNumber}>Question {currentQuestion + 1}</div>
            <h2 style={styles.question}>{question.question}</h2>

            {currentQuestion === 4 || currentQuestion === 19 ? (
              <div style={styles.imageOptionsContainer}>
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option.scores)}
                    onMouseEnter={() => setHoveredOption(index)}
                    onMouseLeave={() => setHoveredOption(null)}
                    style={{
                      ...styles.styleCard,
                      ...(hoveredOption === index && {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 48px rgba(217, 204, 189, 0.25)',
                      }),
                      ...(previousAnswers[currentQuestion] === option.scores && styles.styleCardActive),
                    }}
                  >
                    <img
                      src={option.image}
                      alt={option.text}
                      style={{
                        ...styles.styleCardImage,
                        ...(hoveredOption === index && {
                          transform: 'scale(1.08)',
                        }),
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div style={{
                      ...styles.styleCardLabel,
                      ...(previousAnswers[currentQuestion] === option.scores && styles.styleCardActiveLabelText),
                    }}>
                      {option.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.optionsContainer}>
                {question.options.map((option, index) => {
                  const isHovered = hoveredOption === index;
                  const isLastOption = index === question.options.length - 1;
                  const isOddCount = question.options.length % 2 !== 0;
                  const shouldCenter = isLastOption && isOddCount;
                  
                  let buttonStyle = { ...styles.optionButton };
                  
                  if (shouldCenter) {
                    buttonStyle = { ...buttonStyle, ...styles.optionButtonCentered };
                  }
                  
                  if (isHovered) {
                    buttonStyle = { ...buttonStyle, ...styles.optionButtonHover };
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option.scores)}
                      onMouseEnter={() => setHoveredOption(index)}
                      onMouseLeave={() => setHoveredOption(null)}
                      style={buttonStyle}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div style={styles.navigationSection}>
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              style={{
                ...styles.navigationButton,
                ...(currentQuestion === 0 && styles.navigationButtonDisabled),
              }}
              onMouseEnter={(e) => {
                if (currentQuestion > 0) {
                  e.target.style.backgroundColor = '#D9CCBD';
                  e.target.style.color = '#FFFFFF';
                  e.target.style.boxShadow = '0 12px 32px rgba(217, 204, 189, 0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentQuestion > 0) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#D9CCBD';
                  e.target.style.boxShadow = '0 2px 8px rgba(217, 204, 189, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              ← Previous
            </button>

            <span style={styles.stepIndicator}>
              {currentQuestion + 1} / {QUESTIONS.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentQuestion === QUESTIONS.length - 1}
              style={{
                ...styles.navigationButton,
                ...(currentQuestion === QUESTIONS.length - 1 && styles.navigationButtonDisabled),
              }}
              onMouseEnter={(e) => {
                if (currentQuestion < QUESTIONS.length - 1) {
                  e.target.style.backgroundColor = '#D9CCBD';
                  e.target.style.color = '#FFFFFF';
                  e.target.style.boxShadow = '0 12px 32px rgba(217, 204, 189, 0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentQuestion < QUESTIONS.length - 1) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#D9CCBD';
                  e.target.style.boxShadow = '0 2px 8px rgba(217, 204, 189, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
