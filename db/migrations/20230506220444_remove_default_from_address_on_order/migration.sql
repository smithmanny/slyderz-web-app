-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "address1" DROP DEFAULT,
ALTER COLUMN "address2" DROP DEFAULT,
ALTER COLUMN "city" DROP DEFAULT,
ALTER COLUMN "state" DROP DEFAULT,
ALTER COLUMN "zipcode" DROP DEFAULT;