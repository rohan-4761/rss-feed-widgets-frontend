"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import { getFromLocalStorage } from "@/utils/localStorage";

export default function UserHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = getFromLocalStorage("user");
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  return null;
}
