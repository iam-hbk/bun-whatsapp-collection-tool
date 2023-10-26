import mongoose from "mongoose";

// dotenv.config();
console.log(Bun.env.MONGODB_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(Bun.env.MONGODB_URI!);
    console.log("MongoDB connected 🔥");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
export default connectDB;
