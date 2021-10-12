-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "confirmationNumber" TEXT NOT NULL,
    "orderConfirmed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Order" ("confirmationNumber", "createdAt", "id", "orderConfirmed", "updatedAt") SELECT "confirmationNumber", "createdAt", "id", "orderConfirmed", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order.confirmationNumber_unique" ON "Order"("confirmationNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
