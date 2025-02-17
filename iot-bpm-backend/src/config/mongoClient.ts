import mongoose from "mongoose";
import winston from "winston";

const logger = winston.loggers.get("systemLogger");

const uri = process.env.MONGODB_CONNECTION_STRING;
if (!uri) throw new Error("Did not specify MONGODB_CONNECTION_STRING in environment variables");

mongoose
    .connect(uri)
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch((error) => {
        logger.error("Failed to connect to MongoDB");
    });

export const modeldb = mongoose.connection.useDb("bpm_event_processing");
export const eventdb = mongoose.connection.useDb("bpm_ocel");
