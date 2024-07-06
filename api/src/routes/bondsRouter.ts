import { Router } from 'express'
import { getBondsHandler, loadBondsHandler } from '../handlers/bondsHandlers'

const bondsRouter = Router()

bondsRouter.get('/', getBondsHandler)
bondsRouter.get('/load', loadBondsHandler)

export default bondsRouter
