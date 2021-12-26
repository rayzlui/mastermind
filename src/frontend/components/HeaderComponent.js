import React, { useState } from "react";
import PropTypes from "prop-types";
import { DISPLAY_USER } from "../actions/actionTypes";
import { LoginUserContainer } from "../containers/LoginUserContainer";
import { CreateUserContainer } from "../containers/CreateUserContainer";

export function HeaderComponent(props) {
  let { changePageTo, currentUser, showThisUser, logOut } = props;
  let [showLoggedInOptions, toggleLoggedIn] = useState(false);
  let [showLogin, toggleLogin] = useState(false);
  let [showCreate, toggleCreate] = useState(false);
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
          toggleLogin(!showLogin);
          toggleCreate(false);
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          toggleCreate(!showCreate);
          toggleLogin(false);
        }}
      >
        Create an account
      </button>
      {showCreate ? <CreateUserContainer /> : null}
      {showLogin ? <LoginUserContainer /> : null}
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
};
