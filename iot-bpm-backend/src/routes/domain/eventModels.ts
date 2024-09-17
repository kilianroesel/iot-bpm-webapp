import express from "express";
import { NotFoundError } from "../../middleware/errorhandling";
import validateSchema from "../../middleware/schemaValidation";
import { EquipmentModel, EventAbstractionRule, MachineModel } from "../../models/schemas/models";

export const router = express.Router();

router.post("/:equipmentModelId/eventModels", validateSchema("createEventModel"), async (req, res, next) => {
    try {
        // Save Equipment Model
        const newEquipmentModel = await EquipmentModel.findByIdAndUpdate(
            req.params.equipmentModelId,
            {
                $push: { eventModels: req.body },
            },
            { new: true, runValidators: true }
        );
        if (!newEquipmentModel) throw new NotFoundError("Equipment model not found");

        res.status(201).send(newEquipmentModel);
    } catch (err) {
        next(err);
    }
});

router.post(
    "/:equipmentModelId/eventModels/:eventModelId",
    validateSchema("updateEventModel"),
    async (req, res, next) => {
        try {
            const equipmentModel = await EquipmentModel.updateOne(
                {
                    _id: req.params.equipmentModelId,
                    "eventModels._id": req.params.eventModelId,
                },
                {
                    $set: {
                        "eventModels.$": req.body,
                    },
                },
                {
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

router.delete("/:equipmentModelId/eventModels/:eventModelId", async (req, res, next) => {
    try {
        // First delete EventAbstractionRule and remove Event Model, there is no transaction needed
        await EventAbstractionRule.findByIdAndDelete(req.params.eventModelId);
        const result = await EquipmentModel.findByIdAndUpdate(req.params.equipmentModelId, {
            $pull: {
                eventModels: { _id: req.params.eventModelId },
            },
        });
        if (!result) throw new NotFoundError("Event Model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post("/:equipmentModelId/eventModels/:eventModelId/rule", async (req, res, next) => {
    try {
        const eventModelId = req.params.eventModelId;
        const equipmentModel = await EquipmentModel.findOne({
            _id: req.params.equipmentModelId,
            "eventModels._id": eventModelId,
        });
        if (!equipmentModel) throw new NotFoundError("Equipment not found");
        const eventModel = equipmentModel.eventModels.id(eventModelId);
        if (!eventModel) throw new NotFoundError("StatusModel not found");

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

router.delete("/:equipmentModelId/eventModels/:eventModelId/rule", async (req, res, next) => {
    try {
        const result = await EventAbstractionRule.findByIdAndDelete(req.params.eventModelId);
        if (!result) throw new NotFoundError("Event Abstraction Rule not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});
