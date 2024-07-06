import { Request, Response } from 'express'
import { getUsers, getUserByEmail } from '../controllers/usersControllers'

export const getUsersHandler = (req: Request, res: Response) => {
  const { email } = req.query

  if (email) {
    const user = getUserByEmail(email as string)
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(400).json({ message: 'User not found' })
  }

  const users = getUsers()
  res.status(200).json(users)
}
