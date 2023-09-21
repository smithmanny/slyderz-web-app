-- AlterTable
ALTER TABLE "auth_session" ADD COLUMN     "role" "RoleType" NOT NULL DEFAULT 'USER';
