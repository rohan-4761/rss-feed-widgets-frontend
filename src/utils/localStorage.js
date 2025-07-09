"use client" ;

export const saveToLocalStorage = (key, value) => {
  try {
    if (typeof window === "undefined") return undefined; // SSR safety

    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};  

export const loadFromLocalStorage = (key) => {
  try {
    if (typeof window === "undefined") return undefined; // SSR safety
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Load localStorage error:", err);
    return undefined;
  }
};