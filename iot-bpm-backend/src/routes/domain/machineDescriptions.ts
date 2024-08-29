import express from "express";
import validateSchema from "../../middleware/schemaValidation";
import MachineDescription from "../../models/domain/machineDescription";
import mongoose from "mongoose";
import { NotFoundError } from "../../middleware/errorhandling";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await MachineDescription.find();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const descriptionId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(descriptionId))
            throw new NotFoundError("Machine Description not found");
        
        const machineDescription = await MachineDescription.findById(descriptionId);
        if (!machineDescription)
            throw new NotFoundError("Machine Description not found");
        
        res.send(machineDescription);
    } catch (err) {
        next(err);
    }
});

router.post("", validateSchema("createMachineDescription"), async (req, res, next) => {
    try {
        const newMachineDescription = await MachineDescription.create(req.body);
        res.status(201).send(newMachineDescription);
    } catch (err) {
        next(err);
    }
});

router.post("/:objectId", validateSchema("updateMachineDescription"), async (req, res, next) => {
    try {
        const descriptionId = req.params.objectId;
        if (!mongoose.Types.ObjectId.isValid(descriptionId))
            throw new NotFoundError("Machine Description not found");
        
        const body = req.body;
        const updatedDescription = await MachineDescription.findByIdAndUpdate(descriptionId, body, {
            new: true,
            runValidators: true,
        });
        if (!updatedDescription)
            throw new NotFoundError("Machine Description not found");
        
        res.send(updatedDescription);
    } catch (err) {
        next(err);
    }
});