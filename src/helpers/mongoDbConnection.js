const MONGO_URI = process.env.MONGO_URI;

// Validate environment variables
if (!MONGO_URI) {
    throw new Error('MONGO_URI environment variable is required');
}

// MongoDB connection cache
let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = {
        conn: null,
        promise: null
    };
}

// Connect to MongoDB
const connectDB = async () => {
    if (cached.conn && mongoose.connection.readyState === 1) {
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('Connecting to MongoDB...');

        cached.promise = mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000
        });
    }

    try {
        cached.conn = await cached.promise;

        console.log('MongoDB connected successfully');

        return cached.conn;

    } catch (error) {
        cached.promise = null;
        cached.conn = null;

        console.error('MongoDB connection failed:', error.message);

        throw error;
    }
};


module.exports = { connectDB };