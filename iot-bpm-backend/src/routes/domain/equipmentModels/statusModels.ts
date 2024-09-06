import express, { Request } from "express";
import { NotFoundError } from "../../../middleware/errorhandling";
import validateSchema from "../../../middleware/schemaValidation";
import EquipmentModel from "../../../models/EquipmentModel";

export const router = express.Router();

interface StatusModelRequest extends Request {
    equipmentModelId?: string;
}

router.post("", validateSchema("createStatusModel"), async (req: StatusModelRequest, res, next) => {
    try {
        const statusModel = {
            statusName: req.params.statusName,
            field: req.params.field,
        };
        const equipmentModel = await EquipmentModel.findByIdAndUpdate(
            req.params.equipmentModelId,
            { $addToSet: { statusModels: statusModel } },
            { new: true }
        );
        if (!equipmentModel) throw new NotFoundError("Equipment model not found");
        res.status(201).send(equipmentModel);
    } catch (err) {
        next(err);
    }
});

router.post("/:statusModelId", validateSchema("updateStatusModel"), async (req: StatusModelRequest, res, next) => {
    try {
        const updatedDescription = await EquipmentModel.updateOne(
            {
                _id: req.params.equipmentModelId,
                "statusModels._id": req.params.statusModelId,
            },
            {
                $set: {
                    "eventModels.$": req.body,
                },
            },
            {
                new: true,
            }
        );
        if (!updatedDescription) throw new NotFoundError("Status Model not found");
        res.send(updatedDescription);
    } catch (err) {
        next(err);
    }
});

router.delete("/:statusModelId", async (req: StatusModelRequest, res, next) => {
    try {
        if (!req.params.equipmentModelId) throw new NotFoundError("Equipment Model not found");
        const result = EquipmentModel.findByIdAndUpdate(req.params.equipmentModelId, 
            { $pull: {
                statusModels: { _id: req.params.statusModelId}
            }}
        );
        if (!result) throw new NotFoundError("Status model not found");
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

// router.post("/:id/dispatch", async (req: StatusModelRequest, res, next) => {
//     try {
//         const statusFieldId = req.params.id;
//         const statusField = await prisma.statusField.findUnique({
//             where: {
//                 id: statusFieldId,
//             },
//         });
//         if (!statusField) throw new NotFoundError("Status model not found");

//         const machineDescriptions = await prisma.$queryRawTyped(
//             getMachineDescriptionsOfEquipment(statusField.equipmentId)
//         );

//         if (machineDescriptions.length != 1 || !machineDescriptions[0].id) throw new Error("Inconsistent db");

//         const newEventScopingRule = await prisma.eventEnrichmentRule.upsert({
//             where: {
//                 id: statusField.id,
//             },
//             create: {
//                 id: statusField.id,
//                 name: statusField.name,
//                 field: statusField.field,
//                 equipmentId: statusField.equipmentId,
//             },
//             update: {
//                 id: statusField.id,
//                 name: statusField.name,
//                 field: statusField.field,
//                 equipmentId: statusField.equipmentId,
//             },
//         });

//         res.status(202).send(newEventScopingRule);
//     } catch (err) {
//         next(err);
//     }
// });
