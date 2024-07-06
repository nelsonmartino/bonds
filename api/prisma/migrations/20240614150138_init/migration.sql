/*
  Warnings:

  - Added the required column `category` to the `Bond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `change` to the `Bond` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bond" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "change" DOUBLE PRECISION NOT NULL;
