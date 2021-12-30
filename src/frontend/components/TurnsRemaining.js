import React from "react";
import { useSelector } from "react-redux";

export function TurnsRemaining() {
  let turnsRemaining = useSelector((state) => state.turnsRemaining);
  return (
    <div className="flex flex-col mt-10 items-center">
      <p className="text-md font-bold">Turns:</p>
      <p
        className={`font-bold text-sm ${
          turnsRemaining < 7 && turnsRemaining > 3 ? "text-yellow-500" : ""
        } ${turnsRemaining <= 3 ? "text-red-500" : ""}`}
      >
        {turnsRemaining}
      </p>
    </div>
  );
}
