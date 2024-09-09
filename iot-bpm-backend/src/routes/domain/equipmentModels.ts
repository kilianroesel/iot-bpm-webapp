import express from "express";
import validateSchema from "../../middleware/schemaValidation";
import { NotFoundError } from "../../middleware/errorhandling";
import mongoose from "mongoose";
import mongodb from "../../config/mongoClient";
import { router as eventModelRouter } from "./eventModels";
import { router as statusModelRouter } from "./statusModels";
import { EquipmentModel, EventScopingRule, MachineModel } from "../../models/schemas/models";
import { kafkaClient } from "../..";

export const router = express.Router();

router.use("", eventModelRouter); // "/:equipmentModelId/eventModels"
router.use("", statusModelRouter); // "/:equipmentModelId/statusModels"

router.get("", async (req, res, next) => {
    try {
        const result = await EquipmentModel.find();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/:equipmentModelId", async (req, res, next) => {
    try {
        const result = await EquipmentModel.findById(req.params.equipmentModelId).populate({
            path: 'statusModels.eventEnrichmentRule',
            model: 'EventEnrichmentRule'
        });
        if (!result) throw new NotFoundError("Equipment model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post("/:equipmentModelId", validateSchema("updateEquipmentModel"), async (req, res, next) => {
    try {
        const result = await EquipmentModel.findByIdAndUpdate(req.params.equipmentModelId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!result) throw new NotFoundError("Equipment model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.delete("/:equipmentModelId", async (req, res, next) => {
    res.status(202).send();
    const session = await mongodb.startSession();
    try {
        session.startTransaction();
        const mainEquipment = await EquipmentModel.findByIdAndDelete(req.params.equipmentModelId, { session });
        if (!mainEquipment) throw new NotFoundError("Equipment model not found");
        await EquipmentModel.deleteMany(
            {
                equipmentPath: new RegExp(`,${req.params.equipmentModelId},`),
            },
            { session, runValidators: true }
        );
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
    } finally {
        session.endSession();
    }
});

router.post("/:equipmentModelId/equipmentModels", validateSchema("createEquipmentModel"), async (req, res, next) => {
    try {
        const session = await mongodb.startSession();
        try {
            session.startTransaction();

            const newEquipmentModelId = new mongoose.Types.ObjectId();
            const referencedEquipmentModel = await EquipmentModel.findByIdAndUpdate(
                req.params.equipmentModelId,
                { $addToSet: { equipmentModels: newEquipmentModelId } },
                { session, new: true, runValidators: true }
            );
            if (!referencedEquipmentModel) throw new NotFoundError("Equipment model not found");

            // Calculate materialized path
            const newPath = referencedEquipmentModel.equipmentPath
                ? `${referencedEquipmentModel.equipmentPath}${referencedEquipmentModel._id},`
                : `,${referencedEquipmentModel._id},`;

            const result = await EquipmentModel.create(
                [
                    {
                        _id: newEquipmentModelId,
                        ...req.body,
                        equipmentPath: newPath,
                    },
                ],
                { session, runValidators: true }
            );

            await session.commitTransaction();
            res.send(result);
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (err) {
        next(err);
    }
});

router.post("/:equipmentModelId/rule", async (req, res, next) => {
    try {
        const equipmentModelId = req.params.equipmentModelId;
        const equipmentModel = await MachineModel.findById(equipmentModelId);
        if (!equipmentModel) throw new NotFoundError("Machine Model not found");

        const rule = await EventScopingRule.findOneAndUpdate(
            {
                _id: equipmentModelId,
            },
            {
                machineName: equipmentModel.machineName,
                versionCsiStd: equipmentModel.versionCsiStd,
                versionCsiSpecific: equipmentModel.versionCsiSpecific,
                machineSoftwareVersion: equipmentModel.machineSoftwareVersion,
                machineMasterSoftwareVersion: equipmentModel.machineMasterSoftwareVersion,
            }, { new: true, upsert: true, runValidators: true }
        );
        await kafkaClient.sendMessage("eh-bpm-rules-prod", JSON.stringify(rule));
        res.status(202).send(rule);
    } catch (err) {
        next(err);
    }
});

router.delete("/:equipmentModelId/rule", async (req, res, next) => {
    try {
        const result = await EventScopingRule.findByIdAndDelete(req.params.equipmentModelId);
        if (!result) throw new NotFoundError("Machine Model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});

