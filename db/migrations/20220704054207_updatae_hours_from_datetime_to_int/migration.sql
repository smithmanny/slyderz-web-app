/*
  Warnings:

  - The `mondayStartTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mondayEndTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tuesdayStartTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tuesdayEndTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wednesdayStartTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wednesdayEndTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `thursdayStartTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `thursdayEndTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fridayStartTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fridayEndTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `saturdayStartTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `saturdayEndTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sundayStartTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sundayEndTime` column on the `Hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Hours" DROP COLUMN "mondayStartTime",
ADD COLUMN     "mondayStartTime" INTEGER,
DROP COLUMN "mondayEndTime",
ADD COLUMN     "mondayEndTime" INTEGER,
DROP COLUMN "tuesdayStartTime",
ADD COLUMN     "tuesdayStartTime" INTEGER,
DROP COLUMN "tuesdayEndTime",
ADD COLUMN     "tuesdayEndTime" INTEGER,
DROP COLUMN "wednesdayStartTime",
ADD COLUMN     "wednesdayStartTime" INTEGER,
DROP COLUMN "wednesdayEndTime",
ADD COLUMN     "wednesdayEndTime" INTEGER,
DROP COLUMN "thursdayStartTime",
ADD COLUMN     "thursdayStartTime" INTEGER,
DROP COLUMN "thursdayEndTime",
ADD COLUMN     "thursdayEndTime" INTEGER,
DROP COLUMN "fridayStartTime",
ADD COLUMN     "fridayStartTime" INTEGER,
DROP COLUMN "fridayEndTime",
ADD COLUMN     "fridayEndTime" INTEGER,
DROP COLUMN "saturdayStartTime",
ADD COLUMN     "saturdayStartTime" INTEGER,
DROP COLUMN "saturdayEndTime",
ADD COLUMN     "saturdayEndTime" INTEGER,
DROP COLUMN "sundayStartTime",
ADD COLUMN     "sundayStartTime" INTEGER,
DROP COLUMN "sundayEndTime",
ADD COLUMN     "sundayEndTime" INTEGER;
