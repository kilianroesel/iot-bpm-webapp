import mongoose from "mongoose";


const eventAbstractionRuleSchema = new mongoose.Schema({
    ruleId: {
        type: String,
        required: true,
        unique: true
    },
    eventName: {
        
    },
    field: {
        type: String,
        required: true
    },
});