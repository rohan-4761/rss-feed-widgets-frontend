import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "@/lib/features/widgetSlice";

const widgetStore = configureStore({
  reducer: {
    widget: widgetReducer,
  },
});

export default widgetStore;
