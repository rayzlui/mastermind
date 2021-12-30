import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "@vechaiui/react";

export function InputSearchUser(props) {
  let [searchInput, updateSearchInput] = useState();
  let { searchUser } = props;

  return (
    <div className="flex justify-center">
      <Input
        className="w-60"
        type="text"
        onChange={(e) => updateSearchInput(e.target.value)}
      />
      <Button variant="light" onClick={() => searchUser(searchInput)}>
        Search
      </Button>
    </div>
  );
}

InputSearchUser.propTypes = {
  searchUser: PropTypes.func,
};
