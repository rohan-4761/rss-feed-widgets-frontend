"use client";

import { Provider } from "react-redux";
import { widgetStore } from "@/lib/store";


const WidgetProvider = ({children}) => {
  return (
    <Provider store={widgetStore} >
        {children}
    </Provider>
  )
}

export default WidgetProvider