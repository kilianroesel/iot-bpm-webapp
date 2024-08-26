import express from "express";
import validateSchema from "../middleware/schemaValidation";
import EquipmentTwinModel from "../models/domain/equipmentTwin";

const apiRouter = express.Router();

apiRouter.get("/equipmentTwin", async (req, res) => {
  const result = await EquipmentTwinModel.find();
  res.send(result);
});

apiRouter.post(
  "/equipmentTwin",
  validateSchema("createEquipmentTwin"),
  async (req, res) => {
    const body = req.body;
    const newEquipmentTwin = new EquipmentTwinModel(body);
    await newEquipmentTwin.save();
    res.status(201).send(newEquipmentTwin);
  }
);

apiRouter.post(
  "/equipmentTwin/:id",
  validateSchema("updateEquipmentTwin"),
  async (req, res) => {
    const body = req.body;
    res.send(body);
  }
);

export default apiRouter;
