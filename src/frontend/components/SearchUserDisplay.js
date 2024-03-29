import React from "react";
import { DISPLAY_USER } from "../actions/actionTypes";
import { ShowThisUser } from "./ShowThisUser";
import { useSelector } from "react-redux";

export function SearchUserDisplay() {
  let displayingPage = useSelector((state) => state.displayingPage);
  let searchedUser = useSelector((state) => state.searchedUser);
  if (displayingPage !== DISPLAY_USER) {
    return null;
  }

  return (
    <div className="h-full">
      <ShowThisUser searchedUser={searchedUser} />
    </div>
  );
}
