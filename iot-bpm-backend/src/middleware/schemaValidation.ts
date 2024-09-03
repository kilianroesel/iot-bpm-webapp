import Ajv from "ajv";
import { Request, Response, NextFunction } from "express";
import { createMachineDescription, updateMachineDescription } from "../schemas/domain/machineDescriptions";
import { createEquipmentDescription, updateEquipmentDescription } from "../schemas/domain/equipmentDescriptions";
import { createEventDescription, updateEventDescription } from "../schemas/domain/eventDescriptions";
import { createStatusField, updateStatusField } from "../schemas/domain/statusField";

const ajv = new Ajv();

ajv.addSchema(createMachineDescription, "createMachineDescription");
ajv.addSchema(updateMachineDescription, "updateMachineDescription");

ajv.addSchema(createEquipmentDescription, "createEquipmentDescription");
ajv.addSchema(updateEquipmentDescription, "updateEquipmentDescription");

ajv.addSchema(createEventDescription, "createEventDescription");
ajv.addSchema(updateEventDescription, "updateEventDescription");

ajv.addSchema(createStatusField, "createStatusField");
ajv.addSchema(updateStatusField, "updateStatusField");

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
