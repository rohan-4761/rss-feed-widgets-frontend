import { createSlice } from "@reduxjs/toolkit";
import _set from "lodash/set";

const initialState = {
  feedspotFolder: "Homepage",
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
  },
});

export const { updateWidgetState } = widgetSlice.actions;
export const selectWidget = (state) => state.widget;
export default widgetSlice.reducer;
