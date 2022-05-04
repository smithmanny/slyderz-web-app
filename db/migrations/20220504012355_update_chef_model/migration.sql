/*
  Warnings:

  - You are about to drop the column `menuId` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chefId` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dishId` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_chefId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_menuId_fkey";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "chefId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "menuId",
ADD COLUMN     "dishId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Menu";

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Chef"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
