-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address1" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "address2" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "zipcode" TEXT NOT NULL DEFAULT '';