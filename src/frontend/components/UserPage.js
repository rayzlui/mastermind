import React from "react";
import { DISPLAY_CURRENT_USER } from "../actions/actionTypes";
import { ShowThisUser } from "./ShowThisUser";
import PropTypes from "prop-types";

export function UserPage(props) {
  let { displayingPage, currentUser } = props;
  if (currentUser === null || displayingPage !== DISPLAY_CURRENT_USER) {
    return null;
  }
  return <ShowThisUser searchedUser={currentUser} />;
}

UserPage.propTypes = {
  displayingPage: PropTypes.string,
  currentUser: PropTypes.object,
};
