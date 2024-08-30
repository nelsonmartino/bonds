import { NextFunction, Request, Response } from 'express'
import Jwt from 'jsonwebtoken'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' })
  }
  Jwt.verify(token, process.env.JWT_SECRET_KEY as string, function (err, data) {
    if (err) {
      return res.status(403).json(err)
    } else {
      req.body = data
      next()
    }
  })
}
