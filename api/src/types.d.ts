type UserCategory = 'user' | 'admin'

export interface User {
  name: string
  surname: string
  email: string
  password: string
  category: UserCategory
}

export interface Bond {
  tickerUSD: string
  tickerARG: string
  category: string
  dates: Date[]
  amortization: number[]
  interests: number[]
  cashflow: number[]
  priceUSD: number
  priceARG: number
  change: number
  currentTir: number
  duration: number
  modifiedDuration: number
}

export interface BondJson {
  tickerUSD: string
  tickerARG: string
  category: string
  dates: string[]
  amortization: number[]
  interests: number[]
  cashflow: number[]
  priceUSD: number
  priceARG: number
  change: number
  currentTir: number
  duration: number
  modifiedDuration: number
}
