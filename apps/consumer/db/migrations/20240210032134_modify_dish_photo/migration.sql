/*
  Warnings:

  - You are about to drop the column `imagePublicId` on the `DishPhoto` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "DishPhoto_imagePublicId_key";

-- AlterTable
ALTER TABLE "DishPhoto" DROP COLUMN "imagePublicId";
