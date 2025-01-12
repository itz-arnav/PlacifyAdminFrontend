import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import css from "../styles/Login.module.css";
import FireworksComponent from "../component/FireworksComponent";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidUsername = (username) => username.trim().length >= 3;
    const isValidPassword = (password) => password.trim().length >= 6;

    const isFormValid = () =>
        isValidUsername(username) &&
        isValidEmail(email) &&
        isValidPassword(password);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid()) {
            if (!isValidUsername(username)) {
                toast.warn("Username must be at least 3 characters long.");
            } else if (!isValidEmail(email)) {
                toast.warn("Please enter a valid email address.");
            } else if (!isValidPassword(password)) {
                toast.warn("Password must be at least 6 characters long.");
            }
            return;
        }
        setIsLoading(true);
        try {
            await register(username, email, password);
            // Instead of setting isAuthenticated to true, go to the login page.
            // Pass the username and password via state so that Login.jsx can prefill the form.
            navigate('/login', { state: { username, password } });
        } catch (error) {
            toast.error("Signup failed. Please check your details.");
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

                <form className={css.formContainer} onSubmit={handleSubmit} noValidate>
                    <div className={css.inputSection}>
                        <label htmlFor="username" className={css.inputLabel}>Username</label>
                        <input
                            id="username"
                            type="text"
                            className={css.input}
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className={css.inputSection}>
                        <label htmlFor="email" className={css.inputLabel}>Email</label>
                        <input
                            id="email"
                            type="email"
                            className={css.input}
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
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
                            required
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
                        {isLoading ? "Signing up..." : "Sign up"}
                    </button>
                </form>

                <footer className={css.footerSection}>
                    <span>Already have an account? </span>
                    <a className={css.signupLink} onClick={() => navigate('/login')}>
                        Sign in
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default Signup;
