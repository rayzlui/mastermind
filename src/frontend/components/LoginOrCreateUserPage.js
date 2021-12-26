import React, { useState } from "react";
import PropTypes from "prop-types";

export function LoginOrCreateUserPage(props) {
  let { userAction, type, currentUser } = props;
  if (currentUser) {
    return null;
  }

  let [userName, updateUserName] = useState();
  let [password, updatePassword] = useState();
  let [feedback, toggleFeedback] = useState(null);
  return (
    <>
      {feedback}
      <form>
        <label>{type}</label>
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
          onClick={(e) => {
            userAction(userName, password, toggleFeedback);
            e.preventDefault();
          }}
        ></input>
      </form>
    </>
  );
}

LoginOrCreateUserPage.propTypes = {
  userAction: PropTypes.func,
  type: PropTypes.string,
  displayingPage: PropTypes.string,
  currentUser: PropTypes.object,
};
