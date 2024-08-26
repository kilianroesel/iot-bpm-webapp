import mongoose from "mongoose";

const mongodbConnectionstring = process.env.MONGODB_CONNECTIONSTRING || "";

mongoose
  .connect(mongodbConnectionstring)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(`Failed to connect to MongoDB: ${error}`);
  });

const db = mongoose.connection;

export default db;
