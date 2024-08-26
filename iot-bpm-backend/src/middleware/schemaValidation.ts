import Ajv from "ajv";
import { Request, Response, NextFunction } from "express";
import * as createScope from "../schemas/createScope.json";

const ajv = new Ajv();

ajv.addSchema(createScope, "createScope");

export default function validateSchema(schema: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = ajv.getSchema(schema);
    if (validate) {
      const valid = validate(req.body);

      if (!valid) {
        return res.status(400).json({
          errors:
            validate.errors?.map((error) => ({
              field: error.instancePath,
              message: error.message,
            })) || [],
        });
      }
      next();
    } else {
        return res.status(500);
    }
  };
}
