"use client";

import { updateWidgetState } from "../features/widgetSlice";
import { saveToLocalStorage } from "@/utils/localStorage";

export const persistWidgetMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  // persist only widget actions
  if (action.type.startsWith("widget/")) {
    const widgetState = storeAPI.getState().widget;
    saveToLocalStorage("widget", widgetState);
  }

  return result;
};
