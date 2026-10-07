import { describe, it, expect } from "vitest";
import { dispatchState, formatLeft } from "./dispatch";

describe("dispatchState", () => {
  it("is same-day before the weekday cutoff", () => {
    // 2026-10-07 is a Wednesday; 10:00 Denver = 16:00 UTC
    const s = dispatchState(new Date("2026-10-07T16:00:00Z"));
    expect(s.sameDay).toBe(true);
    expect(s.msLeft).toBe(5 * 60 * 60_000);
  });
  it("rolls to tomorrow after cutoff on a weekday", () => {
    const s = dispatchState(new Date("2026-10-07T22:30:00Z"));
    expect(s.sameDay).toBe(false);
    expect(s.nextLabel).toBe("tomorrow");
  });
  it("rolls to Monday on weekends", () => {
    expect(dispatchState(new Date("2026-10-10T16:00:00Z")).nextLabel).toBe("Monday");
  });
  it("formats remaining time", () => {
    expect(formatLeft(95 * 60_000)).toBe("1h 35m");
    expect(formatLeft(12 * 60_000)).toBe("12m");
  });
});
