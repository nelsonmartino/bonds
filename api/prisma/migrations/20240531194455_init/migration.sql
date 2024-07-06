/*
  Warnings:

  - You are about to drop the column `currentPrice` on the `Bond` table. All the data in the column will be lost.
  - Added the required column `priceARG` to the `Bond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceUSD` to the `Bond` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bond" DROP COLUMN "currentPrice",
ADD COLUMN     "priceARG" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceUSD" DOUBLE PRECISION NOT NULL;
