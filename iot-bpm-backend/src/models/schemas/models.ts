import mongodb from "../../config/mongoClient";
import { equipmentModelSchema } from "./models/equipmentModelSchema";
import { machineModelSchema } from "./models/machineModelSchema";
import { resourceModelSchema } from "./models/resourceModelSchema";
import { eventAbstractionRuleSchema } from "./rules/eventAbstractionRuleSchema";
import { eventEnrichmentRuleSchema } from "./rules/eventEnrichmentRuleSchema";
import { eventScopingRuleSchema } from "./rules/eventScopingRuleSchema";

export const EquipmentModel= mongodb.model("EquipmentModel", equipmentModelSchema, "models");
export const MachineModel = EquipmentModel.discriminator("MachineModel", machineModelSchema);

export const EventScopingRule = mongodb.model("EventScopingRule", eventScopingRuleSchema, "event_scoping_rules");
export const EventAbstractionRule = mongodb.model(
    "EventAbstractionRule",
    eventAbstractionRuleSchema,
    "event_abstraction_rules"
);
export const EventEnrichmentRule = mongodb.model(
    "EventEnrichmentRule",
    eventEnrichmentRuleSchema,
    "event_enrichment_rules"
);

export const ResourceModel = mongodb.model("ResourceModel", resourceModelSchema, "resource_models");