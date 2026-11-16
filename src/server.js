
require('dotenv').config();
const express = require('express');
const  cors = require('cors')
const mongoose = require('mongoose')
const  {routes} = require('./routes')

const app = express()

const PORT = process.env.PORT || 3020;
const MONGO_URI = process.env.MONGO_URI;
const isDevelopment = process.env.NODE_ENV !== 'production'

if(isDevelopment){
    // set DNS Servers (fixed connecting issue from MongoDB Atlas)
    const dns = require('dns');
    dns.setServers([
        '8.8.8.8',
        '8.8.4.4'
    ]);

    // Log
    mongoose.set('debug', true);
}

// Validate environment variables
if(!MONGO_URI){
    throw new Error('MONGO_URI environment variable is required')
}

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// API routes
routes(app)

// Health check
app.get('/',(_,res)=>{
    res.status(200).json({
        message: `Running on Port ${PORT}`,
        port:PORT,
        status:"OK"
    })
})

// Start server after successful database connection
const startServer = async () => {
    try {
    const mongoUrl = new URL(MONGO_URI);

    console.log('MongoDB Host:', mongoUrl.hostname);
    console.log('MongoDB Protocol:', mongoUrl.protocol);
    } catch (error) {
        console.error('Invalid MongoDB URI');
    }

    try {        
        console.log("connecting to mongoDB")
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000
        });

        console.log('MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log('Server started at localhost:', PORT)
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

startServer()


// Graceful shutdown
const shutdown = async () => {
    console.log('Shutting down server...');

    await mongoose.disconnect();
    process.exit(0);
};

// Triggered when you manually stop your application, usually by pressing: Ctrl + C in your terminal
process.on('SIGINT', shutdown);
/**
 * Triggered when the operating system or another process requests your application to terminate.
 * Common examples:
 * - Docker container stopping.
 * - Server shutdown.
 * - Process manager stopping your application.
 * - Deployment platforms restarting your application.
 */
process.on('SIGTERM', shutdown);