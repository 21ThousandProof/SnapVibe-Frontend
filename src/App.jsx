import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connectSocket, createRoom, joinRoom } from "../REST";

import Homepage from "./Components/Homepage/Homepage";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
function App() {
  connectSocket();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
