import { useState, useContext } from "react";
import { DataContext } from "../contexts/dataContext";

function ChatInput() {
  const { db, username, currentUnion, handleMessageSend } =
    useContext(DataContext);

  const [message, setMessage] = useState("");

  return (
    <div>
      <h1>Chat Input</h1>
      <input
        type="text"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("currentUnion from chatinput comp: ", currentUnion);
          console.log(message);
          handleMessageSend(message);
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
