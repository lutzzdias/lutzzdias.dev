export function getFormattedDate(date: Date | undefined): string {
  if (date === undefined) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
