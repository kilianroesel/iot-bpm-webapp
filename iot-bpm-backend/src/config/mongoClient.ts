import mongoose from 'mongoose';

const uri = process.env.MONGODB_CONNECTION_STRING;
if (!uri)
    throw new Error("Did not specify MONGODB_CONNECTION_STRING in environment variables")

mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Failed to connect to MongoDB");
});

const mongodb = mongoose.connection;
export default mongodb;