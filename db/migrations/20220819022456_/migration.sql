/*
  Warnings:

  - You are about to drop the column `description` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `OrderItems` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,chefId]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chefId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dishId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "chefId" INTEGER NOT NULL,
ADD COLUMN     "dishId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_chefId_key" ON "Section"("name", "chefId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Chef"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
