-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_chefId_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Hours" DROP CONSTRAINT "Hours_chefId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_chefId_fkey";

-- AddForeignKey
ALTER TABLE "Hours" ADD CONSTRAINT "Hours_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Chef"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Chef"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Chef"("id") ON DELETE CASCADE ON UPDATE CASCADE;
