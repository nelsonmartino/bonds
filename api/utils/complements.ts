import puppeteer from 'puppeteer'
import { ApiAccess, Bond, ApiResponse, BondForm } from '../src/types'
import { getHolidays } from '../src/controllers/holidaysControllers'
const Finance = require('financejs')
import qs from 'qs'
import axios from 'axios'

// export function decimalRound(number: number, decimals: number) {
//   const numberRegexp = new RegExp('\\d\\.(\\d){' + decimals + ',}') // Expresion regular para numeros con un cierto numero de decimales o mas
//   if (numberRegexp.test(number.toString())) {
//     // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
//     return Number(number.toFixed(decimals))
//   } else {
//     return Number(number.toFixed(decimals)) === 0 ? 0 : number // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
//   }
// }

export function dateDiff360(oldDate: Date, newDate: Date) {
  let oldDay: number, newDay: number
  const testOldDate = new Date(oldDate)
  testOldDate.setUTCDate(oldDate.getUTCDate() + 1)
  if (oldDate.getUTCMonth() !== testOldDate.getUTCMonth()) {
    oldDay = 30
  } else {
    oldDay = oldDate.getUTCDate()
  }
  const testNewDate = new Date(newDate)
  testNewDate.setUTCDate(newDate.getUTCDate() + 1)
  if (
    oldDay === 30 &&
    newDate.getUTCMonth() !== testNewDate.getUTCMonth() &&
    newDate.getDate() >= 30
  ) {
    newDay = 30
  } else {
    newDay = newDate.getUTCDate()
  }
  const yearDiff = newDate.getUTCFullYear() - oldDate.getUTCFullYear()
  const monthDiff = newDate.getUTCMonth() - oldDate.getUTCMonth()
  const dayDiff = newDay - oldDay
  const days = yearDiff * 360 + monthDiff * 30 + dayDiff
  return days
}

export async function getWebData(ticker: string) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  })
  const page = await browser.newPage()
  await page.goto(`https://bonos.ecovalores.com.ar/eco/ticker.php?t=${ticker}`)
  const result = await page.evaluate(() => {
    const obj = document.querySelector('.precioticker') as HTMLElement
    if (!obj) return 0
    const value = obj.innerText
    return Number(value.replace('.', '').replace(',', '.'))
  })
  await browser.close()
  return result
}

// Finds T + plus working day
export const datePlus = async (date: Date, plus: number) => {
  const holidays = await getHolidays()
  const stringHolidays = holidays.map((item) => item.toISOString().slice(0, 10))
  let count = -1
  while (count) {
    if (
      date.getUTCDay() !== 0 &&
      date.getUTCDay() !== 6 &&
      !stringHolidays.find((hol) => hol === date.toISOString().slice(0, 10))
    ) {
      count = 0
    } else {
      date.setDate(date.getDate() + 1)
    }
  }
  while (count < plus) {
    date.setDate(date.getDate() + 1)
    if (
      date.getUTCDay() !== 0 &&
      date.getUTCDay() !== 6 &&
      !stringHolidays.find((hol) => hol === date.toISOString().slice(0, 10))
    ) {
      count += 1
    }
  }
  return date
}

// export const getTPlusTir = async (bonds: Bond[], plus: number) => {
//   const tPlusDate = await datePlus(new Date(), plus)
//   const finance = new Finance()
//   const updatedBonds = bonds.map((bond) => {
//     const { dates, cashflow, priceUSD } = bond

//     // Set as first item in date array the current date
//     const activeDates = [tPlusDate]

//     // Complete only with future dates the activeDates array
//     dates.forEach((date) => {
//       if (new Date(date).getTime() > tPlusDate.getTime()) {
//         activeDates.push(date)
//       }
//     })

//     // Get unit cashflow
//     // const cash = cashflow.map((x) => x / 100)

//     // Slice cash array only for future flow
//     const formatedCash = cashflow.slice(-(activeDates.length - 1))

