/*
  Warnings:

  - You are about to drop the column `cartId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,userId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cartId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropIndex
DROP INDEX "Order_cartId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cartId";

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "cartId",
ADD COLUMN     "orderId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Token";

-- DropEnum
DROP TYPE "TokenType";

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_userId_key" ON "Order"("id", "userId");

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
