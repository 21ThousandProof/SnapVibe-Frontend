import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  emitMessage,
  getRoomName,
  getUsername,
  leaveRoom,
} from "../../../REST";
import { messagesState, peopleInRoomState } from "../../GlobalStates";
import { useNavigate } from "react-router-dom";

const ChatMessage = ({ sender, message, isCurrentUser }) => {
  const isServerMessage = sender === "SERVER";

  return (
    <div
      style={{
        ...styles.message,
        ...(isCurrentUser
          ? styles.currentUserMessage
          : isServerMessage
          ? styles.serverMessageContainer
          : styles.otherUserMessage),
      }}
    >
      {isServerMessage && (
        <div style={styles.serverMessageLabel}>
          {isCurrentUser ? "You" : ""}
        </div>
      )}
      {!isServerMessage && (
        <div style={styles.messageHeader}>{isCurrentUser ? "You" : sender}</div>
      )}
      <div style={styles.messageText}>
        {message.split("\n").map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
};

const ChatRoom = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useRecoilState(messagesState);
  const [isRightBarOpen, setIsRightBarOpen] = useState(false);
  const [peopleInRoom, setPeopleInRoom] = useRecoilState(peopleInRoomState); // Recoil state for people in the room
  const messageListRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    // Update people list when component mounts or peopleInRoom changes
    // You can add additional logic here if needed
  }, [peopleInRoom]);

  const addUser = (username) => {
    setPeopleInRoom((prevPeople) => [...prevPeople, username]);
  };

  const removeUser = (username) => {
    setPeopleInRoom((prevPeople) =>
      prevPeople.filter((person) => person !== username)
    );
  };

  const handleSendMessage = () => {
    if (newMessage !== "") {
      const newMessageObj = {
        id: messages.length + 1,
        sender: "CurrentUser", // You can replace this with the actual sender name
        message: newMessage,
      };

      // Emit Message
      emitMessage(newMessage);

      textareaRef.current.style.height = "40px";

      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Check if Shift key is pressed along with Enter
      if (e.shiftKey) {
        // Add a new line to the current message
        setNewMessage((prevMessage) => prevMessage + "\n");
      } else {
        // Send the message if Shift key is not pressed
        handleSendMessage();
      }

      // Reset the textarea height after handling Enter key press
      handleTextareaChange();
      e.preventDefault(); // Prevent the default behavior of Enter key
    }
  };

  const handleTextareaChange = () => {
    const numberOfNewLines = (newMessage.match(/\n/g) || []).length;
    if (numberOfNewLines <= 2) {
      textareaRef.current.style.height = "40px";
      return;
    }
    // Adjust the textarea height based on the content
    if (textareaRef.current) {
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleOptionsClick = () => {
    setIsRightBarOpen(!isRightBarOpen);
  };

  const leaveRoomHandler = () => {
    navigate("/");
    leaveRoom();
    // Remove the current user from the people in the room
    removeUser(getUsername());
  };

  return (
    <div style={styles.chatRoom}>
      <div style={styles.title}>
        {getRoomName()}
        <div style={styles.optionsButton} onClick={handleOptionsClick}>
          &#8942;
        </div>
      </div>
      <div ref={messageListRef} style={styles.messageList}>
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
            isCurrentUser={msg.sender === getUsername()}
          />
        ))}
      </div>
      <div style={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTextareaChange();
          }}
          onKeyDown={handleKeyPress}
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>

      <div
        style={{
          ...styles.rightBar,
          transform: `translateX(${isRightBarOpen ? "0%" : "100%"})`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div style={styles.rightBarHeader}>
          <span> Room</span>
          <div style={styles.closeButton} onClick={handleOptionsClick}>
            X
          </div>
        </div>
        <button style={styles.leaveRoomButton} onClick={leaveRoomHandler}>
          Leave Room
        </button>
        <div style={styles.peopleList}>
          <div style={styles.peopleListTitle}>People in Room</div>
          {peopleInRoom.map((person, index) => (
            <div key={index} style={styles.person}>
              {person}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const styles = {
  chatRoom: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    margin: "0",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#36393f",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    overflow: "hidden", // Prevents scrolling of the entire page
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    position: "relative",
  },
  optionsButton: {
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px",
  },
  messageList: {
    flex: "1",
    overflowY: "auto",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    paddingRight: "10px", // Add some padding to the right
    scrollbarWidth: "thin", // Set the scrollbar width
    msOverflowStyle: "none", // Hide scrollbar for IE and Edge
  },
  message: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "6px",
    maxWidth: "70%",
    paddingLeft: "10px", // Add padding to the left
    paddingRight: "10px", // Add padding to the right
    overflowWrap: "break-word", // Allow words to break and wrap onto the next line
  },
  serverMessageContainer: {
    alignSelf: "center", // Align in the center
    backgroundColor: "#ccc", // Greyish background color
    color: "#000", // Text color for server messages
    fontWeight: "bold", // Make the text bold
    position: "relative", // Enable positioning for the label
  },
  serverMessageLabel: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#ccc",
    color: "#000",
    padding: "5px",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "12px",
  },
  currentUserMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4caf50",
    marginLeft: "auto", // Move to the left
  },
  otherUserMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#7289da",
  },
  messageHeader: {
    fontSize: "12px",
    marginBottom: "5px",
    color: "#ccc",
  },
  messageText: {
    overflowY: "auto",
    maxHeight: "200px", // Adjust the maximum height as needed
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    flex: "1",
    padding: "10px",
    borderRadius: "6px",
    marginRight: "10px",
    border: "1px solid #bdc3c7",
    boxSizing: "border-box",
    minHeight: "2px", // Set a minimum height for the textarea (adjust as needed)
    maxHeight: "300px", // Set a maximum height for the textarea
    resize: "none", // Disable textarea resizing
    whiteSpace: "pre-wrap", // Preserve whitespace, including new lines
    height: "40px",
  },

  sendButton: {
    background: "#2ecc71",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  rightBar: {
    width: "200px",
    backgroundColor: "#2c2f33",
    color: "#fff",
    position: "fixed",
    top: "0",
    right: "0",
    height: "100%",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  rightBarHeader: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    cursor: "pointer",
  },
  leaveRoomButton: {
    cursor: "pointer",
    color: "white",
    backgroundColor: "#FF3333", // Red color
    padding: "5px", // Increased padding
    marginBottom: "15px",
    borderRadius: "3px", // Make it a square
    border: "none",
    width: "100%", // Make it a square
  },
  peopleList: {
    flex: "1",
    overflowY: "auto",
  },
  peopleListTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  person: {
    marginBottom: "8px",
  },
};

export default ChatRoom;
