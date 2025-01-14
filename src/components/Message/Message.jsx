import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./index.css";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  const isCurrentUser = user && message.uid === user.uid;

  return (
    <div className={`chat-bubble ${isCurrentUser ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt={`${message.name}'s avatar`}
      />
      <div className="chat-bubble__right">
        <p
          className="user-name"
          style={{ color: isCurrentUser ? "#204d31" : "#ecfde5" }}
        >
          {message.name}
        </p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
