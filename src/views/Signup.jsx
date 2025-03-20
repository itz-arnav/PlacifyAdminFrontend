// Signup.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import css from "../styles/Login.module.css";
import FireworksComponent from "../component/FireworksComponent";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validators = {
        username: (value) => value.trim().length >= 3 || "Username must be at least 3 characters long.",
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Please enter a valid email address.",
        password: (value) => value.trim().length >= 6 || "Password must be at least 6 characters long."
    };

    const validateForm = () => {
        for (const [field, validator] of Object.entries(validators)) {
            const result = validator(formData[field]);
            if (result !== true) {
                toast.warn(result);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await register(formData.username, formData.email, formData.password);
            navigate('/login', { 
                state: { 
                    username: formData.username, 
                    password: formData.password 
                } 
            });
        } catch (error) {
            toast.error("Signup failed. Please check your details.");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

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
                    <h1 className={css.signInHeading}>Create your account</h1>
                    <p className={css.signInDescription}>
                        Welcome! Please fill in the details to get started.
                    </p>
                </div>
                <form className={css.formContainer} onSubmit={handleSubmit} noValidate>
                    <div className={css.inputSection}>
                        <label htmlFor="username" className={css.inputLabel}>Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className={css.input}
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className={css.inputSection}>
                        <label htmlFor="email" className={css.inputLabel}>Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={css.input}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className={css.inputSection} style={{ position: 'relative' }}>
                        <label htmlFor="password" className={css.inputLabel}>Password</label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className={css.input}
                            value={formData.password}
                            onChange={handleChange}
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
                            aria-label={`${showPassword ? 'Hide' : 'Show'} password`}
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={css.submitButton} 
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing up..." : "Sign up"}
                    </button>
                </form>
                <div className={css.footerSection}>
                    <span>Already have an account?</span>
                    <button 
                        type="button" 
                        className={css.signupLink} 
                        onClick={() => navigate('/login')}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
