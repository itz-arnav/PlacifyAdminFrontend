import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from "../styles/Login.module.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("Username: " + username);
        console.log("Password: " + password);
        login(username, password)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                toast.error("Login failed. Please check your credentials.", {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    };

    return (
        <div className={css.loginContainer}>
            <div className={`${css.glass} ${css.item1}`}></div>
            <div className={`${css.glass} ${css.item2}`}></div>
            <div className={`${css.glass} ${css.item3}`}></div>
            <div className={`${css.glass} ${css.item4}`}></div>
            <div className={`${css.glass} ${css.item5}`}></div>
            <div className={`${css.glass} ${css.item6}`}></div>
            <div className={`${css.glass} ${css.item7}`}></div>
            <div className={`${css.glass} ${css.item8}`}></div>
            <div className={`${css.glass} ${css.item9}`}></div>
            <div className={css.loginSubContainer}>
                <div className={css.loginHeading}>Welcome Back!</div>
                <div className={css.loginSubHeading}>Please enter your login information</div>
                <div className={css.loginFormSection}>

                    <div className={css.formControl}>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className={css.formInput}
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="username" className={css.formLabel}>
                            Username
                        </label>
                    </div>
                    <div className={css.formControl}>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={css.formInput}
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password" className={css.formLabel}>
                            Password
                        </label>
                    </div>


                </div>

                <button className={css.submitButton} onClick={handleLogin}>Login</button>
            </div>


        </div>
    );
};

export default Login;
