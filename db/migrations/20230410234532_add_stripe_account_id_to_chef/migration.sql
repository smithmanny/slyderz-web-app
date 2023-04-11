/*
  Warnings:

  - Added the required column `stripeAccountId` to the `Chef` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chef" ADD COLUMN     "stripeAccountId" TEXT NOT NULL;
