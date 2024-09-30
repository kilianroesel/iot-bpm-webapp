import express from "express";
import { ObjectModel } from "../../models/schemas/models";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await ObjectModel.find()
            // Populate object models here instead of pre findOne hook to avoid circular recursion with the machineModel schema
            .populate({
                path: "machineModel",
                model: "MachineModel",
            });
        res.send(result);
    } catch (err) {
        next(err);
    }
});
