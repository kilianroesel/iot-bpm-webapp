import express from "express";
import { router as machineModelsRouter } from "./machineModels";
import { router as equipmentModelsRouter } from "./equipmentModels";
import { router as eventModelsRouter } from "./eventModels";
import { router as statusModelRouter } from "./statusModels";

const router = express.Router();

router.use("/machineModels", machineModelsRouter);
router.use("/equipmentModels", equipmentModelsRouter);
router.use("/eventModels", eventModelsRouter);
router.use("/statusModels", statusModelRouter);

export default router;
