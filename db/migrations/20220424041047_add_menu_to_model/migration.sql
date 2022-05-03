/*
  Warnings:

  - You are about to drop the column `chefId` on the `Dish` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Dish` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,2)`.
  - Added the required column `menuId` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_chefId_fkey";

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "chefId",
ALTER COLUMN "price" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "menuId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chefId" INTEGER NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Menu_chefId_key" ON "Menu"("chefId");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Chef"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
