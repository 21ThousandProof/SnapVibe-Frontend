import { backendUrl } from "./Constants";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { messagesState, peopleInRoomState } from "./src/GlobalStates";
import { constSelector, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

let socket;
let userName;
let roomName = "";

const REST = () => {
  const [messages, setMessages] = useRecoilState(messagesState);
  const [roomList, setRoomList] = useRecoilState(peopleInRoomState);

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
        alert(data.msg);
      });

      socket.on("user_joined", (data) => {
        handleUserJoined(data.userName);
      });

      socket.on("user_left", (data) => {
        handleUserLeft(data.userName);
      });

      socket.on("room_list", (data) => {
        setRoomList(data.list);
      });
    });

    const handleRoomJoined = () => {
      setMessages([]);
      navigate("/ChatRoom");
    };
  };
  const handleUserLeft = (name) => {
    handleMessage("SERVER", `${name} Left The Room`);
  };

  const handleUserJoined = (name) => {
    handleMessage("SERVER", `${name} Joined The Room`);
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

const leaveRoom = () => {
  socket.emit("leave_room");
};

const getRoomName = () => {
  return roomName;
};

const getUsername = () => {
  return userName;
};

const resetDetails = () => {
  userName = "";
  if (roomName) {
    leaveRoom();
  }
};

export {
  socket,
  getRoomName,
  getUsername,
  createRoom,
  joinRoom,
  REST,
  emitMessage,
  leaveRoom,
  resetDetails,
};
