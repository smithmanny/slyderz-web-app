/*
  Warnings:

  - You are about to drop the column `emailVeried` on the `auth_session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth_session" DROP COLUMN "emailVeried",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;
