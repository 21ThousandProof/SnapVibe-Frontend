import React, { useState } from "react";
import { createRoom } from "../../../REST";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleCreateRoom = () => {
    createRoom(roomName);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px",
    },
    input: {
      margin: "10px",
      padding: "5px",
      fontSize: "16px",
    },
    button: {
      padding: "10px",
      fontSize: "18px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <label>
        Room Name:
        <input
          type="text"
          value={roomName}
          onChange={handleRoomNameChange}
          style={styles.input}
        />
      </label>
      <button onClick={handleCreateRoom} style={styles.button}>
        Create
      </button>
    </div>
  );
};

export default CreateRoom;