//     // Add current price as first (and negative) element in cash flow
//     formatedCash.unshift(-Number(priceUSD.toFixed(2)))

//     //Calculate TIR
//     bond.currentTir = finance.XIRR(formatedCash, activeDates)

//     // // Calculate Duration

//     const activePeriods: number[] = []

//     activeDates.forEach((activePeriod, index) => {
//       if (index) {
//         activePeriods.push(dateDiff360(activeDates[0], activePeriod) / 360)
//       }
//     })

//     const presentFlow = activePeriods.map(
//       (period, index) =>
//         (period * formatedCash[index + 1]) /
//         (1 + bond.currentTir / 100) ** period
//     )

//     bond.duration = Number(
//       (
//         presentFlow.reduce((flow, accu) => flow + accu, 0) / bond.priceUSD
//       ).toFixed(2)
//     )

//     // Calculate Modified Duration

//     bond.modifiedDuration = Number(
//       (bond.duration / (1 + bond.currentTir / 100)).toFixed(2)
//     )

//     // Calculate Exchange

//     bond.change = Number((bond.priceARG / bond.priceUSD).toFixed(2))

//     // Calculate parity

//     const pastAmortization = bond.amortization.slice(
//       0,
//       dates.length - activeDates.length
//     )

//     const resValue =
//       bond.amortization.reduce((accu, x) => x + accu) -
//       pastAmortization.reduce((accu, x) => x + accu, 0)

//     const dirtyPrice =
//       resValue *
//       (1 +
//         ((dateDiff360(dates[dates.length - activeDates.length], tPlusDate) /
//           360) *
//           bond.interests[dates.length - activeDates.length]) /
//           100)

//     bond.parity = Number(((priceUSD / dirtyPrice) * 100).toFixed(2))

//     bond.updatedAt = new Date()

//     return bond
//   })

//   return updatedBonds
// }

export const getTPlusTir = async (bonds: Bond[], plus: number) => {
  const tPlusDate = await datePlus(new Date(), plus)
  const finance = new Finance()
  for (const bond of bonds) {
    const { dates, cashflow, priceUSD } = bond

    // Set as first item in date array the current date
    const activeDates = [tPlusDate]

    // Complete only with future dates the activeDates array
    dates.forEach((date) => {
      if (new Date(date).getTime() > tPlusDate.getTime()) {
        activeDates.push(date)
      }
    })

    // Get unit cashflow
    // const cash = cashflow.map((x) => x / 100)

    // Slice cash array only for future flow
    const formatedCash = cashflow.slice(-(activeDates.length - 1))

    // Add current price as first (and negative) element in cash flow
    formatedCash.unshift(-Math.round(priceUSD * 100) / 100)

    //Calculate TIR
    bond.currentTir = finance.XIRR(formatedCash, activeDates)

    // Calculate Duration

    const activePeriods: number[] = []

    activeDates.forEach((activePeriod, index) => {
      if (index) {
        activePeriods.push(dateDiff360(activeDates[0], activePeriod) / 360)
      }
    })

    const presentFlow = activePeriods.map(
      (period, index) =>
        (period * formatedCash[index + 1]) /
        (1 + bond.currentTir / 100) ** period
    )

    bond.duration =
      Math.round(
        (presentFlow.reduce((flow, accu) => flow + accu, 0) / bond.priceUSD) *
          100
      ) / 100

    // Calculate Modified Duration

    bond.modifiedDuration =
      Math.round((bond.duration / (1 + bond.currentTir / 100)) * 100) / 100

    // Calculate Exchange

    bond.change = Math.round((bond.priceARG / bond.priceUSD) * 100) / 100

    // Calculate parity

    const pastAmortization = bond.amortization.slice(
      0,
      dates.length - activeDates.length
    )

    const resValue =
      bond.amortization.reduce((accu, x) => x + accu) -
      pastAmortization.reduce((accu, x) => x + accu, 0)

    const dirtyPrice =
      resValue *
      (1 +
        ((dateDiff360(dates[dates.length - activeDates.length], tPlusDate) /
          360) *
          bond.interests[dates.length - activeDates.length]) /
          100)

    bond.parity = Math.round((priceUSD / dirtyPrice) * 100 * 100) / 100

    Math.round((priceUSD / dirtyPrice) * 100 * 100) / 100

    bond.updatedAt = new Date()
  }

  return bonds
}

