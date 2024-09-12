import { Router } from 'express'
import {
  getPortfoliosHandler,
  postPortfolioHandler,
} from '../handlers/portfoliosHandlers'
import { verifyToken } from '../middlewares/verifyToken'

const portfoliosRouter = Router()

portfoliosRouter.use(verifyToken)

portfoliosRouter.get('/', getPortfoliosHandler)
portfoliosRouter.post('/', postPortfolioHandler)

export default portfoliosRouter
