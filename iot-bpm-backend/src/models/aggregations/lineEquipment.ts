export const lineEquipmentPipeline = [
    {
      $unwind: "$relationships"  // Unwind the relationships array
    },
    {
      $match: {
        "relationships.qualifier": "equipmentId"  // Match only equipmentId relationships
      }
    },
    {
      $group: {
        _id: "$relationships.objectId"  // Group by the objectId of the equipmentId
      }
    },
    {
      $project: {
        _id: 0,
        equipmentId: "$_id"  // Output the objectId as equipmentId
      }
    }
  ]