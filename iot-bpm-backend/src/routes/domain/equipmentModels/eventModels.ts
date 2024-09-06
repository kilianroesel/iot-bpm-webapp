import express, { Request } from "express";
import { NotFoundError } from "../../../middleware/errorhandling";
import validateSchema from "../../../middleware/schemaValidation";
import EquipmentModel from "../../../models/EquipmentModel";

export const router = express.Router();

interface EventModelRequest extends Request {
    equipmentModelId?: string;
}

router.post("", validateSchema("createEventModel"), async (req: EventModelRequest, res, next) => {
    try {
        // Save Equipment Model
        const newEquipmentModel = await EquipmentModel.findByIdAndUpdate(req.params.id, {
            $puash: { eventModels: req.body },
        });
        if (!newEquipmentModel) throw new NotFoundError("Equipment model not found");

        res.status(201).send(newEquipmentModel);
    } catch (err) {
        next(err);
    }
});

router.post("/:eventModelId", validateSchema("updateEventModel"), async (req: EventModelRequest, res, next) => {
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
            }
        );
        if (!equipmentModel) throw new NotFoundError("Equipment Model not found");
        res.send(equipmentModel);
    } catch (err) {
        next(err);
    }
});

router.delete("/:eventModelId", async (req: EventModelRequest, res, next) => {
    try {
        if (!req.params.equipmentModelId) throw new NotFoundError("Equipment Model not found");
        const result = EquipmentModel.findByIdAndUpdate(req.params.equipmentModelId, 
            { $pull: {
                eventModels: { _id: req.params.eventModelId}
            }}
        );
        if (!result) throw new NotFoundError("Equipment Model not found");
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

// router.post("/:id/dispatch", async (req: EventModelRequest, res, next) => {
//     try {
//         const descriptionId = req.params.id;
//         const eventDescription = await prisma.eventDescription.findUnique({
//             where: {
//                 id: descriptionId,
//             },
//         });
//         if (!eventDescription) throw new NotFoundError("Event Model not found");

//         const machineDescriptions = await prisma.$queryRawTyped(
//             getMachineDescriptionsOfEquipment(eventDescription.equipmentId)
//         );

//         if (machineDescriptions.length != 1 || !machineDescriptions[0].id) throw new Error("Inconsistent db");

//         const newEventScopingRule = await prisma.eventAbstractionRule.upsert({
//             where: {
//                 id: eventDescription.id,
//             },
//             create: {
//                 id: eventDescription.id,
//                 name: eventDescription.name,
//                 field: eventDescription.field,
//                 triggerCategory: eventDescription.triggerCategory,
//                 triggerType: eventDescription.triggerType,
//                 value: eventDescription.value,
//                 from: eventDescription.from,
//                 to: eventDescription.to,
//                 equipmentId: eventDescription.equipmentId,
//                 scopeId: machineDescriptions[0].id,
//             },
//             update: {
//                 id: eventDescription.id,
//                 name: eventDescription.name,
//                 field: eventDescription.field,
//                 triggerCategory: eventDescription.triggerCategory,
//                 triggerType: eventDescription.triggerType,
//                 value: eventDescription.value,
//                 from: eventDescription.from,
//                 to: eventDescription.to,
//                 equipmentId: eventDescription.equipmentId,
//                 scopeId: machineDescriptions[0].id,
//             },
//         });

//         res.status(202).send(newEventScopingRule);
//     } catch (err) {
//         next(err);
//     }
// });
