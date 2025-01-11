import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons
import css from "../styles/Login.module.css";
import FireworksComponent from "../component/FireworksComponent";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // New state to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    // Validates that both username and password are provided
    const isFormValid = () => {
        return username.trim() !== '' && password.trim() !== '';
    };

    // Form submission handler
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isFormValid()) {
            setIsLoading(true);
            try {
                await login(username, password);
                navigate('/');
            } catch (error) {
                toast.error("Login failed. Please check your credentials.");
            } finally {
                setIsLoading(false);
            }
        } else {
            toast.warn("Please enter both username and password.");
        }
    };

    // Toggle the state to show or mask password
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className={css.loginContainer}>
            <FireworksComponent />

            {/* Background glass elements */}
            <div className={`${css.glass} ${css.item1}`}></div>
            <div className={`${css.glass} ${css.item2}`}></div>
            <div className={`${css.glass} ${css.item3}`}></div>
            <div className={`${css.glass} ${css.item4}`}></div>
            <div className={`${css.glass} ${css.item5}`}></div>
            <div className={`${css.glass} ${css.item6}`}></div>
            <div className={`${css.glass} ${css.item7}`}></div>
            <div className={`${css.glass} ${css.item8}`}></div>
            <div className={`${css.glass} ${css.item9}`}></div>

            <div className={css.loginFormSection}>
                <div className={css.companyDetails}>
                    <img className={css.companyLogo} src="placify.png" alt="Placify Logo" />
                    <span className={css.companyName}>Placify</span>
                </div>
                <div className={css.signInHeaderSection}>
                    <h3 className={css.signInHeading}>Create your account</h3>
                    <span className={css.signInDescription}>
                        Welcome! Please fill in the details to get started.
                    </span>
                </div>

                {/* Signup Form */}
                <form className={css.formContainer} onSubmit={handleSubmit} noValidate>
                    <div className={css.inputSection}>
                        <label htmlFor="username" className={css.inputLabel}>Username</label>
                        <input
                            id="username"
                            type="text"
                            className={css.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
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
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <footer className={css.footerSection}>
                    <span>Already have an account? </span>
                    <a className={css.signupLink} onClick={() => navigate('/login')}>Sign in</a>
                </footer>
            </div>
        </div>
    );
};

export default Signup;
