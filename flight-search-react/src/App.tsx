import { useState } from 'react'
import './App.css'
import {HeroUIProvider} from "@heroui/react";
import { FlightSearch } from './views/FlightSearch';
function App() {
  const [count, setCount] = useState(0)

  return (
    <HeroUIProvider>
      <FlightSearch></FlightSearch>
    </HeroUIProvider>
  )
}

export default App
