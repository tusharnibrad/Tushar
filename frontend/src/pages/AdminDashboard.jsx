import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import AddUserForm from '../components/AddUserForm';
import AddStoreForm from '../components/AddStoreForm';
import UserTable from '../components/admin/UserTable';
import StoreTable from '../components/admin/StoreTable';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { api } = useAuth();

    // State for forms
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showAddStoreForm, setShowAddStoreForm] = useState(false);

    // Filters and sorting state
    const [userFilters, setUserFilters] = useState({ name: '', email: '', role: '' });
    const [storeFilters, setStoreFilters] = useState({ name: '', address: '' });
    const [userSort, setUserSort] = useState({ sortBy: 'name', sortOrder: 'ASC' });
    const [storeSort, setStoreSort] = useState({ sortBy: 'name', sortOrder: 'ASC' });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const userParams = new URLSearchParams({ ...userFilters, ...userSort }).toString();
            const storeParams = new URLSearchParams({ ...storeFilters, ...storeSort }).toString();

            const [statsRes, usersRes, storesRes] = await Promise.all([
                api.get('/api/stores/dashboard-stats'),
                api.get(`/api/users?${userParams}`),
                api.get(`/api/stores?${storeParams}`)
            ]);
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setStores(storesRes.data);
        } catch (err) {
            setError('Failed to fetch dashboard data.');
        } finally {
            setLoading(false);
        }
    }, [api, userFilters, storeFilters, userSort, storeSort]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUserFilterChange = (e) => {
        setUserFilters({ ...userFilters, [e.target.name]: e.target.value });
    };

    const handleStoreFilterChange = (e) => {
        setStoreFilters({ ...storeFilters, [e.target.name]: e.target.value });
    };

    if (loading) {
        return (
             <div className="dashboard-container">
                <Header />
                <main className="dashboard-content"><p>Loading admin dashboard...</p></main>
            </div>
        );
    }
     if (error) {
        return (
             <div className="dashboard-container">
                <Header />
                <main className="dashboard-content"><p className="error-message">{error}</p></main>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <Header />
            <main className="dashboard-content">
                {showAddUserForm && <AddUserForm onUserAdded={() => { setShowAddUserForm(false); fetchData(); }} onCancel={() => setShowAddUserForm(false)} />}
                {showAddStoreForm && <AddStoreForm onStoreAdded={() => { setShowAddStoreForm(false); fetchData(); }} onCancel={() => setShowAddStoreForm(false)} />}

                <h2>Admin Dashboard</h2>
                
                <div className="stats-grid">
                    <div className="stats-card">
                        <h3>Total Users</h3>
                        <p className="stat-number">{stats.totalUsers}</p>
                    </div>
                    <div className="stats-card">
                        <h3>Total Stores</h3>
                        <p className="stat-number">{stats.totalStores}</p>
                    </div>
                    <div className="stats-card">
                        <h3>Total Ratings</h3>
                        <p className="stat-number">{stats.totalRatings}</p>
                    </div>
                </div>

                <h3>Manage Users</h3>
                <button onClick={() => setShowAddUserForm(true)} className="btn-primary">Add User</button>
                <UserTable users={users} onFilterChange={handleUserFilterChange} />

                <h3>Manage Stores</h3>
                <button onClick={() => setShowAddStoreForm(true)} className="btn-primary">Add Store</button>
                <StoreTable stores={stores} onFilterChange={handleStoreFilterChange} />
            </main>
        </div>
    );
};

export default AdminDashboard;