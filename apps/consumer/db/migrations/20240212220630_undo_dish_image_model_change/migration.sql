/*
  Warnings:

  - You are about to drop the column `imageId` on the `Dish` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_imageId_fkey";

-- DropIndex
DROP INDEX "Dish_imageId_key";

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "DishPhoto" ADD COLUMN     "dishId" TEXT;

-- AddForeignKey
ALTER TABLE "DishPhoto" ADD CONSTRAINT "DishPhoto_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
