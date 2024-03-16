"use server"

import { eq } from "drizzle-orm"
import { generateId } from "lucia"

import { getChefSession } from "app/lib/auth"
import { db } from "drizzle"
import { calendar, hours } from "drizzle/schema/menu"

function buildDaysFromInput(input: string) {
  const dayOfWeek = new Map([
    ["0", "sunday"],
    ["1", "monday"],
    ["2", "tueday"],
    ["3", "wednesday"],
    ["4", "thursday"],
    ["5", "friday"],
    ["6", "saturday"],
  ])

  const day = dayOfWeek.get(input)

  if (!day) {
    throw new Error("Day not found")
  }

  return day
}

type DaysOfWeekEnumType = typeof hours.dayOfWeek.enumValues[number]

function buildSelectedHours(entries: {[key: string]: FormDataEntryValue}) {
  const activeHours = []
  const hourKeys = Object.keys(entries).filter(entry => entry.includes("hours."))

  // Loop over hourKeys and group days by two to get startTime and endTime for day. Data returns array of strings so use index to determine if it's startTime or endTime.
  for (let x = 0; x < hourKeys.length; x+= 2) {
    const hourBlock = {
      id: generateId(10),
      startTime: "",
      endTime: "",
      dayOfWeek: "" as DaysOfWeekEnumType,
    }
    let index = 0

    for (let y = x; y <= x + 1; y++) {
      const hourKey = hourKeys[y]
      if (!hourKey) throw new Error("Hour not found")

      const stringToArray = hourKey.split(".")
      const time = entries[hourKey] as string

      if (stringToArray[1] && time) {
        const dayOfWeek = buildDaysFromInput(stringToArray[1]) as DaysOfWeekEnumType

        if (index === 0) {
          hourBlock.dayOfWeek = dayOfWeek
          hourBlock.startTime = time
        } else {
          hourBlock.endTime = time
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

  for (const enabledDay of enabledWorkDays) {
    workingDays[enabledDay] = true
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
      message: "Successfully saved hours"
    }
  }

  const chefCalendar = chefCalendarRes[0]
  const selectedHours = buildSelectedHours(entries).map(hourBlock => ({
    ...hourBlock,
    calendarId: chefCalendar.id
  }))
  const previousHours = await db.query.hours.findMany({
    where: ((hours, { eq }) => eq(hours.calendarId, chefCalendar.id ))
  })

  await db.transaction(async (tx) => {
    const unsavedHours = [] as typeof selectedHours

    if (previousHours.length !== 0) {
      // Check previous hours saved on db. If no currently selected hours match delete hour from db
      for (const prevHour of previousHours) {
        const foundHour = selectedHours.find(wh => {
          if (
            wh.dayOfWeek === prevHour.dayOfWeek &&
            wh.startTime === prevHour.startTime &&
            wh.endTime === prevHour.endTime
            ) return true

            return false
          })

        if (!foundHour) {
          await tx.delete(hours).where(eq(hours.id, prevHour.id))
        }
      }

      // Check selected hours and filter out hours thats already saved on db
      for (const hour of selectedHours) {
        const foundHour = previousHours.find(wh => {
          if (
            wh.dayOfWeek === hour.dayOfWeek &&
            wh.startTime === hour.startTime &&
            wh.endTime === hour.endTime
            ) return true

            return false
          })

        if (!foundHour) {
          unsavedHours.push(hour)
        }
      }

      if (unsavedHours.length > 0) {
        await tx.insert(hours).values([...unsavedHours])
      }

      return
    }

    await db.insert(hours).values([...selectedHours])

    return {
      message: "Successfully updated hours"
    }
  })
}