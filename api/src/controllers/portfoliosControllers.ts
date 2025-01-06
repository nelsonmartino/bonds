import { PrismaClient } from '@prisma/client'
import { Portfolio } from '../types'

const prisma = new PrismaClient()

export const postPortfolio = async (portfolio: Portfolio) => {
  const { email, tickerARG, qty } = portfolio
  if (!email || !tickerARG || !qty) {
    throw Error('Missing information')
  }

  const existingPortfolio = await prisma.portfolio.findFirst({
    where: { bondTicker: tickerARG, userEmail: email },
  })

  if (!existingPortfolio) {
    await prisma.portfolio.create({
      data: { bondTicker: tickerARG, userEmail: email, qty },
    })
  } else {
    existingPortfolio.qty += qty
    await prisma.portfolio.update({
      where: { id: existingPortfolio.id },
      data: { qty: existingPortfolio.qty },
    })
  }

  const newPortfolio = await getPortfoliosByEmail(email)

  await prisma.$disconnect()
  return newPortfolio
}

export const getPortfoliosByEmail = async (userEmail: string) => {
  const portfolios = await prisma.portfolio.findMany({
    where: { userEmail },
    select: {
      qty: true,
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

export const deletePortfolio = async (email: string, tickerARG: string) => {
  if (!email || !tickerARG) {
    throw Error('Missing information')
  }

  const existingPortfolio = await prisma.portfolio.findFirst({
    where: { bondTicker: tickerARG, userEmail: email },
  })

  if (existingPortfolio) {
    await prisma.portfolio.delete({ where: { id: existingPortfolio.id } })
  } else {
    throw Error('Bond not found')
  }

  const newPortfolio = await getPortfoliosByEmail(email)

  await prisma.$disconnect()
  return newPortfolio
}
