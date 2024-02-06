/*
  Warnings:

  - You are about to drop the `CloudinaryPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CloudinaryPhoto" DROP CONSTRAINT "CloudinaryPhoto_dishId_fkey";

-- DropForeignKey
ALTER TABLE "CloudinaryPhoto" DROP CONSTRAINT "CloudinaryPhoto_userId_fkey";

-- DropTable
DROP TABLE "CloudinaryPhoto";

-- CreateTable
CREATE TABLE "UserPhoto" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imagePublicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishPhoto" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imagePublicId" TEXT NOT NULL,
    "dishId" TEXT,

    CONSTRAINT "DishPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPhoto_id_key" ON "UserPhoto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhoto_imagePublicId_key" ON "UserPhoto"("imagePublicId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhoto_userId_key" ON "UserPhoto"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DishPhoto_id_key" ON "DishPhoto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DishPhoto_imagePublicId_key" ON "DishPhoto"("imagePublicId");

-- AddForeignKey
ALTER TABLE "UserPhoto" ADD CONSTRAINT "UserPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishPhoto" ADD CONSTRAINT "DishPhoto_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
