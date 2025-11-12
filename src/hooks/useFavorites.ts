"use client";

import { useCallback, useEffect, useState } from "react";
import { TableUser } from "@/api/users/users.utils";

const STORAGE_KEY = "favorite_users_v1";
const UPDATE_EVENT = "favorite_users_updated_v1";

function safeParse(raw: string | null): TableUser[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (typeof parsed === "object" && parsed !== null) return [parsed as TableUser];
    return [];
  } catch {
    return [];
  }
}

function safeStringify(value: TableUser[]) {
  try {
    return JSON.stringify(value);
  } catch {
    return "[]";
  }
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState<TableUser[]>(() => {
    if (typeof window === "undefined") return [];
    return safeParse(localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavorites(safeParse(e.newValue));
      }
    };

    const onCustom = () => {
      setFavorites(safeParse(localStorage.getItem(STORAGE_KEY)));
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(UPDATE_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(UPDATE_EVENT, onCustom);
    };
  }, []);

  const addFavorite = useCallback((user: TableUser) => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const current = safeParse(raw);
    if (current.some((u) => u.id === user.id)) return;
    const next = [...current, user];
    localStorage.setItem(STORAGE_KEY, safeStringify(next));
    setFavorites(next);
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }, []);

  const removeFavorite = useCallback((id: string) => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const current = safeParse(raw);
    const next = current.filter((u) => u.id !== id);
    localStorage.setItem(STORAGE_KEY, safeStringify(next));
    setFavorites(next);
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }, []);

  const toggleFavorite = useCallback((user: TableUser) => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const current = safeParse(raw);
    const exists = current.some((u) => u.id === user.id);
    const next = exists ? current.filter((u) => u.id !== user.id) : [...current, user];
    localStorage.setItem(STORAGE_KEY, safeStringify(next));
    setFavorites(next);
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }, []);

  const isFavorite = useCallback((id: string) => favorites.find((u) => u.id === id), [favorites]);

  const clearFavorites = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "[]");
      setFavorites([]);
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch {}
  }, []);

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  } as const;
}
