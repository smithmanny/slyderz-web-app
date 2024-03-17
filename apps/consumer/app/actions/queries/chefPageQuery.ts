"use server";

import { NotFoundError, UnknownError } from "app/lib/errors";
import { convertDayToInt } from "app/lib/utils";
import {
	nextFriday,
	nextMonday,
	nextSaturday,
	nextSunday,
	nextThursday,
	nextTuesday,
	nextWednesday,
} from "date-fns";
import { db } from "drizzle";

export default async function chefProfileQuery(chefId: string) {
	const chef = await db.query.chefs.findFirst({
		where: (chefs, { eq }) => eq(chefs.id, chefId),
		with: {
			calendar: {
				with: {
					hours: true
				}
			},
			dishes: true,
			user: true,
		},
	});

	if (!chef || !chef.dishes || !chef.calendar?.hours) {
		throw new NotFoundError({
			message: "Chef not found",
		});
	}

	try {
		const getNextAvailableChefDay = () => {
			const chefWorkingDays: Array<number> = [];
			const today = new Date();

			if (!chef.calendar) {
				throw new NotFoundError({
					message: "Calendar not found",
				});
			}

			for (const hourBlock of chef.calendar.hours) {
				const matchedDay = convertDayToInt(hourBlock.dayOfWeek);
				chefWorkingDays.push(matchedDay);
			}

			function getNextDay(day: number | undefined): Date {
				let date: Date = today;

				switch (day) {
					case 0:
						date = nextSunday(today);
						break;
					case 1:
						date = nextMonday(today);
						break;
					case 2:
						date = nextTuesday(today);
						break;
					case 3:
						date = nextWednesday(today);
						break;
					case 4:
						date = nextThursday(today);
						break;
					case 5:
						date = nextFriday(today);
						break;
					case 6:
						date = nextSaturday(today);
						break;
				}

				return date;
			}

			const sortedAvailableDays = chefWorkingDays.sort();
			const todayDay = new Date().getDay();
			const workingDayIndex = sortedAvailableDays.indexOf(todayDay);

			// If chefWorkingDays does not contain today return the next available day
			if (workingDayIndex === -1) {
				const daysAfterToday = sortedAvailableDays.filter(
					(day) => day >= todayDay,
				);

				if (daysAfterToday.length === 0) {
					return getNextDay(sortedAvailableDays[0]);
				}

				return getNextDay(daysAfterToday[0]);
			}

			return today;
		};

		const nextAvailableChefDay = getNextAvailableChefDay();

		return {
			nextAvailableChefDay: nextAvailableChefDay,
			dishes: chef.dishes,
			chefName: chef.user.name,
			chefImage: chef.user.headshotUrl,
			hours: chef.calendar.hours,
		};
	} catch (err) {
		throw new UnknownError({
			message: "Unknown error fetching chef",
			cause: err,
		});
	}
}
