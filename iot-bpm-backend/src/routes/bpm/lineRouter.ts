import express from "express";
import { DbClient } from "../../config/mongoClient";
import { lineEquipmentPipeline } from "../../models/aggregations/lineEquipment";
import { MachineModel } from "../../models/schemas/models";

export const router = express.Router();
const mongoClient = DbClient.instance;

router.get("/lines", async (req, res, next) => {
    try {
        const collections = await mongoClient.eventDb.listCollections();
        const collectionNames = collections.map((collection) => {
            return { name: collection.name };
        });
        res.send(collectionNames);
    } catch (err) {
        next(err);
    }
});

router.get("/lines/:lineId/events", async (req, res, next) => {
    const lineCollection = mongoClient.eventDb.collection(req.params.lineId);
    const recentEvents = await lineCollection.find().sort({time: -1}).limit(10).toArray();
    res.json(recentEvents);
});

router.get("/lines/:lineId/machines", async (req, res, next) => {
    try {
        const lineCollection = mongoClient.eventDb.collection(req.params.lineId);
        const equipmentIds = await lineCollection.aggregate(lineEquipmentPipeline).toArray();
        const cleanEquipmentIds = equipmentIds.map((equipmentId) => equipmentId.equipmentId);
        const machineModels = await MachineModel.find({
            _id: { $in: cleanEquipmentIds }
          });
        
        res.send(machineModels);
    } catch (err) {
        next(err);
    }
});

router.get("/lines/:lineId/heuristicNets", async (req, res, next) => {
    const heuristicNetCollection = mongoClient.heuristicNetDb.collection(req.params.lineId);
    const result = await heuristicNetCollection.find().project({ "objectView": 1, "_id": 0 }).toArray();
    const heuristicNets = result.map((net) => net.objectView);
    res.json(heuristicNets);
});

router.get("/lines/:lineId/heuristicNets/:objectView", async (req, res, next) => {
    const heuristicNetCollection = mongoClient.heuristicNetDb.collection(req.params.lineId);
    const objectView = req.params.objectView;
    const recentEvents = await heuristicNetCollection.findOne({objectView: objectView});
    res.json(recentEvents);
});

