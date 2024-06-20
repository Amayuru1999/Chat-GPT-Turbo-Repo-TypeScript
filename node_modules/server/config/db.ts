import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log(
      `Connected To Mongodb Database 🚀`
    );
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`);
  }
};

export default connectDB;
