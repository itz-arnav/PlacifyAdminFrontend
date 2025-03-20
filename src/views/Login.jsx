// Login.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import css from "../styles/Login.module.css";
import FireworksComponent from "../component/FireworksComponent";
import LoadingSpinner from '../component/LoadingSpinner';

// Constants
const INITIAL_FORM_STATE = {
    username: '',
    password: '',
    errors: {}
};

const ERROR_MESSAGES = {
    username: {
        required: 'Username is required',
        minLength: 'Username must be at least 3 characters'
    },
    password: {
        required: 'Password is required',
        minLength: 'Password must be at least 6 characters'
    }
};

// Form validation utility
const validateForm = (values) => {
    const errors = {};
    
    if (!values.username.trim()) {
        errors.username = ERROR_MESSAGES.username.required;
    } else if (values.username.length < 3) {
        errors.username = ERROR_MESSAGES.username.minLength;
    }

    if (!values.password) {
        errors.password = ERROR_MESSAGES.password.required;
    } else if (values.password.length < 6) {
        errors.password = ERROR_MESSAGES.password.minLength;
    }

    return errors;
};

// Password visibility toggle component
const PasswordToggle = ({ showPassword, onToggle }) => (
    <button
        type="button"
        onClick={onToggle}
        className={css.passwordToggle}
        aria-label={showPassword ? "Hide password" : "Show password"}
    >
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
    </button>
);

PasswordToggle.propTypes = {
    showPassword: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

const Login = () => {
    const [formState, setFormState] = useState(INITIAL_FORM_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setFormState(prev => ({
                ...prev,
                username: location.state.username || '',
                password: location.state.password || ''
            }));
        }
    }, [location]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value,
            errors: {
                ...prev.errors,
                [name]: ''
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const errors = validateForm(formState);
        if (Object.keys(errors).length > 0) {
            setFormState(prev => ({ ...prev, errors }));
            return;
        }

        setIsLoading(true);
        try {
            await login(formState.username, formState.password);
            navigate('/', { replace: true });
        } catch (error) {
            toast.error(error.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className={css.loginContainer} role="main">
            <FireworksComponent />
            {[...Array(9)].map((_, index) => (
                <div key={index} className={`${css.glass} ${css[`item${index + 1}`]}`} />
            ))}
            
            <div className={css.loginFormSection}>
                <div className={css.companyDetails}>
                    <img 
                        className={css.companyLogo} 
                        src="placify.png" 
                        alt="Placify Logo"
                        width="40"
                        height="40"
                    />
                    <span className={css.companyName}>Placify</span>
                </div>

                <div className={css.signInHeaderSection}>
                    <h1 className={css.signInHeading}>Sign in to Placify</h1>
                    <span className={css.signInDescription}>Welcome back! Please sign in to continue.</span>
                </div>

                <form 
                    className={css.formContainer} 
                    onSubmit={handleSubmit} 
                    noValidate
                    aria-label="Login form"
                >
                    <div className={css.inputSection}>
                        <label htmlFor="username" className={css.inputLabel}>
                            Username or Email
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className={`${css.input} ${formState.errors.username ? css.inputError : ''}`}
                            value={formState.username}
                            onChange={handleInputChange}
                            placeholder="Enter your username/email"
                            aria-invalid={!!formState.errors.username}
                            aria-describedby={formState.errors.username ? "username-error" : undefined}
                        />
                        {formState.errors.username && (
                            <span id="username-error" className={css.errorMessage} role="alert">
                                {formState.errors.username}
                            </span>
                        )}
                    </div>

                    <div className={css.inputSection}>
                        <label htmlFor="password" className={css.inputLabel}>
                            Password
                        </label>
                        <div className={css.passwordInputWrapper}>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className={`${css.input} ${formState.errors.password ? css.inputError : ''}`}
                                value={formState.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                aria-invalid={!!formState.errors.password}
                                aria-describedby={formState.errors.password ? "password-error" : undefined}
                            />
                            <PasswordToggle 
                                showPassword={showPassword} 
                                onToggle={togglePasswordVisibility} 
                            />
                        </div>
                        {formState.errors.password && (
                            <span id="password-error" className={css.errorMessage} role="alert">
                                {formState.errors.password}
                            </span>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className={css.submitButton}
                        disabled={isLoading}
                        aria-busy={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <footer className={css.footerSection}>
                    <span>Don't have an account? </span>
                    <button 
                        className={css.signupLink}
                        onClick={() => navigate('/signup')}
                        type="button"
                    >
                        Sign up
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default Login;
