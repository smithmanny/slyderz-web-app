/*
  Warnings:

  - The values [ADD_PROFILE_DESCRIPTION,DONE] on the enum `OnboardingState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OnboardingState_new" AS ENUM ('SETUP_STRIPE', 'UPLOAD_HEADSHOT', 'COMPLETE_SERVSAFE');
ALTER TABLE "Chef" ALTER COLUMN "onboardingState" DROP DEFAULT;
ALTER TABLE "Chef" ALTER COLUMN "onboardingState" TYPE "OnboardingState_new" USING ("onboardingState"::text::"OnboardingState_new");
ALTER TYPE "OnboardingState" RENAME TO "OnboardingState_old";
ALTER TYPE "OnboardingState_new" RENAME TO "OnboardingState";
DROP TYPE "OnboardingState_old";
ALTER TABLE "Chef" ALTER COLUMN "onboardingState" SET DEFAULT 'SETUP_STRIPE';
COMMIT;
