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

type TypedFormDataValue = FormDataEntryValue | Blob | number;
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

export const getConsumerServiceFee = (cartTotal: string) =>
	Number(cartTotal) * CONSUMER_SERVICE_FEE;

export const getChefServiceFee = (cartTotal: string) =>
	Number(cartTotal) * CHEF_SERVICE_FEE;

export const getConsumerCartTotal = (cartSubTotal: string) => {
	const serviceFee = getConsumerServiceFee(cartSubTotal);

	return Number(cartSubTotal + serviceFee);
};

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

export const getSiteUrl = SITE_URL;

export const getImageUrl = ({
	userId,
	fileName,
	category,
}: { userId: string; fileName: string; category?: string }) => {
	if (category) {
		return `https://assets.slyderz.co/users/${userId}/${category}/${fileName}`;
	}

	return `https://assets.slyderz.co/users/${userId}/${fileName}`;
};

export const onboardingSteps = new Map([
	["SETUP_STRIPE", "Setup your stripe account"],
	["UPLOAD_HEADSHOT", "Upload your headshot"],
	["COMPLETE_SERVSAFE", "Complete ServSafe food handler certification"],
]);

export const formatNumberToCurrency = (number: number) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "USD",
	}).format(number);
};

/************************** Date/Time helpers **************************/
export const convertDayToInt = (day: any): number => {
	const daysOfWeek = new Map([
		["sunday", 0],
		["monday", 1],
		["tuesday", 2],
		["wednesday", 3],
		["thursday", 4],
		["friday", 5],
		["saturday", 6],
	]);

	const validDay = daysOfWeek.get(day);

	if (validDay === undefined) {
		throw new Error("Invalid day");
	}

	return validDay;
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

// Render times for chef hours
const buildHours = () => {
	const times = [
		"1:00 AM",
		"2:00 AM",
		"2:30 AM",
		"3:00 AM",
		"3:30 AM",
		"4:00 AM",
		"4:30 AM",
		"5:00 AM",
		"5:30 AM",
		"6:00 AM",
		"6:30 AM",
		"7:00 AM",
		"7:30 AM",
		"8:00 AM",
		"8:30 AM",
		"9:00 AM",
		"9:30 AM",
		"10:00 AM",
		"10:30 AM",
		"11:00 AM",
		"11:30 AM",
		"12:00 PM",
		"12:30 PM",
		"1:00 PM",
		"1:30 PM",
		"2:00 PM",
		"2:30 PM",
		"3:00 PM",
		"3:30 PM",
		"4:00 PM",
		"4:30 PM",
		"5:00 PM",
		"5:30 PM",
		"6:00 PM",
		"6:30 PM",
		"7:00 PM",
		"7:30 PM",
		"8:00 PM",
		"8:30 PM",
		"9:00 PM",
		"9:30 PM",
		"10:00 PM",
		"10:30 PM",
		"11:00 PM",
		"11:30 PM",
		"12:00 AM",
		"12:30 AM",
	]

	const hours = times.map((time) => ({
		label: time,
		value: time
	}))

	return hours
};
export const getHoursForDay = buildHours()

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
