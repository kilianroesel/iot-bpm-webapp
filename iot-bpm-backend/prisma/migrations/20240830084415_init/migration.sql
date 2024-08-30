-- CreateEnum
CREATE TYPE "ScalarTriggerType" AS ENUM ('CHANGES_TO', 'CHANGES_FROM', 'INCREASES_BY', 'DECREASES_BY', 'ABSOLUTE_CHANGE_IS_EQUAL', 'ABSOLUTE_CHANGE_IS_GREATER_EQUAL', 'CHANGE_IS_GREATER_EQUAL');

-- CreateEnum
CREATE TYPE "RangeTriggerType" AS ENUM ('ENTERS_RANGE_FROM_TO', 'LEAVES_RANGE_FROM_TO');

-- CreateEnum
CREATE TYPE "TriggerCategory" AS ENUM ('SCALAR_TRIGGER', 'RANGE_TRIGGER');

-- CreateTable
CREATE TABLE "MachineDescription" (
    "id" TEXT NOT NULL,
    "machineName" TEXT NOT NULL,
    "versionCsiStd" TEXT NOT NULL,
    "versionCsiSpecific" TEXT NOT NULL,
    "machineSoftwareVersion" TEXT NOT NULL,
    "machineMasterSoftwareVersion" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,

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
    "equipmentId" TEXT NOT NULL,

    CONSTRAINT "StatusField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventDescription" (
    "id" TEXT NOT NULL,
    "equipmentDescrptionId" TEXT NOT NULL,
    "type" "TriggerCategory" NOT NULL,

    CONSTRAINT "EventDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScalarTrigger" (
    "id" TEXT NOT NULL,
    "triggerType" "ScalarTriggerType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "ScalarTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RangeTrigger" (
    "id" TEXT NOT NULL,
    "triggerType" "RangeTriggerType" NOT NULL,
    "from" DOUBLE PRECISION NOT NULL,
    "to" DOUBLE PRECISION NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "RangeTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MachineDescription_equipmentId_key" ON "MachineDescription"("equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "ScalarTrigger_eventId_key" ON "ScalarTrigger"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "RangeTrigger_eventId_key" ON "RangeTrigger"("eventId");

-- AddForeignKey
ALTER TABLE "MachineDescription" ADD CONSTRAINT "MachineDescription_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "EquipmentDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "EquipmentDescription" ADD CONSTRAINT "EquipmentDescription_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "EquipmentDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "StatusField" ADD CONSTRAINT "StatusField_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "EquipmentDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "EventDescription" ADD CONSTRAINT "EventDescription_equipmentDescrptionId_fkey" FOREIGN KEY ("equipmentDescrptionId") REFERENCES "EquipmentDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "ScalarTrigger" ADD CONSTRAINT "ScalarTrigger_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "RangeTrigger" ADD CONSTRAINT "RangeTrigger_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventDescription"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
