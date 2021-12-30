import React from "react";
import PropTypes from "prop-types";
import { DISPLAY_USER } from "../actions/actionTypes";
import { ShowThisUser } from "./ShowThisUser";
import { InputSearchUserContainer } from "../containers/InputSearchUserContainer";

export function SearchUserDisplay(props) {
  let { displayingPage, searchedUser } = props;
  if (displayingPage !== DISPLAY_USER) {
    return null;
  }

  return (
    <div className="h-full">
      <ShowThisUser searchedUser={searchedUser} />
    </div>
  );
}

SearchUserDisplay.propTypes = {
  displayingPage: PropTypes.string,
  searchedUser: PropTypes.object,
};
