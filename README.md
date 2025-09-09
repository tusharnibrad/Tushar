# Store-Rating-App-Roxiler (Full-Stack Application)

A complete web application built from scratch that allows users to submit and view ratings for stores. The platform features a robust role-based access control system, providing tailored experiences for Normal Users, Store Owners, and System Administrators.

## 📖 Table of Contents

* [✨ Features](#-features)
* [🚀 Tech Stack](#-tech-stack)
* [📋 Prerequisites](#-prerequisites)
* [⚙️ Installation & Setup](#️-installation--setup)

## ✨ Features

### 👤 Normal User

* **User Authentication**: Secure signup and login functionality.
* **Store Discovery**: View a list of all registered stores.
* **Search**: Find stores by name or address.
* **Rating System**: Submit a rating from 1 to 5 for any store.
* **Update Ratings**: Modify previously submitted ratings.
* **Password Management**: Ability to update their own password after logging in.

### 🏪 Store Owner

* **Secure Login**: Access a dedicated, protected dashboard.
* **Performance Metrics**: View the overall average rating for their specific store.
* **Customer Insights**: See a list of all users who have submitted a rating for their store.
* **Password Management**: Ability to update their own password.

### 🛠️ System Administrator

* **Secure Login**: Access a comprehensive admin dashboard.
* **Platform Analytics**: View key statistics, including the total number of users, stores, and ratings.
* **User Management**: View a filterable list of all users on the platform (Admin, User, Store Owner).
* **Store Management**: View a filterable list of all registered stores and their ratings.
* **Creation Capabilities**: Backend API includes protected endpoints for an admin to create new users (of any role) and new stores.

## 🚀 Tech Stack

This project is built with a modern full-stack architecture.

### Frontend

* **React.js**: A JavaScript library for building user interfaces.
* **Vite**: A blazing-fast frontend build tool.
* **React Router**: For client-side routing and navigation.
* **Axios**: For making API requests to the backend.
* **React Context API**: For global state management (authentication).

### Backend

* **Node.js**: JavaScript runtime environment.
* **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
* **MySQL2**: MySQL client for Node.js.
* **JSON Web Token (JWT)**: For secure user authentication.
* **Bcrypt.js**: For hashing user passwords.
* **Dotenv**: For managing environment variables.
* **CORS**: For enabling Cross-Origin Resource Sharing.

### Database

* **MySQL**: A popular open-source relational database.

## 🔗 API Endpoints

The backend provides the following key API endpoints:

* **GET /api/health**: Health check endpoint to verify server status.
* **POST /api/auth/login**: User login.
* **POST /api/auth/register**: User registration.
* **POST /api/auth/register-store-owner**: Store owner registration.
* **GET /api/stores**: Get all stores.
* **GET /api/users**: Get all users (admin only).
* And more...

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:

* Node.js (which includes npm)
* MySQL Server
* A database management tool like MySQL Workbench or XAMPP (which includes phpMyAdmin).

## ⚙️ Installation & Setup

Follow these steps to get the project up and running locally.

### 1. Database Setup

1. Start your MySQL server.
2. Create a new database named `store_rating_db`.
3. Execute the SQL commands found in the `database.sql` file (or from the initial project setup) to create the `users`, `stores`, and `ratings` tables.

### 2. Backend Setup

1. Navigate to the `backend` directory:
```
cd backend
```
2. Install the required npm packages:
```
npm install
```

3. Create a `.env` file in the `backend` root directory and add the following environment variables, replacing the placeholders with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=store_rating_db
JWT_SECRET=a_long_and_very_secret_key_for_your_jwt
PORT=5000
```
4. Start the backend server:
```
npm start
```
The server should now be running on `http://localhost:5000`.

### 3. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
```
cd frontend
```
2. Install the required npm packages:
```
npm install
```
3. Create a `.env` file in the `frontend` root directory and add the following:
```
VITE_API_BASE_URL=http://localhost:5000
```
4. Start the frontend development server:
```
npm run dev
```
The application should now be accessible at `http://localhost:5173` (or another port specified by Vite).
