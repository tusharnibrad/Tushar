import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';

const UserDashboard = () => {
    const [stores, setStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('name'); // 'name' or 'address'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { api } = useAuth();

    const fetchStores = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchTerm) {
                params.append(searchType, searchTerm);
            }
            const response = await api.get(`/api/stores?${params.toString()}`);
            setStores(response.data);
        } catch (err) {
            setError('Failed to fetch stores.');
        } finally {
            setLoading(false);
        }
    }, [api, searchTerm, searchType]);

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    const handleRatingSubmit = async (storeId, rating) => {
        try {
            await api.post(`/api/stores/${storeId}/ratings`, { rating });
            // Refetch stores to show the updated rating
            fetchStores(); 
            return true; // Indicate success
        } catch (err) {
            console.error(err); // Log the full error
            // Return the specific error message from the server, or a default one
            return err.response?.data?.message || 'Failed to submit rating.';
        }
    };

    return (
        <div className="dashboard-container">
            <Header />
            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <h3>Quick Actions</h3>
                    <ul>
                        <li><a href="#all-stores">All Stores</a></li>
                        <li><a href="#my-ratings">My Ratings</a></li>
                        <li><a href="#favorites">Favorites</a></li>
                    </ul>
                    <div className="sidebar-stats">
                        <p>Total Stores: {stores.length}</p>
                        <p>Rated: {stores.filter(s => s.userSubmittedRating).length}</p>
                    </div>
                </aside>
                <main className="dashboard-main">
                    <h2>All Stores</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder={`Search by store ${searchType}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="name">Name</option>
                            <option value="address">Address</option>
                        </select>
                    </div>

                    {loading && <p>Loading stores...</p>}
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="store-list">
                        {!loading && stores.map(store => (
                            <StoreCard key={store.id} store={store} onRate={handleRatingSubmit} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

// StoreCard Component
const StoreCard = ({ store, onRate }) => {
    const [rating, setRating] = useState(store.userSubmittedRating || 0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRateClick = async () => {
        if (rating < 1 || rating > 5) {
            setError("Please select a rating between 1 and 5.");
            return;
        }
        
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        const result = await onRate(store.id, rating);

        setIsSubmitting(false);

        if (result === true) {
            setSuccess('Rating submitted!');
            setTimeout(() => setSuccess(''), 3000); // Clear message after 3 seconds
        } else {
            setError(result); // result contains the error message string
        }
    };

    return (
        <div className="store-card">
            <h3>{store.name}</h3>
            <p className="store-address">{store.address}</p>
            <div className="store-rating-info">
                <span>Overall Rating: <strong>{store.overallRating}</strong></span>
                <span>Your Rating: <strong>{store.userSubmittedRating || 'Not Rated'}</strong></span>
            </div>
            <div className="rating-input-area">
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))} disabled={isSubmitting}>
                    <option value="0" disabled>Rate...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                </select>
                <button onClick={handleRateClick} className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : (store.userSubmittedRating ? 'Update' : 'Submit')}
                </button>
            </div>
            {error && <p className="error-message" style={{marginTop: '10px'}}>{error}</p>}
            {success && <p className="success-message" style={{marginTop: '10px'}}>{success}</p>}
        </div>
    );
};

export default UserDashboard;