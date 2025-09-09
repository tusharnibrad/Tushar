import React from 'react';

const UserTable = ({ users, onFilterChange }) => {
    return (
        <div>
            <div className="search-bar">
                <input type="text" name="name" placeholder="Filter by name..." onChange={onFilterChange} />
                <input type="text" name="email" placeholder="Filter by email..." onChange={onFilterChange} />
                <select name="role" onChange={onFilterChange}>
                    <option value="">All Roles</option>
                    <option value="USER">User</option>
                    <option value="STORE_OWNER">Store Owner</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Store Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.role}</td>
                                <td>{user.role === 'STORE_OWNER' ? (user.storeRating || 'N/A') : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
