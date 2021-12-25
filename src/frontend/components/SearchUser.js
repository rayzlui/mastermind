import React, { useState } from "react";
import PropTypes from "prop-types";

export function SearchUser(props) {
  let [searchInput, updateSearchInput] = useState();
  let { searchUser } = props;

  return (
    <>
      <label>Search User</label>
      <input
        type="text"
        onChange={(e) => updateSearchInput(e.target.value)}
        defaultValue={searchInput}
      />
      <button onClick={() => searchUser(searchInput)}>Search</button>
    </>
  );
}

SearchUser.propTypes = {
  searchUser: PropTypes.func,
};
