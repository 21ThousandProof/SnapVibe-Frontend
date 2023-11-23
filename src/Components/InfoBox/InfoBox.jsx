import React, { useState } from "react";
import { createRoom, joinRoom } from "../../../REST";

const InfoBox = () => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = () => {
    createRoom(roomName, userName);
  };

  const handleJoinRoom = () => {
    joinRoom(roomName, userName);
  };

  return (
    <div style={styles.infoBox}>
      <input
        type="text"
        placeholder="Enter UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Enter RoomName"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        style={{ ...styles.input, ...(roomName && styles.inputError) }}
      />
      <button
        onClick={handleCreateRoom}
        style={{
          ...styles.button,
          ...(roomName && styles.buttonHover),
        }}
      >
        Create Room
      </button>
      <button
        onClick={handleJoinRoom}
        style={{
          ...styles.button,
          ...(roomName && styles.buttonHover),
        }}
      >
        Join Room
      </button>
    </div>
  );
};

const styles = {
  infoBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #3498db",
    borderRadius: "10px",
    backgroundColor: "#ecf0f1",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "400px", // Make it wider
    margin: "auto",
    transition: "background-color 0.3s ease",
  },
  input: {
    margin: "10px 0",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #bdc3c7",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  },
  inputError: {
    backgroundColor: "#ffecf0", // Set the background color for error state
  },
  button: {
    background: "#2ecc71",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "10px 0",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    ":hover": {
      backgroundColor: "#27ae60",
    },
  },
};

export default InfoBox;
