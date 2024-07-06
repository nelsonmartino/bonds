import { Router } from 'express'
import { getUsersHandler } from '../handlers/usersHandlers'

const usersRouter = Router()

usersRouter.get('/', getUsersHandler)

export default usersRouter
