import express from "express";
import mongoose from "mongoose";
import StatusField from "../../models/domain/statusField";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await StatusField.find();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const descriptionId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(descriptionId)) {
            res.status(404).send("Machine Description not found");
            return;
        }
        const statusFieldDescription = await StatusField.findById(descriptionId);
        if (!statusFieldDescription) {
            res.status(404).send("Event Description not found");
            return;
        }
        res.send(statusFieldDescription);
    } catch (err) {
        next(err);
    }
});
