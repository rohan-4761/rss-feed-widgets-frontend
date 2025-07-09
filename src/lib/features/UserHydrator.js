"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import { loadFromLocalStorage } from "@/utils/localStorage";

export default function UserHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = loadFromLocalStorage("user");
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  return null;
}
