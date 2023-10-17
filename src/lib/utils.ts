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
