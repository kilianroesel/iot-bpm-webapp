import express from "express";
import { router as machineModelsRouter } from "./machineModels";
import { router as equipmentModelsRouter } from "./equipmentModels";
import { router as resourceModelRouter } from "./resourceModels";

const router = express.Router();

router.use("/machineModels", machineModelsRouter);
router.use("/equipmentModels", equipmentModelsRouter);
router.use("/resourceModels", resourceModelRouter);

export default router;
