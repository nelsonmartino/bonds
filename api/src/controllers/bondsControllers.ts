// import axios from 'axios'
import bondsEntries from '../../utils/bonds.json'
import {
  getCurrentPrice,
  getTPlusTir,
  setAmortCash,
  setCashflow,
  setInterestCash,
} from '../../utils/complements'
import {
  // ApiAccess,
  Bond,
  BondForm,
  // BondJson,
  Emitter,
  // NOResponse,
} from '../types'
import { PrismaClient } from '@prisma/client'
import cron from 'node-cron'
// import qs from 'qs'

const prisma = new PrismaClient()

const bondsJson: BondForm[] = bondsEntries as BondForm[]

export const getBonds = async (emitter?: Emitter) => {
  //
  // const access = await axios.post<ApiAccess>(
  //   process.env.ACCESS_URL as string,
  //   qs.stringify({
  //     username: process.env.API_USERNAME,
  //     password: process.env.API_PASSWORD,
  //     grant_type: 'password',
  //   })
  // )

  // const { access_token } = access.data

  // console.log({ access_token })

  // const ons = await axios.get<NOResponse>(process.env.ONS_QUERY_URL as string, {
  //   headers: { Authorization: `Bearer ${access_token}` },
  // })

  // console.log(ons.data)

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
    const {
      tickerUSD,
      tickerARG,
      category,
      emitter,
      description,
      initialValue,
      dates,
      interests,
      amortization,
    } = bondJson
    const formatedDates = dates.map((date) => {
      const formatedDate = new Date(date)
      return formatedDate
    })

    const amortCash = setAmortCash(bondJson)

    const interestCash = setInterestCash(bondJson, formatedDates, amortCash)

    const bond: Bond = {
      tickerUSD,
      tickerARG,
      category,
      emitter,
      description,
      initialValue,
      interests,
      amortization,
      amortCash,
      interestCash,
      dates: formatedDates,
      cashflow: [],
      priceUSD: initialValue,
      priceARG: initialValue,
      change: 0,
      currentTir: 0,
      duration: 0,
      modifiedDuration: 0,
      parity: 0,
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
    initialValue,
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
    !initialValue ||
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

  const amortCash = setAmortCash(bondForm)

  const interestCash = setInterestCash(bondForm, formatedDates, amortCash)

  const bond: Bond = {
    tickerUSD,
    tickerARG,
    category,
    emitter,
    description,
    initialValue,
    interests,
    amortization,
    amortCash,
    interestCash,
    dates: formatedDates,
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

  const newCashflow = setCashflow(bond)

  const createBond = await prisma.bond.create({
    data: {
      ...bond,
      cashflow: newCashflow,
    },
  })
  await prisma.$disconnect()
  return createBond
}
cron.schedule('10,40 10-16 * * 1-5', async () => {
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
