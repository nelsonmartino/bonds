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
