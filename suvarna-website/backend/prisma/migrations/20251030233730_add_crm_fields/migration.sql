-- AlterTable
ALTER TABLE "Activity" ADD COLUMN "nextFollowUp" DATETIME;
ALTER TABLE "Activity" ADD COLUMN "rating" INTEGER;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "annualConsumption" REAL;
ALTER TABLE "Lead" ADD COLUMN "companySize" TEXT;
ALTER TABLE "Lead" ADD COLUMN "industry" TEXT;
ALTER TABLE "Lead" ADD COLUMN "website" TEXT;
