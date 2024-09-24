import express from "express";
import { NotFoundError } from "../../middleware/errorhandling";
import validateSchema from "../../middleware/schemaValidation";
import { EquipmentModel, EventAbstractionRule, MachineModel } from "../../models/schemas/models";

export const router = express.Router();

router.post(
    "/:equipmentModelId/lifecycleModels/:lifecycleModelId/eventModels",
    validateSchema("createEventModel"),
    async (req, res, next) => {
        try {
            // Save Equipment Model
            const newEquipmentModel = await EquipmentModel.findOneAndUpdate(
                {
                    _id: req.params.equipmentModelId,
                    "lifecycleModels._id": req.params.lifecycleModelId,
                },
                {
                    $push: { "lifecycleModels.$.eventModels": req.body },
                },
                { new: true, runValidators: true }
            );
            if (!newEquipmentModel) throw new NotFoundError("Equipment model not found");

            res.status(201).send(newEquipmentModel);
        } catch (err) {
            next(err);
        }
    }
);

router.post(
    "/:equipmentModelId/lifecycleModels/:lifecycleModelId/eventModels/:eventModelId",
    validateSchema("updateEventModel"),
    async (req, res, next) => {
        try {
            const equipmentModel = await EquipmentModel.findByIdAndUpdate(
                req.params.equipmentModelId,
                {
                    $set: {
                        "lifecycleModels.$[outer].eventModels.$[inner]": req.body,
                    },
                },
                {
                    arrayFilters: [
                        { "outer._id": req.params.lifecycleModelId },
                        { "inner._id": req.params.eventModelId },
                    ],
                    new: true,
                    runValidators: true,
                }
            );
            if (!equipmentModel) throw new NotFoundError("Equipment Model not found");
            res.send(equipmentModel);
        } catch (err) {
            next(err);
        }
    }
);

router.delete(
    "/:equipmentModelId/lifecycleModels/:lifecycleModelId/eventModels/:eventModelId",
    async (req, res, next) => {
        try {
            // First delete EventAbstractionRule and remove Event Model, there is no transaction needed
            await EventAbstractionRule.findByIdAndDelete(req.params.eventModelId);
            const result = await EquipmentModel.findByIdAndUpdate(
                req.params.equipmentModelId,
                {
                    $pull: {
                        "lifecycleModels.$[outer].eventModels": { _id: req.params.eventModelId },
                    },
                },
                {
                    arrayFilters: [{ "outer._id": req.params.lifecycleModelId }],
                }
            );
            if (!result) throw new NotFoundError("Event Model not found");
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
);

router.post("/:equipmentModelId/lifecycleModels/:lifecycleModelId/eventModels/:eventModelId/rule", async (req, res, next) => {
    try {
        const lifecycleModelId = req.params.lifecycleModelId;
        const eventModelId = req.params.eventModelId;
        const equipmentModel = await EquipmentModel.findById(req.params.equipmentModelId);
        if (!equipmentModel) throw new NotFoundError("Equipment not found");
        const lifecycleModel = equipmentModel.lifecycleModels.id(lifecycleModelId);
        if (!lifecycleModel) throw new NotFoundError("Lifecycle Model not found");
        const eventModel = lifecycleModel.eventModels.id(eventModelId);

        // Fetch the scope Id, which is the id of the root equipment, i.e. MachineModel
        var scopeId = equipmentModel._id;
        if (equipmentModel.equipmentPath) {
            const rootId = equipmentModel.equipmentPath.split(",")[1];
            const machine = await MachineModel.findById(rootId);
            if (!machine) throw new NotFoundError("Equipment not found");
            scopeId = machine._id;
        }

        var rule;
        switch (eventModel.triggerCategory) {
            case "SCALAR_TRIGGER":
                rule = await EventAbstractionRule.findByIdAndUpdate(
                    eventModelId,
                    {
                        eventName: eventModel.eventName,
                        field: eventModel.field,
                        scopeId: scopeId,
                        equipmentId: equipmentModel._id,
                        lifecycleId: lifecycleModelId,
                        triggerCategory: eventModel.triggerCategory,
                        triggerType: eventModel.triggerType,
                        value: eventModel.value,
                    },
                    { new: true, upsert: true, runValidators: true }
                );
                break;
            case "RANGE_TRIGGER":
                rule = await EventAbstractionRule.findByIdAndUpdate(
                    eventModelId,
                    {
                        eventName: eventModel.eventName,
                        field: eventModel.field,
                        scopeId: scopeId,
                        equipmentId: equipmentModel._id,
                        lifecycleId: lifecycleModelId,
                        triggerCategory: eventModel.triggerCategory,
                        triggerType: eventModel.triggerType,
                        from: eventModel.from,
                        to: eventModel.to,
                    },
                    { new: true, upsert: true, runValidators: true }
                );
                break;
            default:
                res.status(500);
        }
        res.status(202).send(rule);
    } catch (err) {
        next(err);
    }
});

router.delete("/:equipmentModelId/lifecycleModels/:lifecycleModelId/eventModels/:eventModelId/rule", async (req, res, next) => {
    try {
        const result = await EventAbstractionRule.findByIdAndDelete(req.params.eventModelId);
        if (!result) throw new NotFoundError("Event Abstraction Rule not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});
