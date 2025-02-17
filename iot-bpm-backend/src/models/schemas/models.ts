import { modeldb } from "../../config/mongoClient";
import { equipmentModelSchema } from "./models/equipmentModelSchema";
import { machineModelSchema } from "./models/machineModelSchema";
import { resourceModelSchema } from "./models/resourceModelSchema";
import { eventAbstractionRuleSchema } from "./rules/eventAbstractionRuleSchema";
import { eventEnrichmentRuleSchema } from "./rules/eventEnrichmentRuleSchema";
import { eventScopingRuleSchema } from "./rules/eventScopingRuleSchema";
import { resourceNameRuleSchema } from "./rules/resourceNameRuleSchema";

export const EquipmentModel= modeldb.model("EquipmentModel", equipmentModelSchema, "models");
export const MachineModel = EquipmentModel.discriminator("MachineModel", machineModelSchema);

export const EventScopingRule = modeldb.model("EventScopingRule", eventScopingRuleSchema, "event_scoping_rules");
export const EventAbstractionRule = modeldb.model(
    "EventAbstractionRule",
    eventAbstractionRuleSchema,
    "event_abstraction_rules"
);
export const EventEnrichmentRule = modeldb.model(
    "EventEnrichmentRule",
    eventEnrichmentRuleSchema,
    "event_enrichment_rules"
);
export const ResourceNameRule = modeldb.model("ResourceNameRule", resourceNameRuleSchema, "resource_name_rules");


export const ResourceModel = modeldb.model("ResourceModel", resourceModelSchema, "resource_models");