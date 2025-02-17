import express from "express";
import { NotFoundError } from "../../middleware/errorhandling";
import validateSchema from "../../middleware/schemaValidation";
import { EquipmentModel, EventAbstractionRule, MachineModel } from "../../models/schemas/models";

export const router = express.Router();

router.post(
    "/:equipmentModelId/viewModels/:viewModelId/eventModels",
    validateSchema("createEventModel"),
    async (req, res, next) => {
        try {
            // Save Equipment Model
            const newEquipmentModel = await EquipmentModel.findOneAndUpdate(
                {
                    _id: req.params.equipmentModelId,
                    "viewModels._id": req.params.viewModelId,
                },
                {
                    $push: { "viewModels.$.eventModels": req.body },
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
    "/:equipmentModelId/viewModels/:viewModelId/eventModels/:eventModelId",
    validateSchema("updateEventModel"),
    async (req, res, next) => {
        try {
            const equipmentModel = await EquipmentModel.findByIdAndUpdate(
                req.params.equipmentModelId,
                {
                    $set: {
                        "viewModels.$[outer].eventModels.$[inner]": req.body,
                    },
                },
                {
                    arrayFilters: [{ "outer._id": req.params.viewModelId }, { "inner._id": req.params.eventModelId }],
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

router.delete("/:equipmentModelId/viewModels/:viewModelId/eventModels/:eventModelId", async (req, res, next) => {
    try {
        // First delete EventAbstractionRule and remove Event Model, there is no transaction needed
        await EventAbstractionRule.findByIdAndDelete(req.params.eventModelId);
        const result = await EquipmentModel.findByIdAndUpdate(
            req.params.equipmentModelId,
            {
                $pull: {
                    "viewModels.$[outer].eventModels": { _id: req.params.eventModelId },
                },
            },
            {
                arrayFilters: [{ "outer._id": req.params.viewModelId }],
            }
        );
        if (!result) throw new NotFoundError("Event Model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post("/:equipmentModelId/viewModels/:viewModelId/eventModels/:eventModelId/rule", async (req, res, next) => {
    try {
        const viewModelId = req.params.viewModelId;
        const eventModelId = req.params.eventModelId;
        const equipmentModel = await EquipmentModel.findById(req.params.equipmentModelId);
        if (!equipmentModel) throw new NotFoundError("Equipment not found");
        const viewModel = equipmentModel.viewModels.id(viewModelId);
        if (!viewModel) throw new NotFoundError("View Model not found");
        const eventModel = viewModel.eventModels.id(eventModelId);
        if (!eventModel) throw new NotFoundError("Event Model not found");

        // Fetch the scope Id, which is the id of the root equipment, i.e. MachineModel
        var scopeId = equipmentModel._id;
        if (equipmentModel.equipmentPath) {
            const rootId = equipmentModel.equipmentPath.split(",")[1];
            const machine = await MachineModel.findById(rootId);
            if (!machine) throw new NotFoundError("Equipment not found");
            scopeId = machine._id;
        }

        var rule;
        const relations = eventModel.relations.map((relation) => {
            return {
                resourceModelId: relation.resourceModel.toString(),
                interactionType: relation.interactionType,
                qualifier: relation.qualifier,
            };
        });

        let equipmentPath;
        if (!equipmentModel.equipmentPath)
            equipmentPath = `,${equipmentModel._id},`;
        else
            equipmentPath = `${equipmentModel.equipmentPath}${equipmentModel._id},`;


        switch (eventModel.triggerCategory) {
            case "SCALAR_TRIGGER":
                rule = await EventAbstractionRule.findByIdAndUpdate(
                    eventModelId,
                    {
                        eventName: eventModel.eventName,
                        field: eventModel.field,
                        scopeId: scopeId,
                        equipmentId: equipmentModel._id,
                        equipmentPath: equipmentPath,
                        viewId: viewModelId,
                        triggerCategory: eventModel.triggerCategory,
                        triggerType: eventModel.triggerType,
                        value: eventModel.value,
                        relations: relations,
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
                        equipmentPath: equipmentModel.equipmentPath,
                        viewId: viewModelId,
                        triggerCategory: eventModel.triggerCategory,
                        triggerType: eventModel.triggerType,
                        from: eventModel.from,
                        to: eventModel.to,
                        relations: relations,
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

router.delete("/:equipmentModelId/viewModels/:viewModelId/eventModels/:eventModelId/rule", async (req, res, next) => {
    try {
        const result = await EventAbstractionRule.findByIdAndDelete(req.params.eventModelId);
        if (!result) throw new NotFoundError("Event Abstraction Rule not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});
