import React from "react";
import { DISPLAY_CURRENT_USER } from "../actions/actionTypes";
import { ShowThisUser } from "./ShowThisUser";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export function UserPage() {
  let displayingPage = useSelector((state) => state.displayingPage);
  let currentUser = useSelector((state) => state.currentUser);
  if (currentUser === null || displayingPage !== DISPLAY_CURRENT_USER) {
    return null;
  }
  return <ShowThisUser searchedUser={currentUser} />;
}

UserPage.propTypes = {
  displayingPage: PropTypes.string,
  currentUser: PropTypes.object,
};
