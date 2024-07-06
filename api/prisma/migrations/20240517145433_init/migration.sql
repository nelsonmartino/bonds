/*
  Warnings:

  - You are about to drop the column `current_price` on the `Bond` table. All the data in the column will be lost.
  - Added the required column `currentPrice` to the `Bond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentTir` to the `Bond` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bond" DROP COLUMN "current_price",
ADD COLUMN     "currentPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currentTir" DOUBLE PRECISION NOT NULL;
