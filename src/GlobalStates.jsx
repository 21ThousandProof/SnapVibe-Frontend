// In GlobalStates.jsx
import { atom } from "recoil";

const messagesState = atom({
  key: "messagesState",
  default: [
    // { id: 1, sender: "User1", message: "Hello there!" },
    // { id: 2, sender: "User2", message: "Hi! How are you?" },
  ],
});

export const peopleInRoomState = atom({
  key: "peopleInRoomState",
  default: ["BEANS", "CURRY", "LOELO"], // Initial value is an empty array
});

export { messagesState };
