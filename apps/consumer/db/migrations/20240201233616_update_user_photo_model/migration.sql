/*
  Warnings:

  - You are about to drop the column `imagePublicId` on the `UserPhoto` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserPhoto_imagePublicId_key";

-- AlterTable
ALTER TABLE "UserPhoto" DROP COLUMN "imagePublicId";
