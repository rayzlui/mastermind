import React, { useState } from "react";
import { InputSearchUser } from "./InputSearchUser";
import {
  DISPLAY_USER,
  VIEW_LEADERBOARD,
  SELECT_DIFFICULTY,
  PLAY_GAME,
} from "../actions/actionTypes";
import { Button } from "@vechaiui/react";
import { useDispatch, useSelector } from "react-redux";
import { changePageTo } from "../actions/actions";
import { ConfirmDialog } from "./ConfirmDialog";

export function NavBar() {
  let dispatch = useDispatch();
  let displayingPage = useSelector((state) => state.displayingPage);
  let [showDialog, toggleDialog] = useState(false);
  let [selectedNextPage, toggleSelectedNextPage] = useState(null);

  function handleClick(type) {
    toggleSelectedNextPage(type);
    if (displayingPage === PLAY_GAME) {
      toggleDialog(true);
    } else {
      dispatch(changePageTo(type));
    }
  }

  return (
    <>
      <ConfirmDialog
        showDialog={showDialog}
        confirmLeaveGame={() => dispatch(changePageTo(selectedNextPage))}
        toggleDialog={toggleDialog}
      />
      <nav className="flex items-center flex-col h-1/2 w-full">
        <div>
          <Button
            variant={
              displayingPage === SELECT_DIFFICULTY ||
              displayingPage === PLAY_GAME
                ? "solid"
                : "light"
            }
            color={
              displayingPage === SELECT_DIFFICULTY ||
              displayingPage === PLAY_GAME
                ? "primary"
                : ""
            }
            onClick={() => handleClick(SELECT_DIFFICULTY)}
          >
            Play
          </Button>
          <Button
            variant={displayingPage === DISPLAY_USER ? "solid" : "light"}
            color={displayingPage === DISPLAY_USER ? "primary" : ""}
            onClick={() => handleClick(DISPLAY_USER)}
          >
            Search User
          </Button>
          <Button
            variant={displayingPage === VIEW_LEADERBOARD ? "solid" : "light"}
            color={displayingPage === VIEW_LEADERBOARD ? "primary" : ""}
            onClick={() => handleClick(VIEW_LEADERBOARD)}
          >
            Leaderboard
          </Button>
        </div>
        <InputSearchUser />
      </nav>
    </>
  );
}
