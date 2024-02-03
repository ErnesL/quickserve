import mongoose from "mongoose";

const URI_MONGO = process.env.URI_MONGO;

const connectDB = async () => {
  try {
    await mongoose.connect(URI_MONGO);
    console.log("MongoDB has successfuly connected...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
