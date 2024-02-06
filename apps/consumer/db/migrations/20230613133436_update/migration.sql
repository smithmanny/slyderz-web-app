-- DropForeignKey
ALTER TABLE "CloudinaryPhoto" DROP CONSTRAINT "CloudinaryPhoto_dishId_fkey";

-- AddForeignKey
ALTER TABLE "CloudinaryPhoto" ADD CONSTRAINT "CloudinaryPhoto_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
