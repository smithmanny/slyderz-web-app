"use server";

import { NotFoundError } from "app/lib/errors";
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
			hours: true,
			dishes: true,
			user: true,
		},
	});

	if (!chef || !chef.dishes || !chef.hours) {
		throw new NotFoundError({
			message: "Chef not found",
		});
	}

	try {
		const getNextAvailableChefDay = () => {
			const chefWorkingDays: Array<number> = [];
			const today = new Date();

			for (const hourBlock of chef.hours) {
				if (hourBlock.daysOfWeek) {
					for (const day of hourBlock.daysOfWeek) {
						const matchedDay = convertDayToInt(day);
						chefWorkingDays.push(matchedDay);
					}
				}
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
			hours: chef.hours,
		};
	} catch (err) {
		throw new NotFoundError({
			message: "Chef not found",
			cause: err,
		});
	}
}
