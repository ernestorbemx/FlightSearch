import "./App.css";
import { HeroUIProvider } from "@heroui/react";
import { FlightOffers } from "./views/FlightOffers";
function App() {
  return (
    <HeroUIProvider>
      {/* <FlightSearch></FlightSearch> */}
      <FlightOffers></FlightOffers>
    </HeroUIProvider>
  );
}

export default App;
