import mongoose from "mongoose";


const equipmentTwinSchema = new mongoose.Schema({
    machineName: {
        type: String,
        required: true
    },
    versionCsiStd: {
        type: String,
        required: true
    },
    versionCsiSpecific: {
        type: String,
        required: true
    },
    machineSoftwareVersion: {
        type: String,
        required: true
    },
    machineMasterSoftwareVersion: {
        type: String,
        required: true
    },
    statusFields: {
        type: [String],
        default: []
    }
});

const EquipmentTwinModel = mongoose.model('equipment_twin', equipmentTwinSchema);

export default EquipmentTwinModel;