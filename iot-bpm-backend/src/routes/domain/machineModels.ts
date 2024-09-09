import express from "express";
import validateSchema from "../../middleware/schemaValidation";
import { NotFoundError } from "../../middleware/errorhandling";
import { EquipmentModel, EventScopingRule, MachineModel } from "../../models/schemas/models";
import { kafkaClient } from "../..";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await MachineModel.find();
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
        const newMachineModel = await MachineModel.create([machineModel]);
        res.status(201).send(newMachineModel);
    } catch (err) {
        next(err);
    }
});

router.get("/:machineModelId", async (req, res, next) => {
    try {
        const machineModel = await MachineModel.findById(req.params.machineModelId);
        if (!machineModel) throw new NotFoundError("Machine Model not found");
        res.send(machineModel);
    } catch (err) {
        next(err);
    }
});

router.post("/:machineModelId", validateSchema("updateMachineModel"), async (req, res, next) => {
    try {
        const updatedModel = await MachineModel.findByIdAndUpdate(req.params.machineModelId, req.body, {
            new: true,
            runValidators: true,
        });
        res.send(updatedModel);
    } catch (err) {
        next(err);
    }
});

router.delete("/:machineModelId", async (req, res, next) => {
    try {
        await EventScopingRule.findByIdAndDelete(req.params.machineModelId)
        await MachineModel.findByIdAndDelete(req.params.machineModelId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

router.post("/:machineModelId/rule", async (req, res, next) => {
    try {
        const machineModelId = req.params.machineModelId;
        const machineModel = await MachineModel.find({_id: machineModelId});
        if (!machineModel) throw new NotFoundError("Machine model not found");

        const rule = await EventScopingRule.findOneAndUpdate(
            {
                _id: machineModelId,
            },
            {
                machineName: machineModel.machineName,
                versionCsiStd: machineModel.versionCsiStd,
                versionCsiSpecific: machineModel.versionCsiSpecific,
                machineSoftwareVersion: machineModel.machineSoftwareVersion,
                machineMasterSoftwareVersion: machineModel.machineMasterSoftwareVersion,
                control: 'ACTIVE',
            },
            { new: true, upsert: true, runValidators: true }
        );
        await kafkaClient.sendMessage("eh-bpm-rules-prod", JSON.stringify(rule));
        res.status(202).send(rule);
    } catch (err) {
        next(err);
    }
});

router.delete("/:machineModelId/rule", async (req, res, next) => {
    try {
        const machineModelId = req.params.machineModelId;
        const rule = await EventScopingRule.findOneAndUpdate(
            {
                _id: machineModelId,
            },
            {
                $set: { control: 'INACTIVE'}
            },
            { new: true }
        );
        if (rule) await kafkaClient.sendMessage("eh-bpm-rules-prod", JSON.stringify(rule));
        const result = await EventScopingRule.findByIdAndDelete(machineModelId);
        if (!result) throw new NotFoundError("Machine Model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});
