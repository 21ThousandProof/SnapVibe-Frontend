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
    <div style={styles.container}>
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
        style={styles.input}
      />
      <button
        onClick={handleCreateRoom}
        style={{ ...styles.button, ...styles.createButton }}
      >
        Create Room
      </button>
      <button
        onClick={handleJoinRoom}
        style={{ ...styles.button, ...styles.joinButton }}
      >
        Join Room
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #555", // Dark border color
    borderRadius: "10px",
    backgroundColor: "#333", // Dark background color
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "500px",
    margin: "auto",
    transition: "background-color 0.3s ease",
    overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#4a90e2 #333",
    ...{ WebkitOverflowScrolling: "touch" },
  },
  input: {
    margin: "10px 0",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd", // Lighter border color
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
    background: "#fff", // Whitish input background color
    color: "#333", // Dark text color
  },
  button: {
    background: "#4a90e2",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "10px 0",
    transition: "background-color 0.3s ease",
  },
  createButton: {
    width: "220px", // Adjust the width as needed
    "&:hover": {
      background: "#185a9d", // Darker blue color on hover
    },
  },
  joinButton: {
    width: "220px", // Adjust the width as needed
    "&:hover": {
      background: "#185a9d", // Darker blue color on hover
    },
  },
};

export default InfoBox;
