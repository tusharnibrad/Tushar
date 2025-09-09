import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="dashboard-header">
            <div className="header-content">
                <h1>Store Ratings</h1>
                {user && (
                    <div className="user-info">
                        <span>Welcome, {user.name} ({user.role})</span>
                        <Link to="/update-password"><button className="btn-secondary">Update Password</button></Link>
                        <button onClick={logout} className="btn-secondary">Logout</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
