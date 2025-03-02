import express from "express";
import { DbClient } from "../../config/DbClient";

export const router = express.Router();
const mongoClient = DbClient.instance;

router.get("/lines", async (req, res, next) => {
    try {
        const collections = await mongoClient.useEventDb().listCollections();
        console.log(collections);
        const collectionNames = collections.map((collection) => {
            return { name: collection.name };
        });
        res.send(collectionNames);
    } catch (err) {
        next(err);
    }
});
