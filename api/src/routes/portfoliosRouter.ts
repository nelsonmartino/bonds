import { Router } from 'express'
import {
  getPortfoliosHandler,
  postPortfolioHandler,
} from '../handlers/portfoliosHandlers'

const portfoliosRouter = Router()

portfoliosRouter.get('/', getPortfoliosHandler)
portfoliosRouter.post('/', postPortfolioHandler)

export default portfoliosRouter
