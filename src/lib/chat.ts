import { Message } from "ai/react";

export function capitalizeFirstLetter(str: string): string {
  return (
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(".", "")
  );
}

export function parseStringToObject(str: string): { [key: string]: string } {
  // Remove any newlines
  str = str.replace(/\n/g, " ");

  let obj: { [key: string]: string } = {};
  let splits = str.split(":").map((s) => s.trim());

  if (splits.length < 2) {
    return obj;
  }

  for (let i = 0; i < splits.length - 1; i++) {
    let key = splits[i].substring(splits[i].lastIndexOf(" ") + 1);
    let value = splits[i + 1].substring(0, splits[i + 1].lastIndexOf(" "));
    obj[key] = value.trim();
  }

  obj[splits[splits.length - 2].split(" ").pop() as string] =
    splits[splits.length - 1];

  return obj;
}

export function formatResponse(message: Message): Message {
  if (message.role !== "assistant") {
    return message;
  }
  const obj = parseStringToObject(message.content);
  if (!obj || Object.keys(obj)?.length === 0) {
    return message;
  }
  let response = "";
  if (Object.keys(obj).includes("Description")) {
    response = `${obj["Description"]}`;
  }
  if (Object.keys(obj).includes("Question")) {
    response = `${response} ${obj["Question"]}`;
  }
  return { ...message, content: response };
}

export function getAssistantSuggestions(message: Message) {
  if (message.role !== "assistant") {
    return null;
  }
  const obj = parseStringToObject(message.content);
  if (obj && Object.keys(obj).includes("Suggestions")) {
    return obj["Suggestions"]
      .split(",")
      .map((item) => capitalizeFirstLetter(item.trim()));
  }
  return null;
}
