import express from "express";
import prisma from "../../config/prisma";
import { NotFoundError } from "../../middleware/errorhandling";

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
