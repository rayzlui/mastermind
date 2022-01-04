import React from "react";
import { DISPLAY_CURRENT_USER } from "../actions/actionTypes";
import { ShowThisUser } from "./ShowThisUser";
import { useSelector } from "react-redux";

export function UserPage() {
  let displayingPage = useSelector((state) => state.displayingPage);
  let currentUser = useSelector((state) => state.currentUser);
  if (currentUser === null || displayingPage !== DISPLAY_CURRENT_USER) {
    return null;
  }
  return <ShowThisUser searchedUser={currentUser} />;
}
