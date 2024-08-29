import express from "express";
import { router as machineDescriptionsRouter } from "./machineDescriptions";
import { router as equipmentDescriptionsRouter } from "./equipmentDescriptions";
import { router as eventDescriptionsRouter } from "./eventDescriptions";
import { router as statusFieldRouter } from "./statusFields";

const router = express.Router();

router.use("/machineDescriptions", machineDescriptionsRouter);
router.use("/equipmentDescriptions", equipmentDescriptionsRouter);
router.use("/eventDescriptions", eventDescriptionsRouter);
router.use("/statusFields", statusFieldRouter);

export default router;
