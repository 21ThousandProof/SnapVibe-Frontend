import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connectSocket, createRoom, joinRoom } from "../REST";

import Homepage from "./Components/Homepage/Homepage";

function App() {
  connectSocket();
  return (
    <BrowserRouter>
      <Box />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

const Box = () => {
  const [roomName, setRoomName] = useState("");

  const handleJoinRoom = () => {
    joinRoom(roomName);
  };

  return (
    <div className="box-container">
      <label htmlFor="roomName">Room Name:</label>
      <input
        type="text"
        id="roomName"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default App;
