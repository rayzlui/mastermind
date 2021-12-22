import React, { useState } from "react";
import PropTypes from "prop-types";

export function UserPage(props) {
  let { userAction } = props;
  let [userName, updateUserName] = useState();
  let [password, updatePassword] = useState();
  return (
    <>
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
          onClick={(e) => {
            userAction(userName, password);
            e.preventDefault();
          }}
        ></input>
      </form>
    </>
  );
}

UserPage.propTypes = { userAction: PropTypes.func };
