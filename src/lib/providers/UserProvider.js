"use client";

import { Provider } from "react-redux";
import { userStore } from "@/lib/store";
import UserHydrator from "../features/UserHydrator";

export default function UserProvider({ children }) {
  return (
    <Provider store={userStore}>
      <UserHydrator />
      {children}
    </Provider>
  );
}
