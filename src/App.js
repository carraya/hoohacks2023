import "./App.css";
import { DataProvider } from "./contexts/dataContext";

// components
import Auth from "./components/Auth";
import Union from "./components/Union";

function App() {
  return (
    <DataProvider>
      <Auth />
      <Union />
    </DataProvider>
  );
}

export default App;
