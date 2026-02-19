import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { AppProvider, useApp } from "@/context/AppContext";

// Mock localStorage so tests are isolated
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(AppProvider, null, children);

beforeEach(() => {
  localStorageMock.clear();
});

// ─── useApp hook guard ─────────────────────────────────────────────────────────

describe("useApp hook", () => {
  it("throws when used outside AppProvider", () => {
    // Suppress the React error boundary console output
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useApp())).toThrow(
      "useApp must be used within an AppProvider"
    );
    spy.mockRestore();
  });
});

// ─── Favorites ─────────────────────────────────────────────────────────────────

describe("favorites", () => {
  it("starts with an empty favorites list", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.favorites).toEqual([]);
  });

  it("isFavorite returns false for unknown restaurant", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.isFavorite("999")).toBe(false);
  });

  it("toggleFavorite adds a restaurant to favorites", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => { result.current.toggleFavorite("1"); });
    expect(result.current.favorites).toContain("1");
    expect(result.current.isFavorite("1")).toBe(true);
  });

  it("toggleFavorite removes an already-favorited restaurant", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => { result.current.toggleFavorite("1"); });
    act(() => { result.current.toggleFavorite("1"); });
    expect(result.current.favorites).not.toContain("1");
    expect(result.current.isFavorite("1")).toBe(false);
  });

  it("can favorite multiple restaurants independently", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => {
      result.current.toggleFavorite("1");
      result.current.toggleFavorite("2");
      result.current.toggleFavorite("3");
    });
    expect(result.current.favorites).toContain("1");
    expect(result.current.favorites).toContain("2");
    expect(result.current.favorites).toContain("3");
  });

  it("unfavoriting one does not remove others", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => {
      result.current.toggleFavorite("1");
      result.current.toggleFavorite("2");
    });
    act(() => { result.current.toggleFavorite("1"); });
    expect(result.current.isFavorite("1")).toBe(false);
    expect(result.current.isFavorite("2")).toBe(true);
  });

  it("persists favorites to localStorage", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => { result.current.toggleFavorite("42"); });
    const stored = JSON.parse(localStorageMock.getItem("tablenow-favorites") ?? "[]");
    expect(stored).toContain("42");
  });
});

// ─── Reservations – addReservation ────────────────────────────────────────────

const baseReservation = {
  restaurantId: "1",
  date: "2026-06-01",
  time: "19:00",
  partySize: 2,
  specialRequests: "",
  phone: "5551234567",
  status: "confirmed" as const,
};

describe("addReservation", () => {
  it("starts with an empty reservations list", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.reservations).toEqual([]);
  });

  it("adds a reservation and returns it", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let returned: ReturnType<typeof result.current.addReservation>;
    act(() => { returned = result.current.addReservation(baseReservation); });
    expect(result.current.reservations).toHaveLength(1);
    expect(returned!.restaurantId).toBe("1");
  });

  it("auto-generates a unique id", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let r1: ReturnType<typeof result.current.addReservation>;
    let r2: ReturnType<typeof result.current.addReservation>;
    act(() => {
      r1 = result.current.addReservation(baseReservation);
      r2 = result.current.addReservation({ ...baseReservation, restaurantId: "2" });
    });
    expect(r1!.id).not.toBe(r2!.id);
  });

  it("auto-generates a reservation number starting with 'TN-'", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let res: ReturnType<typeof result.current.addReservation>;
    act(() => { res = result.current.addReservation(baseReservation); });
    expect(res!.reservationNumber).toMatch(/^TN-/);
  });

  it("sets createdAt to a valid ISO date string", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let res: ReturnType<typeof result.current.addReservation>;
    act(() => { res = result.current.addReservation(baseReservation); });
    expect(new Date(res!.createdAt).toString()).not.toBe("Invalid Date");
  });

  it("preserves all input fields on the reservation", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let res: ReturnType<typeof result.current.addReservation>;
    act(() => { res = result.current.addReservation(baseReservation); });
    expect(res!.restaurantId).toBe(baseReservation.restaurantId);
    expect(res!.date).toBe(baseReservation.date);
    expect(res!.time).toBe(baseReservation.time);
    expect(res!.partySize).toBe(baseReservation.partySize);
    expect(res!.phone).toBe(baseReservation.phone);
    expect(res!.status).toBe("confirmed");
  });

  it("persists reservations to localStorage", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => { result.current.addReservation(baseReservation); });
    const stored = JSON.parse(localStorageMock.getItem("tablenow-reservations") ?? "[]");
    expect(stored).toHaveLength(1);
  });
});

