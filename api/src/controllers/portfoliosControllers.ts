import { PrismaClient } from '@prisma/client'
import { Portfolio } from '../types'

const prisma = new PrismaClient()

export const postPortfolio = async (portfolio: Portfolio) => {
  const { email, tickerARG, qty } = portfolio
  // console.log(email, tickerARG)
  if (!email || !tickerARG || !qty) {
    throw Error('Missing information')
  }
  const newPortfolio = await prisma.portfolio.create({
    data: { bondTicker: tickerARG, userEmail: email, qty },
  })

  await prisma.$disconnect()
  return newPortfolio
}

export const getPortfoliosByEmail = async (userEmail: string) => {
  const portfolios = await prisma.portfolio.findMany({
    where: { userEmail },
    include: {
      bond: {
        select: {
          tickerUSD: true,
          tickerARG: true,
          category: true,
          emitter: true,
          description: true,
          priceUSD: true,
          priceARG: true,
          change: true,
          currentTir: true,
          duration: true,
          modifiedDuration: true,
          parity: true,
        },
      },
    },
  })
  return portfolios
}
