"use server"

import { getChefSession } from "app/lib/auth";
import { NotFoundError } from "app/lib/errors";
import { db } from "drizzle";

export async function getChefHoursQuery() {
  const { chef } = await getChefSession();

  const chefCalendarId = chef.calendar.id

  if (!chefCalendarId) {
    throw new Error("Chef calendar not found")
  }

    const calendar = await db.query.calendar.findFirst({
      where: (calendar, { eq }) => eq(calendar.chefId, chef.id),
      columns: {
        id: true,
        isSundayEnabled: true,
        isMondayEnabled: true,
        isTuesdayEnabled: true,
        isWednesdayEnabled: true,
        isThursdayEnabled: true,
        isFridayEnabled: true,
        isSaturdayEnabled: true,
      },
      with: {
        hours: {
          columns: {
            id: true,
            startTime: true,
            endTime: true,
            dayOfWeek: true
          }
        }
      }
    })

    if (!calendar) {
      throw new NotFoundError({
        message: "Calendar not found"
      })
    }

    return calendar
}