/*
  Warnings:

  - Made the column `headshotUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "headhshotPublicId" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "headshotUrl" SET NOT NULL,
ALTER COLUMN "headshotUrl" SET DEFAULT '';
