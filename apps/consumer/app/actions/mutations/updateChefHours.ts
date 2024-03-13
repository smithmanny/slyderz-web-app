"use server"

import { eq } from "drizzle-orm"
import { generateId } from "lucia"

import { getChefSession } from "app/lib/auth"
import { db } from "drizzle"
import { calendar, hours } from "drizzle/schema/menu"

function buildDaysFromInput(input: string) {
  const dayOfWeek = new Map([
    ["dayOfWeekSunday", "sunday"],
    ["dayOfWeekMonday", "monday"],
    ["dayOfWeekTuesday", "tueday"],
    ["dayOfWeekWednesday", "wednesday"],
    ["dayOfWeekThursday", "thursday"],
    ["dayOfWeekFriday", "friday"],
    ["dayOfWeekSaturday", "saturday"],
  ])

  const day = dayOfWeek.get(input)

  if (!day) {
    throw new Error("Day not found")
  }

  return day
}

function buildWorkingHours(entries: {[key: string]: FormDataEntryValue}) {
  const activeHours = []
  const workingHoursIndexes = new Set()
  const daysOfWeekKeys = Object.keys(entries).filter(entry => entry.includes("dayOfWeek"))

  // Loop over daysOfWeekKeys and group days by two to get startTime and endTime for day. Data returns array of strings so use index to determine if it's startTime or endTime.
  for (let x = 0; x < daysOfWeekKeys.length; x+= 2) {
    const hourBlock = {
      id: "",
      startTime: "",
      endTime: "",
      dayOfWeek: "",
    }
    let index = 0

    for (let y = x; y < x + 2; y++) {
      const val = daysOfWeekKeys[y]
      if (!val) throw new Error("Hour not found")

      const stringToArray = val.split(".")
      const dayOfWeekIndex = `${stringToArray[0]}-${stringToArray[1]}`
      const time = entries[val] as string

      if (workingHoursIndexes.has(dayOfWeekIndex)) continue

      if (stringToArray[0] && time) {
        const dayOfWeek = buildDaysFromInput(stringToArray[0])

        if (index === 0) {
          hourBlock.dayOfWeek = dayOfWeek
          hourBlock.startTime = time
        } else {
          hourBlock.endTime = time

          // set workingDays index after adding endTime
          workingHoursIndexes.add(dayOfWeekIndex)
        }

        index++
      }
    }

    activeHours.push(hourBlock)
  }

  if (activeHours.length === 0) {
    throw new Error("Error on hours")
  }

  return activeHours
}

export async function updateChefHoursMutation(input: FormData) {
  const { chef } = await getChefSession();
  const entries = Object.fromEntries(input.entries())
  const workingDays: { [key: string]: boolean } = {
    isSundayEnabled: false,
    isMondayEnabled: false,
    isTuesdayEnabled: false,
    isWednesdayEnabled: false,
    isThursdayEnabled: false,
    isFridayEnabled: false,
    isSaturdayEnabled: false,
  }
  const enabledWorkDays = Object.keys(entries).filter(entry => entry.includes("Enabled"))

  for (const day of enabledWorkDays) {
    workingDays[day] = true
  }

  // Set chef working days
  const chefCalendarRes = await db.update(calendar).set({
    ...workingDays
  }).where(eq(calendar.chefId, chef.id)).returning({ id: calendar.id })

  if (!chefCalendarRes[0]) {
    throw new Error("Can't update chef")
  }

  // If all days are disabled dont continue
  const areAllDaysDisabled = Object.values(workingDays).every(day => !day)
  if (areAllDaysDisabled) {
    return {
      error: false,
      message: "Successfully saved hours"
    }
  }

  const chefCalendar = chefCalendarRes[0]
  const workingHours = buildWorkingHours(entries).map(hourBlock => ({
    ...hourBlock,
    calendarId: chefCalendar.id
  }))

  const previousHours = await db.query.hours.findMany({
    where: ((hours, { eq }) => eq(hours.calendarId, chefCalendar.id ))
  })

  console.log("workingHours", workingHours)
  console.log("previousHours", previousHours)

  if (previousHours.length === 0) {
    await db.insert(hours).values([...workingHours])
  }

  // await db.insert(hours).values({
  //   id: generateId(10),
  //   calendarId: chefCalendar.id,
  //   dayOfWeek: "sunday",
  //   startTime: "1:00 AM",
  //   endTime: "1:00 AM",
  // })
}