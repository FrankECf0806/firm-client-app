export function getLocalTimeBasedGreeting(): string {
  const now = new Date();
  const hour = now.getHours(); // Uses browser's local timezone

  if (hour < 12) {
    return "Morning";
  } else if (hour < 18) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}

export function getCurrentDateFormatted(
  locale: string = navigator.language,
  options?: Intl.DateTimeFormatOptions,
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };

  return new Date().toLocaleDateString(locale, defaultOptions);
}
