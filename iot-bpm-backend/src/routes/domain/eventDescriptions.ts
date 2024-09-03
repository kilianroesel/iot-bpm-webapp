import express from 'express';
import { NotFoundError } from '../../middleware/errorhandling';
import validateSchema from '../../middleware/schemaValidation';
import prisma from '../../config/prisma';

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await prisma.eventDescription.findMany();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const eventDescription = await prisma.eventDescription.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (!eventDescription)
            throw new NotFoundError("Event Description not found");

        res.send(eventDescription);
    } catch (err) {
        next(err);
    }
});

router.post("/:id", validateSchema("updateEventDescription"), async (req, res, next) => {
    try {
        const updatedDescription = await prisma.eventDescription.update({
            where: {
                id: req.params.id
            },
            data: req.body,
        });
        if (!updatedDescription)
            throw new NotFoundError("Event Description not found");

        res.send(updatedDescription);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deletedDescription = await prisma.eventDescription.delete({
            where: {
                id: req.params.id
            }
        });
        if (!deletedDescription)
            throw new NotFoundError("Event Description not found");

        res.status(204).send();
    } catch (err) {
        next(err);
    }
});