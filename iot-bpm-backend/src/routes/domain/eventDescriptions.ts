import express from 'express';
import EventDescription from '../../models/domain/eventDescription';
import mongoose from 'mongoose';
import { NotFoundError } from '../../middleware/errorhandling';
import validateSchema from '../../middleware/schemaValidation';

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await EventDescription.find();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
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

router.post("/:id", validateSchema("updateEventDescription"), async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundError("Event Description not found");

        const updatedDescription = await EventDescription.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedDescription) throw new NotFoundError("Event Description not found");

        res.send(updatedDescription);
    } catch (err) {
        next(err);
    }
});