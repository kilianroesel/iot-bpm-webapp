import express from "express";
import { NotFoundError } from "../../middleware/errorhandling";
import validateSchema from "../../middleware/schemaValidation";
import { EquipmentModel, EventEnrichmentRule, MachineModel } from "../../models/schemas/models";
import { kafkaClient } from "../..";

export const router = express.Router();

router.post("/:equipmentModelId/statusModels", validateSchema("createStatusModel"), async (req, res, next) => {
    try {
        const statusModel = {
            statusName: req.body.statusName,
            field: req.body.field,
        };
        const equipmentModel = await EquipmentModel.findByIdAndUpdate(
            req.params.equipmentModelId,
            { $addToSet: { statusModels: statusModel } },
            { new: true, runValidators: true }
        );
        if (!equipmentModel) throw new NotFoundError("Equipment model not found");
        res.status(201).send(equipmentModel);
    } catch (err) {
        next(err);
    }
});

router.post(
    "/:equipmentModelId/statusModels/:statusModelId",
    validateSchema("updateStatusModel"),
    async (req, res, next) => {
        try {
            const updatedDescription = await EquipmentModel.updateOne(
                {
                    _id: req.params.equipmentModelId,
                    "statusModels._id": req.params.statusModelId,
                },
                {
                    $set: {
                        "statusModels.$": req.body,
                    },
                },
                {
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

router.delete("/:equipmentModelId/statusModels/:statusModelId", async (req, res, next) => {
    try {
        await EventEnrichmentRule.findByIdAndDelete(req.params.statusModelId);
        const result = await EquipmentModel.findByIdAndUpdate(req.params.equipmentModelId, {
            $pull: {
                statusModels: { _id: req.params.statusModelId },
            },
        });
        if (!result) throw new NotFoundError("Status model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post("/:equipmentModelId/statusModels/:statusModelId/rule", async (req, res, next) => {
    try {
        const statusModelId = req.params.statusModelId;
        const equipmentModel = await EquipmentModel.findOne({
            _id: req.params.equipmentModelId,
            "statusModels._id": statusModelId,
        });
        if (!equipmentModel) throw new NotFoundError("Equipment not found");
        const statusModel = equipmentModel.statusModels.id(statusModelId);
        if (!statusModel) throw new NotFoundError("StatusModel not found");

        const rule = await EventEnrichmentRule.findOneAndUpdate(
            {
                _id: statusModelId,
            },
            {
                statusName: statusModel.statusName,
                field: statusModel.field,
                equipmentId: equipmentModel._id,
                control: 'ACTIVE'
            }, { new: true, upsert: true, runValidators: true }
        );
        await kafkaClient.sendMessage("eh-bpm-rules-prod", JSON.stringify(rule));
        res.status(202).send(rule);
    } catch (err) {
        next(err);
    }
});

router.delete("/:equipmentModelId/statusModels/:statusModelId/rule", async (req, res, next) => {
    try {
        const statusModelId = req.params.statusModelId;
        const rule = await EventEnrichmentRule.findOneAndUpdate(
            {
                _id: statusModelId,
            },
            {
                $set: { control: 'INACTIVE'}
            },
            { new: true }
        );
        if (rule) await kafkaClient.sendMessage("eh-bpm-rules-prod", JSON.stringify(rule));
        const result = await EventEnrichmentRule.findByIdAndDelete(req.params.statusModelId);
        if (!result) throw new NotFoundError("Status Model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});
