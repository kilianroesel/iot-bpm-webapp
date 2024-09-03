import express from "express";
import validateSchema from "../../middleware/schemaValidation";
import prisma from "../../config/prisma";
import { NotFoundError } from "../../middleware/errorhandling";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await prisma.equipmentDescription.findMany({
            include: {
                mainMachineDescription: true,
            }
        });
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const equipmentDescription = await prisma.equipmentDescription.findUnique({
            where: {
                id: req.params.id,
            },
            include: {
                statusFields: true,
                events: true,
                childEquipment: true
            },
        });
        if (!equipmentDescription) throw new NotFoundError("Equipment description not found");
        res.send(equipmentDescription);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const equipmentDescription = await prisma.equipmentDescription.delete({
            where: {
                id: req.params.id,
            }
        });
        if (!equipmentDescription) throw new NotFoundError("Equipment description not found");
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

router.post("/:id", validateSchema("updateEquipmentDescription"), async (req, res, next) => {
    try {
        const updatedDescription = await prisma.equipmentDescription.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        });
        if (!updatedDescription) throw new NotFoundError("Equipment description not found");
        res.send(updatedDescription);
    } catch (err) {
        next(err);
    }
});

router.post("/:id/createChildEquipment", validateSchema("createEquipmentDescription"), async (req, res, next) => {
    try {
        const newDescription = await prisma.equipmentDescription.create({
            data: {
                ...req.body,
                parentId: req.params.id,
            },
        });
        res.send(newDescription);
    } catch (err) {
        next(err);
    }
});

router.post("/:id/createStatusField", validateSchema("createStatusField"), async (req, res, next) => {
    try {
        const newDescription = await prisma.statusField.create({
            data: {
                ...req.body,
                equipmentId: req.params.id,
            },
        });
        res.send(newDescription);
    } catch (err) {
        next(err);
    }
});

router.post("/:id/createEventDescription", validateSchema("createEventDescription"), async (req, res, next) => {
    try {
        const newDescription = await prisma.eventDescription.create({
            data: {
                ...req.body,
                equipmentId: req.params.id,
            },
        });
        if (!newDescription) throw new Error("Invalid triggerCategory");
        res.send(newDescription);
    } catch (err) {
        next(err);
    }
});


