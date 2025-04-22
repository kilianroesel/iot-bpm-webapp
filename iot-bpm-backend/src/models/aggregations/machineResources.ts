export const getMachineResourcePipeline = (machineId: string) => {
    const regex = RegExp(`,${machineId},`);
    return [
        { $match: { equipmentPath: regex } },
        { $project: { viewModels: 1 }},
        { $unwind: "$viewModels" },
        { $unwind: "$viewModels.eventModels" },
        { $unwind: "$viewModels.eventModels.relations" },
        { $project: { "resourceModel": "$viewModels.eventModels.relations" } },
        { $replaceRoot: {
            "newRoot": "$resourceModel"
          }},
        { $match: { interactionType: { "$in": ["CREATE", "PROVIDE", "REFERENCE"] }}}
        
      ]
}

export const getAllMachineResources = () => {
  return [
    { $project: { viewModels: 1, equipmentName: 1 }},
    { $unwind: "$viewModels" },
    { $unwind: "$viewModels.eventModels" },
    { $unwind: "$viewModels.eventModels.relations" },
    { $project: { "resourceModel": "$viewModels.eventModels.relations", "equipmentName": 1 } },
    {$set: {
        "resourceModel.equipmentName": "$equipmentName"
      }},
    { $replaceRoot: {
        "newRoot": "$resourceModel"
      }},
    { $match: { interactionType: { "$in": ["CREATE", "PROVIDE", "REFERENCE"] }}}
  ]
}