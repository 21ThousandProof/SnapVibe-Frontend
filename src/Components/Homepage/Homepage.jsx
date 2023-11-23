import React from "react";
import CreateRoom from "../CreateRoom/CreateRoom";
import NameField from "../NameField/NameField";
import { setUsername } from "../../../REST";
const Homepage = () => {
  return (
    <>
      <NameField onNameChanged={setUsername} />
      <CreateRoom />
    </>
  );
};

export default Homepage;
