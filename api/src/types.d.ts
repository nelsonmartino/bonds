type UserCategory = 'user' | 'admin'

type Emitter = 'corp' | 'cbank' | 'treasury'

type Category = 'hard' | 'cer' | 'badlar'

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
  category: Category
  emitter: Emitter
  description: string
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
  parity: number
  createdAt: Date
  updatedAt: Date
}

export interface BondJson {
  tickerUSD: string
  tickerARG: string
  category: Category
  emitter: Emitter
  description: string
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
  parity: number
}
