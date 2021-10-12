/*
  Warnings:

  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "confirmationNumber" TEXT NOT NULL,
    "orderConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("confirmationNumber", "createdAt", "id", "orderConfirmed", "updatedAt") SELECT "confirmationNumber", "createdAt", "id", "orderConfirmed", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order.confirmationNumber_unique" ON "Order"("confirmationNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
