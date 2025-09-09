import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard'); // Redirect to the central dashboard redirector
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log in. Please check your credentials.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-left">
                    <h1>Welcome Back</h1>
                    <p>Sign in to access your store ratings dashboard and manage your reviews.</p>
                    <div className="auth-features">
                        <div className="feature-item">
                            <span>⭐</span>
                            <span>Rate and review stores</span>
                        </div>
                        <div className="feature-item">
                            <span>📊</span>
                            <span>View analytics</span>
                        </div>
                        <div className="feature-item">
                            <span>🏪</span>
                            <span>Manage store listings</span>
                        </div>
                    </div>
                </div>
                <div className="auth-form">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="btn-primary">Login</button>
                    </form>
                    <p className="auth-switch">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
