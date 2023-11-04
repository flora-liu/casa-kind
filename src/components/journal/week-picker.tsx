"use client";

import { cn } from "@/lib/utils";

const weekDays = [
  { displayText: "Su", dayOfWeek: "Sunday" },
  { displayText: "Mo", dayOfWeek: "Monday" },
  { displayText: "Tu", dayOfWeek: "Tuesday" },
  { displayText: "We", dayOfWeek: "Wednesday" },
  { displayText: "Th", dayOfWeek: "Thursday" },
  { displayText: "Fr", dayOfWeek: "Friday" },
  { displayText: "Sa", dayOfWeek: "Saturday" },
];

interface WeekPickerProps extends Omit<React.ComponentProps<"div">, "onClick"> {
  selected?: string;
  onClick?: (dayOfWeek: string) => void;
  days?: Record<string, boolean>;
}

function WeekPicker({
  selected,
  onClick,
  className,
  days,
  ...props
}: WeekPickerProps) {
  return (
    <div
      className={cn(
        "flex justify-center items-center md:no-wrap flex-wrap gap-2",
        className
      )}
      {...props}
    >
      {weekDays.map((day) => (
        <div key={day.dayOfWeek}>
          <div className="flex flex-col gap-1">
            <p className="text-center text-sm">{day.displayText}</p>
            <button
              onClick={() => onClick?.(day.dayOfWeek)}
              className={cn(
                "h-7 w-7 rounded-full border-2 border-border/40 flex items-center justify-center",
                selected === day.dayOfWeek ? "border-accent" : "",
                days?.[day.dayOfWeek] ? "bg-accent/20" : ""
              )}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export { WeekPicker };
