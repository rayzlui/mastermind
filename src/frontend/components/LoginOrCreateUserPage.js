import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  RequiredIndicator,
} from "@vechaiui/react";
import { Dialog } from "@headlessui/react";
import { hideLogin, loginUser, createUser } from "../actions/actions";
import { verifyValidString } from "../helperFunctions/verifyValidString";

export function LoginOrCreateUserPage() {
  let currentUser = useSelector((state) => state.currentUser);
  let showLogin = useSelector((state) => state.showLogin);
  let dispatch = useDispatch();
  let [isLogin, toggleLogin] = useState(showLogin);
  let [userName, updateUserName] = useState("");
  let [password, updatePassword] = useState("c");
  let [feedback, toggleFeedback] = useState(null);
  let submitRef = useRef(null);

  useEffect(() => {
    toggleLogin(showLogin);
  }, [showLogin]);

  if (currentUser || !showLogin) {
    return null;
  }
  let type;
  let userAction;
  if (isLogin === "Login") {
    type = "Login";
    userAction = (username, password, confirmLogin) =>
      dispatch(loginUser(username, password, confirmLogin));
  } else {
    type = "Create an account";

    userAction = (username, password, callback) => {
      dispatch(createUser(username, password, callback));
    };
  }

  function handleSubmit() {
    let validUserName = verifyValidString(userName, toggleFeedback);
    let validPassword = verifyValidString(password, toggleFeedback);
    if (validUserName && validPassword) {
      toggleFeedback("");
      userAction(userName, password, toggleFeedback);
    }
  }
  return (
    <Dialog
      as="div"
      initialFocus={submitRef}
      open={!!showLogin}
      onClose={() => dispatch(hideLogin())}
      className="fixed z-modal inset-0 h-2/4 w-2/4 left-1/4 top-1/4 right-1/4 border rounded"
    >
      <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-800" />

      <div className="relative p-4 flex flex-col w-full rounded bg-white border">
        <div className="mb-2">
          <Button variant="solid" onClick={() => toggleLogin("Login")}>
            Login
          </Button>
          <Button
            variant="solid"
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
            ref={submitRef}
            className="mt-4"
            variant="solid"
            onClick={(e) => {
              handleSubmit();
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
