/*
  Warnings:

  - You are about to drop the column `dishId` on the `DishPhoto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DishPhoto" DROP CONSTRAINT "DishPhoto_dishId_fkey";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "imageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DishPhoto" DROP COLUMN "dishId";

-- CreateIndex
CREATE UNIQUE INDEX "Dish_imageId_key" ON "Dish"("imageId");

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "DishPhoto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
