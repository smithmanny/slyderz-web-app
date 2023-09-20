/*
  Warnings:

  - You are about to drop the column `expires` on the `auth_key` table. All the data in the column will be lost.
  - You are about to drop the column `primary_key` on the `auth_key` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth_key" DROP COLUMN "expires",
DROP COLUMN "primary_key";

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
