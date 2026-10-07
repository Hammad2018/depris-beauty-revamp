import { describe, it, expect } from "vitest";
import { potencyWindow } from "./potency";

describe("potencyWindow", () => {
  const base = { bottled: "2026-09-12", expires: "2027-09-12", now: new Date("2026-10-07") };
  it("unopened in fridge tracks printed expiry", () => {
    const w = potencyWindow({ ...base, storage: "fridge" });
    expect(w.bestBy).toBe("2027-09-12");
    expect(w.fraction).toBeGreaterThan(0.9);
  });
  it("opened at room temperature caps at 3 months", () => {
    const w = potencyWindow({ ...base, storage: "room", opened: "2026-10-01" });
    expect(w.bestBy).toBe("2027-01-01");
  });
  it("never exceeds printed expiry", () => {
    const w = potencyWindow({ ...base, storage: "fridge", opened: "2027-08-01" });
    expect(w.bestBy).toBe("2027-09-12");
  });
  it("clamps to zero after expiry", () => {
    expect(potencyWindow({ ...base, storage: "fridge", now: new Date("2028-01-01") }).fraction).toBe(0);
  });
});
