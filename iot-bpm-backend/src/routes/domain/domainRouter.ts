import express from "express";
import { router as machineModelsRouter } from "./machineModels";
import { router as equipmentModelsRouter } from "./equipmentModels";
import { router as objectModelRouter } from "./objectModels";

const router = express.Router();

router.use("/machineModels", machineModelsRouter);
router.use("/equipmentModels", equipmentModelsRouter);
router.use("/objectModels", objectModelRouter);

export default router;
