import express from 'express';
import EquipmentDescription from '../../models/domain/equipmentDescription';
import mongoose from 'mongoose';
import validateSchema from '../../middleware/schemaValidation';
import { NotFoundError } from '../../middleware/errorhandling';

export const router = express.Router();

router.get("/equipmentDescriptions", async (req, res, next) => {
    try {
        const result = await EquipmentDescription.find();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/equipmentDescriptions/:id", async (req, res, next) => {
    try {
        const descriptionId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(descriptionId))
            throw new NotFoundError("Equipment Description not found");
            
        const equipmentDescription = await EquipmentDescription.findById(descriptionId);
        if (!equipmentDescription)
            throw new NotFoundError("Equipment Description not found");

        res.send(equipmentDescription);
    } catch (err) {
        next(err);
    }
});


router.post(
    "/equipmentDescriptions/:objectId",
    validateSchema("updateEquipmentDescription"),
    async (req, res, next) => {
        try {
            const descriptionId = req.params.objectId;
            if (!mongoose.Types.ObjectId.isValid(descriptionId))
                throw new NotFoundError("Equipment Description not found");

            const body = req.body;
            const updatedDescription = await EquipmentDescription.findByIdAndUpdate(descriptionId, body, { new: true });
            if (!updatedDescription) {
                res.status(404).send("Equipment Description not found");
                return;
            }
            res.send(updatedDescription);
        } catch (err) {
            next(err);
        }
    }
);