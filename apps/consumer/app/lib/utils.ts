import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { CHEF_SERVICE_FEE, CONSUMER_SERVICE_FEE } from "types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isObject(value: unknown): value is Record<string, unknown> {
	// check that value is object
	return !!value && !Array.isArray(value) && typeof value === "object";
}

type TypedFormDataValue = FormDataEntryValue | Blob;
export function requiredFormData<T extends Record<string, TypedFormDataValue>>(
	formData: FormData,
) {
	const entries = Object.fromEntries(formData.entries());

	return { ...entries } as T;
}

export const localImageLoader = ({
	src,
	width,
	quality,
}: { src: string; width: number; quality?: number }) => {
	return `${src}?w=${width}&q=${quality || 75}`;
};

export const getConsumerServiceFee = (cartTotal: number) =>
	cartTotal * CONSUMER_SERVICE_FEE;

export const getChefServiceFee = (cartTotal: number) =>
	cartTotal * CHEF_SERVICE_FEE;

export const getConsumerCartTotal = (cartTotal: number) => {
	const serviceFee = getConsumerServiceFee(cartTotal);

	return cartTotal + serviceFee;
};

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

export const getSiteUrl = SITE_URL;

/************************** Date/Time helpers **************************/
export const convertDayToInt = (day: string): number => {
	const daysOfWeek = new Map([
		["SUNDAY", 0],
		["MONDAY", 1],
		["TUESDAY", 2],
		["WEDNESDAY", 3],
		["THURSDAY", 4],
		["FRIDAY", 5],
		["SATURDAY", 6],
	])

	const validDay = daysOfWeek.get(day)

	if (!validDay) {
		throw new Error("Invalid day")
	}

	return validDay
};

export const transfromDateToReadableTime = (date: Date): string => {
	return date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const readableDate = (date: Date): string => {
	return date.toLocaleDateString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

export const formatNumberToCurrency = (number: number) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "USD",
	}).format(number);
};

// Render times for chef hours
interface TimeType {
	label: string;
	value: string;
}

const renderHours = (tod = "AM") => {
	const hours = 12;
	const times: Array<TimeType> = [];

	for (let x = 1; x <= hours; x++) {
		for (let y = 0; y < 60; y += 30) {
			let time = `${x}:${y} ${tod}`;

			if (y === 0) {
				time = `${x}:${y}0 ${tod}`;
			}

			const data = {
				label: time,
				value: time,
			};

			times.push(data);
		}
	}

	return times;
};
export const todAM = renderHours();
export const todPM = renderHours("PM");

export const weekdays = [
	{
		label: "Sunday",
		value: "SUNDAY",
	},
	{
		label: "Monday",
		value: "MONDAY",
	},
	{
		label: "Tuesday",
		value: "TUESDAY",
	},
	{
		label: "Wednesday",
		value: "WEDNESDAY",
	},
	{
		label: "Thursday",
		value: "THURSDAY",
	},
	{
		label: "Friday",
		value: "FRIDAY",
	},
	{
		label: "Saturday",
		value: "SATURDAY",
	},
];
