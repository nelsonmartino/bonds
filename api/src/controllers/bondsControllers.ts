import bondsEntries from '../../utils/bonds.json'
import {
  getCurrentPrice,
  getTPlusTir,
  setCashflow,
} from '../../utils/complements'
import { Bond, BondForm, BondJson, Emitter } from '../types'
import { PrismaClient } from '@prisma/client'
import cron from 'node-cron'

const prisma = new PrismaClient()

const bondsJson: BondJson[] = bondsEntries as BondJson[]

export const getBonds = async (emitter?: Emitter) => {
  if (emitter) {
    const bonds = await prisma.bond.findMany({ where: { emitter } })
    return bonds
  }
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

  const formatedBonds = filteredBonds.map((bondJson) => {
    const { dates } = bondJson
    const formatedDates = dates.map((date) => {
      const formatedDate = new Date(date)
      return formatedDate
    })
    const bond: Bond = {
      ...bondJson,
      dates: formatedDates,
      updatedAt: new Date(),
      createdAt: new Date(),
    }
    const newCashflow = setCashflow(bond)
    return {
      ...bond,
      cashflow: newCashflow,
    }
  })
  const createBonds = await prisma.bond.createMany({ data: formatedBonds })
  await prisma.$disconnect()
  return createBonds
}

export const postBond = async (bondForm: BondForm) => {
  const {
    tickerUSD,
    tickerARG,
    category,
    emitter,
    description,
    dates,
    interests,
    amortization,
  } = bondForm

  if (
    !tickerUSD ||
    !tickerARG ||
    !category ||
    !emitter ||
    !description ||
    !dates ||
    !interests ||
    !amortization
  ) {
    throw Error('Missing information')
  }

  const formatedDates = dates.map((date) => {
    const formatedDate = new Date(date)
    return formatedDate
  })

  const bond: Bond = {
    ...bondForm,
    cashflow: [],
    priceUSD: 0,
    priceARG: 0,
    change: 0,
    currentTir: 0,
    duration: 0,
    modifiedDuration: 0,
    parity: 0,
    updatedAt: new Date(),
    createdAt: new Date(),
  }

  const newCashflow = setCashflow({
    ...bond,
    dates: formatedDates,
  })

  const createBond = await prisma.bond.create({
    data: {
      ...bond,
      cashflow: newCashflow,
    },
  })
  await prisma.$disconnect()
  return createBond
}
cron.schedule('0,30 10-16 * * 1-5', async () => {
  // cron.schedule('*/2 * * * 1-5', async () => {
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
