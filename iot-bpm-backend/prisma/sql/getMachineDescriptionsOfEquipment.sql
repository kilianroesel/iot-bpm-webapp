WITH RECURSIVE FindRoot AS (
    SELECT  id, "parentId"
    FROM public."EquipmentDescription"
    WHERE id = $1

    UNION ALL

    SELECT t.id, t."parentId"
    FROM public."EquipmentDescription" t
    INNER JOIN FindRoot fr 
    ON t.id = fr."parentId"
) SELECT * FROM public."MachineDescription" WHERE "mainEquipmentId" = (SELECT id FROM FindRoot WHERE "parentId" IS NULL);