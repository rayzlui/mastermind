import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "@vechaiui/react";
import { useDispatch } from "react-redux";
import { searchUser } from "../actions/actions";

export function InputSearchUser() {
  let [searchInput, updateSearchInput] = useState();
  let dispatch = useDispatch();
  return (
    <div className="flex justify-center">
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

InputSearchUser.propTypes = {
  searchUser: PropTypes.func,
};
