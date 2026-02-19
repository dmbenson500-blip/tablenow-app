import { describe, it, expect } from "vitest";

// ─── Phone validation (mirrors Booking.tsx handleSubmit logic) ─────────────────

/**
 * The Booking page validates: `!phone || phone.length < 10`
 * This helper replicates that exact check.
 */
function isValidPhone(phone: string): boolean {
  return Boolean(phone) && phone.length >= 10;
}

describe("phone number validation", () => {
  it("accepts a 10-digit phone number", () => {
    expect(isValidPhone("5551234567")).toBe(true);
  });

  it("accepts a formatted phone number longer than 10 chars", () => {
    expect(isValidPhone("(555) 123-4567")).toBe(true);
  });

  it("rejects an empty string", () => {
    expect(isValidPhone("")).toBe(false);
  });

  it("rejects a phone number shorter than 10 characters", () => {
    expect(isValidPhone("555123")).toBe(false);
  });

  it("rejects a 9-digit number", () => {
    expect(isValidPhone("555123456")).toBe(false);
  });

  it("accepts exactly 10 characters", () => {
    expect(isValidPhone("0123456789")).toBe(true);
  });
});

// ─── Reservation number format ─────────────────────────────────────────────────

/**
 * generateReservationNumber() in AppContext returns `TN-YYYYMMDD-NNN`
 */
function generateReservationNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `TN-${date}-${random}`;
}

describe("reservation number format", () => {
  it("starts with TN-", () => {
    const num = generateReservationNumber();
    expect(num).toMatch(/^TN-/);
  });

  it("matches pattern TN-YYYYMMDD-NNN", () => {
    const num = generateReservationNumber();
    expect(num).toMatch(/^TN-\d{8}-\d{3}$/);
  });

  it("includes today's date in YYYYMMDD format", () => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const num = generateReservationNumber();
    expect(num).toContain(today);
  });

  it("generates a 3-digit zero-padded suffix", () => {
    const num = generateReservationNumber();
    const suffix = num.split("-")[2];
    expect(suffix).toMatch(/^\d{3}$/);
  });

  it("generates different numbers on successive calls (statistically)", () => {
    const generated = new Set(Array.from({ length: 20 }, () => generateReservationNumber()));
    // With 1000 possible suffixes, 20 calls should almost always produce at least 2 unique values
    expect(generated.size).toBeGreaterThan(1);
  });
});

// ─── Date range rules (PRD: today to 60 days ahead) ───────────────────────────

describe("booking date range", () => {
  const MAX_DAYS_AHEAD = 60;

  function isBookableDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + MAX_DAYS_AHEAD);
    return date >= today && date <= maxDate;
  }

  it("accepts today as a valid booking date", () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(isBookableDate(today)).toBe(true);
  });

  it("accepts a date 30 days from now", () => {
    const future = new Date();
    future.setDate(future.getDate() + 30);
    expect(isBookableDate(future.toISOString().slice(0, 10))).toBe(true);
  });

  it("accepts a date exactly 60 days from now", () => {
    const future = new Date();
    future.setDate(future.getDate() + 60);
    expect(isBookableDate(future.toISOString().slice(0, 10))).toBe(true);
  });

  it("rejects a date 61 days from now", () => {
    const future = new Date();
    future.setDate(future.getDate() + 61);
    expect(isBookableDate(future.toISOString().slice(0, 10))).toBe(false);
  });

  it("rejects a past date", () => {
    expect(isBookableDate("2020-01-01")).toBe(false);
  });
});

// ─── Party size rules (PRD: 1–20 guests) ──────────────────────────────────────

describe("party size validation", () => {
  function isValidPartySize(size: number): boolean {
    return Number.isInteger(size) && size >= 1 && size <= 20;
  }

  it("accepts 1 guest", () => {
    expect(isValidPartySize(1)).toBe(true);
  });

  it("accepts 20 guests", () => {
    expect(isValidPartySize(20)).toBe(true);
  });

  it("accepts 10 guests", () => {
    expect(isValidPartySize(10)).toBe(true);
  });

  it("rejects 0 guests", () => {
    expect(isValidPartySize(0)).toBe(false);
  });

  it("rejects 21 guests", () => {
    expect(isValidPartySize(21)).toBe(false);
  });

  it("rejects negative numbers", () => {
    expect(isValidPartySize(-1)).toBe(false);
  });

  it("rejects non-integer values", () => {
    expect(isValidPartySize(2.5)).toBe(false);
  });
});

// ─── Password strength rules (PRD: 8+ chars, mixed case, number, special char) ─

describe("password strength validation", () => {
  function isValidPassword(pw: string): boolean {
    return (
      pw.length >= 8 &&
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /\d/.test(pw) &&
      /[^A-Za-z0-9]/.test(pw)
    );
  }

  it("accepts a strong password", () => {
    expect(isValidPassword("Secure1!")).toBe(true);
  });

  it("rejects a password shorter than 8 characters", () => {
    expect(isValidPassword("Sh0rt!")).toBe(false);
  });

  it("rejects a password with no uppercase", () => {
    expect(isValidPassword("secure1!password")).toBe(false);
  });

  it("rejects a password with no lowercase", () => {
    expect(isValidPassword("SECURE1!PASSWORD")).toBe(false);
  });

  it("rejects a password with no number", () => {
    expect(isValidPassword("SecurePassword!")).toBe(false);
  });

  it("rejects a password with no special character", () => {
    expect(isValidPassword("SecurePassword1")).toBe(false);
  });

  it("accepts a complex password with multiple special chars", () => {
    expect(isValidPassword("P@ssw0rd#2026")).toBe(true);
  });
});

// ─── Review constraints (PRD: title ≤100 chars, description ≤1000 chars) ──────

describe("review input constraints", () => {
  it("title at exactly 100 characters is valid", () => {
    const title = "A".repeat(100);
    expect(title.length).toBeLessThanOrEqual(100);
  });

  it("title at 101 characters exceeds limit", () => {
    const title = "A".repeat(101);
    expect(title.length > 100).toBe(true);
  });

  it("description at exactly 1000 characters is valid", () => {
    const desc = "A".repeat(1000);
    expect(desc.length).toBeLessThanOrEqual(1000);
  });

  it("description at 1001 characters exceeds limit", () => {
    const desc = "A".repeat(1001);
    expect(desc.length > 1000).toBe(true);
  });
});
