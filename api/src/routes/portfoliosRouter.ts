import { Router } from 'express'
import {
  deletePortfolioHandler,
  getPortfoliosHandler,
  postPortfolioHandler,
} from '../handlers/portfoliosHandlers'
import { verifyToken } from '../middlewares/verifyToken'

const portfoliosRouter = Router()

portfoliosRouter.use(verifyToken)

portfoliosRouter.get('/', getPortfoliosHandler)
portfoliosRouter.post('/', postPortfolioHandler)
portfoliosRouter.delete('/', deletePortfolioHandler)

export default portfoliosRouter
