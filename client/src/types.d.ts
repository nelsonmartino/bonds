type Emitter = 'corp' | 'cbank' | 'treasury' | 'province'

type Category = 'hard' | 'cer' | 'badlar' | 'dlinked'

export interface Bond {
  tickerUSD: string
  tickerARG: string
  category: Category
  emitter: Emitter
  description: string
  initialValue: number
  dates: string[]
  amortization: number[]
  interests: number[]
  amortCash: number[]
  interestCash: number[]
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

export interface BondErrors {
  tickerUSD: string
  tickerARG: string
  category: string
  emitter: string
  description: string
  initialValue: string
  dates: string
  amortization: string
  interests: string
}
