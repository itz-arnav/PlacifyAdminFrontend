import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles/App.css";
import { useAuth } from './context/AuthContext';
import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';

function App() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ToastContainer className="toastContainer"
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

      <RedirectHandler isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />

        {/* Catch-all route: Redirects properly */}
        <Route path="*" element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

/**
 * This component listens for URL changes and forces navigation 
 * to "/" if the user is authenticated but visiting an unknown page.
 */
function RedirectHandler({ isAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If authenticated and on an invalid route, force navigation to "/"
    if (isAuthenticated && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  return null;
}

export default App;
