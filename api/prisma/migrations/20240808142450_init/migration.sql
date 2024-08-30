/*
  Warnings:

  - Added the required column `initialValue` to the `Bond` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bond" ADD COLUMN     "amortCash" DOUBLE PRECISION[],
ADD COLUMN     "initialValue" INTEGER NOT NULL,
ADD COLUMN     "interestCash" DOUBLE PRECISION[];
