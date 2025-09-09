import React from 'react';

const StoreTable = ({ stores, onFilterChange }) => {
    return (
        <div>
            <div className="search-bar">
                <input type="text" name="name" placeholder="Filter by name..." onChange={onFilterChange} />
                <input type="text" name="address" placeholder="Filter by address..." onChange={onFilterChange} />
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Overall Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map(store => (
                            <tr key={store.id}>
                                <td>{store.name}</td>
                                <td>{store.email}</td>
                                <td>{store.address}</td>
                                <td>{store.overallRating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StoreTable;