export const setAmortCash = (bond: BondForm) => {
  const { amortization, initialValue } = bond
  const amortCash = amortization.map((x) => Math.round(x * initialValue) / 100)
  return amortCash
}

export const setInterestCash = (
  bond: BondForm,
  formatedDates: Date[],
  amortCash: number[]
) => {
  const { interests } = bond

  const interestCash = interests.map((interest, index) => {
    const days = dateDiff360(formatedDates[index], formatedDates[index + 1])

    const restCapital = amortCash
      .slice(index)
      .reduce((amort, accu) => amort + accu)
    const cashInt = (((interest / 100) * days) / 360) * restCapital
    return Math.round(cashInt * 100) / 100
  })

  return interestCash
}

export const setCashflow = (bond: Bond) => {
  const { dates, amortization, interests } = bond

  const cashflow = interests.map((interest, index) => {
    const days = dateDiff360(dates[index], dates[index + 1])

    const restCapital = amortization
      .slice(index)
      .reduce((amort, accu) => amort + accu)
    const cashInt = (((interest / 100) * days) / 360) * restCapital
    return Math.round((cashInt + amortization[index]) * 100) / 100
  })

  return cashflow
}

export const getCurrentPrice = async (bonds: Bond[]) => {
  try {
    const access = await axios.post<ApiAccess>(
      process.env.ACCESS_URL as string,
      qs.stringify({
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
        grant_type: 'password',
      })
    )

    const { access_token } = access.data

    const ons = await axios.get<ApiResponse>(
      process.env.ONS_QUERY_URL as string,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    )

    const publicBonds = await axios.get<ApiResponse>(
      process.env.PUBLIC_QUERY_URL as string,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    )

    bonds.forEach((bond) => {
      if (bond.emitter === 'corp') {
        const priceARG = ons.data.titulos.find(
          (x) => x.simbolo === bond.tickerARG
        )?.ultimoPrecio
        if (priceARG) bond.priceARG = priceARG

        const priceUSD = ons.data.titulos.find(
          (x) => x.simbolo === bond.tickerUSD
        )?.ultimoPrecio
        if (priceUSD) bond.priceUSD = priceUSD
      } else {
        const priceARG = publicBonds.data.titulos.find(
          (x) => x.simbolo === bond.tickerARG
        )?.ultimoPrecio
        if (priceARG) bond.priceARG = priceARG

        const priceUSD = publicBonds.data.titulos.find(
          (x) => x.simbolo === bond.tickerUSD
        )?.ultimoPrecio
        if (priceUSD) bond.priceUSD = priceUSD
      }
    })

    return bonds
  } catch (error) {
    console.error(error)
  }
}
// export const getCurrentPrice = async (bonds: Bond[]) => {
//   try {
//     const tickers = bonds.map((bond) => [bond.tickerUSD, bond.tickerARG]).flat()
//     const queries = tickers.map((ticker) => getWebData(ticker))
//     const results = await Promise.allSettled(queries)
//     results.forEach((result, index) => {
//       if (result.status === 'fulfilled') {
//         const bond = bonds.find((bo) => bo.tickerUSD === tickers[index])

//         if (!bond) {
//           const bond = bonds.find((bo) => bo.tickerARG === tickers[index])
//           if (!bond) {
//             return 0
//           } else {
//             bond.priceARG = result.value
//           }
//         } else {
//           bond.priceUSD = result.value
//         }
//       }
//     })
//     return bonds
//   } catch (error) {
//     console.error(error)
//   }
// }
