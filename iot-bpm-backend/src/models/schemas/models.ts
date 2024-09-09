import mongodb from "../../config/mongoClient";
import { equipmentModelSchema } from "./models/equipmentModelSchema";
import { machineModelSchema } from "./models/machineModelSchema";
import { eventAbstractionRuleSchema } from "./rules/eventAbstractionRuleSchema";
import { eventEnrichmentRuleSchema } from "./rules/eventEnrichmentRuleSchema";
import { eventScopingRuleSchema } from "./rules/eventScopingRuleSchema";
import { ruleSchema } from "./rules/ruleSchema";


export const EquipmentModel = mongodb.model('EquipmentModel', equipmentModelSchema, 'models')
export const MachineModel = EquipmentModel.discriminator("MachineModel", machineModelSchema);


const RuleModel = mongodb.model('RuleModel', ruleSchema, 'rules')
export const EventScopingRule = RuleModel.discriminator("EventScopingRule", eventScopingRuleSchema);
export const EventAbstractionRule = RuleModel.discriminator("EventAbstractionRule", eventAbstractionRuleSchema);
export const EventEnrichmentRule = RuleModel.discriminator("EventEnrichmentRule", eventEnrichmentRuleSchema);