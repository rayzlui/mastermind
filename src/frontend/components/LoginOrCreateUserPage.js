import React, { useState } from "react";
import PropTypes from "prop-types";

export function LoginOrCreateUserPage(props) {
  let { loginAction, createUserAction, currentUser, showLogin } = props;
  if (currentUser || !showLogin) {
    return null;
  }

  let [isLogin, toggleLogin] = useState(showLogin);
  let [userName, updateUserName] = useState();
  let [password, updatePassword] = useState();
  let [feedback, toggleFeedback] = useState(null);
  let type;
  let userAction;
  if (isLogin === "Login") {
    type = "Login";
    userAction = loginAction;
  } else {
    type = "Create an account";
    userAction = createUserAction;
  }
  return (
    <div className={"popup-login"} tabIndex={0}>
      <button onClick={() => toggleLogin("Login")}>Login</button>
      <button onClick={() => toggleLogin("Create an account")}>
        Create An Account
      </button>
      {feedback}
      <h4>{type}</h4>
      <form>
        <label>Username</label>
        <input
          type={"text"}
          defaultValue={userName}
          onChange={(e) => updateUserName(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type={"password"}
          onChange={(e) => updatePassword(e.target.value)}
        ></input>
        <input
          type={"submit"}
          value={type}
          onClick={(e) => {
            userAction(userName, password, toggleFeedback);
            e.preventDefault();
          }}
        ></input>
      </form>
    </div>
  );
}

LoginOrCreateUserPage.propTypes = {
  loginAction: PropTypes.func,
  createUserAction: PropTypes.func,
  type: PropTypes.string,
  displayingPage: PropTypes.string,
  currentUser: PropTypes.object,
  showLogin: PropTypes.string,
};
