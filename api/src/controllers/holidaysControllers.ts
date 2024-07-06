import { PrismaClient } from '@prisma/client'
import { holidays } from '../../utils/holidays.json'

const holid: string[] = holidays

const prisma = new PrismaClient()

export const getHolidays = async () => {
  const date = new Date()
  const startDate = new Date(date)
  const endDate = new Date(date)
  startDate.setDate(date.getDate() - 5)
  endDate.setDate(date.getDate() + 20)
  const holidays = await prisma.holiday.findMany({
    where: { date: { gte: startDate, lte: endDate } },
  })
  return holidays.map((item) => item.date)
}

export const loadHolidays = async () => {
  const formatedDateHolidays = holid.map((x) => ({ date: new Date(x) }))
  const loadedHolidays = await prisma.holiday.createMany({
    data: formatedDateHolidays,
  })
  return loadedHolidays
}
