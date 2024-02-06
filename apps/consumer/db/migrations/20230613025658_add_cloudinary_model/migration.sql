/*
  Warnings:

  - You are about to drop the column `image` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `imagePublicId` on the `auth_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth_user" DROP COLUMN "image",
DROP COLUMN "imagePublicId";

-- CreateTable
CREATE TABLE "CloudinaryPhoto" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imagePublicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dishId" TEXT,

    CONSTRAINT "CloudinaryPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CloudinaryPhoto_id_key" ON "CloudinaryPhoto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CloudinaryPhoto_imagePublicId_key" ON "CloudinaryPhoto"("imagePublicId");

-- CreateIndex
CREATE UNIQUE INDEX "CloudinaryPhoto_userId_key" ON "CloudinaryPhoto"("userId");

-- AddForeignKey
ALTER TABLE "CloudinaryPhoto" ADD CONSTRAINT "CloudinaryPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloudinaryPhoto" ADD CONSTRAINT "CloudinaryPhoto_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;
