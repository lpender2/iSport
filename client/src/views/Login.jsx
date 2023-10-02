import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";

const Login = (props) => {
    
    const { user, setUser } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log({ email, password });
        axios.post("http://localhost:8000/api/user/login", { email, password })
        .then((res) => {
            setUser(res.data);
            Cookies.set("user", JSON.stringify(res.data), { expires: 30 });
            Cookies.set("userToken", JSON.stringify(res.data.token), { expires: 30 }); 
            navigate("/homepage"); 
        })
        .catch((err) => {
            console.error("Login Error:", err.response ? err.response.data : err);
            if (err.response && err.response.data && err.response.data.errors) {
            setErrors(err.response.data.errors);
            } else {
            setErrors({ general: "Invalid Credentials" });
            }
        });
    };

    return (
        <div>
        <h2>Login to iSport</h2>
            <div className="login-container">
                <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    />
                </div>
                <p className='text-danger'>
                    {errors && Object.values(errors).map((error, index) => (
                    <span key={index}>{error}<br /></span>
                    ))}
                </p>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                </form>
                <p>
                Don't have an account? <Link to="/register">Register here</Link>.
                </p>
            </div>
        </div>
    );
};

export default Login;