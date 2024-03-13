"use client"

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Controller, UseFormReturn, useFieldArray } from "react-hook-form";
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
} from "app/components/ui/select"
import { Switch } from "app/components/ui/switch";

import { updateChefHoursMutation } from "app/actions/mutations/updateChefHours";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";
import { getHoursForDay } from "app/lib/utils";

interface HoursInputProps {
  day: string,
  form: UseFormReturn<any, any, any>
}
function HoursInput(props: HoursInputProps) {
  const { form } = props;
  const isDayActive = form.watch(`is${props.day}Enabled`)
  const selectedStartTime = form.watch(`dayOfWeek${props.day}`)[0]
  const selectedStartTimeIndex = getHoursForDay.map((hour) => hour.value).indexOf(selectedStartTime)
  const endTimes = getHoursForDay.slice(selectedStartTimeIndex + 1)

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `dayOfWeek${props.day}`
  });
  return (
    <div className="grid grid-cols-12 gap-8 pt-8">
      <div className="flex items-center gap-3 col-span-12 md:col-span-3">
        <Controller
          control={form.control}
          name={`is${props.day}Enabled`}
          render={({ field }) => (
            <>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                {...field}
              />
              <Label htmlFor={`is${props.day}Enabled`}>{props.day}</Label>
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
                  name={`dayOfWeek${props.day}.${index}.startTime`}
                  render={({ field, fieldState }) => (
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className={`w-[140px] md:w-[286px] ${fieldState.error ? "border-red-500" : null}`}>
                        <SelectValue placeholder="Select a start time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Start time</SelectLabel>
                          {getHoursForDay.map(hour =>
                            <SelectItem
                              key={`${hour.label}.${index}.startTime`}
                              {...field}
                              value={hour.value}
                              className="w-full"
                              aria-required
                            >
                              {hour.label}
                            </SelectItem>)}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Controller
                  control={form.control}
                  name={`dayOfWeek${props.day}.${index}.endTime`}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className="w-[140px] md:w-[286px]">
                        <SelectValue placeholder="Select a end time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>End time</SelectLabel>
                          {endTimes.map(hour =>
                            <SelectItem
                              key={`${hour.label}.${index}.endTime`}
                              {...field}
                              value={hour.value}
                              aria-required
                            >
                              {hour.label}
                            </SelectItem>)}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />

                {index === 0 && (
                  <Button variant="ghost" className="col-span-9 md:col-span-1" onClick={(e) => {
                    e.preventDefault()

                    append({ startTime: "", endTime: "" })
                  }}>
                    <PlusIcon />
                  </Button>
                )}
                {index !== 0 && (
                  <Button variant="ghost" className="col-span-9 md:col-span-1" onClick={(e) => {
                    e.preventDefault()

                    remove(index)
                  }}>
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
  )
}

export default function ChefHours() {
  const formSchema = z.object({
    isSundayEnabled: z.boolean(),
    isMondayEnabled: z.boolean(),
    isTuesdayEnabled: z.boolean(),
    isWednesdayEnabled: z.boolean(),
    isThursdayEnabled: z.boolean(),
    isFridayEnabled: z.boolean(),
    isSaturdayEnabled: z.boolean(),
    dayOfWeekSunday: z.string().array(),
    dayOfWeekMonday: z.string().array(),
    dayOfWeekTuesday: z.string().array(),
    dayOfWeekWednesday: z.string().array(),
    dayOfWeekThursday: z.string().array(),
    dayOfWeekFriday: z.string().array(),
    dayOfWeekSaturday: z.string().array(),
  });
  const form = useSlyderzForm(formSchema, {
    isSundayEnabled: false,
    isMondayEnabled: false,
    isTuesdayEnabled: false,
    isWednesdayEnabled: false,
    isThursdayEnabled: false,
    isFridayEnabled: false,
    isSaturdayEnabled: false,
    dayOfWeekSunday: ["1:00 AM"],
    dayOfWeekMonday: ["1:00 AM"],
    dayOfWeekTuesday: ["1:00 AM"],
    dayOfWeekWednesday: ["1:00 AM"],
    dayOfWeekThursday: ["1:00 AM"],
    dayOfWeekFriday: ["1:00 AM"],
    dayOfWeekSaturday: ["1:00 AM"],
  });

  return (
    <section>
      <form action={updateChefHoursMutation}>
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
          <HoursInput key={day} day={day} form={form} />
        ))}

        <Button type="submit" className="mt-12">Save hours</Button>
      </form>
    </section>
  )
}
