-- AlterTable
ALTER TABLE "auth_session" ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emailVeried" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "stripeCustomerId" TEXT NOT NULL DEFAULT '';
