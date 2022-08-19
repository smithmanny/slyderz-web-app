/*
  Warnings:

  - A unique constraint covering the columns `[name,chefId]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Dish_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Dish_name_chefId_key" ON "Dish"("name", "chefId");
