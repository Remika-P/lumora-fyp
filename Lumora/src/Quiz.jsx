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
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
    padding: '0',
    margin: '0',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: 'calc(-50vw)',
    marginRight: 'calc(-50vw)',
  },
  wrapper: {
    width: '100%',
    maxWidth: '100%',
    animation: 'fadeIn 0.6s ease-out',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '100vh',
    padding: '40px 20px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoutContainer: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    zIndex: 100,
  },
  logoutButton: {
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#9B8B7E',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 12px rgba(155, 139, 126, 0.2)',
  },
  logoutButtonHover: {
    backgroundColor: '#7A6A59',
    boxShadow: '0 6px 16px rgba(155, 139, 126, 0.3)',
    transform: 'translateY(-2px)',
  },
  logo: {
    width: '60px',
    height: '60px',
    margin: '0 auto 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #F5F1ED 0%, #EAE0D5 100%)',
    boxShadow: '0 8px 24px rgba(217, 204, 189, 0.2)',
    animation: 'slideDown 0.6s ease-out',
    overflow: 'hidden',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    animation: 'slideDown 0.6s ease-out',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '28px',
    fontWeight: '700',
    color: '#5A4A3F',
    letterSpacing: '-0.4px',
    textAlign: 'center',
  },
  subtitle: {
    margin: '0',
    fontSize: '14px',
    color: '#9B8B7E',
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: '0.3px',
  },
  card: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    padding: '40px 48px',
    backgroundColor: 'rgba(255, 255, 255, 0.99)',
    borderRadius: '28px',
    boxShadow: '0 20px 60px rgba(107, 93, 80, 0.15), 0 4px 12px rgba(107, 93, 80, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(217, 204, 189, 0.5)',
    minHeight: 'auto',
    maxHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
    animation: 'slideUp 0.7s ease-out',
  },
  progressSection: {
    marginBottom: '44px',
  },
  progressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#E8DDD0',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '14px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#C8BDAA',
    transition: 'width 0.4s ease',
    borderRadius: '3px',
    boxShadow: '0 0 8px rgba(200, 189, 170, 0.4)',
  },
  progressText: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#9B8B7E',
    fontWeight: '600',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
  },
  questionSection: {
    marginBottom: '44px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  questionNumber: {
    fontSize: '11px',
    color: '#C8BDAA',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    marginBottom: '14px',
  },
  question: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#5A4A3F',
    margin: '0 0 36px 0',
    lineHeight: '1.5',
    letterSpacing: '-0.3px',
  },
  optionsContainer: {
    display: 'grid',
    gap: '14px',
    gridTemplateColumns: '1fr 1fr',
  },
  optionButton: {
    padding: '22px 26px',
    fontSize: '14px',
    fontWeight: '550',
    color: '#5A4A3F',
    backgroundColor: '#FAFAF9',
    border: '2px solid #E0D5C7',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'left',
    lineHeight: '1.5',
    minHeight: '76px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonHover: {
    backgroundColor: '#F5F1ED',
    borderColor: '#C8BDAA',
    boxShadow: '0 8px 24px rgba(200, 189, 170, 0.18)',
    transform: 'translateY(-2px)',
  },
  optionButtonActive: {
    backgroundColor: '#C8BDAA',
    borderColor: '#B5AAA0',
    color: '#FFFFFF',
    boxShadow: '0 8px 24px rgba(200, 189, 170, 0.3)',
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
    marginTop: '44px',
    paddingTop: '32px',
    borderTop: '1px solid #E8DDD0',
    gap: '24px',
  },
  navigationButton: {
    padding: '12px 28px',
    fontSize: '12px',
    fontWeight: '650',
    color: '#C8BDAA',
    backgroundColor: 'transparent',
    border: '2px solid #C8BDAA',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    flex: '0 0 auto',
  },
  navigationButtonHover: {
    backgroundColor: '#C8BDAA',
    color: '#FFFFFF',
    boxShadow: '0 6px 20px rgba(200, 189, 170, 0.3)',
  },
  navigationButtonDisabled: {
    opacity: 0.35,
    cursor: 'not-allowed',
  },
  stepIndicator: {
    fontSize: '14px',
    color: '#9B8B7E',
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    letterSpacing: '0.3px',
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

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

        <div style={styles.card}>
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
                  e.target.style.boxShadow = '0 8px 20px rgba(217, 204, 189, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentQuestion > 0) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#D9CCBD';
                  e.target.style.boxShadow = 'none';
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
                  e.target.style.boxShadow = '0 8px 20px rgba(217, 204, 189, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentQuestion < QUESTIONS.length - 1) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#D9CCBD';
                  e.target.style.boxShadow = 'none';
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
