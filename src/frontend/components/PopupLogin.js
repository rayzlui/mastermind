import React, { useState } from "react";
import PropTypes from "prop-types";
import { LoginUserContainer } from "../containers/LoginUserContainer";
import { CreateUserContainer } from "../containers/CreateUserContainer";

export function PopupLogin(props) {
  let { showLogin, currentUser } = props;
  let [showInputType, toggleInputType] = useState(null);
  if (!showLogin || currentUser) {
    return null;
  }
  let input = null;
  if (showInputType === "login") {
    input = <LoginUserContainer />;
  }
  if (showInputType === "create") {
    input = <CreateUserContainer />;
  }

  return (
    <div className={"popup-login"}>
      <button onClick={() => toggleInputType("login")}>Login</button>
      <button onClick={() => toggleInputType("create")}>
        Create An Account
      </button>
      {input}
    </div>
  );
}

PopupLogin.propTypes = {
  showLogin: PropTypes.bool,
  currentUser: PropTypes.object,
};
