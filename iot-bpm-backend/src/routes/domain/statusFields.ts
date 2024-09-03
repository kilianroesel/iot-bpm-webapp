import express from "express";
import prisma from "../../config/prisma";
import { NotFoundError } from "../../middleware/errorhandling";
import validateSchema from "../../middleware/schemaValidation";
import { getMachineDescriptionsOfEquipment } from "@prisma/client/sql";

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

router.post("/:id/dispatch", async (req, res, next) => {
    try {
        const statusFieldId = req.params.id;
        const statusField = await prisma.statusField.findUnique({
            where: {
                id: statusFieldId,
            },
        });
        if (!statusField) throw new NotFoundError("Status field not found");

        const machineDescriptions = await prisma.$queryRawTyped(
            getMachineDescriptionsOfEquipment(statusField.equipmentId)
        );

        if (machineDescriptions.length != 1 || !machineDescriptions[0].id) throw new Error("Inconsistent db");

        const newEventScopingRule = await prisma.eventEnrichmentRule.upsert({
            where: {
                id: statusField.id
            },
            create: {
                id: statusField.id,
                name: statusField.name,
                field: statusField.field,
                equipmentId: statusField.equipmentId
            },
            update: {
                id: statusField.id,
                name: statusField.name,
                field: statusField.field,
                equipmentId: statusField.equipmentId
            },
        });

        res.status(202).send(newEventScopingRule);
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