import mongoose from "mongoose";

const connectDb = async () => {
  let isConnected = false;

  try {
    if (isConnected) {
      console.log("MongoDB is already connected");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI || "");
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
};

export default connectDb;
