import { DbClient } from "../../config/mongoClient";
import { equipmentModelSchema } from "./models/equipmentModelSchema";
import { machineModelSchema } from "./models/machineModelSchema";
import { resourceModelSchema } from "./models/resourceModelSchema";
import { eventAbstractionRuleSchema } from "./rules/eventAbstractionRuleSchema";
import { eventEnrichmentRuleSchema } from "./rules/eventEnrichmentRuleSchema";
import { eventScopingRuleSchema } from "./rules/eventScopingRuleSchema";
import { resourceNameRuleSchema } from "./rules/resourceNameRuleSchema";

const mongoClient = DbClient.instance;

export const EquipmentModel = mongoClient.modelDb.model("EquipmentModel", equipmentModelSchema, "models");
export const MachineModel = EquipmentModel.discriminator("MachineModel", machineModelSchema);

export const EventScopingRule = mongoClient.modelDb.model("EventScopingRule", eventScopingRuleSchema, "event_scoping_rules");
export const EventAbstractionRule = mongoClient.modelDb.model(
    "EventAbstractionRule",
    eventAbstractionRuleSchema,
    "event_abstraction_rules"
);
export const EventEnrichmentRule = mongoClient.modelDb.model(
    "EventEnrichmentRule",
    eventEnrichmentRuleSchema,
    "event_enrichment_rules"
);
export const ResourceNameRule = mongoClient.modelDb.model("ResourceNameRule", resourceNameRuleSchema, "resource_name_rules");


export const ResourceModel = mongoClient.modelDb.model("ResourceModel", resourceModelSchema, "resource_models");