import { Ctx, AuthorizationError } from "blitz"
import db from "db"
import * as z from "zod"

const GetHours = z
  .object({
    daysOfWeek: z.array(z.enum([
      'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'
    ])),
    endTime: z.string(),
    startTime: z.string(),
  })

export default async function createHoursMutation(
  input: z.infer<typeof GetHours>,
  ctx: Ctx
) {
  const data = GetHours.parse(input)
  const userId = ctx.session.userId
  const selectedWeekdays: Array<String> = []

  ctx.session.$authorize()

  if (!userId) {
    throw new AuthorizationError()
  }

  const chef = await db.chef.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  })

  if (!chef) {
    throw new AuthorizationError()
  }

  const allChefHours = await db.hours.findMany({
    where: {
      chefId: chef.id
    }
  })

  // create array with days of week thats already created
  allChefHours.map(hourBlock => {
    hourBlock.daysOfWeek.map(dayOfWeek => selectedWeekdays.push(dayOfWeek))
  })

  data.daysOfWeek.map(dayOfWeek => {
    if (selectedWeekdays.includes(dayOfWeek)) {
      throw new Error(`${dayOfWeek} is already being used in a time block`)
    }
  })

  const hours = await db.hours.create({
    data: {
      chefId: chef.id,
      ...data
    },
  })

  return hours
}