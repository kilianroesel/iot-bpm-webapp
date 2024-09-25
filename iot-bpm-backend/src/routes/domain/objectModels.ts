import express from "express";
import { NotFoundError } from "../../middleware/errorhandling";
import validateSchema from "../../middleware/schemaValidation";
import { MachineModel, ObjectModel } from "../../models/schemas/models";

export const router = express.Router();

router.post("/:machineModelId/objectModels", validateSchema("createObjectModel"), async (req, res, next) => {
    try {
        const machineModel = await MachineModel.findById(req.params.machineModelId);
        if (!machineModel) throw new NotFoundError("Machine model not found");

        const objectModel = {
            objectModelName: req.body.objectModelName,
            machineModel: machineModel._id,
        };

        const newObjectModel = await ObjectModel.create([objectModel], {
            new: true,
            runValidators: true,
        });

        res.status(201).send(newObjectModel);
    } catch (err) {
        next(err);
    }
});

router.post(
    "/:machineModelId/objectModels/:objectModelId",
    validateSchema("updateObjectModel"),
    async (req, res, next) => {
        try {
            const objectModel = {
                objectModelName: req.body.objectModelName,
            };

            const updatedObjectModel = await ObjectModel.findOneAndUpdate(
                {
                    _id: req.params.objectModelId,
                    machineModel: req.params.machineModelId,
                },
                objectModel,
                { new: true, runValidators: true }
            );

            if (!updatedObjectModel) throw new NotFoundError("Object model not found");

            res.status(201).send(updatedObjectModel);
        } catch (err) {
            next(err);
        }
    }
);

router.delete("/:machineModelId/objectModels/:objectModelId", async (req, res, next) => {
    try {
        const deletedObjectModel = await ObjectModel.findOneAndDelete({
            _id: req.params.objectModelId,
            machineModel: req.params.machineModelId,
        });

        if (!deletedObjectModel) throw new NotFoundError("Object model not found");

        res.send(deletedObjectModel);
    } catch (err) {
        next(err);
    }
});
