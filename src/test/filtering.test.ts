import { describe, it, expect } from "vitest";
import { restaurants, Restaurant } from "@/data/restaurants";

// These tests mirror the filtering logic in src/pages/Restaurants.tsx
// to verify the business rules independently of the component.

// ─── Helper: reproduce filtering logic from Restaurants.tsx ───────────────────

function filterRestaurants(
  all: Restaurant[],
  {
    searchQuery = "",
    selectedCuisines = [] as string[],
    selectedPrice = "",
    selectedDietary = [] as string[],
    sortBy = "rating",
  } = {}
): Restaurant[] {
  let filtered = [...all];

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.cuisine.toLowerCase().includes(query) ||
        r.address.toLowerCase().includes(query)
    );
  }

  if (selectedCuisines.length > 0) {
    filtered = filtered.filter((r) =>
      selectedCuisines.some((c) => r.cuisine.toLowerCase() === c.toLowerCase())
    );
  }

  if (selectedPrice) {
    filtered = filtered.filter((r) => r.priceRange === selectedPrice);
  }

  if (selectedDietary.length > 0) {
    filtered = filtered.filter((r) =>
      selectedDietary.some((d) =>
        r.dietaryOptions.map((o) => o.toLowerCase()).includes(d.toLowerCase())
      )
    );
  }

  switch (sortBy) {
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "distance":
      filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      break;
    case "price-low":
      filtered.sort((a, b) => a.priceRange.length - b.priceRange.length);
      break;
    case "price-high":
      filtered.sort((a, b) => b.priceRange.length - a.priceRange.length);
      break;
    case "reviews":
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  return filtered;
}

// ─── Search filter ─────────────────────────────────────────────────────────────

describe("search filter", () => {
  it("returns all restaurants when query is empty", () => {
    const result = filterRestaurants(restaurants);
    expect(result.length).toBe(restaurants.length);
  });

  it("matches by restaurant name (case-insensitive)", () => {
    const result = filterRestaurants(restaurants, { searchQuery: "sushi" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.name.toLowerCase().includes("sushi") || r.cuisine.toLowerCase().includes("sushi") || r.address.toLowerCase().includes("sushi"))).toBe(true);
  });

  it("matches by cuisine type", () => {
    const result = filterRestaurants(restaurants, { searchQuery: "italian" });
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns empty array for non-existent restaurant", () => {
    const result = filterRestaurants(restaurants, {
      searchQuery: "xyzzy_nonexistent_place_99999",
    });
    expect(result).toHaveLength(0);
  });

  it("is case-insensitive", () => {
    const lower = filterRestaurants(restaurants, { searchQuery: "japanese" });
    const upper = filterRestaurants(restaurants, { searchQuery: "JAPANESE" });
    expect(lower.length).toBe(upper.length);
  });
});

// ─── Cuisine filter ────────────────────────────────────────────────────────────

