/*
  Warnings:

  - The `dates` column on the `Bond` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bond" DROP COLUMN "dates",
ADD COLUMN     "dates" TIMESTAMP(3)[];
