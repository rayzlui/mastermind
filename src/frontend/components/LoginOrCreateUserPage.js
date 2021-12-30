import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  RequiredIndicator,
} from "@vechaiui/react";
import { Dialog } from "@headlessui/react";
export function LoginOrCreateUserPage(props) {
  let { loginAction, createUserAction, currentUser, showLogin, hideLogin } =
    props;
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
    <Dialog
      as="div"
      open={!!showLogin}
      onClose={hideLogin}
      className="fixed z-modal inset-0 h-2/4 w-2/4 left-1/4 top-1/4 right-1/4 border rounded"
    >
      <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-800" />

      <div className="relative p-4 flex flex-col w-full rounded bg-white border">
        <div className="mb-2">
          <Button variant="ghost" onClick={() => toggleLogin("Login")}>
            Login
          </Button>
          <Button
            variant="ghost"
            onClick={() => toggleLogin("Create an account")}
          >
            Create An Account
          </Button>
        </div>
        <Dialog.Title className="text-lg font-semibold">{type}</Dialog.Title>
        <Dialog.Description className="m-2">{feedback}</Dialog.Description>
        <form>
          <FormControl>
            <FormLabel>
              Username
              <RequiredIndicator />
            </FormLabel>
            <Input
              type={"text"}
              className="text-black"
              onChange={(e) => updateUserName(e.target.value)}
            ></Input>
            <FormLabel>
              Password
              <RequiredIndicator />
            </FormLabel>
            <Input
              className="text-black"
              type={"password"}
              onChange={(e) => updatePassword(e.target.value)}
            ></Input>
          </FormControl>
          <Button
            className="mt-4"
            variant="ghost"
            onClick={(e) => {
              userAction(userName, password, toggleFeedback);
              e.preventDefault();
            }}
          >
            {type}
          </Button>
        </form>
      </div>
    </Dialog>
  );
}

LoginOrCreateUserPage.propTypes = {
  loginAction: PropTypes.func,
  createUserAction: PropTypes.func,
  type: PropTypes.string,
  displayingPage: PropTypes.string,
  currentUser: PropTypes.object,
  showLogin: PropTypes.string,
  hideLogin: PropTypes.func,
};
