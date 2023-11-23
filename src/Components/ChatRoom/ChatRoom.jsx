import React, { useState, useRef, useEffect } from "react";

const ChatMessage = ({ sender, message, isCurrentUser }) => (
  <div
    style={{
      ...styles.message,
      ...(isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage),
    }}
  >
    <div style={styles.messageHeader}>{isCurrentUser ? "You" : sender}</div>
    {message}
  </div>
);

const ChatRoom = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "User1", message: "Hello there!" },
    { id: 2, sender: "User2", message: "Hi! How are you?" },
    // Add more dummy messages as needed
  ]);
  const messageListRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message list when a new message is added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        id: messages.length + 1,
        sender: "CurrentUser", // You can replace this with the actual sender name
        message: newMessage,
      };

      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div style={styles.chatRoom}>
      <div style={styles.title}>Chat Room</div>
      <div ref={messageListRef} style={styles.messageList}>
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
            isCurrentUser={msg.sender === "CurrentUser"}
          />
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
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
  },
  messageList: {
    flex: "1",
    overflowY: "auto",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    paddingRight: "10px", // Add some padding to the right
    scrollbarWidth: "none", // Hide scrollbar for Firefox
    msOverflowStyle: "none", // Hide scrollbar for IE and Edge
  },
  message: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "6px",
    maxWidth: "70%",
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
  },
  sendButton: {
    background: "#2ecc71",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ChatRoom;
