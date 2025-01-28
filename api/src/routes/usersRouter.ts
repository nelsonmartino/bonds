import { Router } from 'express'
import {
  getUsersHandler,
  loadUsersHandler,
  postUserHandler,
} from '../handlers/usersHandlers'
import { verifyToken } from '../middlewares/verifyToken'

const usersRouter = Router()

usersRouter.get('/', verifyToken, getUsersHandler)
usersRouter.post('/', postUserHandler)
usersRouter.get('/load', loadUsersHandler)

export default usersRouter
