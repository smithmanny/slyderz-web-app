"use client";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Controller, type UseFormReturn, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Button } from "app/components/ui/button";
import { Label } from "app/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "app/components/ui/select";
import { Switch } from "app/components/ui/switch";

import { updateChefHoursMutation } from "app/actions/mutations/updateChefHours";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";
import { getHoursForDay } from "app/lib/utils";
import type { hours } from "drizzle/schema/menu";

interface HoursInputProps {
	form: UseFormReturn<any, any, any>;
	dayIndex: number;
}
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
function HoursInput(props: HoursInputProps) {
	const { form } = props;
	const isDayActive = form.watch(`is${days[props.dayIndex]}Enabled`);
	// const selectedStartTime = form.watch(`hours.${props.dayIndex}.dayOfWeek${props.day}`)[0]
	// const selectedStartTimeIndex = getHoursForDay.map((hour) => hour.value).indexOf(selectedStartTime)
	// const endTimes = getHoursForDay.slice(selectedStartTimeIndex + 1)

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `days.${props.dayIndex}.hours`,
	});
	return (
		<div className="grid grid-cols-12 gap-8 pt-8">
			<div className="flex items-center gap-3 col-span-12 md:col-span-3">
				<Controller
					control={form.control}
					name={`is${days[props.dayIndex]}Enabled`}
					render={({ field }) => (
						<>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
								{...field}
							/>
							<Label htmlFor={`is${days[props.dayIndex]}Enabled`}>
								{days[props.dayIndex]}
							</Label>
						</>
					)}
				/>
			</div>

			<div className="flex gap-8 col-span-12 md:col-span-9">
				{isDayActive ? (
					<div className="grid grid-cols-9 gap-4 relative">
						{fields.map((hourBlock, index) => (
							<div className="flex gap-4 col-span-9">
								<Controller
									key={hourBlock.id}
									control={form.control}
									name={`days.${props.dayIndex}.hours.${index}.startTime`}
									defaultValue={hourBlock.id}
									render={({ field, fieldState }) => (
										<Select onValueChange={field.onChange} {...field}>
											<SelectTrigger
												className={`w-[140px] md:w-[286px] ${fieldState.error ? "border-red-500" : null
													}`}
											>
												<SelectValue placeholder="Select a start time" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Start time</SelectLabel>
													{getHoursForDay.map((hour) => (
														<SelectItem
															key={`${hour.label}.${index}.startTime`}
															{...field}
															value={hour.value}
															className="w-full"
															aria-required
														>
															{hour.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>
								<Controller
									control={form.control}
									name={`days.${props.dayIndex}.hours.${index}.endTime`}
									render={({ field }) => (
										<Select onValueChange={field.onChange} {...field}>
											<SelectTrigger className="w-[140px] md:w-[286px]">
												<SelectValue placeholder="Select a end time" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>End time</SelectLabel>
													{getHoursForDay.map((hour) => (
														<SelectItem
															key={`${hour.label}.${index}.endTime`}
															{...field}
															value={hour.value}
															aria-required
														>
															{hour.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>

								{index === 0 && (
									<Button
										variant="ghost"
										className="col-span-9 md:col-span-1"
										onClick={(e) => {
											e.preventDefault();

											append({ startTime: "", endTime: "" });
										}}
									>
										<PlusIcon />
									</Button>
								)}
								{index !== 0 && (
									<Button
										variant="ghost"
										className="col-span-9 md:col-span-1"
										onClick={(e) => {
											e.preventDefault();

											remove(index);
										}}
									>
										<MinusIcon />
									</Button>
								)}
							</div>
						))}
					</div>
				) : (
					<Select disabled>
						<SelectTrigger className="w-full md:w-[590px]">
							<SelectValue placeholder="Closed" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Closed</SelectLabel>
							</SelectGroup>
						</SelectContent>
					</Select>
				)}
			</div>
		</div>
	);
}

type HoursType = typeof hours.$inferSelect;
type HoursSelectType = Omit<
	HoursType,
	"createdAt" | "updatedAt" | "calendarId"
>;
interface CalendarPropsType {
	isSundayEnabled: boolean;
	isMondayEnabled: boolean;
	isTuesdayEnabled: boolean;
	isWednesdayEnabled: boolean;
	isThursdayEnabled: boolean;
	isFridayEnabled: boolean;
	isSaturdayEnabled: boolean;
	hours: Array<HoursSelectType>;
}
interface ChefHoursProps {
	calendar: CalendarPropsType;
}
export default function ChefHours(props: ChefHoursProps) {
	const { calendar } = props;

	const formSchema = z.object({
		isSundayEnabled: z.boolean(),
		isMondayEnabled: z.boolean(),
		isTuesdayEnabled: z.boolean(),
		isWednesdayEnabled: z.boolean(),
		isThursdayEnabled: z.boolean(),
		isFridayEnabled: z.boolean(),
		isSaturdayEnabled: z.boolean(),
		days: z.array(z.any()),
	});
	const form = useSlyderzForm(formSchema, {
		isSundayEnabled: calendar.isSundayEnabled,
		isMondayEnabled: calendar.isMondayEnabled,
		isTuesdayEnabled: calendar.isTuesdayEnabled,
		isWednesdayEnabled: calendar.isWednesdayEnabled,
		isThursdayEnabled: calendar.isThursdayEnabled,
		isFridayEnabled: calendar.isFridayEnabled,
		isSaturdayEnabled: calendar.isSaturdayEnabled,
		days: days.map((day) => {
			const dayHours = props.calendar.hours.filter(
				(hour) => hour.dayOfWeek === day.toLowerCase(),
			);

			return {
				dayOfWeek: day,
				hours:
					dayHours.length > 0
						? dayHours.map((dh) => ({
							startTime: dh.startTime,
							endTime: dh.endTime,
						}))
						: [
							{
								startTime: "",
								endTime: "",
							},
						],
			};
		}),
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "days",
	});

	return (
		<section>
			<form action={updateChefHoursMutation}>
				{fields.map((field, index) => (
					<HoursInput key={field.id} dayIndex={index} form={form} />
				))}

				<Button type="submit" className="mt-12">
					Save hours
				</Button>
			</form>
		</section>
	);
}
