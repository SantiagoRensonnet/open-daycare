export const LOCALE = "es-419";

/** App timezone (Barcelona), chosen for testing. Every displayed date and "today" uses it. */
export const TIME_ZONE = "Europe/Madrid";

const headerDateFormat = new Intl.DateTimeFormat(LOCALE, {
  weekday: "long",
  day: "numeric",
  month: "short",
  timeZone: TIME_ZONE,
});

const timeFormat = new Intl.DateTimeFormat(LOCALE, {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: TIME_ZONE,
});

const dayKeyFormat = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: TIME_ZONE,
});

const offsetFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  timeZoneName: "longOffset",
});

/** "viernes 3 oct": lowercase, no commas or periods, whatever the ICU version emits. */
export function formatHeaderDate(d: Date): string {
  return headerDateFormat
    .formatToParts(d)
    .filter((part) => part.type === "weekday" || part.type === "day" || part.type === "month")
    .map((part) => part.value.toLowerCase().replace(/\.$/, ""))
    .join(" ");
}

/** "14:20", 24-hour. */
export function formatTime(d: Date): string {
  return timeFormat.format(d);
}

/** "2026-10-03", the calendar day in the app timezone. */
export function dayKey(d: Date): string {
  return dayKeyFormat.format(d);
}

/** The app timezone's UTC offset on that day, e.g. "+02:00" (summer) or "+01:00" (winter). */
export function zoneOffset(ymd: string): string {
  const noon = new Date(`${ymd}T12:00:00Z`);
  const name = offsetFormat.formatToParts(noon).find((part) => part.type === "timeZoneName")?.value;
  const offset = name?.replace("GMT", "");
  return offset ? offset : "+00:00";
}

/** The instant at `hhmm` app-timezone time on `now`'s day, `dayOffset` days earlier. */
export function atLocalTime(now: Date, hhmm: string, dayOffset = 0): Date {
  const [year, month, day] = dayKey(now).split("-").map(Number);
  const ymd = new Date(Date.UTC(year, month - 1, day - dayOffset)).toISOString().slice(0, 10);
  return new Date(`${ymd}T${hhmm}:00${zoneOffset(ymd)}`);
}
