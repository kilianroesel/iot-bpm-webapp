import { JSONSchemaType } from "ajv";

interface CreateEventBase {
    name: string;
    field: string;
}

interface ScalarTrigger extends CreateEventBase {
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

interface RangeTrigger extends CreateEventBase {
    triggerCategory: "RANGE_TRIGGER";
    type: "ENTERS_RANGE_FROM_TO" | "LEAVES_RANGE_FROM_TO";
    from: number;
    to: number;
}

export const createEventDescription: JSONSchemaType<ScalarTrigger | RangeTrigger> = {
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

interface UpdateScalarTriggerDescription extends ScalarTrigger {
    _id: string;
    __v: number;
}

interface UpdateRangeTriggerDescription extends RangeTrigger {
    id: string;
}

export const updateEventDescription: JSONSchemaType<UpdateScalarTriggerDescription | UpdateRangeTriggerDescription> = {
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
