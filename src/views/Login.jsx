// Login.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import css from "../styles/Login.module.css";
import FireworksComponent from "../component/FireworksComponent";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            if (location.state.username) setUsername(location.state.username);
            if (location.state.password) setPassword(location.state.password);
        }
    }, [location]);

    const isFormValid = () => username.trim() && password.trim();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid()) {
            toast.warn("Please enter both username and password.");
            return;
        }
        setIsLoading(true);
        try {
            await login(username, password);
            navigate('/');
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className={css.loginContainer}>
            <FireworksComponent />
            <div className={`${css.glass} ${css.item1}`} />
            <div className={`${css.glass} ${css.item2}`} />
            <div className={`${css.glass} ${css.item3}`} />
            <div className={`${css.glass} ${css.item4}`} />
            <div className={`${css.glass} ${css.item5}`} />
            <div className={`${css.glass} ${css.item6}`} />
            <div className={`${css.glass} ${css.item7}`} />
            <div className={`${css.glass} ${css.item8}`} />
            <div className={`${css.glass} ${css.item9}`} />
            <div className={css.loginFormSection}>
                <div className={css.companyDetails}>
                    <img className={css.companyLogo} src="placify.png" alt="Placify Logo" />
                    <span className={css.companyName}>Placify</span>
                </div>
                <div className={css.signInHeaderSection}>
                    <h3 className={css.signInHeading}>Sign in to Placify</h3>
                    <span className={css.signInDescription}>Welcome back! Please sign in to continue.</span>
                </div>
                <form className={css.formContainer} onSubmit={handleSubmit} noValidate>
                    <div className={css.inputSection}>
                        <label htmlFor="username" className={css.inputLabel}>Username or Email</label>
                        <input
                            id="username"
                            type="text"
                            className={css.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username/email"
                        />
                    </div>
                    <div className={css.inputSection} style={{ position: 'relative' }}>
                        <label htmlFor="password" className={css.inputLabel}>Password</label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={css.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            style={{ paddingRight: '2.5rem' }}
                        />
                        <div
                            onClick={togglePasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: '0.75rem',
                                top: '50%',
                                transform: 'translateY(10%)',
                                cursor: 'pointer',
                                color: '#ccc'
                            }}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </div>
                    </div>
                    <button type="submit" className={css.submitButton} disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <footer className={css.footerSection}>
                    <span>Don’t have an account? </span>
                    <a className={css.signupLink} onClick={() => navigate('/signup')}>
                        Sign up
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default Login;
