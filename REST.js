import { backendUrl } from "./Constants";
import { io } from "socket.io-client";

let socket;
let userName;

const connectSocket = () => {
  console.log("Trying To Connect To Server");
  socket = io(backendUrl);

  socket.on("connection", () => {
    console.log("Socket Connected");

    socket.on("room_join_success", (data) => {
      console.log(`Joined Room, RoomData ${data}`);
    });

    socket.on("room_join_failed", (data) => {
      console.log("Room Join failed");
    });

    socket.on("user_joined", (data) => {
      console.log(`${data} Joined`);
    });
  });
};

const joinRoom = (roomName) => {
  const data = { roomName: roomName, userName: userName };
  console.log(`Making Join Room Req With `);
  console.log(data);
  socket.emit("join_room", data);
};

const createRoom = (roomName) => {
  socket.emit("create_room", { roomName: roomName, userName: userName });
};

const setUsername = (name) => {
  userName = name;
};

export { socket, setUsername, connectSocket, createRoom, joinRoom };
