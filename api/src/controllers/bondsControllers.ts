import bondsEntries from '../../utils/bonds.json'
import {
  getCurrentPrice,
  getTPlusTir,
  setCashflow,
} from '../../utils/complements'
import { Bond, BondJson } from '../types'
import { PrismaClient } from '@prisma/client'
import cron from 'node-cron'

const prisma = new PrismaClient()

const bondsJson: BondJson[] = bondsEntries

export const getBonds = async () => {
  const bonds = await prisma.bond.findMany()
  return bonds
}

export const updateBonds = async (bonds: Bond[]) => {
  const updatedBonds = await prisma.$transaction(
    bonds.map((bo) =>
      prisma.bond.update({ where: { tickerUSD: bo.tickerUSD }, data: bo })
    )
  )
  return updatedBonds
}

export const getBondByTicker = async (ticker: string) => {
  const bond = await prisma.bond.findUnique({ where: { tickerUSD: ticker } })
  return bond
}

export const loadBonds = async () => {
  const existingBonds = (
    await prisma.bond.findMany({
      select: { tickerUSD: true },
    })
  ).map((item) => item.tickerUSD)

  const filteredBonds = bondsJson.filter(
    (bond) => !existingBonds.includes(bond.tickerUSD)
  )

  const formatedBonds = filteredBonds.map((bond) => {
    const {
      tickerUSD,
      tickerARG,
      category,
      dates,
      amortization,
      interests,
      priceUSD,
      priceARG,
      change,
      currentTir,
      duration,
      modifiedDuration,
    } = bond
    const formatedDates = dates.map((date) => {
      const formatedDate = new Date(date)
      return formatedDate
    })
    const newCashflow = setCashflow({ ...bond, dates: formatedDates })
    return {
      tickerUSD,
      tickerARG,
      category,
      dates: formatedDates,
      amortization,
      interests,
      cashflow: newCashflow,
      priceUSD,
      priceARG,
      change,
      currentTir,
      duration,
      modifiedDuration,
    }
  })
  const createBonds = await prisma.bond.createMany({ data: formatedBonds })
  await prisma.$disconnect()
  return createBonds
}

cron.schedule('0,30 10-16 * * 1-5', async () => {
  // cron.schedule('*/1 * * * 1-5', async () => {
  const bonds = await getBonds()

  const updatedPriceBonds = await getCurrentPrice(bonds)

  if (updatedPriceBonds) {
    const updatedTirBonds = await getTPlusTir(updatedPriceBonds, 1)

    if (updatedTirBonds) {
      await updateBonds(updatedTirBonds)
    }
  }
  console.log(new Date(), 'Info actualizada')
})
