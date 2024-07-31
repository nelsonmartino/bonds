type Emitter = 'corp' | 'cbank' | 'treasury' | 'province'

type Category = 'hard' | 'cer' | 'badlar' | 'dlinked'

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

export interface BondErrors {
  tickerUSD: string
  tickerARG: string
  category: string
  emitter: string
  description: string
  dates: string
  amortization: string
  interests: string
}