// ─── Reservations – cancelReservation ─────────────────────────────────────────

describe("cancelReservation", () => {
  it("changes a reservation's status to 'cancelled'", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let res: ReturnType<typeof result.current.addReservation>;
    act(() => { res = result.current.addReservation(baseReservation); });
    act(() => { result.current.cancelReservation(res!.id); });
    const updated = result.current.reservations.find((r) => r.id === res!.id);
    expect(updated?.status).toBe("cancelled");
  });

  it("does not remove the reservation from the list", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let res: ReturnType<typeof result.current.addReservation>;
    act(() => { res = result.current.addReservation(baseReservation); });
    act(() => { result.current.cancelReservation(res!.id); });
    expect(result.current.reservations).toHaveLength(1);
  });

  it("only cancels the targeted reservation", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let r1: ReturnType<typeof result.current.addReservation>;
    let r2: ReturnType<typeof result.current.addReservation>;
    act(() => {
      r1 = result.current.addReservation(baseReservation);
      r2 = result.current.addReservation({ ...baseReservation, restaurantId: "2" });
    });
    act(() => { result.current.cancelReservation(r1!.id); });
    const second = result.current.reservations.find((r) => r.id === r2!.id);
    expect(second?.status).toBe("confirmed");
  });

  it("is idempotent – cancelling an already-cancelled reservation leaves status as 'cancelled'", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let res: ReturnType<typeof result.current.addReservation>;
    act(() => { res = result.current.addReservation(baseReservation); });
    act(() => { result.current.cancelReservation(res!.id); });
    act(() => { result.current.cancelReservation(res!.id); });
    const updated = result.current.reservations.find((r) => r.id === res!.id);
    expect(updated?.status).toBe("cancelled");
  });
});

// ─── Reservations – modifyReservation ─────────────────────────────────────────

describe("modifyReservation", () => {
  it("updates the specified fields on a reservation", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let res: ReturnType<typeof result.current.addReservation>;
    act(() => { res = result.current.addReservation(baseReservation); });
    act(() => {
      result.current.modifyReservation(res!.id, { partySize: 6, time: "20:00" });
    });
    const updated = result.current.reservations.find((r) => r.id === res!.id);
    expect(updated?.partySize).toBe(6);
    expect(updated?.time).toBe("20:00");
  });

  it("does not modify unrelated fields", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let res: ReturnType<typeof result.current.addReservation>;
    act(() => { res = result.current.addReservation(baseReservation); });
    act(() => {
      result.current.modifyReservation(res!.id, { partySize: 4 });
    });
    const updated = result.current.reservations.find((r) => r.id === res!.id);
    expect(updated?.date).toBe(baseReservation.date);
    expect(updated?.phone).toBe(baseReservation.phone);
  });

  it("does not affect other reservations", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    let r1: ReturnType<typeof result.current.addReservation>;
    let r2: ReturnType<typeof result.current.addReservation>;
    act(() => {
      r1 = result.current.addReservation(baseReservation);
      r2 = result.current.addReservation({ ...baseReservation, restaurantId: "2" });
    });
    act(() => {
      result.current.modifyReservation(r1!.id, { partySize: 10 });
    });
    const second = result.current.reservations.find((r) => r.id === r2!.id);
    expect(second?.partySize).toBe(2);
  });
});

// ─── User profile ──────────────────────────────────────────────────────────────

describe("updateUser", () => {
  it("initializes with a default guest user", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.email).toBe("guest@example.com");
  });

  it("updates specified user fields", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => { result.current.updateUser({ name: "Alice Smith" }); });
    expect(result.current.user?.name).toBe("Alice Smith");
  });

  it("does not overwrite unrelated user fields", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => { result.current.updateUser({ name: "Bob" }); });
    expect(result.current.user?.email).toBe("guest@example.com");
  });

  it("persists user updates to localStorage", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => { result.current.updateUser({ name: "Persisted Name" }); });
    const stored = JSON.parse(localStorageMock.getItem("tablenow-user") ?? "null");
    expect(stored?.name).toBe("Persisted Name");
  });
});

// ─── Restaurants list ──────────────────────────────────────────────────────────

describe("restaurants via context", () => {
  it("exposes a non-empty restaurant list", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.restaurants.length).toBeGreaterThan(0);
  });
});
