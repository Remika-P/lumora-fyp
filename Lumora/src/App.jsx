import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Quiz from "./Quiz";
import QuizResults from "./QuizResults";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import OTPVerification from "./OTPVerification";
import VerifyOTP from "./VerifyOTP";
import Recommendations from "./Recommendations";

function MainApp({ setIsAuthenticated }) {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [savedStyle, setSavedStyle] = useState(null);
  const [view, setView] = useState('dashboard'); // dashboard, quiz, results, recommendations

  useEffect(() => {
    const style = localStorage.getItem('selectedStyle');
    if (style) {
      try {
        setSavedStyle(JSON.parse(style));
      } catch (e) {
        setSavedStyle(null);
      }
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('selectedStyle');
      setIsAuthenticated(false);
    }
  };

  const handleStartQuiz = () => {
    setSelectedStyle(null);
    setView('quiz');
  };

  const handleFinishQuiz = (answers) => {
    setSelectedStyle(answers);
    localStorage.setItem('selectedStyle', JSON.stringify(answers));
    setSavedStyle(answers);
    setView('results');
  };

  const handleRetakeQuiz = () => {
    setSelectedStyle(null);
    setView('quiz');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  const handleViewRecommendations = () => {
    setView('recommendations');
  };

  return (
    <>
      {view === 'dashboard' && (
        <Dashboard
          selectedStyle={savedStyle}
          onRetakeQuiz={handleStartQuiz}
          onLogout={handleLogout}
          onViewRecommendations={handleViewRecommendations}
        />
      )}
      {view === 'quiz' && (
        <Quiz onFinish={handleFinishQuiz} onLogout={handleLogout} />
      )}
      {view === 'results' && (
        <QuizResults
          answers={selectedStyle}
          onRetake={handleRetakeQuiz}
          onLogout={handleLogout}
          onBackDashboard={handleBackToDashboard}
          onViewRecommendations={handleViewRecommendations}
        />
      )}
      {view === 'recommendations' && (
        <Recommendations
          quizAnswers={savedStyle}
          onBack={handleBackToDashboard}
        />
      )}
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/" /> : <ForgotPassword />} />
        <Route path="/verify-otp" element={isAuthenticated ? <Navigate to="/" /> : <OTPVerification />} />
        <Route path="/" element={isAuthenticated ? <MainApp setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;