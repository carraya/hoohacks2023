import "./App.css";
import { DataProvider } from "./contexts/dataContext";

// components
// import Auth from "./components/Auth";
import Union from "./components/Union";
import ChatMessages from "./components/ChatMessages";

//ui
import ChatInput from "./ui/ChatInput";

// pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import UnionsDashboard from "./pages/UnionsDashboard";
import UnionDetails from "./pages/UnionDetails";
import Chat from "./pages/Chat";

// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <DataProvider>
      {/* <Auth />
      <Union />
      <ChatInput />
      <ChatMessages /> */}

      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route path="unions" element={<UnionsDashboard />} />
            <Route path="unions/:unionId" element={<UnionDetails />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
