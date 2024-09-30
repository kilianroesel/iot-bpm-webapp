import express from "express";
import { NotFoundError } from "../../middleware/errorhandling";
import validateSchema from "../../middleware/schemaValidation";
import { EquipmentModel, EventEnrichmentRule } from "../../models/schemas/models";

export const router = express.Router();

router.post(
    "/:equipmentModelId/viewModels/:viewModelId/statusModels",
    validateSchema("createStatusModel"),
    async (req, res, next) => {
        try {
            const statusModel = {
                statusName: req.body.statusName,
                field: req.body.field,
            };

            // Save Equipment Model
            const equipmentModel = await EquipmentModel.findOneAndUpdate(
                {
                    _id: req.params.equipmentModelId,
                    "viewModels._id": req.params.viewModelId,
                },
                {
                    $push: { "viewModels.$.statusModels": statusModel },
                },
                { new: true, runValidators: true }
            );

            if (!equipmentModel) throw new NotFoundError("Equipment model not found");
            res.status(201).send(equipmentModel);
        } catch (err) {
            next(err);
        }
    }
);

router.post(
    "/:equipmentModelId/viewModels/:viewModelId/statusModels/:statusModelId",
    validateSchema("updateStatusModel"),
    async (req, res, next) => {
        try {
            const updatedDescription = await EquipmentModel.findByIdAndUpdate(
                req.params.equipmentModelId,
                {
                    $set: {
                        "viewModels.$[outer].statusModels.$[inner]": req.body,
                    },
                },
                {
                    arrayFilters: [
                        { "outer._id": req.params.viewModelId },
                        { "inner._id": req.params.statusModelId },
                    ],
                    new: true,
                    runValidators: true,
                }
            );
            if (!updatedDescription) throw new NotFoundError("Status Model not found");
            res.send(updatedDescription);
        } catch (err) {
            next(err);
        }
    }
);

router.delete(
    "/:equipmentModelId/viewModels/:viewModelId/statusModels/:statusModelId",
    async (req, res, next) => {
        try {
            await EventEnrichmentRule.findByIdAndDelete(req.params.statusModelId);
            const result = await EquipmentModel.findByIdAndUpdate(
                req.params.equipmentModelId,
                {
                    $pull: {
                        "viewModels.$[outer].statusModels": { _id: req.params.statusModelId },
                    },
                },
                {
                    arrayFilters: [{ "outer._id": req.params.viewModelId }],
                }
            );
            if (!result) throw new NotFoundError("Status model not found");
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
);

router.post(
    "/:equipmentModelId/viewModels/:viewModelId/statusModels/:statusModelId/rule",
    async (req, res, next) => {
        try {
            const equipmentModel = await EquipmentModel.findById(req.params.equipmentModelId);
            if (!equipmentModel) throw new NotFoundError("Equipment not found");
            const viewModel = equipmentModel.viewModels.id(req.params.viewModelId);
            if (!viewModel) throw new NotFoundError("View model not found");
            const statusModel = viewModel.statusModels.id(req.params.statusModelId);
            if (!statusModel) throw new NotFoundError("StatusModel not found");

            const rule = await EventEnrichmentRule.findByIdAndUpdate(
                req.params.statusModelId,
                {
                    statusName: statusModel.statusName,
                    field: statusModel.field,
                    equipmentId: equipmentModel._id,
                    viewId: viewModel._id,
                },
                { new: true, upsert: true, runValidators: true }
            );
            res.status(202).send(rule);
        } catch (err) {
            next(err);
        }
    }
);

router.delete(
    "/:equipmentModelId/viewModels/:viewModelId/statusModels/:statusModelId/rule",
    async (req, res, next) => {
        try {
            const result = await EventEnrichmentRule.findByIdAndDelete(req.params.statusModelId);
            if (!result) throw new NotFoundError("EventEnrichmentRule not found");
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
);
