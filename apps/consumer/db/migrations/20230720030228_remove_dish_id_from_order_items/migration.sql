/*
  Warnings:

  - You are about to drop the column `dishId` on the `OrderItems` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_dishId_fkey";

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "dishId";
