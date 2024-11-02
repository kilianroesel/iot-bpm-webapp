import express from "express";
import validateSchema from "../../middleware/schemaValidation";
import { NotFoundError } from "../../middleware/errorhandling";
import { EventScopingRule, MachineModel, ResourceModel, ResourceNameRule } from "../../models/schemas/models";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await MachineModel.find()
            // Populate resource models here instead of pre findOne hook to avoid circular recursion with the resourceModel schema
            .populate({
                path: "resourceModels",
                model: "ResourceModel",
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
            versionCsiSpecific: req.body.versionCsiSpecific
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
            // Populate object models here instead of pre findOne hook to avoid circular recursion with the resourceModel schema
            .populate({
                path: "resourceModels",
                model: "ResourceModel",
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
                versionCsiSpecific: machineModel.versionCsiSpecific
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

router.post("/:machineModelId/resourceModels", validateSchema("createResourceModel"), async (req, res, next) => {
    try {
        const machineModel = await MachineModel.findById(req.params.machineModelId);
        if (!machineModel) throw new NotFoundError("Machine model not found");

        const resourceModel = {
            resourceModelName: req.body.resourceModelName,
            machineModel: machineModel._id,
        };

        const newResourceModel = await ResourceModel.create([resourceModel], {
            new: true,
            runValidators: true,
        });

        res.status(201).send(newResourceModel);
    } catch (err) {
        next(err);
    }
});

router.post(
    "/:machineModelId/resourceModels/:resourceModelId",
    validateSchema("updateResourceModel"),
    async (req, res, next) => {
        try {
            const resourceModel = {
                resourceModelName: req.body.resourceModelName,
            };

            const updatedResourceModel = await ResourceModel.findOneAndUpdate(
                {
                    _id: req.params.resourceModelId,
                    machineModel: req.params.machineModelId,
                },
                resourceModel,
                { new: true, runValidators: true }
            );

            if (!updatedResourceModel) throw new NotFoundError("Object model not found");

            res.status(201).send(updatedResourceModel);
        } catch (err) {
            next(err);
        }
    }
);

router.delete("/:machineModelId/resourceModels/:resourceModelId", async (req, res, next) => {
    try {
        const deletedResourceModel = await ResourceModel.findOneAndDelete({
            _id: req.params.resourceModelId,
            machineModel: req.params.machineModelId,
        });

        if (!deletedResourceModel) throw new NotFoundError("Object model not found");

        res.send(deletedResourceModel);
    } catch (err) {
        next(err);
    }
});

