-- CreateTable
CREATE TABLE "MachineDescription" (
    "id" TEXT NOT NULL,
    "machineName" TEXT NOT NULL,
    "versionCsiStd" TEXT NOT NULL,
    "versionCsiSpecific" TEXT NOT NULL,
    "machineSoftwareVersion" TEXT NOT NULL,
    "machineMasterSoftwareVersion" TEXT NOT NULL,
    "mainEquipmentId" TEXT NOT NULL,

    CONSTRAINT "MachineDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentDescription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "EquipmentDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusField" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,

    CONSTRAINT "StatusField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventDescription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "triggerCategory" TEXT NOT NULL,
    "triggerType" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "from" DOUBLE PRECISION,
    "to" DOUBLE PRECISION,

    CONSTRAINT "EventDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventScopingRule" (
    "id" TEXT NOT NULL,
    "machineName" TEXT NOT NULL,
    "versionCsiStd" TEXT NOT NULL,
    "versionCsiSpecific" TEXT NOT NULL,
    "machineSoftwareVersion" TEXT NOT NULL,
    "machineMasterSoftwareVersion" TEXT NOT NULL,

    CONSTRAINT "EventScopingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAbstractionRule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "triggerCategory" TEXT NOT NULL,
    "triggerType" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "from" DOUBLE PRECISION,
    "to" DOUBLE PRECISION,
    "equipmentId" TEXT NOT NULL,
    "scopeId" TEXT NOT NULL,

    CONSTRAINT "EventAbstractionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventEnrichmentRule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,

    CONSTRAINT "EventEnrichmentRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MachineDescription_mainEquipmentId_key" ON "MachineDescription"("mainEquipmentId");

-- AddForeignKey
ALTER TABLE "MachineDescription" ADD CONSTRAINT "MachineDescription_mainEquipmentId_fkey" FOREIGN KEY ("mainEquipmentId") REFERENCES "EquipmentDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "EquipmentDescription" ADD CONSTRAINT "EquipmentDescription_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "EquipmentDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "StatusField" ADD CONSTRAINT "StatusField_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "EquipmentDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "EventDescription" ADD CONSTRAINT "EventDescription_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "EquipmentDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "EventScopingRule" ADD CONSTRAINT "EventScopingRule_id_fkey" FOREIGN KEY ("id") REFERENCES "MachineDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "EventAbstractionRule" ADD CONSTRAINT "EventAbstractionRule_id_fkey" FOREIGN KEY ("id") REFERENCES "EventDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "EventEnrichmentRule" ADD CONSTRAINT "EventEnrichmentRule_id_fkey" FOREIGN KEY ("id") REFERENCES "StatusField"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
