import mongoose from 'mongoose';

const MAX_RETRIES = 3;
let retryCount = 0;

export const connectDB = async () => {
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
      family: 4, // Force IPv4
    });
    
    console.log('✅ MongoDB connected successfully');
    retryCount = 0;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      const delay = 1000 * Math.pow(2, retryCount - 1); // Exponential backoff
      console.log(`🔄 Retrying in ${delay / 1000} seconds... (Attempt ${retryCount}/${MAX_RETRIES})`);
      setTimeout(() => connectDB(), delay);
    } else {
      console.error('❌ Failed to connect after maximum retries');
      console.error('⚠️  Please check:');
      console.error('   1. MongoDB Atlas cluster is running');
      console.error('   2. Your IP is whitelisted in MongoDB Atlas');
      console.error('   3. Your internet connection');
      console.error('   4. The connection string in .env');
      // Continue without exiting to allow frontend to work
    }
  }
};

export default connectDB;
