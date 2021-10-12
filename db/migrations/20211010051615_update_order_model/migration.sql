/*
  Warnings:

  - A unique constraint covering the columns `[confirmationNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order.confirmationNumber_unique" ON "Order"("confirmationNumber");
