import { Router } from 'express'

import {
  getHolidaysHandler,
  loadHolidaysHandler,
} from '../handlers/holidaysHandlers'

const holidaysRouter = Router()

holidaysRouter.get('/', getHolidaysHandler)
holidaysRouter.get('/load', loadHolidaysHandler)

export default holidaysRouter
