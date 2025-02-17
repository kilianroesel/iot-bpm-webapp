import express from "express";
import { eventdb } from "../../config/mongoClient";

export const router = express.Router();

router.get("/lines", async (req, res, next) => {
    try {
        const collections = await eventdb.listCollections();
        console.log(collections);
        const collectionNames = collections.map((collection) => {
            return { name: collection.name };
        });
        res.send(collectionNames);
    } catch (err) {
        next(err);
    }
});
