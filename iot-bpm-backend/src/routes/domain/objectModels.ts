import express from "express";
import { ObjectModel } from "../../models/schemas/models";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await ObjectModel.find();
        res.send(result);
    } catch (err) {
        next(err);
    }
});