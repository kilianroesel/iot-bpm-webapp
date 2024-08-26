import express from "express";
import EventAbstractionRule from "../models/eventProcessing/eventAbstractionRule";

const router = express.Router();

router.get("/eventAbstractionRules", async (req, res) => {
  const result = await EventAbstractionRule.find();
  res.send(result);
});


export default router;
