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

export interface UserForm {
  email: string
  password: string
}

export interface Bond {
  tickerUSD: string
  tickerARG: string
  category: Category
  emitter: Emitter
  description: string
  initialValue: number
  dates: Date[]
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

export interface BondForm {
  tickerUSD: string
  tickerARG: string
  category: Category
  emitter: Emitter
  description: string
  initialValue: number
  dates: string[]
  amortization: number[]
  interests: number[]
}

// export interface BondJson {
//   tickerUSD: string
//   tickerARG: string
//   category: Category
//   emitter: Emitter
//   description: string
//   dates: string[]
//   amortization: number[]
//   interests: number[]
//   cashflow: number[]
//   priceUSD: number
//   priceARG: number
//   change: number
//   currentTir: number
//   duration: number
//   modifiedDuration: number
//   parity: number
// }

export interface ApiAccess {
  access_token: string
  refresh_token: string
  '.expires': string
  '.refreshexpires': string
}

export interface ApiResponse {
  titulos: NegotiableObligation[]
}

interface NegotiableObligation {
  simbolo: string
  ultimoPrecio: number
  variacionPorcentual: number
  apertura: number
  maximo: number
  minimo: number
  ultimoCierre: number
  volumen: number
}

export interface Portfolio {
  email: string
  tickerARG: string
  qty: number
}
