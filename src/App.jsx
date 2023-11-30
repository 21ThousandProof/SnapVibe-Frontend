import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { REST } from "../REST";
import Homepage from "./Components/Homepage/Homepage";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import Debug from "./Debug";

function App() {
  return (
    <BrowserRouter>
      <REST />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
