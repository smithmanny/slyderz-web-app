/*
  Warnings:

  - You are about to drop the column `orderConfirmed` on the `Order` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chefId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderConfirmed",
ADD COLUMN     "amount" TEXT NOT NULL,
ADD COLUMN     "chefId" INTEGER NOT NULL,
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT E'PENDING';

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Chef"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
