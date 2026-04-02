// import { useQuery } from "@tanstack/react-query";
// import { getWeather } from "./api";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";

function App() {
  const [ coords, setCoords ] = useState<Coords>({ lat: 49.2333, lon: 7.0 })

  const onMapClick = (lat:number, lon:number) => {
    setCoords({ lat, lon })
  }
  

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="flex flex-col items-center justify-center p-2 rounded-xl bg-cyan-300 shadow-md gap-4 text-2xl">
          Skyline
        </h1>
      </div>
      <Map coords={coords} onMapClick={onMapClick}/>
      <CurrentWeather coords={coords}/>
      <HourlyForecast coords={coords}/>
      <DailyForecast coords={coords}/>
      <AdditionalInfo coords={coords}/>
    </div>
  )
}

export default App
