type UserCategory = 'user' | 'admin'

type Emitter = 'corp' | 'cbank' | 'treasury' | 'province'

type Category = 'hard' | 'cer' | 'badlar' | 'dlinked'

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

export type BondForm = Omit<
  Bond,
  | 'cashflow'
  | 'priceUSD'
  | 'priceARG'
  | 'change'
  | 'currentTir'
  | 'duration'
  | 'modifiedDuration'
  | 'parity'
  | 'createdAt'
  | 'updatedAt'
>

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
