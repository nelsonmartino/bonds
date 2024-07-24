/*
  Warnings:

  - Added the required column `description` to the `Bond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emitter` to the `Bond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parity` to the `Bond` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Bond` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Emitter" AS ENUM ('corp', 'cbank', 'treasury');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('hard', 'cer', 'badlar');

-- AlterTable
ALTER TABLE "Bond" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "emitter" "Emitter" NOT NULL,
ADD COLUMN     "parity" DOUBLE PRECISION NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
