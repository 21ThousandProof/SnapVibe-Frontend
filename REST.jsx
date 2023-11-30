import { backendUrl } from "./Constants";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { messagesState } from "./src/GlobalStates";
import { constSelector, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

let socket;
let userName;
let roomName = "Crystal Xtreme";

const REST = () => {
  const [messages, setMessages] = useRecoilState(messagesState);
  const navigate = useNavigate();
  useEffect(() => {
    connectSocket();
  }, []);

  const connectSocket = () => {
    console.log("Trying To Connect To Server");
    socket = io(backendUrl);

    socket.on("connection", () => {
      console.log("Socket Connected");

      socket.on("room_join_success", (data) => {
        console.log(`Joined Room ${data.roomName}`);
        handleRoomJoined();
        roomName = data.roomName;
      });

      socket.on("receive_message", (data) => {
        const name = data.sender;
        const msg = data.msg;
        handleMessage(name, msg);
      });

      socket.on("room_join_failed", (data) => {
        console.log("Room Join failed");
      });

      socket.on("user_joined", (data) => {
        console.log(`${data} Joined`);
      });
    });

    const handleRoomJoined = () => {
      navigate("/ChatRoom");
    };
  };

  const handleMessage = (sender, msg) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        sender: sender,
        message: msg,
      },
    ]);
  };
};

const emitMessage = (msg) => {
  const data = { msg: msg };
  socket.emit("send_message", data);
  console.log(`Message Emitted`);
};

const joinRoom = (roomName, _username) => {
  userName = _username;
  const data = { roomName: roomName, userName: userName };
  socket.emit("join_room", data);
};

const createRoom = (roomName, _username) => {
  userName = _username;
  socket.emit("create_room", { roomName: roomName, userName: userName });
};

const getRoomName = () => {
  return roomName;
};

const getUsername = () => {
  return userName;
};

export {
  socket,
  getRoomName,
  getUsername,
  createRoom,
  joinRoom,
  REST,
  emitMessage,
};
