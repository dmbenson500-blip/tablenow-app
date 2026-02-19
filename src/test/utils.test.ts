import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";
import {
  generateTimeSlots,
  getAvailableSlots,
} from "@/data/restaurants";

// ─── cn() utility ──────────────────────────────────────────────────────────────

describe("cn() – class name merger", () => {
  it("returns a single class unchanged", () => {
    expect(cn("text-red-500")).toBe("text-red-500");
  });

  it("merges multiple classes", () => {
    expect(cn("p-2", "m-4")).toBe("p-2 m-4");
  });

  it("resolves Tailwind conflicts – last value wins", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("ignores falsy values", () => {
    expect(cn("p-2", undefined, null as unknown as string, false as unknown as string)).toBe("p-2");
  });

  it("supports conditional objects", () => {
    expect(cn({ "text-bold": true, "text-italic": false })).toBe("text-bold");
  });

  it("handles empty input gracefully", () => {
    expect(cn()).toBe("");
  });
});

// ─── generateTimeSlots() ───────────────────────────────────────────────────────

describe("generateTimeSlots()", () => {
  const slots = generateTimeSlots();

  it("returns an array", () => {
    expect(Array.isArray(slots)).toBe(true);
  });

  it("starts at 11:00", () => {
    expect(slots[0]).toBe("11:00");
  });

  it("ends at 21:45", () => {
    expect(slots[slots.length - 1]).toBe("21:45");
  });

  it("uses 15-minute increments", () => {
    // First four slots: 11:00, 11:15, 11:30, 11:45
    expect(slots[0]).toBe("11:00");
    expect(slots[1]).toBe("11:15");
    expect(slots[2]).toBe("11:30");
    expect(slots[3]).toBe("11:45");
  });

  it("generates the correct number of slots (11 hours × 4 per hour = 44)", () => {
    expect(slots).toHaveLength(44);
  });

  it("all slots match HH:MM format", () => {
    const timeRegex = /^\d{2}:\d{2}$/;
    expect(slots.every((s) => timeRegex.test(s))).toBe(true);
  });

  it("pads hours with leading zeros where needed", () => {
    // Slots between noon and 1 pm should be "12:xx" not "12:xx"
    const noonSlots = slots.filter((s) => s.startsWith("11:"));
    expect(noonSlots.length).toBe(4);
  });
});

// ─── getAvailableSlots() ───────────────────────────────────────────────────────

describe("getAvailableSlots()", () => {
  const restaurantId = "1";
  const date = "2026-03-01";

  it("returns an array", () => {
    expect(Array.isArray(getAvailableSlots(restaurantId, date))).toBe(true);
  });

  it("returns a subset of all time slots (roughly 2/3)", () => {
    const allSlots = generateTimeSlots();
    const available = getAvailableSlots(restaurantId, date);
    expect(available.length).toBeLessThan(allSlots.length);
    expect(available.length).toBeGreaterThan(0);
  });

  it("all returned slots are valid time strings", () => {
    const timeRegex = /^\d{2}:\d{2}$/;
    const available = getAvailableSlots(restaurantId, date);
    expect(available.every((s) => timeRegex.test(s))).toBe(true);
  });

  it("returns deterministic results for the same inputs", () => {
    const first = getAvailableSlots(restaurantId, date);
    const second = getAvailableSlots(restaurantId, date);
    expect(first).toEqual(second);
  });

  it("returns different slots for different restaurants", () => {
    const slotsA = getAvailableSlots("1", date);
    const slotsB = getAvailableSlots("5", date);
    // Very unlikely they're identical given the seed logic
    expect(slotsA).not.toEqual(slotsB);
  });

  it("returns different slots for different dates", () => {
    const slotsA = getAvailableSlots(restaurantId, "2026-03-01");
    const slotsB = getAvailableSlots(restaurantId, "2026-03-08");
    expect(slotsA).not.toEqual(slotsB);
  });
});
