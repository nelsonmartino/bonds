/*
  Warnings:

  - Added the required column `duration` to the `Bond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedDuration` to the `Bond` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bond" ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "modifiedDuration" DOUBLE PRECISION NOT NULL;
