import { Request, Response } from 'express'
import {
  postPortfolio,
  getPortfoliosByEmail,
  deletePortfolio,
  getCashflowByEmail,
} from '../controllers/portfoliosControllers'
import { Portfolio } from '../types'

export const getPortfoliosHandler = async (
  req: Request<{}, {}, {}, { email: string }>,
  res: Response
) => {
  const { email } = req.query
  try {
    if (email) {
      const userPortfolio = await getPortfoliosByEmail(email)
      res.status(200).json(userPortfolio)
    } else {
      res.status(400).json({ message: 'Email not provided' })
    }
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

export const postPortfolioHandler = async (
  req: Request<{}, {}, Portfolio, {}>,
  res: Response
) => {
  const { email, tickerARG, qty } = req.body
  try {
    const newPortfolio = await postPortfolio({ email, tickerARG, qty })
    res.status(200).json(newPortfolio)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deletePortfolioHandler = async (
  req: Request<{}, {}, { email: string; tickerARG: string }, {}>,
  res: Response
) => {
  const { email, tickerARG } = req.body
  try {
    const newPortfolio = await deletePortfolio(email, tickerARG)
    res.status(200).json(newPortfolio)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getCashflowHandler = async (
  req: Request<{}, {}, {}, { email: string }>,
  res: Response
) => {
  const { email } = req.query
  try {
    if (email) {
      const userCashflow = await getCashflowByEmail(email)
      res.status(200).json(userCashflow)
    } else {
      res.status(400).json({ message: 'Email not provided' })
    }
  } catch (error) {
    res.status(400).json({ message: error })
  }
}
