import React, { useState } from "react";
import { Input, Button } from "@vechaiui/react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../actions/actions";
import { DISPLAY_USER } from "../actions/actionTypes";

export function InputSearchUser() {
  let [searchInput, updateSearchInput] = useState();
  let displayingPage = useSelector((state) => state.displayingPage);
  if (displayingPage !== DISPLAY_USER) {
    return <div className="flex justify-center h-1/2">{null}</div>;
  }
  let dispatch = useDispatch();
  return (
    <div className="flex justify-center h-1/2">
      <Input
        className="w-60"
        type="text"
        onChange={(e) => updateSearchInput(e.target.value)}
      />
      <Button variant="light" onClick={() => dispatch(searchUser(searchInput))}>
        Search
      </Button>
    </div>
  );
}
