import { Request, Response } from 'express'
import { UserForm } from '../types'
import { getUserByEmail } from '../controllers/usersControllers'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const loginHandler = async (req: Request, res: Response) => {
  const userForm = req.body as UserForm
  const userDB = await getUserByEmail(userForm.email)
  if (userDB) {
    const auth = await bcrypt.compare(userForm.password, userDB?.password)
    if (auth) {
      const token = jwt.sign(
        { email: userDB.email, category: userDB.category },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '1h',
        }
      )
      return res.status(200).json({ token, name: userDB.name })
    }
    return res.status(403).json({ message: 'Wrong password' })
  }
  res.status(404).json({ message: 'User not found' })
}
