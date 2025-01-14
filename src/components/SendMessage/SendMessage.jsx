import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./index.css";
import sendIcon from "../../../public/send-icon.png";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    if (!auth.currentUser) {
      alert("You must be logged in to send a message.");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" className="send-button">
        <div className="send-button-circle">
          <img src={sendIcon} alt="Send Message" className="send-icon" />
        </div>
      </button>
    </form>
  );
};

export default SendMessage;
