import React, { useState } from "react";
import PropTypes from "prop-types";
import { DISPLAY_USER } from "../actions/actionTypes";
import { Button } from "@vechaiui/react";

export function HeaderComponent(props) {
  let { changePageTo, currentUser, showThisUser, logOut, toggleLogin } = props;
  let [showLoggedInOptions, toggleLoggedIn] = useState(false);
  let loggedInOptions = showLoggedInOptions ? (
    <>
      <Button
        variant="light"
        onClick={() => {
          showThisUser(currentUser);
          changePageTo(DISPLAY_USER);
          toggleLoggedIn(false);
        }}
      >
        {currentUser.username}
      </Button>
      <Button
        variant="light"
        onClick={() => {
          logOut();
          toggleLoggedIn(false);
        }}
      >
        Logout
      </Button>
    </>
  ) : null;
  let sideHeader = currentUser ? (
    <>
      <Button
        variant="light"
        onClick={() => toggleLoggedIn(!showLoggedInOptions)}
      >
        Hi {currentUser.username}!
      </Button>
      {loggedInOptions}
    </>
  ) : (
    <>
      <Button
        variant="light"
        onClick={() => {
          toggleLogin("Login");
        }}
      >
        Login
      </Button>
      <Button
        variant="light"
        onClick={() => {
          toggleLogin("Create an account");
        }}
      >
        Create an account
      </Button>
    </>
  );
  return (
    <>
      <header className="font-sans font-bold text-3xl">Mastermind</header>
      <div className="absolute right-0 top-0 flex flex-col">{sideHeader}</div>
    </>
  );
}
HeaderComponent.propTypes = {
  changePageTo: PropTypes.func,
  currentUser: PropTypes.object,
  logOut: PropTypes.func,
  showThisUser: PropTypes.func,
  toggleLogin: PropTypes.func,
};
