import express from "express";
import { NotFoundError } from "../../middleware/errorhandling";
import validateSchema from "../../middleware/schemaValidation";
import { EquipmentModel } from "../../models/schemas/models";

export const router = express.Router();

router.post("/:equipmentModelId/lifecycleModels", validateSchema("createLifecycleModel"), async (req, res, next) => {
    try {
        const lifecycleModel = {
            lifecycleName: req.body.lifecycleName,
        };
        const equipmentModel = await EquipmentModel.findByIdAndUpdate(
            req.params.equipmentModelId,
            { $addToSet: { lifecycleModels: lifecycleModel } },
            { new: true, runValidators: true }
        );
        if (!equipmentModel) throw new NotFoundError("Equipment Model not found");
        res.status(201).send(equipmentModel);
    } catch (err) {
        next(err);
    }
});

router.post(
    "/:equipmentModelId/lifecycleModels/:lifecycleModelId",
    validateSchema("updateLifecycleModel"),
    async (req, res, next) => {
        try {
            const updatedDescription = await EquipmentModel.findByIdAndUpdate(
                req.params.equipmentModelId,
                {
                    $set: {
                        "lifecycleModels.$[outer].lifecycleName": req.body.lifecycleName,
                    },
                },
                {
                    arrayFilters: [{ "outer._id": req.params.lifecycleModelId }],
                    new: true,
                    runValidators: true,
                }
            );
            if (!updatedDescription) throw new NotFoundError("Lifecycle Model not found");
            res.send(updatedDescription);
        } catch (err) {
            next(err);
        }
    }
);

router.delete("/:equipmentModelId/lifecycleModels/:lifecycleModelId", async (req, res, next) => {
    try {
        // await EventEnrichmentRule.findByIdAndDelete(req.params.lifecycleModelId);
        const result = await EquipmentModel.findByIdAndUpdate(req.params.equipmentModelId, {
            $pull: {
                lifecycleModels: { _id: req.params.lifecycleModelId },
            },
        });
        if (!result) throw new NotFoundError("Lifecycle Model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});

// router.post("/:equipmentModelId/statusModels/:lifecycleModelId/rule", async (req, res, next) => {
//     try {
//         const statusModelId = req.params.lifecycleModelId;
//         const equipmentModel = await EquipmentModel.findOne({
//             _id: req.params.equipmentModelId,
//             "lifecycleModels._id": statusModelId,
//         });
//         if (!equipmentModel) throw new NotFoundError("Equipment not found");
//         const statusModel = equipmentModel.statusModels.id(statusModelId);
//         if (!statusModel) throw new NotFoundError("Lifecycle Model not found");

//         const rule = await EventEnrichmentRule.findByIdAndUpdate(
//             statusModelId,
//             {
//                 statusName: statusModel.statusName,
//                 field: statusModel.field,
//                 equipmentId: equipmentModel._id,
//             }, { new: true, upsert: true, runValidators: true }
//         );
//         res.status(202).send(rule);
//     } catch (err) {
//         next(err);
//     }
// });

// router.delete("/:equipmentModelId/statusModels/:statusModelId/rule", async (req, res, next) => {
//     try {
//         const result = await EventEnrichmentRule.findByIdAndDelete(req.params.statusModelId);
//         if (!result) throw new NotFoundError("EventEnrichmentRule not found");
//         res.send(result);
//     } catch (err) {
//         next(err);
//     }
// });
