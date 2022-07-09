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
ADD COLUMN     "mondayStartTime" TIMESTAMP(3),
DROP COLUMN "mondayEndTime",
ADD COLUMN     "mondayEndTime" TIMESTAMP(3),
DROP COLUMN "tuesdayStartTime",
ADD COLUMN     "tuesdayStartTime" TIMESTAMP(3),
DROP COLUMN "tuesdayEndTime",
ADD COLUMN     "tuesdayEndTime" TIMESTAMP(3),
DROP COLUMN "wednesdayStartTime",
ADD COLUMN     "wednesdayStartTime" TIMESTAMP(3),
DROP COLUMN "wednesdayEndTime",
ADD COLUMN     "wednesdayEndTime" TIMESTAMP(3),
DROP COLUMN "thursdayStartTime",
ADD COLUMN     "thursdayStartTime" TIMESTAMP(3),
DROP COLUMN "thursdayEndTime",
ADD COLUMN     "thursdayEndTime" TIMESTAMP(3),
DROP COLUMN "fridayStartTime",
ADD COLUMN     "fridayStartTime" TIMESTAMP(3),
DROP COLUMN "fridayEndTime",
ADD COLUMN     "fridayEndTime" TIMESTAMP(3),
DROP COLUMN "saturdayStartTime",
ADD COLUMN     "saturdayStartTime" TIMESTAMP(3),
DROP COLUMN "saturdayEndTime",
ADD COLUMN     "saturdayEndTime" TIMESTAMP(3),
DROP COLUMN "sundayStartTime",
ADD COLUMN     "sundayStartTime" TIMESTAMP(3),
DROP COLUMN "sundayEndTime",
ADD COLUMN     "sundayEndTime" TIMESTAMP(3);
