"use client";

import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "@/lib/features/widgetSlice";
import userReducer from "@/lib/features/userSlice";
import { loadFromLocalStorage } from "@/utils/localStorage";
import { persistWidgetMiddleware } from "./middleware/persistWidgets";

const preloadedWidgetState = loadFromLocalStorage("widget") 

let preloadedUserState = {
  user: {
    id: "",
    user_name: "",
    user_email: "",
  },
  isLoggedIn: false,
};

if (typeof window !== "undefined") {
  const userData = loadFromLocalStorage("user");
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
  preloadedState: {
    widget: preloadedWidgetState || undefined,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistWidgetMiddleware),
});

const userStore = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: {
    user: preloadedUserState,
  },
});

// widgetStore.subscribe(() => {
//   const state = widgetStore.getState();
//   saveToLocalStorage("widget", state.widget);
// });

export  {widgetStore, userStore};
