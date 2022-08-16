/*
  Warnings:

  - Added the required column `eventDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTime` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paymentMethodId" TEXT NOT NULL;
