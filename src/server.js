
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { routes } = require('./routes');
const { setDns } = require('./helpers/setDns');
const { connectDB } = require('./helpers/mongoDbConnection');

const app = express();

const PORT = process.env.PORT || 3020;
const isDevelopment = process.env.NODE_ENV !== 'production';
const isLocalDevelopment = require.main === module

isLocalDevelopment && setDns()

mongoose.set('debug', isDevelopment);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (_, res) => {
    res.status(200).json({
        message: `Running on Port ${PORT}`,
        port: PORT,
        status: 'OK'
    });
});

// Ensure database connection before API routes
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(503).json({
            message: 'Database connection unavailable'
        });
    }
});

// API routes
routes(app);

if (isLocalDevelopment) {
    app.listen(PORT, () => {
        console.log(`Server started at localhost:${PORT}`);
    });
}

// Export Express application for Vercel
module.exports = app;
