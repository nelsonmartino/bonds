import { Router } from 'express'
import { getUsersHandler, loadUsersHandler } from '../handlers/usersHandlers'
import { verifyToken } from '../middlewares/verifyToken'

const usersRouter = Router()

usersRouter.get('/', verifyToken, getUsersHandler)
usersRouter.get('/load', loadUsersHandler)

export default usersRouter
