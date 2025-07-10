import { createSlice } from "@reduxjs/toolkit";
import _set from "lodash/set";
import { loadFromLocalStorage } from "@/utils/localStorage";

const defaultWidgetState = {
  topic: "",
  feedURL: "",
  widgetLayout: "MagazineView01",
  widgetTitle: "Widget Title",
  general: {
    widthInPixels: true,
    width: 350,
    heightInPixels: true,
    height: 400,
    autoScroll: false,
    openLinksInNewTab: true,
    fontStyle: "Trebuchet MS, sans-serif",
    textAlignment: "AlignLeft",
    border: true,
    borderColor: "#000000",
    squareCorner: true,
    padding: 5,
    spaceBetweenItems: 10,
  },
  feedTitle: {
    custom: true,
    mainTitle: "",
    mainTitleLink: "",
    feedTitleFontSize: 16,
    feedTitleBold: false,
    feedTitleBgColor: "#ffffff",
    feedTitleFontColor: "#acadae",
  },
  feedContent: {
    displayNoOfPost: 25,
    displayLink: true,
    displayReadMore: false,
    contentbgColor: "#ffffff",
    showAuthorAndDate: true,
    dateFormat: "Month, DD YYYY",
    title: {
      showContentTitle: true,
      contentTitleBold: false,
      contentTitlemaxChars: 50,
      contentTitleFontSize: 14,
      contentTitleColor: "#0077b5",
    },
    description: {
      showContentDesc: true,
      contentDescBold: false,
      contentDescMaxChars: 100,
      contentDescFontSize: 12,
      contentDescColor: "#acadae",
    },
  },
};

const initialState = defaultWidgetState;

export const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    // Generic action
    updateWidgetState: (state, action) => {
      const { path, value } = action.payload;
      // console.log("Updating widget state at path:", path, "with value:", value);
      _set(state, path, value);
    },
    resetWidget: () => {
      return defaultWidgetState;
    },
    setFullWidget: (state, action) => {
      const payload = action.payload;
      if (typeof payload !== "object" || payload === null) {
        console.error(
          "❌ setFullWidget received invalid payload:",
          payload
        );
        return state;
      }
      return payload;
    },
  },
});

export const { updateWidgetState, resetWidget, setFullWidget } =
  widgetSlice.actions;
export const selectWidget = (state) => state.widget;
export default widgetSlice.reducer;
