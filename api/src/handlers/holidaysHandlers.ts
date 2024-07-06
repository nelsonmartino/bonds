import { Request, Response } from 'express'

import { getHolidays, loadHolidays } from '../controllers/holidaysControllers'

export const getHolidaysHandler = async (_req: Request, res: Response) => {
  try {
    const holidays = await getHolidays()
    res.status(200).json(holidays)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const loadHolidaysHandler = async (_req: Request, res: Response) => {
  try {
    const loadedHolidays = await loadHolidays()
    res.status(200).json(loadedHolidays)
  } catch (error) {
    res.status(400).json(error)
  }
}
