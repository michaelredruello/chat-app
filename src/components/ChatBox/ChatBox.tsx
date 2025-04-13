import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import Message from "../Message/Message";
import SendMessage from "../SendMessage/SendMessage";
import "./index.css";

interface MessageType {
  id: string;
  text: string;
  createdAt: Date;
  uid: string;
  displayName: string;
  photoURL?: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scroll = useRef<HTMLSpanElement | null>(null);
  const prevMessageCount = useRef<number>(0);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: MessageType[] = [];

      QuerySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();

        fetchedMessages.push({
          id: doc.id,
          text: data.text,
          createdAt: (data.createdAt as Timestamp)?.toDate() ?? new Date(0),
          uid: data.uid,
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
      });

      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (messages.length > prevMessageCount.current) {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessageCount.current = messages.length;
  }, [messages]);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages.length > 0 ? (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        ) : (
          <p className="no-messages">
            Seems like you are the first to arrive, punk! Why don't you write
            something for the others?
          </p>
        )}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
