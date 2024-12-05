"use client";
// components/RealTimeChat.tsx
import { useEffect, useState } from "react";
// @ts-expect-error: error not defined
import { io, Socket } from "socket.io-client"; // Socket turini import qilish

let socket: typeof Socket; // Socket turi bilan aniqlash

const RealTimeChat = () => {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  useEffect(() => {
    // Socket.io serverga ulanadi
    socket = io(); // yoki io('http://localhost:3000') agar server boshqa portda bo'lsa

    // Socket bilan xabarlarni olish
    socket.on("message2", (data: string) => {
      console.log("Received message from server:", data);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    // Component unmount bo'lganda socket ulanishini yopish
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      // Xabar yuborish
      socket.emit("message1", message);
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        <h3>Received Messages:</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default RealTimeChat;
