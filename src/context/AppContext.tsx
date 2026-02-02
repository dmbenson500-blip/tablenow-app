import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { restaurants as initialRestaurants, Restaurant } from "@/data/restaurants";

export interface Reservation {
  id: string;
  restaurantId: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests: string;
  phone: string;
  status: "confirmed" | "completed" | "cancelled";
  reservationNumber: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dietaryPreferences: string[];
  favorites: string[];
  notifications: {
    email: boolean;
    sms: boolean;
  };
}

interface AppContextType {
  restaurants: Restaurant[];
  favorites: string[];
  toggleFavorite: (restaurantId: string) => void;
  isFavorite: (restaurantId: string) => boolean;
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, "id" | "reservationNumber" | "createdAt">) => Reservation;
  cancelReservation: (reservationId: string) => void;
  modifyReservation: (reservationId: string, updates: Partial<Reservation>) => void;
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateReservationNumber = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `TN-${date}-${random}`;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [restaurants] = useState<Restaurant[]>(initialRestaurants);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("tablenow-favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem("tablenow-reservations");
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("tablenow-user");
    return saved ? JSON.parse(saved) : {
      id: "user-001",
      name: "Guest User",
      email: "guest@example.com",
      phone: "(555) 000-0000",
      dietaryPreferences: [],
      favorites: [],
      notifications: { email: true, sms: false },
    };
  });

  useEffect(() => {
    localStorage.setItem("tablenow-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("tablenow-reservations", JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("tablenow-user", JSON.stringify(user));
    }
  }, [user]);

  const toggleFavorite = (restaurantId: string) => {
    setFavorites((prev) =>
      prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const isFavorite = (restaurantId: string) => favorites.includes(restaurantId);

  const addReservation = (reservation: Omit<Reservation, "id" | "reservationNumber" | "createdAt">) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `res-${Date.now()}`,
      reservationNumber: generateReservationNumber(),
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [...prev, newReservation]);
    return newReservation;
  };

  const cancelReservation = (reservationId: string) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === reservationId ? { ...res, status: "cancelled" as const } : res
      )
    );
  };

  const modifyReservation = (reservationId: string, updates: Partial<Reservation>) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === reservationId ? { ...res, ...updates } : res
      )
    );
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AppContext.Provider
      value={{
        restaurants,
        favorites,
        toggleFavorite,
        isFavorite,
        reservations,
        addReservation,
        cancelReservation,
        modifyReservation,
        user,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};