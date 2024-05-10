import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { CHEF_SERVICE_FEE, CONSUMER_SERVICE_FEE } from "types";
import { UnknownError } from "./errors";

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
const isProd = process.env.NODE_ENV === "production";
const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

export const getSiteUrl = SITE_URL;

export const localImageLoader = ({
	src,
	width,
	quality,
}: { src: string; width: number; quality?: number }) => {
	return `${src}?w=${width}&q=${quality || 75}`;
};

export const getConsumerServiceFee = (cartSubTotal: number) =>
	cartSubTotal * CONSUMER_SERVICE_FEE;

export const getChefServiceFee = (cartSubTotal: number) =>
	cartSubTotal * CHEF_SERVICE_FEE;

export const getConsumerCartTotal = (cartSubTotal: number) => {
	const serviceFee = getConsumerServiceFee(cartSubTotal);

	return cartSubTotal + serviceFee;
};

export const getImageUrl = ({
	userId,
	fileName,
}: { userId: string; fileName: string }) => {
	return `https://assets.slyderz.co/${
		isProd ? "prod" : "dev"
	}/${userId}/${fileName}`;
};

export const uploadS3Image = async ({
	userId,
	file,
}: { userId: string; file: File }) => {
	const S3 = new S3Client({
		region: "auto",
		endpoint: process.env.CLOUDFLARE_R2_URL,
		credentials: {
			accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY || "",
			secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
		},
	});
	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const command = new PutObjectCommand({
		Bucket: "web-app",
		Key: `${isProd ? "prod" : "dev"}/${userId}/${file.name}`,
		ContentLength: file.size,
		Body: buffer,
	});

	try {
		const url = await getSignedUrl(S3, command, { expiresIn: 3600 });

		await fetch(url, {
			method: "PUT",
			body: file,
		});
	} catch (err) {
		throw new Error("Failed to upload image");
	}

	const imageUrl = getImageUrl({
		userId: userId,
		fileName: file.name,
	});

	return imageUrl;
};

export const deleteS3Image = async ({
	userId,
	url,
}: { userId: string; url: string }) => {
	const S3 = new S3Client({
		region: "auto",
		endpoint: process.env.CLOUDFLARE_R2_URL,
		credentials: {
			accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY || "",
			secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
		},
	});
	const command = new DeleteObjectCommand({
		Bucket: "web-app",
		Key: `${isProd ? "prod" : "dev"}/${userId}/${url}`,
	});

	try {
		await S3.send(command);
	} catch (err) {
		throw new UnknownError({
			message: "Failed to delete image",
			cause: err,
		});
	}
};

export const onboardingSteps = new Map([
	["setup_stripe", "Setup your stripe account"],
	["upload_headshot", "Upload your headshot"],
	["complete_servsafe", "Complete ServSafe food handler certification"],
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
		"12:00 AM",
		"12:30 AM",
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
	];

	const hours = times.map((time) => ({
		label: time,
		value: time,
	}));

	return hours;
};
export const getHoursForDay = buildHours();

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

export const states = new Map(
	Object.entries({
		AL: "Alabama",
		AK: "Alaska",
		AZ: "Arizona",
		AR: "Arkansas",
		CA: "California",
		CO: "Colorado",
		CT: "Connecticut",
		DE: "Delaware",
		FL: "Florida",
		GA: "Georgia",
		HI: "Hawaii",
		ID: "Idaho",
		IL: "Illinois",
		IN: "Indiana",
		IA: "Iowa",
		KS: "Kansas",
		KY: "Kentucky",
		LA: "Louisiana",
		ME: "Maine",
		MD: "Maryland",
		MA: "Massachusetts",
		MI: "Michigan",
		MN: "Minnesota",
		MS: "Mississippi",
		MO: "Missouri",
		MT: "Montana",
		NE: "Nebraska",
		NV: "Nevada",
		NH: "New Hampshire",
		NJ: "New Jersey",
		NM: "New Mexico",
		NY: "New York",
		NC: "North Carolina",
		ND: "North Dakota",
		OH: "Ohio",
		OK: "Oklahoma",
		OR: "Oregon",
		PA: "Pennsylvania",
		RI: "Rhode Island",
		SC: "South Carolina",
		SD: "South Dakota",
		TN: "Tennessee",
		TX: "Texas",
		UT: "Utah",
		VT: "Vermont",
		VA: "Virginia",
		WA: "Washington",
		WV: "West Virginia",
		WI: "Wisconsin",
		WY: "Wyoming",
	}),
);
