import express from "express";
import validateSchema from "../../middleware/schemaValidation";
import { NotFoundError } from "../../middleware/errorhandling";
import { EventScopingRule, MachineModel, ObjectModel } from "../../models/schemas/models";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await MachineModel.find()
            // Populate object models here instead of pre findOne hook to avoid circular recursion with the objectModel schema
            .populate({
                path: "objectModels",
                model: "ObjectModel",
            });
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post("", validateSchema("createMachineModel"), async (req, res, next) => {
    try {
        const machineModel = {
            equipmentName: req.body.machineName, // The machine and equipment name are the same for the MachineModel root equipment
            machineName: req.body.machineName,
            versionCsiStd: req.body.versionCsiStd,
            versionCsiSpecific: req.body.versionCsiSpecific,
            machineSoftwareVersion: req.body.machineSoftwareVersion,
            machineMasterSoftwareVersion: req.body.machineMasterSoftwareVersion,
        };
        const newMachineModel = await MachineModel.create([machineModel], { new: true, runValidators: true });
        res.status(201).send(newMachineModel);
    } catch (err) {
        next(err);
    }
});

router.get("/:machineModelId", async (req, res, next) => {
    try {
        const machineModel = await MachineModel.findById(req.params.machineModelId)
            // Populate object models here instead of pre findOne hook to avoid circular recursion with the objectModel schema
            .populate({
                path: "objectModels",
                model: "ObjectModel",
            });
        if (!machineModel) throw new NotFoundError("Machine Model not found");
        res.send(machineModel);
    } catch (err) {
        next(err);
    }
});

router.post("/:machineModelId", validateSchema("updateMachineModel"), async (req, res, next) => {
    try {
        const updatedModel = await MachineModel.findByIdAndUpdate(
            req.params.machineModelId,
            {
                ...req.body,
                equipmentName: req.body.machineName,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.send(updatedModel);
    } catch (err) {
        next(err);
    }
});

router.delete("/:machineModelId", async (req, res, next) => {
    try {
        await EventScopingRule.findByIdAndDelete(req.params.machineModelId);
        await MachineModel.findByIdAndDelete(req.params.machineModelId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

router.post("/:machineModelId/rule", async (req, res, next) => {
    try {
        const machineModelId = req.params.machineModelId;
        const machineModel = await MachineModel.findById(machineModelId);
        if (!machineModel) throw new NotFoundError("Machine Model not found");

        const rule = await EventScopingRule.findByIdAndUpdate(
            machineModelId,
            {
                machineName: machineModel.machineName,
                versionCsiStd: machineModel.versionCsiStd,
                versionCsiSpecific: machineModel.versionCsiSpecific,
                machineSoftwareVersion: machineModel.machineSoftwareVersion,
                machineMasterSoftwareVersion: machineModel.machineMasterSoftwareVersion,
            },
            { new: true, upsert: true, runValidators: true }
        );
        res.status(202).send(rule);
    } catch (err) {
        next(err);
    }
});

router.delete("/:machineModelId/rule", async (req, res, next) => {
    try {
        const machineModelId = req.params.machineModelId;
        const rule = await EventScopingRule.findByIdAndDelete(machineModelId);
        if (!rule) throw new NotFoundError("Event Scoping Rule not found");
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

router.post("/:machineModelId/objectModels", validateSchema("createObjectModel"), async (req, res, next) => {
    try {
        const machineModel = await MachineModel.findById(req.params.machineModelId);
        if (!machineModel) throw new NotFoundError("Machine model not found");

        const objectModel = {
            objectModelName: req.body.objectModelName,
            machineModel: machineModel._id,
        };

        const newObjectModel = await ObjectModel.create([objectModel], {
            new: true,
            runValidators: true,
        });

        res.status(201).send(newObjectModel);
    } catch (err) {
        next(err);
    }
});

router.post(
    "/:machineModelId/objectModels/:objectModelId",
    validateSchema("updateObjectModel"),
    async (req, res, next) => {
        try {
            const objectModel = {
                objectModelName: req.body.objectModelName,
            };

            const updatedObjectModel = await ObjectModel.findOneAndUpdate(
                {
                    _id: req.params.objectModelId,
                    machineModel: req.params.machineModelId,
                },
                objectModel,
                { new: true, runValidators: true }
            );

            if (!updatedObjectModel) throw new NotFoundError("Object model not found");

            res.status(201).send(updatedObjectModel);
        } catch (err) {
            next(err);
        }
    }
);

router.delete("/:machineModelId/objectModels/:objectModelId", async (req, res, next) => {
    try {
        const deletedObjectModel = await ObjectModel.findOneAndDelete({
            _id: req.params.objectModelId,
            machineModel: req.params.machineModelId,
        });

        if (!deletedObjectModel) throw new NotFoundError("Object model not found");

        res.send(deletedObjectModel);
    } catch (err) {
        next(err);
    }
});
