import Ajv from "ajv";
import { Request, Response, NextFunction } from "express";
import { createMachineModel, updateMachineModel } from "../schemas/domain/machineModelSchema";
import { createEquipmentModel, updateEquipmentModel } from "../schemas/domain/equipmentModelSchema";
import { createEventModel, updateEventModel } from "../schemas/domain/eventModelSchema";
import { createStatusModel, updateStatusModel } from "../schemas/domain/statusModelSchema";
import { createLifecycleModel, updateLifecycleModel } from "../schemas/domain/lifecycleModelSchema";


const ajv = new Ajv();

ajv.addSchema(createMachineModel, "createMachineModel");
ajv.addSchema(updateMachineModel, "updateMachineModel");

ajv.addSchema(createEquipmentModel, "createEquipmentModel");
ajv.addSchema(updateEquipmentModel, "updateEquipmentModel");

ajv.addSchema(createEventModel, "createEventModel");
ajv.addSchema(updateEventModel, "updateEventModel");

ajv.addSchema(createStatusModel, "createStatusModel");
ajv.addSchema(updateStatusModel, "updateStatusModel");

ajv.addSchema(createLifecycleModel, "createLifecycleModel");
ajv.addSchema(updateLifecycleModel, "updateLifecycleModel");

export default function validateSchema(schema: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validate = ajv.getSchema(schema);
        if (validate) {
            const valid = validate(req.body);

            if (!valid) {
                return res.status(400).json({
                    error: "Validation Error",
                    errors:
                        validate.errors?.map((error) => ({
                            field: error.instancePath,
                            message: error.message,
                        })) || [],
                });
            }
            next();
        } else {
            return res.status(500).json({
                error: "Validation Schema not found",
            });
        }
    };
}
