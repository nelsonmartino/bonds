import usersEntries from '../../utils/users.json'
import { User } from '../types'
import { PrismaClient } from '@prisma/client'

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
  const newUsers = await prisma.user.createMany({ data: usersJson })
  return newUsers
}

export const postUser = () => {}
