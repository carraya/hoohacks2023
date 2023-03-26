import "./App.css";
import { DataProvider } from "./contexts/dataContext";

// components
import Auth from "./components/Auth";
import Union from "./components/Union";
import ChatMessages from "./components/ChatMessages";

import ChatInput from "./ui/ChatInput";

function App() {
  return (
    <DataProvider>
      <Auth />
      <Union />
      <ChatInput />
      <ChatMessages />
    </DataProvider>
  );
}

export default App;
