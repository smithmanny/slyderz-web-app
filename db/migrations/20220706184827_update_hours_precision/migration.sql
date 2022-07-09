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
ADD COLUMN     "mondayStartTime" TIME(0),
DROP COLUMN "mondayEndTime",
ADD COLUMN     "mondayEndTime" TIME(0),
DROP COLUMN "tuesdayStartTime",
ADD COLUMN     "tuesdayStartTime" TIME(0),
DROP COLUMN "tuesdayEndTime",
ADD COLUMN     "tuesdayEndTime" TIME(0),
DROP COLUMN "wednesdayStartTime",
ADD COLUMN     "wednesdayStartTime" TIME(0),
DROP COLUMN "wednesdayEndTime",
ADD COLUMN     "wednesdayEndTime" TIME(0),
DROP COLUMN "thursdayStartTime",
ADD COLUMN     "thursdayStartTime" TIME(0),
DROP COLUMN "thursdayEndTime",
ADD COLUMN     "thursdayEndTime" TIME(0),
DROP COLUMN "fridayStartTime",
ADD COLUMN     "fridayStartTime" TIME(0),
DROP COLUMN "fridayEndTime",
ADD COLUMN     "fridayEndTime" TIME(0),
DROP COLUMN "saturdayStartTime",
ADD COLUMN     "saturdayStartTime" TIME(0),
DROP COLUMN "saturdayEndTime",
ADD COLUMN     "saturdayEndTime" TIME(0),
DROP COLUMN "sundayStartTime",
ADD COLUMN     "sundayStartTime" TIME(0),
DROP COLUMN "sundayEndTime",
ADD COLUMN     "sundayEndTime" TIME(0);
