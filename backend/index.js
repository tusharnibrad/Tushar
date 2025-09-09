require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./src/config/db.js'); // Corrected Path

// Import Routes
const authRoutes = require('./src/routes/authRoutes.js'); // Corrected Path
const userRoutes = require('./src/routes/userRoutes.js'); // Corrected Path
const storeRoutes = require('./src/routes/storeRoutes.js'); // Corrected Path
// We will create the ratingRoutes later
// const ratingRoutes = require('./src/routes/ratingRoutes'); 

const createDefaultAdmin = require('./src/utils/setup.js');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Run the setup script
createDefaultAdmin();

//Testing the basic route:
app.get('/', (req, res) =>{
    res.json({message: "Welcome to the Store Rating API!"});
});
// --- API Routes ---
app.get('/api', (req, res) => {
    res.json({ message: "Welcome to the Store Rating API!" });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
// app.use('/api/ratings', ratingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is healthy' });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});