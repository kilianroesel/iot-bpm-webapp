import express from "express";
import { NotFoundError } from "../../middleware/errorhandling";
import validateSchema from "../../middleware/schemaValidation";
import { EquipmentModel } from "../../models/schemas/models";

export const router = express.Router();

router.post("/:equipmentModelId/viewModels", validateSchema("createViewModel"), async (req, res, next) => {
    try {
        const viewModel = {
            viewName: req.body.viewName,
        };
        const equipmentModel = await EquipmentModel.findByIdAndUpdate(
            req.params.equipmentModelId,
            { $addToSet: { viewModels: viewModel } },
            { new: true, runValidators: true }
        );
        if (!equipmentModel) throw new NotFoundError("Equipment Model not found");
        res.status(201).send(equipmentModel);
    } catch (err) {
        next(err);
    }
});

router.post(
    "/:equipmentModelId/viewModels/:viewModelId",
    validateSchema("updateViewModel"),
    async (req, res, next) => {
        try {
            const updatedDescription = await EquipmentModel.findByIdAndUpdate(
                req.params.equipmentModelId,
                {
                    $set: {
                        "viewModels.$[outer].viewName": req.body.viewName,
                    },
                },
                {
                    arrayFilters: [{ "outer._id": req.params.viewModelId }],
                    new: true,
                    runValidators: true,
                }
            );
            if (!updatedDescription) throw new NotFoundError("View Model not found");
            res.send(updatedDescription);
        } catch (err) {
            next(err);
        }
    }
);

router.delete("/:equipmentModelId/viewModels/:viewModelId", async (req, res, next) => {
    try {
        // await EventEnrichmentRule.findByIdAndDelete(req.params.viewModelId);
        const result = await EquipmentModel.findByIdAndUpdate(req.params.equipmentModelId, {
            $pull: {
                viewModels: { _id: req.params.viewModelId },
            },
        });
        if (!result) throw new NotFoundError("View Model not found");
        res.send(result);
    } catch (err) {
        next(err);
    }
});

// router.post("/:equipmentModelId/statusModels/:viewModelId/rule", async (req, res, next) => {
//     try {
//         const statusModelId = req.params.viewModelId;
//         const equipmentModel = await EquipmentModel.findOne({
//             _id: req.params.equipmentModelId,
//             "viewModels._id": statusModelId,
//         });
//         if (!equipmentModel) throw new NotFoundError("Equipment not found");
//         const statusModel = equipmentModel.statusModels.id(statusModelId);
//         if (!statusModel) throw new NotFoundError("View Model not found");

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
