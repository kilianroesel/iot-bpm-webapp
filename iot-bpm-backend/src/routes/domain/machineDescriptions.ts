import express from "express";
import validateSchema from "../../middleware/schemaValidation";
import { NotFoundError } from "../../middleware/errorhandling";
import prisma from "../../config/prisma";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await prisma.machineDescription.findMany({
            include: {
                mainEquipment: {
                    include: {
                        statusFields: true,
                        events: true,
                        childEquipment: true
                    }
                }
            }
        });
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const descriptionId = req.params.id;
        const machineDescription = await prisma.machineDescription.findUnique({
            where: {
                id: descriptionId,
            },
            include: {
                mainEquipment: {
                    include: {
                        statusFields: true,
                        events: true,
                        childEquipment: true,
                    }
                },

            }
        });
        if (!machineDescription)
            throw new NotFoundError("Machine Description not found");
        res.send(machineDescription);
    } catch (err) {
        next(err);
    }
});

router.post("", validateSchema("createMachineDescription"), async (req, res, next) => {
    try {
        const newMachineDescription = await prisma.machineDescription.create({ data: req.body });
        res.status(201).send(newMachineDescription);
    } catch (err) {
        next(err);
    }
});

router.post("/:id", validateSchema("updateMachineDescription"), async (req, res, next) => {
    try {
        const updatedDescription = await prisma.machineDescription.update({
            where: {
                id: req.params.id
            },
            data: req.body,
        });
        res.send(updatedDescription);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await prisma.machineDescription.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});
