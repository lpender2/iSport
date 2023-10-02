import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    
    const { user, setUser } = props;

    const handleLoginAfterRegister = (email, password) => {
        axios
        .post('http://localhost:8000/api/user/login', { email, password })
        .then((res) => {
            setUser(res.data);
            Cookies.set('user', JSON.stringify(res.data), { expires: 7 });
            navigate('/dashboard'); 
        })
        .catch((err) => {
            console.log('Login Error:', err);
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrors({ confirmPassword: 'Passwords must match' });
            return;
        }
    
        const newUser = {
            firstName: `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`,
            lastName: `${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };
    
        axios
            .post('http://localhost:8000/api/user/register', newUser)
            .then((res) => {
                setErrors({});
                setUser(newUser);
                navigate('/dashboard');
                Cookies.set('newUser', JSON.stringify(res.data), { expires: 30 });
                handleLoginAfterRegister(email, password);
            })
            .catch((err) => {
                console.error('Registration Error:',  err.response ? err.response.data : err);
                if (err.response && err.response.data && err.response.data.errors) {
                    const errorMessages = Object.values(err.response.data.errors).map((error) => error.message);
                    setErrors({ ...errorMessages });
                }
            });
    };
    
    return (
        <div className="login-container">
        <h2>Register for iSport</h2>
        <form onSubmit={handleRegister}>
            <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
            />
            </div>
            <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            </div>
            <p className='text-danger'>
            {errors && Object.values(errors).map((error, index) => (
                <span key={index}>{error}<br /></span>
            ))}
            </p>
            <button type="submit" className="btn btn-primary">
            Register
            </button>
        </form>
        <p>
            Already have an account? <Link to="/login">Login here</Link>.
        </p>
        </div>
    );
    };

export default Register;