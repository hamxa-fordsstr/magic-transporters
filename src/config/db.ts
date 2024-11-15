import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using Mongoose.
 * Logs success message on successful connection, otherwise logs an error and exits the process.
 *
 * @returns {Promise<void>} - Resolves if the connection is successful, otherwise throws an error.
 */
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/magic-transporters', {
      // Additional connection options can be added here if needed.
    });
    console.log('MongoDB connected successfully');
    console.log('start...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure if the connection fails.
  }
};

export default connectDB;
