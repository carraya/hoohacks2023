import "./App.css";
import { DataProvider } from "./contexts/dataContext";

// components
import Auth from "./components/Auth";

function App() {
  return (
    <DataProvider>
      <Auth />
    </DataProvider>
  );
}

export default App;
