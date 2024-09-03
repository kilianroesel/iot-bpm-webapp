import express from "express";
import prisma from "../../config/prisma";
import { NotFoundError } from "../../middleware/errorhandling";
import validateSchema from "../../middleware/schemaValidation";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await prisma.statusField.findMany();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const statusFieldDescription = await prisma.statusField.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!statusFieldDescription) throw new NotFoundError("Status Field not found");

        res.send(statusFieldDescription);
    } catch (err) {
        next(err);
    }
});


router.post("/:id", validateSchema("updateStatusField"), async (req, res, next) => {
    try {
        const updatedDescription = await prisma.statusField.update({
            where: {
                id: req.params.id
            },
            data: req.body,
        });
        if (!updatedDescription)
            throw new NotFoundError("Status field not found");

        res.send(updatedDescription);
    } catch (err) {
        next(err);
    }
});


router.delete("/:id", async (req, res, next) => {
    try {
        const deletedDescription = await prisma.statusField.delete({
            where: {
                id: req.params.id
            }
        });
        if (!deletedDescription)
            throw new NotFoundError("Status field not found");

        res.status(204).send();
    } catch (err) {
        next(err);
    }
});