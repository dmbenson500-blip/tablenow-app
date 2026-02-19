import { describe, it, expect } from "vitest";
import { restaurants, reviews } from "@/data/restaurants";

// ─── Restaurant data integrity ─────────────────────────────────────────────────

describe("restaurants data", () => {
  it("contains at least 100 restaurants", () => {
    expect(restaurants.length).toBeGreaterThanOrEqual(100);
  });

  it("every restaurant has a unique id", () => {
    const ids = restaurants.map((r) => r.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("every restaurant has a non-empty name", () => {
    expect(restaurants.every((r) => r.name.length > 0)).toBe(true);
  });

  it("every restaurant has a valid price range ($, $$, $$$, $$$$)", () => {
    const valid = new Set(["$", "$$", "$$$", "$$$$"]);
    expect(restaurants.every((r) => valid.has(r.priceRange))).toBe(true);
  });

  it("every restaurant rating is between 1.0 and 5.0", () => {
    expect(restaurants.every((r) => r.rating >= 1 && r.rating <= 5)).toBe(true);
  });

  it("every restaurant has a positive reviewCount", () => {
    expect(restaurants.every((r) => r.reviewCount > 0)).toBe(true);
  });

  it("every restaurant has at least one gallery image", () => {
    expect(restaurants.every((r) => r.gallery.length > 0)).toBe(true);
  });

  it("every restaurant has an image URL", () => {
    expect(restaurants.every((r) => r.image.startsWith("https://"))).toBe(true);
  });

  it("every restaurant has a non-empty address", () => {
    expect(restaurants.every((r) => r.address.length > 0)).toBe(true);
  });

  it("every restaurant has a phone number", () => {
    expect(restaurants.every((r) => r.phone.length > 0)).toBe(true);
  });

  it("every restaurant has hours", () => {
    expect(restaurants.every((r) => r.hours.length > 0)).toBe(true);
  });

  it("every restaurant has a distance string that is a valid number", () => {
    expect(restaurants.every((r) => !isNaN(parseFloat(r.distance)))).toBe(true);
  });

  it("availableToday is a boolean for every restaurant", () => {
    expect(restaurants.every((r) => typeof r.availableToday === "boolean")).toBe(
      true
    );
  });

  it("most restaurants are available today (>= 50%)", () => {
    const available = restaurants.filter((r) => r.availableToday).length;
    expect(available / restaurants.length).toBeGreaterThanOrEqual(0.5);
  });

  it("dietaryOptions is an array for every restaurant", () => {
    expect(restaurants.every((r) => Array.isArray(r.dietaryOptions))).toBe(true);
  });

  it("amenities is an array for every restaurant", () => {
    expect(restaurants.every((r) => Array.isArray(r.amenities))).toBe(true);
  });

  it("includes multiple cuisine types (at least 10)", () => {
    const cuisines = new Set(restaurants.map((r) => r.cuisine));
    expect(cuisines.size).toBeGreaterThanOrEqual(10);
  });
});

// ─── Price range distribution ──────────────────────────────────────────────────

describe("price range distribution", () => {
  it("has restaurants at every price tier", () => {
    const tiers = ["$", "$$", "$$$", "$$$$"];
    tiers.forEach((tier) => {
      const count = restaurants.filter((r) => r.priceRange === tier).length;
      expect(count).toBeGreaterThan(0);
    });
  });
});

// ─── Reviews data ──────────────────────────────────────────────────────────────

describe("reviews data", () => {
  it("contains at least one review", () => {
    expect(reviews.length).toBeGreaterThan(0);
  });

  it("every review has a unique id", () => {
    const ids = reviews.map((r) => r.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("every review has a rating between 1 and 5", () => {
    expect(reviews.every((r) => r.rating >= 1 && r.rating <= 5)).toBe(true);
  });

  it("every review references an existing restaurant", () => {
    const restaurantIds = new Set(restaurants.map((r) => r.id));
    expect(reviews.every((r) => restaurantIds.has(r.restaurantId))).toBe(true);
  });

  it("every review has non-empty text", () => {
    expect(reviews.every((r) => r.text.length > 0)).toBe(true);
  });

  it("every review has a date string", () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    expect(reviews.every((r) => dateRegex.test(r.date))).toBe(true);
  });

  it("every review has userInitials (1-3 chars)", () => {
    expect(
      reviews.every((r) => r.userInitials.length >= 1 && r.userInitials.length <= 3)
    ).toBe(true);
  });
});
