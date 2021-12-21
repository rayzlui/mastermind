import React, { useState } from "react";

export function TestBackendCalls(props) {
  let [inputVal, updateInput] = useState("");
  async function handleClick(val) {
    let search = await fetch(`http://localhost:3001/user/${val}`, {
      header: { "Content-Type": "application/json" },
    });
    let data = await search.json();
    await console.log(data);
  }
  return (
    <>
      <input
        type="text"
        defaultValue={inputVal}
        onKeyPress={(e) => updateInput(e.target.value)}
      ></input>
      <button onClick={() => handleClick(inputVal)}> Search </button>
    </>
  );
}
