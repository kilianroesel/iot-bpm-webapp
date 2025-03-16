import { JSONSchemaType } from "ajv";

interface CreateEventModelBase {
    eventName: string;
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
                eventName: { type: "string" },
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
                relations: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            resourceModel: {
                                type: "string"
                            },
                            interactionType: {
                                type: "string",
                                enum: ["CREATE", "PROVIDE", "CONSUME", "USE"]
                            },
                            qualifier: {
                                type: "string"
                            },
                            quantity: {
                                type: "number"
                            },
                            lifespan: {
                                type: "number"
                            }
                        },
                        required: ["resourceModel", "interactionType", "qualifier"],
                        additionalProperties: true
                    }
                }
            },
            required: ["eventName", "field", "triggerCategory", "triggerType", "value"],
            additionalProperties: false,
        },
        {
            type: "object",
            properties: {
                eventName: { type: "string" },
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
                relations: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            resourceModel: {
                                type: "string"
                            },
                            interactionType: {
                                type: "string",
                                enum: ["CREATE", "PROVIDE", "CONSUME", "USE"]
                            },
                            qualifier: {
                                type: "string"
                            },
                            quantity: {
                                type: "number"
                            },
                            lifespan: {
                                type: "number"
                            }
                        },
                        required: ["resourceModel", "interactionType", "qualifier"]
                    }
                }
            },
            required: ["eventName", "field", "triggerCategory", "triggerType", "from", "to"],
            additionalProperties: false,
        },
    ],
    required: ["eventName", "field", "triggerCategory"],
};

interface UpdateScalarTriggerModel extends ScalarTrigger {
    _id: string;
}

interface UpdateRangeTriggerModel extends RangeTrigger {
    _id: string;
}

export const updateEventModel: JSONSchemaType<UpdateScalarTriggerModel | UpdateRangeTriggerModel> = {
    type: "object",
    oneOf: [
        {
            type: "object",
            properties: {
                _id: { type: "string" },
                eventName: { type: "string" },
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
                relations: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            resourceModel: {
                                type: "string"
                            },
                            interactionType: {
                                type: "string",
                                enum: ["CREATE", "PROVIDE", "CONSUME", "USE"]
                            },
                            qualifier: {
                                type: "string"
                            },
                            quantity: {
                                type: "number"
                            },
                            lifespan: {
                                type: "number"
                            }
                        },
                        required: ["resourceModel", "interactionType", "qualifier"]
                    }
                }
            },
            required: ["eventName", "field", "triggerCategory", "triggerType", "value", "relations"],
            additionalProperties: false,
        },
        {
            type: "object",
            properties: {
                _id: { type: "string" },
                eventName: { type: "string" },
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
                relations: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            resourceModel: {
                                type: "string"
                            },
                            interactionType: {
                                type: "string",
                                enum: ["CREATE", "PROVIDE", "CONSUME", "USE"]
                            },
                            qualifier: {
                                type: "string"
                            },
                            quantity: {
                                type: "number"
                            },
                            lifespan: {
                                type: "number"
                            }
                        },
                        required: ["resourceModel", "interactionType", "qualifier"]
                    }
                }
            },
            required: ["eventName", "field", "triggerCategory", "triggerType", "from", "to", "relations"],
            additionalProperties: false,
        },
    ],
    required: ["eventName", "field", "triggerCategory"],
};
