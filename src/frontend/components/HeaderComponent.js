import React, { useState } from "react";
import PropTypes from "prop-types";
import { DISPLAY_USER } from "../actions/actionTypes";

export function HeaderComponent(props) {
  let { changePageTo, currentUser, showThisUser, logOut, toggleLogin } = props;
  let [showLoggedInOptions, toggleLoggedIn] = useState(false);
  let loggedInOptions = showLoggedInOptions ? (
    <>
      <button
        onClick={() => {
          showThisUser(currentUser);
          changePageTo(DISPLAY_USER);
          toggleLoggedIn(false);
        }}
      >
        {currentUser.username}
      </button>
      <button
        onClick={() => {
          logOut();
          toggleLoggedIn(false);
        }}
      >
        Logout
      </button>
    </>
  ) : null;
  let sideHeader = currentUser ? (
    <>
      <button onClick={() => toggleLoggedIn(!showLoggedInOptions)}>
        Hi {currentUser.username}!
      </button>
      {loggedInOptions}
    </>
  ) : (
    <>
      <button
        onClick={() => {
          toggleLogin("Login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          toggleLogin("Create an account");
        }}
      >
        Create an account
      </button>
    </>
  );
  return (
    <div className={"header"}>
      <h1>Mastermind</h1>
      <div className={"side-header"}>{sideHeader}</div>
    </div>
  );
}
HeaderComponent.propTypes = {
  changePageTo: PropTypes.func,
  currentUser: PropTypes.object,
  logOut: PropTypes.func,
  showThisUser: PropTypes.func,
  toggleLogin: PropTypes.func,
};
