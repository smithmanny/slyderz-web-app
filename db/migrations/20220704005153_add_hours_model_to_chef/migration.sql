-- CreateTable
CREATE TABLE "Hours" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mondayStartTime" TIMESTAMP(3) NOT NULL,
    "mondayEndTime" TIMESTAMP(3) NOT NULL,
    "tuesdayStartTime" TIMESTAMP(3) NOT NULL,
    "tuesdayEndTime" TIMESTAMP(3) NOT NULL,
    "wednesdayStartTime" TIMESTAMP(3) NOT NULL,
    "wednesdayEndTime" TIMESTAMP(3) NOT NULL,
    "thursdayStartTime" TIMESTAMP(3) NOT NULL,
    "thursdayEndTime" TIMESTAMP(3) NOT NULL,
    "fridayStartTime" TIMESTAMP(3) NOT NULL,
    "fridayEndTime" TIMESTAMP(3) NOT NULL,
    "saturdayStartTime" TIMESTAMP(3) NOT NULL,
    "saturdayEndTime" TIMESTAMP(3) NOT NULL,
    "sundayStartTime" TIMESTAMP(3) NOT NULL,
    "sundayEndTime" TIMESTAMP(3) NOT NULL,
    "chefId" INTEGER NOT NULL,

    CONSTRAINT "Hours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hours_chefId_key" ON "Hours"("chefId");

-- AddForeignKey
ALTER TABLE "Hours" ADD CONSTRAINT "Hours_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Chef"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
