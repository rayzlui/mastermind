import React from "react";
import { useSelector } from "react-redux";

export function HintsRemaining() {
  let hintsRemaining = useSelector((state) => state.hintsRemaining);
  return (
    <div className="flex flex-col mt-10 items-center">
      <p className="text-md font-bold">Hints:</p>
      <p className={`font-bold text-sm `}>{hintsRemaining}</p>
    </div>
  );
}
