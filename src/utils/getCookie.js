"use client";

export function getCookie(name) {
  if (typeof document === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length < 2) return undefined;
  return parts.pop().split(";").shift();
}
