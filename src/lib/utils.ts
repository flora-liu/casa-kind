import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeWords(inputString: string): string {
  // Split the input string into words
  const words = inputString.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    // Check if the word is not empty
    if (word.length > 0) {
      // Capitalize the first letter and make the rest of the word lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    // If the word is empty, return it as is
    return word;
  });

  // Join the capitalized words back into a single string
  const result = capitalizedWords.join(" ");

  return result;
}

export function getDateFormatted(date?: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = date || new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}

export function calculateTimeAgo(datetimeString: string): string {
  const inputDate = new Date(datetimeString);
  const currentDate = new Date();

  const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();
  const oneMinuteInMilliseconds = 60 * 1000;
  const oneHourInMilliseconds = 60 * oneMinuteInMilliseconds;
  const oneDayInMilliseconds = 24 * oneHourInMilliseconds;

  if (diffInMilliseconds < oneHourInMilliseconds) {
    const minutesAgo = Math.round(diffInMilliseconds / oneMinuteInMilliseconds);
    if (minutesAgo === 0) {
      return `Just now`;
    }
    return `${minutesAgo} ${minutesAgo < 2 ? "min" : "mins"} ago`;
  }

  if (diffInMilliseconds < oneDayInMilliseconds) {
    const hoursAgo = Math.round(diffInMilliseconds / oneHourInMilliseconds);
    return `${hoursAgo} ${hoursAgo < 2 ? "hour" : "hours"} ago`;
  }

  const daysAgo = Math.round(diffInMilliseconds / oneDayInMilliseconds);
  if (daysAgo < 30) {
    return `${daysAgo} ${daysAgo < 2 ? "day" : "days"} ago`;
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${
    monthNames[inputDate.getMonth()]
  } ${inputDate.getDate()}, ${inputDate.getFullYear()}`;
}
