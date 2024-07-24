type Emitter = 'corp' | 'cbank' | 'treasury'

type Category = 'hard' | 'cer' | 'badlar'

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
