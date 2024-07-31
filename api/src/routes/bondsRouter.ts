import { Router } from 'express'
import {
  getBondsHandler,
  loadBondsHandler,
  postBondHandler,
} from '../handlers/bondsHandlers'

const bondsRouter = Router()

bondsRouter.get('/', getBondsHandler)
bondsRouter.get('/load', loadBondsHandler)
bondsRouter.post('/create', postBondHandler)

export default bondsRouter
