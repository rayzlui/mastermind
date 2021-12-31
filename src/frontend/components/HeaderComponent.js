import React, { useState } from "react";
import PropTypes from "prop-types";
import { DISPLAY_USER } from "../actions/actionTypes";
import { Button } from "@vechaiui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePageTo,
  logoutUser,
  showLogin,
  showThisUser,
} from "../actions/actions";

export function HeaderComponent(props) {
  let [showLoggedInOptions, toggleLoggedIn] = useState(false);
  let currentUser = useSelector((state) => state.currentUser);
  let dispatch = useDispatch();

  let loggedInOptions = showLoggedInOptions ? (
    <>
      <Button
        variant="light"
        onClick={() => {
          dispatch(showThisUser(currentUser));
          dispatch(changePageTo(DISPLAY_USER));
          toggleLoggedIn(false);
        }}
      >
        {currentUser.username}
      </Button>
      <Button
        variant="light"
        onClick={() => {
          dispatch(logoutUser());
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
          dispatch(showLogin("Login"));
        }}
      >
        Login
      </Button>
      <Button
        variant="light"
        onClick={() => {
          dispatch(showLogin("Create an account"));
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
