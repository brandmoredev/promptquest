import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'promptquest',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};
