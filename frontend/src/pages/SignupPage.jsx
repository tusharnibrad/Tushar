import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { api } = useAuth(); // Use the configured axios instance from context
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.post('/api/auth/register', { name, email, address, password });
            setSuccess('Registration successful! Please log in.');
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-left">
                    <h1>Join Us Today</h1>
                    <p>Create your account to start rating stores and exploring reviews.</p>
                    <div className="auth-features">
                        <div className="feature-item">
                            <span>📝</span>
                            <span>Easy registration</span>
                        </div>
                        <div className="feature-item">
                            <span>🔒</span>
                            <span>Secure and private</span>
                        </div>
                        <div className="feature-item">
                            <span>🌟</span>
                            <span>Access all features</span>
                        </div>
                    </div>
                </div>
                <div className="auth-form">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                         <div className="form-group">
                            <label>Address</label>
                            <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <button type="submit" className="btn-primary">Sign Up</button>
                    </form>
                     <p className="auth-switch">
                        Are you a store owner? <Link to="/signup-owner">Register your store</Link>
                    </p>
                     <p className="auth-switch">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
