import React, { useRef, useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./index.css";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const messageEndRef = useRef(null);

  const isCurrentUser = user && message.uid === user.uid;

  const formatTime = (timestamp) => {
    if (!timestamp) return "00:00";
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div
      className={`chat-message ${
        isCurrentUser ? "chat-message--sent" : "chat-message--received"
      }`}
    >
      <img
        className="chat-message__avatar"
        src={message.avatar}
        alt={`${message.name}'s avatar`}
      />
      <div className="chat-message__content">
        <p
          className="chat-message__user-name"
          style={{ color: isCurrentUser ? "#fdf800" : "#00ffff" }}
        >
          {message.name}
        </p>
        <p className="chat-message__text">{message.text}</p>
        <span className="chat-message__time">
          {message.createdAt?.seconds
            ? formatTime(message.createdAt.seconds * 1000)
            : "00:00"}
        </span>
      </div>
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default Message;
