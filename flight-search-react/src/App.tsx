import "./App.css";
import { HeroUIProvider } from "@heroui/react";
import { FlightSearch } from "./views/FlightSearch";
function App() {
  return (
    <HeroUIProvider>
      <FlightSearch></FlightSearch>
    </HeroUIProvider>
  );
}

export default App;
