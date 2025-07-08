"use client";

import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "@/lib/features/widgetSlice";
import userReducer from "@/lib/features/userSlice";
import { getFromLocalStorage } from "@/utils/localStorage";

let preloadedUserState = {
  user: {
    id: "",
    user_name: "",
    user_email: "",
  },
  isLoggedIn: false,
};

if (typeof window !== "undefined") {
  const userData = getFromLocalStorage("user");
  if (userData) {
    preloadedUserState = {
      user: userData,
      isLoggedIn: true,
    };
  }
}


const widgetStore = configureStore({
  reducer: {
    widget: widgetReducer,
  },
});

const userStore = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: {
    user: preloadedUserState,
  },
});

export  {widgetStore, userStore};
