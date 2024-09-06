import express from "express";
import validateSchema from "../../middleware/schemaValidation";
import { NotFoundError } from "../../middleware/errorhandling";
import MachineModel from "../../models/MachineModel";
import mongoose from "mongoose";
import EquipmentModel from "../../models/EquipmentModel";
import mongodb from "../../config/mongoClient";

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
        const session = await mongodb.startSession();

        try {
            session.startTransaction();

            // Save rootEquipmentModel
            const equipmentModelId = new mongoose.Types.ObjectId();
            const machineModelId = new mongoose.Types.ObjectId();
            await EquipmentModel.create(
                [
                    {
                        _id: equipmentModelId,
                        equipmentName: req.body.machineName,
                        machineModel: machineModelId,
                    },
                ],
                { session }
            );

            // Save Machine Model
            const newMachineModel = await MachineModel.create(
                [
                    {
                        _id: machineModelId,
                        ...req.body,
                        rootEquipmentModel: equipmentModelId,
                    },
                ],
                { session }
            );
            await session.commitTransaction();
            res.status(201).send(newMachineModel);
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
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
        const updatedModel = await MachineModel.findByIdAndUpdate(req.params.machineModelId, req.body, {new: true});
        res.send(updatedModel);
    } catch (err) {
        next(err);
    }
});

router.delete("/:machineModelId", async (req, res, next) => {
    try {
        await MachineModel.findByIdAndDelete(req.params.machineModelId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});


// router.post("/:id/dispatch", async (req, res, next) => {
//     try {
//         const descriptionId = req.params.id;
//         const machineDescription = await prisma.machineDescription.findUnique({
//             where: {
//                 id: descriptionId,
//             },
//         });
//         if (!machineDescription) throw new NotFoundError("Machine Description not found");

//         const newEventScopingRule = await prisma.eventScopingRule.upsert({
//             where: {
//                 id: machineDescription.id,
//             },
//             update: {
//                 id: machineDescription.id,
//                 machineName: machineDescription.machineName,
//                 versionCsiStd: machineDescription.versionCsiStd,
//                 versionCsiSpecific: machineDescription.versionCsiSpecific,
//                 machineSoftwareVersion: machineDescription.machineSoftwareVersion,
//                 machineMasterSoftwareVersion: machineDescription.machineMasterSoftwareVersion,
//             },
//             create: {
//                 id: machineDescription.id,
//                 machineName: machineDescription.machineName,
//                 versionCsiStd: machineDescription.versionCsiStd,
//                 versionCsiSpecific: machineDescription.versionCsiSpecific,
//                 machineSoftwareVersion: machineDescription.machineSoftwareVersion,
//                 machineMasterSoftwareVersion: machineDescription.machineMasterSoftwareVersion,
//             },
//         });
//         res.status(202).send(newEventScopingRule);
//     } catch (err) {
//         next(err);
//     }
// });