describe("cuisine filter", () => {
  it("filters to only the selected cuisine", () => {
    const result = filterRestaurants(restaurants, {
      selectedCuisines: ["Italian"],
    });
    expect(result.every((r) => r.cuisine === "Italian")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("supports multiple selected cuisines (OR logic)", () => {
    const result = filterRestaurants(restaurants, {
      selectedCuisines: ["Italian", "Japanese"],
    });
    expect(
      result.every((r) => r.cuisine === "Italian" || r.cuisine === "Japanese")
    ).toBe(true);
    const italianCount = restaurants.filter((r) => r.cuisine === "Italian").length;
    const japaneseCount = restaurants.filter((r) => r.cuisine === "Japanese").length;
    expect(result.length).toBe(italianCount + japaneseCount);
  });

  it("returns empty array for cuisine with no restaurants", () => {
    const result = filterRestaurants(restaurants, {
      selectedCuisines: ["MadeUpCuisine9999"],
    });
    expect(result).toHaveLength(0);
  });
});

// ─── Price range filter ────────────────────────────────────────────────────────

describe("price range filter", () => {
  it("filters to only $$ restaurants", () => {
    const result = filterRestaurants(restaurants, { selectedPrice: "$$" });
    expect(result.every((r) => r.priceRange === "$$")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("filters to only $$$$ restaurants", () => {
    const result = filterRestaurants(restaurants, { selectedPrice: "$$$$" });
    expect(result.every((r) => r.priceRange === "$$$$")).toBe(true);
  });

  it("returns all restaurants when selectedPrice is empty string", () => {
    const result = filterRestaurants(restaurants, { selectedPrice: "" });
    expect(result.length).toBe(restaurants.length);
  });
});

// ─── Dietary filter ────────────────────────────────────────────────────────────

describe("dietary filter", () => {
  it("filters to restaurants with vegan options", () => {
    const result = filterRestaurants(restaurants, {
      selectedDietary: ["vegan"],
    });
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((r) =>
        r.dietaryOptions.map((d) => d.toLowerCase()).includes("vegan")
      )
    ).toBe(true);
  });

  it("is case-insensitive for dietary options", () => {
    const lower = filterRestaurants(restaurants, { selectedDietary: ["vegetarian"] });
    const upper = filterRestaurants(restaurants, { selectedDietary: ["Vegetarian"] });
    expect(lower.length).toBe(upper.length);
  });

  it("supports multiple dietary filters (OR logic)", () => {
    const vegan = filterRestaurants(restaurants, { selectedDietary: ["vegan"] });
    const glutenFree = filterRestaurants(restaurants, { selectedDietary: ["gluten-free"] });
    const both = filterRestaurants(restaurants, {
      selectedDietary: ["vegan", "gluten-free"],
    });
    // OR means result should be >= either individual filter
    expect(both.length).toBeGreaterThanOrEqual(Math.max(vegan.length, glutenFree.length));
  });
});

// ─── Combined filters ──────────────────────────────────────────────────────────

describe("combined filters", () => {
  it("can combine cuisine and price range", () => {
    const result = filterRestaurants(restaurants, {
      selectedCuisines: ["Italian"],
      selectedPrice: "$$",
    });
    expect(result.every((r) => r.cuisine === "Italian" && r.priceRange === "$$")).toBe(
      true
    );
  });

  it("can combine search query and dietary filter", () => {
    const result = filterRestaurants(restaurants, {
      searchQuery: "pizza",
      selectedDietary: ["vegetarian"],
    });
    if (result.length > 0) {
      expect(
        result.every((r) =>
          r.dietaryOptions.map((d) => d.toLowerCase()).includes("vegetarian")
        )
      ).toBe(true);
    }
  });
});

// ─── Sorting ───────────────────────────────────────────────────────────────────

describe("sorting", () => {
  it("sorts by rating descending by default", () => {
    const result = filterRestaurants(restaurants, { sortBy: "rating" });
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].rating).toBeGreaterThanOrEqual(result[i].rating);
    }
  });

  it("sorts by distance ascending", () => {
    const result = filterRestaurants(restaurants, { sortBy: "distance" });
    for (let i = 1; i < result.length; i++) {
      expect(parseFloat(result[i - 1].distance)).toBeLessThanOrEqual(
        parseFloat(result[i].distance)
      );
    }
  });

  it("sorts by price low to high (price-low)", () => {
    const result = filterRestaurants(restaurants, { sortBy: "price-low" });
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].priceRange.length).toBeLessThanOrEqual(
        result[i].priceRange.length
      );
    }
  });

  it("sorts by price high to low (price-high)", () => {
    const result = filterRestaurants(restaurants, { sortBy: "price-high" });
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].priceRange.length).toBeGreaterThanOrEqual(
        result[i].priceRange.length
      );
    }
  });

  it("sorts by review count descending (reviews)", () => {
    const result = filterRestaurants(restaurants, { sortBy: "reviews" });
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].reviewCount).toBeGreaterThanOrEqual(
        result[i].reviewCount
      );
    }
  });
});

// ─── Pagination helper ─────────────────────────────────────────────────────────

describe("pagination logic", () => {
  const ITEMS_PER_PAGE = 12;

  it("first page has at most ITEMS_PER_PAGE results", () => {
    const all = filterRestaurants(restaurants);
    const page1 = all.slice(0, ITEMS_PER_PAGE);
    expect(page1.length).toBeLessThanOrEqual(ITEMS_PER_PAGE);
  });

  it("calculates totalPages correctly", () => {
    const all = filterRestaurants(restaurants);
    const totalPages = Math.ceil(all.length / ITEMS_PER_PAGE);
    expect(totalPages).toBeGreaterThan(1); // we have 100+ restaurants
  });

  it("last page contains the remainder", () => {
    const all = filterRestaurants(restaurants);
    const totalPages = Math.ceil(all.length / ITEMS_PER_PAGE);
    const lastPage = all.slice((totalPages - 1) * ITEMS_PER_PAGE);
    expect(lastPage.length).toBeGreaterThan(0);
    expect(lastPage.length).toBeLessThanOrEqual(ITEMS_PER_PAGE);
  });
});
