import { Request, Response } from 'express'
import {
  getBonds,
  getBondByTicker,
  loadBonds,
} from '../controllers/bondsControllers'

export const getBondsHandler = async (req: Request, res: Response) => {
  try {
    const { ticker } = req.query

    if (ticker) {
      const bond = await getBondByTicker(ticker as string)
      if (bond) {
        return res.status(200).json(bond)
      }
      return res.status(400).send('Bond not found')
    }

    const bonds = await getBonds()
    res.status(200).json(bonds)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const loadBondsHandler = async (_req: Request, res: Response) => {
  try {
    const createBonds = await loadBonds()
    res.status(200).json(createBonds)
  } catch (error) {
    res.status(400).json(error)
  }
}
