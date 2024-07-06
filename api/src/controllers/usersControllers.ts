import usersEntries from '../../utils/users.json'
import { User } from '../types'

const users: User[] = usersEntries as User[]

export const getUsers = () => users

export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email)
}
