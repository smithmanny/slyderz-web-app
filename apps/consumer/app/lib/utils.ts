import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import prisma from "db";

import { CHEF_SERVICE_FEE, CONSUMER_SERVICE_FEE } from "types";
import { OnboardingState } from ".prisma/client";

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

export const getConsumerCartTotal = (cartTotal: string) => {
	const serviceFee = getConsumerServiceFee(cartTotal);

	return cartTotal + serviceFee;
};

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

export const getSiteUrl = SITE_URL;

export const getImageUrl = ({
	userId,
	fileName,
	category,
}: { userId: number; fileName: string; category?: string }) => {
	if (category) {
		return `https://assets.slyderz.co/users/${userId}/${category}/${fileName}`;
	}

	return `https://assets.slyderz.co/users/${userId}/${fileName}`;
};

export const onboardingSteps = new Map([
	[OnboardingState.SETUP_STRIPE, "Setup your stripe account"],
	[OnboardingState.UPLOAD_HEADSHOT, "Upload your headshot"],
	[
		OnboardingState.COMPLETE_SERVSAFE,
		"Complete ServSafe food handler certification",
	],
]);

export const formatNumberToCurrency = (number: number) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "USD",
	}).format(number);
};

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
