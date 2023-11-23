// InfoBox.jsx

import React, { useState } from "react";
import { createRoom, joinRoom } from "../../../REST";

const customScrollbarStyle = `
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #3498db;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #ecf0f1;
    border-radius: 10px;
  }
`;

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        border: "1px solid #3498db",
        borderRadius: "10px",
        backgroundColor: "#ecf0f1",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "400px",
        margin: "auto",
        transition: "background-color 0.3s ease",
        overflow: "auto", // Hide default scrollbar
        scrollbarWidth: "thin", // Firefox support
        scrollbarColor: "#3498db #ecf0f1", // Firefox support
        ...{ WebkitOverflowScrolling: "touch" }, // Add for iOS support
      }}
    >
      <style>{customScrollbarStyle}</style>
      <input
        type="text"
        placeholder="Enter UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{
          margin: "10px 0",
          padding: "12px",
          borderRadius: "6px",
          border: "1px solid #bdc3c7",
          width: "100%",
          boxSizing: "border-box",
          transition: "border-color 0.3s ease",
        }}
      />
      <input
        type="text"
        placeholder="Enter RoomName"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        style={{
          margin: "10px 0",
          padding: "12px",
          borderRadius: "6px",
          border: "1px solid #bdc3c7",
          width: "100%",
          boxSizing: "border-box",
          transition: "border-color 0.3s ease",
        }}
      />
      <button
        onClick={handleCreateRoom}
        style={{
          background: "#2ecc71",
          color: "#fff",
          padding: "12px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          margin: "10px 0",
          transition: "background-color 0.3s ease",
          ...(roomName && {
            backgroundColor: "#27ae60",
          }),
        }}
      >
        Create Room
      </button>
      <button
        onClick={handleJoinRoom}
        style={{
          background: "#2ecc71",
          color: "#fff",
          padding: "12px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          margin: "10px 0",
          transition: "background-color 0.3s ease",
          ...(roomName && {
            backgroundColor: "#27ae60",
          }),
        }}
      >
        Join Room
      </button>
    </div>
  );
};

export default InfoBox;
