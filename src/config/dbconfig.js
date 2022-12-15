import mongoose from "mongoose";

export const connectDB = () => {
  try {
    const connStr = "mongodb://localhost:27017/aug_transactionv2";
    const conn = mongoose.connect(connStr);
    conn
      ? console.log("mongo connected")
      : console.log("unable to connecte mongo");
  } catch (error) {
    console.log(error);
  }
};
