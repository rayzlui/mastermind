import React from "react";
import PropTypes from "prop-types";

export function Button(props) {
  let { buttonAction, name } = props;
  return <button onClick={(args) => buttonAction(args)}>{name}</button>;
}

Button.propTypes = {
  buttonAction: PropTypes.func,
  name: PropTypes.string,
};
