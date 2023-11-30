import React from "react";

const Debug = () => {
  return (
    <>
      <h1>DEBUG TOOLS</h1>
      <button onClick={CODE1}> CODE1</button>
      <button onClick={CODE2}> CODE2</button>
    </>
  );
};

const CODE1 = () => {
  console.log("CODE1");
};
const CODE2 = () => {
  console.log("CODE2");
};

export default Debug;
