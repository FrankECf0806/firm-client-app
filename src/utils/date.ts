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
  weekday: "long",
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

export function formatRelativeTime(date: string | Date) {
  const diff = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;

  return `${days}d ago`;
}

export function formatRelativeTimeFromNow(date: string | Date): string {
  const now = Date.now();

  const uploadTime = new Date(date).getTime();
  const isRecent = now - uploadTime < 7 * 24 * 60 * 60 * 1000;
  return isRecent ? formatRelativeTime(date) : formatDate(date);
}
