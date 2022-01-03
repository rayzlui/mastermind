import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "@vechaiui/react";
import { SET_ALERT_MESSAGE } from "../actions/actionTypes";

export function AlertMessage() {
  let message = useSelector((state) => state.alertMessage);
  let [alertMessage, updateAlertMessage] = useState(null);
  let dispatch = useDispatch();

  let notification = useNotification();
  let handleMessage = (message) => {
    notification({
      title: message,
      position: "top",
    });
  };
  if (message) {
    updateAlertMessage(message);
    dispatch({ type: SET_ALERT_MESSAGE, payload: null });
  }
  if (alertMessage === null) {
    return null;
  }

  return <>{handleMessage(alertMessage)}</>;
}
