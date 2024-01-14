import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { CONSUMER_SERVICE_FEE } from "types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isObject(value: unknown): value is Record<string, unknown> {
  // check that value is object
  return !!value && !Array.isArray(value) && typeof value === 'object';
}

type TypedFormDataValue = FormDataEntryValue | Blob
export function validFormData<T extends Record<string, TypedFormDataValue>>(formData: FormData) {
  const entries = Object.fromEntries(formData.entries())

  return {...entries} as T
}

export const localImageLoader = ({ src, width, quality }: { src: string, width: number, quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

export const getConsumerServiceFee = (cartTotal: number) => cartTotal * CONSUMER_SERVICE_FEE;

export const getConsumerCartTotal = (cartTotal: number) => {
  const serviceFee = getConsumerServiceFee(cartTotal)

  return cartTotal + serviceFee
}

// Date/Time
export const convertDayToInt = (day: string): number => {
  const daysOfWeek = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  return daysOfWeek[day];
};