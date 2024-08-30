import express from "express";
import validateSchema from "../../middleware/schemaValidation";
import prisma from "../../config/prisma";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await prisma.equipmentDescription.findMany();
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
                childEquipment: true
            }
        });

        res.send(equipmentDescription);
    } catch (err) {
        next(err);
    }
});

router.post("/:id", validateSchema("updateEquipmentDescription"), async (req, res, next) => {
    try {
        const updatedDescription = await prisma.equipmentDescription.update({
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

router.post("/:id/createSubequipment", validateSchema("createEquipmentDescription"), async (req, res, next) => {
    try {
        const newDescription = await prisma.equipmentDescription.create({
            data: {
                ...req.body,
                parentId: req.params.id,
            }
        });
        res.send(newDescription)
    } catch (err) {
        next(err);
    }
});

router.post("/:id/createEventDescription", validateSchema("createEventDescription"), async (req, res, next) => {
    try {
        const newDescription = await prisma.eventDescription.create({
            data: {
                ...req.body,
                equipmentDescrptionId: req.params.id,
            }
        });
        res.send(newDescription)
    } catch (err) {
        next(err);
    }
});
