import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import recommendationsRoute from './routes/recommendations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationsRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// ✅ Only start server after DB connects with retry logic
const MAX_RETRIES = 5;
let retryCount = 0;

const startServer = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📍 Connection String:', process.env.MONGODB_URI.substring(0, 30) + '...[hidden]');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 10000,
      family: 4, // Force IPv4
    });
    
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      const delay = 1000 * Math.pow(2, retryCount - 1); // Exponential backoff
      console.log(`🔄 Retrying in ${delay / 1000} seconds... (Attempt ${retryCount}/${MAX_RETRIES})`);
      setTimeout(() => startServer(), delay);
    } else {
      console.error('❌ Failed to connect after maximum retries');
      console.error('⚠️  Please check:');
      console.error('   1. MongoDB Atlas cluster is running');
      console.error('   2. Your IP is whitelisted in MongoDB Atlas');
      console.error('   3. Your internet connection is stable');
      console.error('   4. The connection string in .env is correct');
      console.error('');
      console.error('💡 For now, starting server without database...');
      
      // Start server anyway for testing frontend
      app.listen(PORT, () => {
        console.log(`⚠️  Server running on port ${PORT} (Database unavailable)`);
        console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
      });
    }
  }
};

startServer();