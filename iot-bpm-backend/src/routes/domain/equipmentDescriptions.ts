import express from "express";
import EquipmentDescription from "../../models/domain/equipmentDescription";
import mongoose from "mongoose";
import validateSchema from "../../middleware/schemaValidation";
import { NotFoundError } from "../../middleware/errorhandling";
import EventDescription from "../../models/domain/eventDescription";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await EquipmentDescription.find();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundError("Equipment Description not found");

        const equipmentDescription = await EquipmentDescription.findById(id).populate({
            path: "subEquipment",
            populate: {
                path: "subEquipment",
                populate: {
                    path: "subEquipment",
                    populate: {
                        path: "subEquipment",
                        populate: {
                            path: "subEquipment",
                        },
                    },
                },
            },
        });
        if (!equipmentDescription) throw new NotFoundError("Equipment Description not found");

        res.send(equipmentDescription);
    } catch (err) {
        next(err);
    }
});

router.post("/:id", validateSchema("updateEquipmentDescription"), async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundError("Equipment Description not found");

        const updatedDescription = await EquipmentDescription.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedDescription) throw new NotFoundError("Equipment Description not found");

        res.send(updatedDescription);
    } catch (err) {
        next(err);
    }
});

router.post("/:id/createSubequipment", validateSchema("createEquipmentDescription"), async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundError("Equipment Description not found");

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const newEquipment = await EquipmentDescription.create(req.body);
            const updatedEquipment = await EquipmentDescription.findById(id);
            if (!updatedEquipment) throw new NotFoundError("Equipment Description not found");
            updatedEquipment.subEquipment.push(newEquipment._id);
            updatedEquipment.save();
            res.send(updatedEquipment);
        } catch (error) {
            await session.abortTransaction();
            throw new NotFoundError("Equipment Description not found");
        } finally {
            session.endSession();
        }
    } catch (err) {
        next(err);
    }
});

router.post("/:id/createEventDescription", validateSchema("createEventDescription"), async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new NotFoundError("Equipment Description not found");

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const newEvent = await EventDescription.create(req.body);
            const updatedEquipment = await EquipmentDescription.findById(id);
            if (!updatedEquipment) throw new NotFoundError("Equipment Description not found");
            updatedEquipment.events.push(newEvent._id);
            updatedEquipment.save();
            res.send(updatedEquipment);
        } catch (error) {
            await session.abortTransaction();
            throw new NotFoundError("Equipment Description not found");
        } finally {
            session.endSession();
        }
    } catch (err) {
        next(err);
    }
});
