import nl from '@/messages/nl.json';
import en from '@/messages/en.json';
import type { Locale } from './site';

export const messages = { nl, en } as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}

export type Messages = typeof nl;
