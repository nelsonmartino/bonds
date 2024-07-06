-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "category" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bond" (
    "tickerUSD" TEXT NOT NULL,
    "tickerARG" TEXT NOT NULL,
    "dates" TEXT[],
    "amortization" DOUBLE PRECISION[],
    "interests" DOUBLE PRECISION[],
    "cashflow" DOUBLE PRECISION[],
    "current_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Bond_pkey" PRIMARY KEY ("tickerUSD")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "bondTicker" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bond_tickerARG_key" ON "Bond"("tickerARG");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_bondTicker_fkey" FOREIGN KEY ("bondTicker") REFERENCES "Bond"("tickerUSD") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
