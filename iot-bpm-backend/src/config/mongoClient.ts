import mongoose from "mongoose";
import winston from "winston";

const logger = winston.loggers.get("systemLogger");

export class DbClient {
    static #instance: DbClient;
    private uri: string;
    public modelDb;
    public eventDb;


    private constructor(uri: string) {
        this.uri = uri;
        this.modelDb = mongoose.connection.useDb("bpm_event_processing");
        this.eventDb = mongoose.connection.useDb("bpm_ocel");
    }

    public static get instance(): DbClient {
        const uri = process.env.MONGODB_CONNECTION_STRING;
        if (!uri) throw new Error("Did not specify MONGODB_CONNECTION_STRING environment variable");

        if (!DbClient.#instance) {
            DbClient.#instance = new DbClient(uri);
        }
        return DbClient.#instance;
    }

    public async connect() {
        try {
            await mongoose.connect(this.uri);
            logger.info("Connected to Database");
        } catch (error) {
            logger.error("Failed to connect to Database");
        }
    }

    public async close() {
        await mongoose.disconnect();
    }
}
