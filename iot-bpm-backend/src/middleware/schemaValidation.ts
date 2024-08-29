import Ajv from "ajv";
import { Request, Response, NextFunction } from "express";
import { createMachineDescription, updateMachineDescription } from "../interfaces/domainSchemas";

const ajv = new Ajv();

ajv.addSchema(createMachineDescription, "createMachineDescription");
ajv.addSchema(updateMachineDescription, "updateMachineDescription");


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
