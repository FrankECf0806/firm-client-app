export const LANGUAGE_FORMAT = "en-US";

export const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export const SHORT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
};

export const LONG_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const currentDate = new Date().toLocaleDateString(
  LANGUAGE_FORMAT,
  LONG_DATE_FORMAT,
);

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString(LANGUAGE_FORMAT, DATE_FORMAT);
}

export function formatShortDate(date: string | Date) {
  return new Date(date).toLocaleDateString(LANGUAGE_FORMAT, SHORT_DATE_FORMAT);
}

export function formatLongDate(date: string | Date) {
  return new Date(date).toLocaleDateString(LANGUAGE_FORMAT, LONG_DATE_FORMAT);
}

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString(LANGUAGE_FORMAT, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelativeTime(date: string | Date) {
  const diff = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;

  return `${days}d ago`;
}

export function getDateGroup(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return "Earlier";
}

export function formatRelativeTimeFromNow(date: string | Date): string {
  const now = Date.now();

  const uploadTime = new Date(date).getTime();
  const isRecent = now - uploadTime < 7 * 24 * 60 * 60 * 1000;
  return isRecent ? formatRelativeTime(date) : formatDate(date);
}

export function toDateTimeLocal(value: string | Date): string {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function fromDateTimeLocal(value: string): string {
  return new Date(value).toISOString();
}
