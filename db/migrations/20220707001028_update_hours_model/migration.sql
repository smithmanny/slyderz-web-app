/*
  Warnings:

  - You are about to drop the column `fridayEndTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `fridayStartTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `mondayEndTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `mondayStartTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `saturdayEndTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `saturdayStartTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `sundayEndTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `sundayStartTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `thursdayEndTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `thursdayStartTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `tuesdayEndTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `tuesdayStartTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `wednesdayEndTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `wednesdayStartTime` on the `Hours` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DaysOfWeekType" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterTable
ALTER TABLE "Hours" DROP COLUMN "fridayEndTime",
DROP COLUMN "fridayStartTime",
DROP COLUMN "mondayEndTime",
DROP COLUMN "mondayStartTime",
DROP COLUMN "saturdayEndTime",
DROP COLUMN "saturdayStartTime",
DROP COLUMN "sundayEndTime",
DROP COLUMN "sundayStartTime",
DROP COLUMN "thursdayEndTime",
DROP COLUMN "thursdayStartTime",
DROP COLUMN "tuesdayEndTime",
DROP COLUMN "tuesdayStartTime",
DROP COLUMN "wednesdayEndTime",
DROP COLUMN "wednesdayStartTime",
ADD COLUMN     "daysOfWeek" "DaysOfWeekType"[],
ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "startTime" TEXT;
