import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/dataContext";

function ChatMessages() {
  const { messages } = useContext(DataContext);

  const uniqueMessages = messages.filter(
    (obj, index, arr) => index === arr.findIndex((o) => o.id === obj.id)
  );

  return (
    <div>
      <h1>Chat Messages</h1>
      <p>{JSON.stringify(uniqueMessages)}</p>
    </div>
  );
}

export default ChatMessages;
