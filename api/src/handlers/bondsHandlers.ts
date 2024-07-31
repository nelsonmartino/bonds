import { Request, Response } from 'express'
import {
  getBonds,
  getBondByTicker,
  loadBonds,
  postBond,
} from '../controllers/bondsControllers'
import { Emitter } from '../types'

export const getBondsHandler = async (req: Request, res: Response) => {
  try {
    const { ticker, emitter } = req.query

    if (ticker) {
      const bond = await getBondByTicker(ticker as string)
      if (bond) {
        return res.status(200).json(bond)
      }
      return res.status(400).send('Bond not found')
    }

    if (emitter) {
      const bonds = await getBonds(emitter as Emitter)
      if (bonds) {
        return res.status(200).json(bonds)
      }
      return res.status(400).send('Bonds not found')
    }

    const bonds = await getBonds()
    res.status(200).json(bonds)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const postBondHandler = async (req: Request, res: Response) => {
  const bond = req.body
  try {
    const createBond = await postBond(bond)
    res.status(200).json(createBond)
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
