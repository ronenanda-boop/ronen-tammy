import { notFound } from "next/navigation";
import he from "../messages/he.json";
import en from "../messages/en.json";

export const locales = ["he", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "he";

type Messages = Record<string, unknown>;

const messagesMap: Record<Locale, Messages> = {
  he,
  en
};

export async function getMessages(locale: Locale) {
  const messages = messagesMap[locale];
  if (!messages) {
    notFound();
  }
  return messages;
}

export function getLocaleFromPath(pathname: string | null | undefined): Locale {
  if (!pathname) {
    return defaultLocale;
  }
  if (pathname.includes("/(en)")) {
    return "en";
  }
  return "he";
}
