import usersEntries from '../../utils/users.json'
import { User } from '../types'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const usersJson: User[] = usersEntries as User[]

export const getUsers = async () => {
  const users = await prisma.user.findMany()
  return users
}

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}

export const loadUsers = async () => {
  const hashedPasswordUsers = await Promise.all(
    usersJson.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 5)
      return { ...user, password: hashedPassword }
    })
  )

  const newUsers = await prisma.user.createMany({ data: hashedPasswordUsers })
  return newUsers
}

export const postUser = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 5)
  await prisma.user.create({ data: { ...user, password: hashedPassword } })
  return 'User created'
}
