import React from "react";
import PropTypes from "prop-types";

export function Button(props) {
  let { buttonAction, difficulty } = props;
  return <button onClick={(args) => buttonAction(args)}>{difficulty}</button>;
}

Button.propTypes = {
  buttonAction: PropTypes.func,
  difficulty: PropTypes.string,
};
