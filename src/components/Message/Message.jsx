import React, { useRef, useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import defaultAvatar from "../../../public/default-avatar.png";
import "./index.css";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const messageEndRef = useRef(null);
  const db = getFirestore();
  const dispatch = useDispatch();

  const isCurrentUser = user && message.uid === user.uid;

  // Get user data from Redux store
  const userData = useSelector((state) => state.user.users[message.uid]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!message.uid || userData) return; // Avoid unnecessary fetches
      const userDoc = await getDoc(doc(db, "users", message.uid));
      if (userDoc.exists()) {
        dispatch(
          setUser({
            uid: message.uid,
            name: userDoc.data().name,
            avatar: userDoc.data().avatar,
          })
        );
      }
    };
    fetchUserData();
  }, [message.uid, userData, dispatch]);

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
        src={userData?.avatar || defaultAvatar}
        alt={`${userData?.name || "User"}'s avatar`}
      />
      <div className="chat-message__content">
        <p
          className="chat-message__user-name"
          style={{ color: isCurrentUser ? "#fdf800" : "#00ffff" }}
        >
          {userData?.name || "Unknown User"}
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
