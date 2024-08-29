import express from 'express';
import EventDescription from '../../models/domain/eventDescription';
import mongoose from 'mongoose';
import { NotFoundError } from '../../middleware/errorhandling';

export const router = express.Router();

router.get("/eventDescriptions", async (req, res, next) => {
    try {
        const result = await EventDescription.find();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/eventDescriptions/:id", async (req, res, next) => {
    try {
        const descriptionId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(descriptionId))
            throw new NotFoundError("Event Description not found");

        const eventDescription = await EventDescription.findById(descriptionId);
        if (!eventDescription)
            throw new NotFoundError("Event Description not found");

        res.send(eventDescription);
    } catch (err) {
        next(err);
    }
});