import { Bond, BondErrors } from '../types'

export const validate = (form: Partial<Bond>) => {
  const errors: Partial<BondErrors> = {}
  if (form.tickerUSD) {
    if (form.tickerUSD === '') {
      errors.tickerUSD = 'Ticker USD cannot be null'
    }
    for (const char of form.tickerUSD) {
      if (char === ' ') {
        errors.tickerUSD = 'Ticker USD cannot have blank spaces'
      }
    }
    if (form.tickerUSD.length > 10) {
      errors.tickerUSD = 'Ticker USD can have 10 characters maximum'
    }
    if (form.tickerUSD !== form.tickerUSD.toUpperCase()) {
      errors.tickerUSD = 'Ticker USD only with capital letters'
    }
  }
  if (form.tickerARG) {
    if (form.tickerARG === '') {
      errors.tickerARG = 'Ticker ARG cannot be null'
    }
    for (const char of form.tickerARG) {
      if (char === ' ') {
        errors.tickerARG = 'Ticker ARG cannot have blank spaces'
      }
    }
    if (form.tickerARG.length > 10) {
      errors.tickerARG = 'Ticker ARG can have 10 characters maximum'
    }
    if (form.tickerARG !== form.tickerARG.toUpperCase()) {
      errors.tickerARG = 'Ticker ARG only with capital letters'
    }
  }
  if (form.interests?.length) {
    form.interests.map((interest) => {
      if (interest > 100 || interest < 0) {
        errors.interests = 'Interests have to be between 0 and 100'
      }
    })
  }
  if (form.amortization?.length) {
    form.amortization.map((amort) => {
      if (amort > 100 || amort < 0) {
        errors.amortization = 'Amortization values have to be between 0 and 100'
      }
    })
    const total = form.amortization.reduce((accu, amort) => amort + accu, 0)
    if (total !== 100) {
      errors.amortization = 'Total amortization must be 100'
    }
  }
  if (form.description) {
    if (form.description !== form.description.toUpperCase()) {
      errors.description = 'Description only with capital letters'
    }
    if (form.description.length > 50) {
      errors.description = 'Description can have 50 characters maximum'
    }
  }
  if (form.dates?.length) {
    for (let i = 1; i < form.dates.length; i++) {
      if (form.dates[i - 1].getTime() > form.dates[i].getTime()) {
        errors.dates = 'Dates have to be incremental, from oldest to newest'
      }
    }
    const range =
      (form.dates[form.dates.length - 1].getTime() - form.dates[0].getTime()) /
      (24 * 3600 * 1000 * 365)
    if (range > 100) {
      errors.dates = 'Please verify dates total range. It is over 100 years'
    }
    form.dates.map((date, index) => {
      if (
        date.getUTCFullYear() < 2000 ||
        date.getUTCFullYear() > 2200 ||
        isNaN(date.getUTCFullYear())
      ) {
        if (index) {
          errors.dates = `Please verify date in event ${index}`
        } else {
          errors.dates = `Please verify emmision date`
        }
      }
    })
  }
  return errors
}
