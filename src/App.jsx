import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles/App.css";
import { useAuth } from './context/AuthContext';
import LoadingSpinner from './component/LoadingSpinner';
import ErrorBoundary from './component/ErrorBoundary';

// Lazy load components for better performance
const Login = lazy(() => import('./views/Login'));
const Signup = lazy(() => import('./views/Signup'));
const Home = lazy(() => import('./views/Home'));

// Route configuration
const routes = [
  {
    path: '/login',
    element: <Login />,
    requiresAuth: false,
  },
  {
    path: '/signup',
    element: <Signup />,
    requiresAuth: false,
  },
  {
    path: '/',
    element: <Home />,
    requiresAuth: true,
  },
];

// Protected Route wrapper component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Public Route wrapper component (redirects to home if already authenticated)
const PublicRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();
  
  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return children;
};

function App() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <ToastContainer
          className="toastContainer"
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.requiresAuth ? (
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      {route.element}
                    </ProtectedRoute>
                  ) : (
                    <PublicRoute isAuthenticated={isAuthenticated}>
                      {route.element}
                    </PublicRoute>
                  )
                }
              />
            ))}
            {/* Catch-all route */}
            <Route
              path="*"
              element={
                <Navigate
                  to={isAuthenticated ? '/' : '/login'}
                  replace
                />
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
