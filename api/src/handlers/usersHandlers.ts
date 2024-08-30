import { Request, Response } from 'express'
import {
  getUsers,
  getUserByEmail,
  loadUsers,
} from '../controllers/usersControllers'

export const getUsersHandler = async (req: Request, res: Response) => {
  if (req.body.category != 'admin') {
    return res.status(401).json({ message: 'Not authorized' })
  }

  const { email } = req.query

  if (email) {
    const user = await getUserByEmail(email as string)
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(400).json({ message: 'User not found' })
  }

  const users = await getUsers()
  res.status(200).json(users)
}

export const loadUsersHandler = async (_req: Request, res: Response) => {
  try {
    const createUsers = await loadUsers()
    res.status(200).json(createUsers)
  } catch (error) {
    res.status(400).json(error)
  }
}
