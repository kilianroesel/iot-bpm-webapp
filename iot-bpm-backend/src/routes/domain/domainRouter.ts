import express from "express";
import { router as machineModelsRouter } from "./machineModels";
import { router as equipmentModelsRouter } from "./equipmentModels";

const router = express.Router();

router.use("/machineModels", machineModelsRouter);
router.use("/equipmentModels", equipmentModelsRouter);

export default router;
