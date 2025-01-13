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
  if (userEmail) {
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
            dates: true,
            cashflow: true,
          },
        },
      },
    })
    return portfolios
  } else {
    throw Error('Email not provided')
  }
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

export const getCashflowByEmail = async (userEmail: string) => {
  const portfolios = await getPortfoliosByEmail(userEmail)
  const rawCashflow = portfolios.map((portfolio) => {
    const totalCashflow = portfolio.bond.cashflow.map(
      (x) => Math.round(x * portfolio.qty) / 100
    )
    portfolio.bond.tickerARG
    const cashflowInfo = totalCashflow.map((eventCashflow, index) => {
      return {
        tickerARG: portfolio.bond.tickerARG,
        date: portfolio.bond.dates[index + 1],
        eventCashflow,
      }
    })
    return cashflowInfo
  })
  return rawCashflow.flat().sort((a, b) => a.date.getTime() - b.date.getTime())
}
