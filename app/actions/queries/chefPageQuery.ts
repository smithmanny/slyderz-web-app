'use server'

import { nextSunday, nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, nextSaturday } from 'date-fns'
import { getPrisma } from 'app/lib/prisma';
import { convertDayToInt } from "app/lib/utils";
import { NotFoundError } from 'app/lib/errors';

export default async function chefProfileQuery(chefId: string) {
  const prisma = await getPrisma()

  try {
        const chef = await prisma.chef.findFirstOrThrow({
          where: {
            id: chefId,
            AND: {
              hours: {
                some: {
                  daysOfWeek: {
                    isEmpty: false // Prevent page from showing if chef hours are not set
                  }
                }
              },
            },
          },
          select: {
            dishes: {
              where: {
                deleted: false,
              },
              include: {
                image: true
              }
            },
            hours: {
              select: {
                daysOfWeek: true,
                endTime: true,
                startTime: true,
              },
            },
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        });

        const getNextAvailableChefDay = () => {
          const chefWorkingDays: Array<number> = [];
          const today = new Date()

          chef.hours.forEach((hourBlock) =>
            hourBlock.daysOfWeek.forEach((day) => {
              const matchedDay = convertDayToInt(day);
              chefWorkingDays.push(matchedDay);
            })
          );

          function getNextDay(day: number|undefined): Date {
            let date: Date = today

            switch(day) {
              case 0:
                date = nextSunday(today)
                break;
              case 1:
                date = nextMonday(today)
                break;
              case 2:
                date = nextTuesday(today)
                break;
              case 3:
                date = nextWednesday(today)
                break;
              case 4:
                date = nextThursday(today)
                break;
              case 5:
                date = nextFriday(today)
                break;
              case 6:
                date = nextSaturday(today)
                break;
            }

            return date;
          }

          const sortedAvailableDays = chefWorkingDays.sort()
          const todayDay = new Date().getDay()
          const workingDayIndex = sortedAvailableDays.indexOf(todayDay)

          // If chefWorkingDays does not contain today return the next available day
          if (workingDayIndex === -1) {
            const daysAfterToday = sortedAvailableDays.filter(day => day >= todayDay)

            if (daysAfterToday.length === 0) {
              return getNextDay(sortedAvailableDays[0])
            }

            return getNextDay(daysAfterToday[0])
          }

          return today
        }

        const nextAvailableChefDay = getNextAvailableChefDay()

        return {
          nextAvailableChefDay: nextAvailableChefDay,
          dishes: chef.dishes,
          chefName: chef.user.name,
          chefImage: chef.user.image?.imageUrl,
          hours: chef.hours,
        };
      } catch (err) {
        throw new NotFoundError({
          message: "Chef not found",
          cause: err,
        });
      }
}