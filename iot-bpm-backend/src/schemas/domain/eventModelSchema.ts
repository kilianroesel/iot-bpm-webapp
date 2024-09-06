import { JSONSchemaType } from "ajv";

interface CreateEventModelBase {
    name: string;
    field: string;
}

interface ScalarTrigger extends CreateEventModelBase {
    triggerCategory: "SCALAR_TRIGGER";
    type:
        | "CHANGES_TO"
        | "CHANGES_FROM"
        | "INCREASES_BY"
        | "DECREASES_BY"
        | "ABSOLUTE_CHANGE_IS_EQUAL"
        | "ABSOLUTE_CHANGE_IS_GREATER_EQUAL"
        | "CHANGE_IS_GREATER_EQUAL";
    value: number;
}

interface RangeTrigger extends CreateEventModelBase {
    triggerCategory: "RANGE_TRIGGER";
    type: "ENTERS_RANGE_FROM_TO" | "LEAVES_RANGE_FROM_TO";
    from: number;
    to: number;
}

export const createEventModel: JSONSchemaType<ScalarTrigger | RangeTrigger> = {
    type: "object",
    oneOf: [
        {
            type: "object",
            properties: {
                name: { type: "string" },
                field: { type: "string" },
                triggerCategory: {
                    type: "string",
                    const: "SCALAR_TRIGGER",
                },
                triggerType: {
                    type: "string",
                    enum: [
                        "CHANGES_TO",
                        "CHANGES_FROM",
                        "INCREASES_BY",
                        "DECREASES_BY",
                        "ABSOLUTE_CHANGE_IS_EQUAL",
                        "ABSOLUTE_CHANGE_IS_GREATER_EQUAL",
                        "CHANGE_IS_GREATER_EQUAL",
                    ],
                },
                value: { type: "number" },
            },
            required: ["name", "field", "triggerCategory", "triggerType", "value"],
            additionalProperties: false,
        },
        {
            type: "object",
            properties: {
                name: { type: "string" },
                field: { type: "string" },
                triggerCategory: {
                    type: "string",
                    const: "RANGE_TRIGGER",
                },
                triggerType: {
                    type: "string",
                    enum: ["ENTERS_RANGE_FROM_TO", "LEAVES_RANGE_FROM_TO"],
                },
                from: { type: "number" },
                to: { type: "number" },
            },
            required: ["name", "field", "triggerCategory", "triggerType", "from", "to"],
            additionalProperties: false,
        },
    ],
    required: ["name", "field", "triggerCategory"],
};

interface UpdateScalarTriggerModel extends ScalarTrigger {
    id: string;
}

interface UpdateRangeTriggerModel extends RangeTrigger {
    id: string;
}

export const updateEventModel: JSONSchemaType<UpdateScalarTriggerModel | UpdateRangeTriggerModel> = {
    type: "object",
    oneOf: [
        {
            type: "object",
            properties: {
                id: { type: "string" },
                name: { type: "string" },
                field: { type: "string" },
                triggerCategory: {
                    type: "string",
                    const: "SCALAR_TRIGGER",
                },
                triggerType: {
                    type: "string",
                    enum: [
                        "CHANGES_TO",
                        "CHANGES_FROM",
                        "INCREASES_BY",
                        "DECREASES_BY",
                        "ABSOLUTE_CHANGE_IS_EQUAL",
                        "ABSOLUTE_CHANGE_IS_GREATER_EQUAL",
                        "CHANGE_IS_GREATER_EQUAL",
                    ],
                },
                value: { type: "number" },
            },
            required: ["name", "field", "triggerCategory", "triggerType", "value"],
            additionalProperties: false,
        },
        {
            type: "object",
            properties: {
                id: { type: "string" },
                name: { type: "string" },
                field: { type: "string" },
                triggerCategory: {
                    type: "string",
                    const: "RANGE_TRIGGER",
                },
                triggerType: {
                    type: "string",
                    enum: ["ENTERS_RANGE_FROM_TO", "LEAVES_RANGE_FROM_TO"],
                },
                from: { type: "number" },
                to: { type: "number" },
            },
            required: ["name", "field", "triggerCategory", "triggerType", "from", "to"],
            additionalProperties: false,
        },
    ],
    required: ["name", "field", "id", "triggerCategory"],
};
