import express from "express";
import { ResourceModel, ResourceNameRule } from "../../models/schemas/models";
import { NotFoundError } from "../../middleware/errorhandling";

export const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const result = await ResourceModel.find()
            // Populate resource models here instead of pre findOne hook to avoid circular recursion with the machineModel schema
            .populate({
                path: "machineModel",
                model: "MachineModel",
            });
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post("/:resourceModelId/rule", async (req, res, next) => {
    try {
        const resourceModelId = req.params.resourceModelId;
        const rule = await ResourceNameRule.findByIdAndDelete(resourceModelId);
        if (!rule) throw new NotFoundError("Resource Name Rule not found");
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

router.delete("/:machineModelId/resourceModels/:resourceModelId/rule", async (req, res, next) => {
    try {
        const resourceModelId = req.params.resourceModelId;
        const rule = await ResourceNameRule.findByIdAndDelete(resourceModelId);
        if (!rule) throw new NotFoundError("Resource Name Rule not found");
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});