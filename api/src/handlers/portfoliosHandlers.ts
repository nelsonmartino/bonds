import { Request, Response } from 'express'
import {
  postPortfolio,
  getPortfoliosByEmail,
} from '../controllers/portfoliosControllers'
import { Portfolio } from '../types'

export const getPortfoliosHandler = async (
  req: Request<{}, {}, {}, { email: string }>,
  res: Response
) => {
  const { email } = req.query
  try {
    const userPortfolio = await getPortfoliosByEmail(email)
    res.status(200).json(userPortfolio)
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
