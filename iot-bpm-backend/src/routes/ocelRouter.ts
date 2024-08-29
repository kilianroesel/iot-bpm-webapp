import express from "express";
import validateSchema from "../middleware/schemaValidation";
import EquipmentTwinModel from "../models/domain/machineDescription";

const router = express.Router();

router.get("/ocelEventLog/:id", async (req, res) => {
  const result = await EquipmentTwinModel.find();
  res.send(result);
});

export default router;
