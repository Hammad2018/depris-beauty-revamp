/** Same-day cold dispatch cutoff: weekdays 15:00 at the Cheyenne, WY warehouse (America/Denver). */
export const CUTOFF_HOUR = 15;

export type DispatchState = { sameDay: boolean; msLeft: number; nextLabel: string };

export function dispatchState(now: Date, tz = "America/Denver"): DispatchState {
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", hour: "numeric", minute: "numeric", hour12: false });
  const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
  const weekday = parts.weekday as string;
  const hour = Number(parts.hour) % 24;
  const minute = Number(parts.minute);
  const isWeekday = !["Sat", "Sun"].includes(weekday);
  const minsLeft = CUTOFF_HOUR * 60 - (hour * 60 + minute);
  if (isWeekday && minsLeft > 0) return { sameDay: true, msLeft: minsLeft * 60_000, nextLabel: "today" };
  const next = weekday === "Fri" || weekday === "Sat" ? "Monday" : weekday === "Sun" ? "Monday" : "tomorrow";
  return { sameDay: false, msLeft: 0, nextLabel: next };
}

export function formatLeft(ms: number): string {
  const m = Math.max(0, Math.round(ms / 60_000));
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${String(m % 60).padStart(2, "0")}m` : `${m}m`;
}
