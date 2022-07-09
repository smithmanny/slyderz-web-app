/*
  Warnings:

  - A unique constraint covering the columns `[daysOfWeek]` on the table `Hours` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Hours_chefId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Hours_daysOfWeek_key" ON "Hours"("daysOfWeek");
