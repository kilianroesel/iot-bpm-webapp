import express from "express";
import validateSchema from "../../../middleware/schemaValidation";
import { NotFoundError } from "../../../middleware/errorhandling";
import EquipmentModel from "../../../models/EquipmentModel";
import mongoose from "mongoose";
import mongodb from "../../../config/mongoClient";
import {router as eventModelRouter} from "./eventModels";
import {router as statusModelRouter} from "./statusModels";


export const router = express.Router();

router.use("/:equipmentModelId/eventModels", eventModelRouter);
router.use("/:statusModelId/statusModels", statusModelRouter);

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
        const result = await EquipmentModel.findById(req.params.equipmentModelId);
        if (!result) throw new NotFoundError("Equipment model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post("/:equipmentModelId", validateSchema("updateEquipmentModel"), async (req, res, next) => {
    try {
        const result = await EquipmentModel.findByIdAndUpdate(req.params.equipmentModelId, req.body, { new: true });
        if (!result) throw new NotFoundError("Equipment model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.delete("/:equipmentModelId", async (req, res, next) => {
    try {
        const result = await EquipmentModel.findByIdAndDelete(req.params.equipmentModelId);
        if (!result) throw new NotFoundError("Equipment model not found");
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

router.post("/:equipmentModelId/equipmentModels", validateSchema("createEquipmentModel"), async (req, res, next) => {
    try {
        const session = await mongodb.startSession();
        try {
            session.startTransaction();

            const equipmentModelId = new mongoose.Types.ObjectId();
            const referencedEquipmentModel = await EquipmentModel.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { equipmentModels: equipmentModelId } },
                { session, new: true }
            );
            if (!referencedEquipmentModel) throw new NotFoundError("Equipment model not found");

            // Calculate materialized path
            const newPath = referencedEquipmentModel.equipmentPath
                ? `${referencedEquipmentModel.equipmentPath}${referencedEquipmentModel._id},`
                : `,${referencedEquipmentModel._id},`;

            const result = await EquipmentModel.create(
                [
                    {
                        _id: equipmentModelId,
                        ...req.body,
                        equipmentPath: newPath,
                    },
                ],
                { session }
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